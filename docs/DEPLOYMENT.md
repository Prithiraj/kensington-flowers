# Verified GitHub Pages deployment

**Status: published and verified as a public design preview.**

Website: https://prithiraj.github.io/kensington-flowers/  
Deployed source commit: `08a0d6edd8189d56a53ba1c150decfaca3eebab8`  
Successful build, test, deployment and live verification: https://github.com/Prithiraj/kensington-flowers/actions/runs/34086512001  
Live HTTP checks completed: **7 September 2026, 05:22:37 UTC**.

## Verification results

The browser test suite passed all 36 configured checks. The actual public site then passed all 11 HTTPS checks below; this result is not inferred merely from a source commit or generated artifact.

| Public route or asset | Observed status |
|---|---:|
| Homepage | 200 |
| `/wedding-garlands/` | 200 |
| `/privacy/` | 200 |
| `/photo-credits/` | 200 |
| `/assets/site.css` | 200 |
| `/assets/site.js` | 200 |
| `/assets/images/bouquet-960.webp` | 200 |
| `/assets/images/garlands-960.webp` | 200 |
| `/favicon.svg` | 200 |
| `/sitemap.xml` | 200 |
| A deliberately nonexistent route | 404, with the custom page content |

The checks validate content markers, file types and non-empty response bodies in addition to response codes. The full `live-checks.json` is in the run's `live-verification` artifact; source, build, screenshots and browser-test reports are in `implementation-review`.

Desktop and mobile homepage/wedding screenshots were visually reviewed against the approved direction. The rendered website files are unchanged from that reviewed release; the final additions were dependency locking and deployment verification/documentation.

## Preview versus commercial launch

The site is functional and publicly reachable. It remains explicitly labelled as a design preview with noindex metadata because business-owned photographs, operating-detail confirmations and owner sign-off have not been supplied.

The six real photographs are licensed illustrative references, not Kensington's arrangements, stock or premises. The shop's own social galleries are linked, and every image source/licence is documented. Actual shop/team photographs and verified testimonials were not fabricated.

Phone, email and directions links are genuine. Email enquiries open the visitor's email application; there is no submission server or simulated confirmation. Hours remain call-to-confirm, with no invented price, delivery or booking policies.

See [the design plan](DESIGN_PLAN.md), [QA scope](QA.md), [asset register](ASSET_REGISTER.md) and [commercial launch checklist](LAUNCH_CHECKLIST.md).
