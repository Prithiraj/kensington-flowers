import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = JSON.parse(fs.readFileSync(path.join(ROOT,'site.json'),'utf8'));
const publicDir = path.join(ROOT,'public');
const output = path.join(ROOT,'qa');
fs.mkdirSync(output,{recursive:true});
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.json':'application/json','.xml':'application/xml','.txt':'text/plain'};
const server = http.createServer((request,response)=>{
  let pathname = decodeURIComponent(new URL(request.url,'http://localhost').pathname);
  if (!pathname.startsWith(site.basePath)) { response.writeHead(404); response.end('Not found'); return; }
  pathname = pathname.slice(site.basePath.length);
  let file = path.resolve(publicDir,pathname);
  if (!file.startsWith(publicDir+path.sep) && file!==publicDir) {response.writeHead(403);response.end();return;}
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file=path.join(file,'index.html');
  if (!fs.existsSync(file)) {response.writeHead(404);response.end('Not found');return;}
  response.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});
  fs.createReadStream(file).pipe(response);
});
await new Promise(resolve=>server.listen(4173,'127.0.0.1',resolve));
const base = `http://127.0.0.1:4173${site.basePath}`;
const browser = await chromium.launch({headless:true});
const results = {checkedAt:new Date().toISOString(),checks:[],violations:[],screenshots:[]};
const failures=[];
async function check(label, fn) {
  try { await fn(); results.checks.push({label,passed:true}); console.log('PASS',label); }
  catch (error) { results.checks.push({label,passed:false,message:error.message}); failures.push(label); console.error('FAIL',label,error.message); }
}
try {
 const context=await browser.newContext();
 const page=await context.newPage();
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 for (const route of ['', 'wedding-garlands/', 'privacy/', 'photo-credits/', '404.html']) {
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(base+route,{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  await check(`One H1 and landmarks: ${route||'home'}`,async()=>{assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('main').count(),1);});
  await check(`All displayed photos load: ${route||'home'}`,async()=>{
   const imgs=page.locator('main img');
   for(let i=0;i<await imgs.count();i++){await imgs.nth(i).scrollIntoViewIfNeeded();await imgs.nth(i).evaluate(img=>img.decode());}
   assert.equal(await page.locator('main img').evaluateAll(imgs=>imgs.filter(i=>!i.naturalWidth).length),0);
  });
  await check(`No serious accessibility violations: ${route||'home'}`,async()=>{
   await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
   const audit=await page.evaluate(async()=>window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}}));
   results.violations.push(...audit.violations.map(v=>({route,id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.map(n=>n.target)})));
   assert.equal(audit.violations.filter(v=>['serious','critical'].includes(v.impact)).length,0,JSON.stringify(audit.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))));
  });
  await check(`Local links and anchors resolve: ${route||'home'}`,async()=>{
   const links=await page.locator('a[href]').evaluateAll(nodes=>nodes.map(n=>n.href));
   for(const link of new Set(links)){
    const target=new URL(link);if(target.origin!==new URL(base).origin)continue;
    const response=await context.request.get(target.href.split('#')[0]);assert.equal(response.status(),200,link);
    if(target.hash && target.pathname===new URL(page.url()).pathname)assert.ok(await page.locator(`[id="${decodeURIComponent(target.hash.slice(1))}"]`).count(),link);
   }
  });
  if(route===''||route==='wedding-garlands/'){
   for(const width of [320,390,768,1440]){
    await page.setViewportSize({width,height:width<700?844:1000});
    await page.evaluate(()=>window.scrollTo({top:0,left:0,behavior:'instant'}));
    await page.waitForFunction(()=>window.scrollY===0);
    await page.waitForTimeout(100);
    await page.mouse.move(0,0);
    await check(`No horizontal overflow: ${route||'home'} at ${width}px`,async()=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)));
    if([390,1440].includes(width)){
     const name=`${route?'wedding':'home'}-${width}.png`;
     await page.screenshot({path:path.join(output,name),fullPage:true,animations:'disabled'});results.screenshots.push(name);
    }
   }
  }
 }
 await page.setViewportSize({width:390,height:844});await page.goto(base,{waitUntil:'networkidle'});
 await check('Mobile navigation, Escape and focus restoration',async()=>{
  await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');
  await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
  assert.ok(await page.locator('.menu-toggle').evaluate(e=>e===document.activeElement));
 });
 await check('Gallery filtering announces and changes results',async()=>{
  await page.locator('[data-filter="ceremony"]').click();assert.equal(await page.locator('.gallery-card:not([hidden])').count(),1);
  assert.ok((await page.locator('#gallery-status').innerText()).includes('1 illustrative photograph'));
  await page.locator('[data-filter="all"]').click();assert.equal(await page.locator('.gallery-card:not([hidden])').count(),6);
 });
 await check('Lightbox keyboard navigation and Escape',async()=>{
  const first=page.locator('[data-gallery]').first();await first.click();assert.ok(await page.locator('#photo-dialog').evaluate(d=>d.open));
  const title=await page.locator('#photo-title').innerText();await page.keyboard.press('ArrowRight');assert.notEqual(await page.locator('#photo-title').innerText(),title);
  await page.keyboard.press('Escape');assert.equal(await page.locator('#photo-dialog').evaluate(d=>d.open),false);
  assert.ok(await page.locator('[data-gallery]').evaluateAll(links=>links.includes(document.activeElement)));
 });
 await check('No map loads before deliberate consent',async()=>assert.equal(await page.locator('iframe').count(),0));
 await check('Calling and email are real links; no fake form',async()=>{
  assert.ok(await page.locator(`a[href="tel:${site.telephone}"]`).count());
  assert.ok(await page.locator('a[href^="mailto:"]').count());assert.equal(await page.locator('form').count(),0);
 });
 await page.emulateMedia({reducedMotion:'reduce'});
 await check('Reduced motion disables smooth scrolling',async()=>assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto'));
 await check('No browser JavaScript errors',async()=>assert.deepEqual(errors,[]));
 const noJs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const fallback=await noJs.newPage();await fallback.goto(base,{waitUntil:'networkidle'});
 await check('No-JavaScript content, navigation and gallery fallback',async()=>{
  assert.ok(await fallback.locator('h1').isVisible());assert.ok(await fallback.locator('#primary-navigation').isVisible());
  assert.equal(await fallback.locator('.gallery-card').count(),6);assert.equal(await fallback.locator('.gallery-filters').isVisible(),false);
  assert.ok(await fallback.locator('[data-gallery]').first().getAttribute('href'));
 });
 await noJs.close();await context.close();
} finally {
 await browser.close();server.close();
 fs.writeFileSync(path.join(output,'test-results.json'),JSON.stringify(results,null,2)+'\n');
 const report=['# Implementation QA','',`Checked: ${results.checkedAt}`,'',...results.checks.map(r=>`- [${r.passed?'x':' '}] ${r.label}${r.message?' — '+r.message:''}`),'','## Accessibility findings','',results.violations.length?JSON.stringify(results.violations,null,2):'No violations returned by the configured automated WCAG checks.','', 'Automated checks are not a declaration of full WCAG conformance. Screen-reader and owner acceptance review remain separate.'];
 fs.writeFileSync(path.join(output,'TEST_REPORT.md'),report.join('\n')+'\n');
}
if(failures.length)process.exitCode=1;
