# Kensington Flowers

An evidence-led, photo-first website for Kensington Dairy & Flowers, Mount Eden, Auckland.

**Website:** https://prithiraj.github.io/kensington-flowers/  
**Source:** `main`  
**Generated website:** `gh-pages`  
**Current release mode:** clearly labelled design preview; search indexing disabled pending owner verification and business photography.

## What is included

- Responsive homepage, dedicated wedding-garlands page, privacy page, photo credits and custom 404.
- Real licensed photography, downloaded and optimised into locally served WebP/JPEG images. It is explicitly illustrative, **not Kensington's work or premises**.
- Click-to-call, real email links, a prefilled wedding email and Maps directions. No fake submission, checkout, prices, ratings, delivery promises or invented hours.
- Keyboard-accessible navigation, filterable photo gallery, native-dialog image viewer, native FAQs and reduced-motion handling.
- Static HTML, shared CSS and a small progressive-enhancement script. No runtime framework, Three.js, WebGL, database or analytics.
- SEO/OG metadata and conservative Florist JSON-LD. Preview remains `noindex` until the launch checklist is approved.

## Documentation

- [Approved design plan and implementation decisions](docs/DESIGN_PLAN.md)
- [Evidence and facts](docs/EVIDENCE.md)
- [Image rights and attribution register](docs/ASSET_REGISTER.md)
- [Architecture and maintenance](docs/IMPLEMENTATION.md)
- [Commercial launch checklist](docs/LAUNCH_CHECKLIST.md)

## Local development

Requires Node.js 22+ and Python 3.12+.

```sh
python -m venv .venv
# macOS/Linux:
source .venv/bin/activate
# Windows PowerShell: .venv\Scripts\Activate.ps1
python -m pip install Pillow==11.3.0
npm install
python scripts/media.py
node scripts/build.mjs
npx playwright install chromium
node scripts/check.mjs
```

Media preparation requires internet access. All published photos are local static assets, so visitors do not contact Unsplash or Wikimedia. Font requests go to Google Fonts and the map is opt-in.

To preview without the project subpath:

```sh
BASE_PATH=/ node scripts/build.mjs
python -m http.server 8000 --directory public
```

Then visit http://localhost:8000. Rebuild with the default base before running `npm test`, which tests the real `/kensington-flowers/` deployment path.

## Deployment

`.github/workflows/pages.yml` prepares photos, builds the site, runs browser/accessibility checks, uploads a review artifact, commits the generated site to `gh-pages` and deploys the Pages artifact. Failed checks stop publication.

For first-time repository setup, **Settings → Pages → Source → GitHub Actions** must be enabled by a repository administrator if it is not already enabled. The workflow reports this clearly instead of falsely claiming a deployment. The `gh-pages` branch is also a ready-to-serve static alternative for branch-based Pages publishing.

Every subsequent push to `main` rebuilds and tests the site. Do not edit `gh-pages` by hand; it is generated. No custom domain or paid service is configured.

## Content and photos

Business facts live in `site.json`; change these rather than duplicating them in generated HTML. Page copy and shared templates live in `scripts/build.mjs`. Styles and interactions live in `assets/`.

Photo source, credit, licence and use classification live in `assets/photos.json`. See the asset register before adding or replacing an image. Public social-media visibility is not a commercial reuse licence.

**Do not set `preview` to `false` until the owner confirms the business facts and rights, approves the displayed identity and privacy information, and supplies suitable authorised business photographs.** Opening hours must remain `null` unless verified.

## QA

The Actions run produces an `implementation-review` artifact containing source, built pages, desktop/mobile screenshots, `qa/test-results.json` and `qa/TEST_REPORT.md`. Automated tests cover key routes, loaded images, local links, page landmarks, responsive overflow, accessibility checks, navigation, photo filtering/dialog behaviour, reduced motion and no-JavaScript fallback.

An automated accessibility check is not a claim of full WCAG conformance. Owner acceptance and a manual screen-reader review remain separate.
