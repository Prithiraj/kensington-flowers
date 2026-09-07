# Website QA and deployment record

## Browser-tested release

Source commit: `905b23e428dca42991ce63cecc5bdcab40e080bc`  
Test run: https://github.com/Prithiraj/kensington-flowers/actions/runs/34086035948  
Checked: 7 September 2026, 05:16 UTC  
Result: **36 automated checks passed; zero violations returned by the configured axe WCAG checks.**

The GitHub Pages deployment job also completed successfully for that run.

## What was actually checked

All five generated page routes: homepage, wedding garlands, privacy, photo credits and custom 404. Tests verify one H1/main landmark, loaded photographs, local links, anchors and automated accessibility rules. Homepage and specialist page were checked for horizontal overflow at 320, 390, 768 and 1440px.

Interaction checks cover mobile navigation and Escape/focus restoration; gallery filters and announcements; dialog arrow keys/Escape/focus; no automatic map loading; real calling/email links with no fake form; reduced-motion scrolling; absence of JavaScript errors; and working navigation/content/photo links with JavaScript disabled.

The first test run found invalid contact-list grouping. The source was corrected to native `dl > div > dt + dd` groups and retested. Screenshot capture was also stabilised to avoid capturing an in-progress smooth scroll.

## Visual review

Desktop and mobile screenshots of the homepage and wedding page were reviewed. Confirmed the cream/garnet/green palette, photographic composition, readable editorial headings, visible primary actions and mobile stacking. Illustrative-photo labels and credits remain visible. Screenshots are included in each run's `implementation-review` artifact.

## Asset-size observations

Measured from the generated release, before server compression:

| Asset | Bytes |
|---|---:|
| JavaScript | 5,068 |
| JavaScript, locally gzip-compressed | 1,787 |
| CSS | 26,125 |
| Homepage HTML | 35,206 |
| 480px hero WebP | 29,796 |
| 960px hero WebP | 74,440 |

These are file-size observations, **not** measured live transfer sizes, a Lighthouse score or field Core Web Vitals. Google Fonts is a separate request.

## Repeatable public verification

`scripts/verify-live.py` runs after deployment. It checks the actual HTTPS homepage, wedding page, privacy page, credits page, CSS, JavaScript, hero and garland images, favicon, sitemap and custom HTTP 404 response. Results are uploaded as the `live-verification` artifact and appear in the Actions summary. A failed response/content assertion fails the deployment workflow instead of being reported as success.

## Still separate from this QA

A complete manual screen-reader audit, real-device owner acceptance, owner-confirmed operating details, approved business originals and commercial privacy sign-off remain outstanding. Automated results do not constitute full WCAG conformance, a verified Google listing, successful customer email delivery or measured real-user performance.
