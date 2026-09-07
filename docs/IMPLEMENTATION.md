# Implementation and maintenance

## Architecture

Build-time Node.js templates generate complete static HTML pages. Python/Pillow prepares real, licensed, locally served responsive photographs. Visitors receive static HTML/CSS and a small vanilla-JavaScript enhancement file. There are no runtime framework or animation dependencies, no WebGL and no database.

- `site.json`: one place for business name, address, phone, email, social links, deployment path and preview mode.
- `assets/photos.json`: source/creator/licence/alt-text manifest.
- `scripts/media.py`: bounded, retried image downloads; orientation and resizing; WebP/JPEG output; dimensions; 1200×630 social image.
- `scripts/build.mjs`: shared header/footer, icons, image helper, pages and SEO/JSON-LD.
- `assets/site.css`: design tokens, components, breakpoints, focus states, reduced motion and print behaviour.
- `assets/site.js`: progressively enhanced mobile navigation, gallery filters/dialog and deliberate map loading.
- `scripts/check.mjs`: browser, axe, route/link/image, responsive and no-JavaScript checks; screenshots and Markdown/JSON reports.
- `.github/workflows/pages.yml`: repeatable build/test/publication with review artifacts.
- `public/`: generated artifact, not hand-edited source.

## Contact and privacy

This deployment intentionally has no contact-form endpoint. The owner has not approved or tested a server recipient and GitHub Pages is static. Click-to-call and `mailto:` are real browser actions. The wedding email is a prefilled draft in the visitor's own application, labelled accurately; nothing is sent or acknowledged by the site.

No cookies, local storage, tracking pixels, client analytics or social embeds are added by site code. Third-party connections: Google Fonts on normal visits; Google Maps only after “Show Google Map”; external services when their links are followed. The privacy page explains this without inventing the business's offline retention policy.

## Design-specific implementation decisions

- Retain the garland specialism and 708 Dominion Road identity prominently.
- Use real licensed illustrative images until authorised business originals are available. Never pretend another florist's work is Kensington's.
- Use a factual typographic address panel instead of a fabricated shop photo.
- Use a dedicated specialist page rather than wedding copy buried on a generic homepage.
- Omit unverified testimonials/ratings and unresolved hours.
- Keep Three.js out: no meaningful story advantage over the photographs.
- Serve fonts through Google Fonts with local fallbacks; font files are not bundled in the repository.
- Use a preview notice and noindex configuration pending commercial owner sign-off.

## Failure handling

Without JavaScript the navigation stays visible, all photos are shown, image links open JPEGs, FAQs work natively, and telephone/email/directions links remain usable. Without webfonts the page uses Georgia/Arial. The Google map is optional, with direct directions always present. Media/build/test failures stop replacement of the existing deployment.

## GitHub Pages

Default project path: `/kensington-flowers/`; canonical origin: `https://prithiraj.github.io/kensington-flowers/`. An optional build override can set `BASE_PATH` and `SITE_URL`. Subpages use proper folders, not a client router.

The workflow prepares and tests before copying generated output to `gh-pages`, then uploads/deploys the official Pages artifact. It explicitly checks Pages configuration and reports first-time enablement failure. The available connector can edit repository content but has no dedicated Pages-settings mutation. Do not call a committed workflow a verified live deployment.

## QA scope

Automated coverage includes each route, one H1/landmarks, loaded photos, same-origin links, local anchors, axe WCAG checks, 320/390/768/1440px overflow, mobile navigation/Escape, gallery filtering/announcements, image-dialog keyboard use, real contact links, map opt-in, reduced motion, JavaScript errors and the no-JavaScript fallback.

Reports are generated from actual test execution and stored with screenshots in the Actions `implementation-review` artifact. They do not imply owner approval, a full manual screen-reader audit or measured field Core Web Vitals.
