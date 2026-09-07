# Kensington Dairy & Flowers — approved website design plan

**Direction:** Neighbourhood warmth, ceremonial detail.  
**Research baseline:** 7 September 2026.  
**Approval:** The user approved implementation of the plan and publication in `Prithiraj/kensington-flowers` on GitHub Pages.  
**Release distinction:** A functional, clearly labelled public design preview is not an owner-verified commercial launch. The latter remains subject to the launch checklist.

This document preserves the approved 17-part design framework and records the implementation decisions needed for the requested static hosting. The original proposal was supplied as `kensington-flowers-website-design-plan.md` in the conversation. See [EVIDENCE.md](EVIDENCE.md) for sources and [IMPLEMENTATION.md](IMPLEMENTATION.md) for technical details.

## 1. Evidence baseline

Use Kensington Flowers as the proposed display identity and retain Kensington Dairy & Flowers in location/business information. The strongest evidenced distinction is Indian wedding garlands, supported by bouquets, bridal accessories, ceremonial flowers and the real Dominion Road shop.

The best-supported contact details are **708 Dominion Road, Mount Eden, Auckland 1041**, **09 623 2104**, and the publicly listed **kensingtonflowers.706@gmail.com**. Sources disagree about closing times and one secondary address listing says 706. Therefore do not publish a weekly schedule or “open now” indicator until confirmed. The displayed address follows the business's indexed social profile and local business directory, not the conflicting secondary listing.

Business posts support wedding garlands, bridal/bridesmaid bouquets, hair flowers, buttonholes, puja flower heads, fresh-flower jewellery, and church/funeral flowers. They do not establish current stock, fixed packages or guaranteed availability.

Do not invent prices, delivery terms, lead times, deposits, refunds, founding dates, ownership stories, parking, physical accessibility, ratings or reviews. The existence of positive third-party comments is a research signal, not a publishable rating claim.

Competitor audit: Flower Station illustrates a clear product/action hierarchy; Roses Florist separates everyday purchasing from wedding/event enquiries. Borrow clarity, not their services, policies, imagery or identity. Kensington's opportunity is a focused enquiry path around its evidenced specialism, not a pretend online shop.

## 2. Audience

Wedding/ceremony planners need real examples and an easy route to discuss date, colours, quantities and traditions. Local flower buyers need a quick understanding of the range, a phone number and directions. Sympathy/church customers need calm language and direct contact, not celebratory effects or pressure.

These are design hypotheses, not measured customer demographics or analytics findings.

## 3. Conversion goals

1. **Call 09 623 2104** to discuss flowers, availability and requirements.
2. **Wedding enquiry** with a clear specialist page and considered contact route.
3. **Get directions** to the shop.

Keep social links secondary. No “Buy now”, simulated order confirmation, instant bookings, availability calendar, countdown or unverified delivery badge.

**Static-hosting decision:** GitHub Pages has no enquiry backend. Use working `tel:` and `mailto:` links, including a clearly labelled prefilled email. An email is neither sent automatically nor presented as received. Do not connect an unapproved mail processor or send customer details to an unverified endpoint.

## 4. Creative direction

Warm cream, garnet and garden green; expressive editorial headings; large real flower photographs; approachable language; restrained linework. The floral detail and repetition of garlands supply the distinctive visual cue, not generic leaf clip art or 3D decoration.

Keep the Dominion Road/dairy identity visible. Do not turn this neighbourhood business into a fictional luxury atelier. Avoid black/gold luxury clichés, stock bridal models, invented heritage and unapproved religious symbolism.

Implementation uses an asymmetrical photograph-led hero, a garland-specialism feature, occasion pathways, a bold typographic 708 Dominion Road location card, a clearly identified inspiration gallery and practical contact panels.

## 5. Color system

| Token | Value | Role |
|---|---|---|
| Paper | `#FAF6EF` | Main background |
| Ink | `#24231F` | Body and essential information |
| Garnet | `#6B2438` | Primary actions and expressive accents |
| Foliage | `#314838` | Wedding feature and utility strip |
| Petal | `#EAD7DB` | Soft backgrounds and interaction states |
| Brass | `#A78243` | Decoration only, not normal small text on Paper |

Solid-colour calculated contrast: Ink/Paper approximately 14.6:1, Garnet/Paper 10.1:1 and Foliage/Paper 9.2:1. Brass/Paper is approximately 3.3:1. Test final text, states and backgrounds rather than relying only on these token calculations.

## 6. Typography

Fraunces for expressive headings and Source Sans 3 for reading and interface text. Use medium/regular weights, restrained italic accents and readable line lengths; avoid long all-capital text and thin scripted labels.

Mobile body text around 16–18px, fluid heading scale, and comfortable line heights. Fonts load from Google Fonts with Georgia/Arial fallbacks; font files are not bundled or redistributed by this repository. This differs from the proposal's optional self-hosting approach and is disclosed in the privacy page. Both projects publish SIL Open Font License documentation.

## 7. Image strategy

Preferred commercial-launch images remain owner-approved original garlands, actual bouquets/accessories, a current shopfront, and actual people/process imagery with suitable consent. Never replace the real team or shop with stock people or premises.

**Implemented preview decision:** Six real, licensed floral photographs are used as an explicitly illustrative moodboard. No unlicensed owner-post, review or Maps image is republished. Captions, alt text, the preview notice and a credits page distinguish them from Kensington's work. The business's own social galleries are linked directly. The shop section uses a factual address composition rather than a fake storefront.

Replace illustrative imagery with approved originals before a commercial launch. Sources, creators, licences and transformations are in [ASSET_REGISTER.md](ASSET_REGISTER.md). Generate responsive local WebP assets and JPEG enlargements; preserve natural flower colour and useful compositions.

## 8. Information architecture

- `/`: broad business introduction, occasions, garland feature, local shop identity, inspiration, visit/contact and FAQ.
- `/wedding-garlands/`: specialist introduction, advertised categories, contact preparation and wedding enquiry.
- `/privacy/`: actual technical data practices.
- `/photo-credits/`: photo attribution and preview limitations.
- `/404.html`: a useful route home.

Navigation: Our flowers, Wedding garlands, Our shop, Visit us; persistent call access. No empty shop, speculative blog, customer accounts or mass-generated suburb pages.

## 9. Section-by-section layout

**Header:** Compact text identity, small original line-art mark, useful location strip and phone action. Mobile menu is progressively enhanced; no-JavaScript users still see navigation.

**Hero:** Emotional short headline, explicit garland/bouquet copy, real floral image, call and wedding-enquiry routes, and visible location. No slideshow or loading spectacle. An image caption distinguishes illustrative stock from actual business work.

**Value strip:** Concrete categories and local location, not award, rating or price badges.

**Occasions:** Four image-led entries for bouquets, wedding garlands, ceremonial flowers and sympathy/church work. Descriptions are categories, not priced or currently stocked products.

**Wedding feature:** Garden-green panel, strong garland photography, related bridal/accessory categories and specialist-page action. No invented ceremony packages, installations or setup services.

**Shop:** Factual dairy/florist identity and 708 Dominion Road address treatment. Owner biography, actual shopfront and process photographs remain pending rather than fabricated.

**Gallery:** Six labelled illustrative photographs; ordinary image links work without JavaScript. Optional filtering and keyboard-accessible enlargement. Direct links to Kensington's real social galleries.

**Social proof:** Omitted until traceable quotations, attribution and reuse clearance are verified. No placeholder praise.

**Visit/contact:** Full public contacts, call-to-confirm hours, directions, opt-in map and availability caveats. No parking/accessibility icons or assumptions.

**Closing CTA:** “Tell us what the occasion calls for.” Call and email, no urgency tactics.

**Wedding page:** Specialist hero, confirmed categories, enquiry checklist and genuine prefilled mail link. It explicitly explains that the user's email application opens and no order is confirmed.

## 10. Three.js / animation plan

Do not use Three.js/WebGL in this release. Permission to use it is not a requirement: it would not explain the flower work better than real photography. Use modest colour/underline/image-hover transitions only. No parallax, scroll hijacking, floating petals, cursor gimmicks or autoplay.

Respect `prefers-reduced-motion`; essential content must not depend on an entrance animation or JavaScript.

## 11. Responsive behavior

Single-column mobile composition; two-column service/gallery layouts where practical; editorial splits on larger screens. Fluid gutters and maximum content width around 1280px. Mobile touch controls remain generous; avoid fixed text heights and horizontal overflow.

A restrained bottom contact bar provides Call and Wedding enquiry. Account for safe-area insets, short viewports, keyboard/focus obstruction and zoom. The image hero follows copy on mobile. No hover-only information.

## 12. Accessibility

Target WCAG 2.2 AA without claiming conformance solely from automation. Semantic landmarks, one H1, ordered headings, skip link, `en-NZ`, visible focus and meaningful image descriptions.

Prefer 44px touch targets; maintain text/UI contrast; use actual links for navigation. Native FAQ details and modal dialog semantics; Escape and focus restoration; screen-reader announcements for filters. Test at 320px, enlarged text, keyboard-only navigation, reduced motion and without JavaScript. Manual screen-reader acceptance remains separate.

## 13. Performance

Static HTML/CSS, a small vanilla-JavaScript enhancement file, no runtime framework. Python/Pillow is used only during image preparation and Playwright/axe only for tests. Images are served locally, have dimensions/srcsets, and load lazily below the fold; hero imagery is eager/high-priority. Social feeds are links, not embeds; the map is opt-in.

Original planning budgets: initial mobile transfer under 1MB, hero around 250KB or less, compressed JavaScript below 20KB, and font payload around 120KB or less. These are targets, not measured assertions. External font performance is a tradeoff to inspect.

Core Web Vitals targets are LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 at the 75th percentile. Do not claim field results without sufficient actual traffic. Failed asset/build tests must not replace a working deployment.

## 14. SEO / local discovery

Use accurate page titles and descriptions, canonical URLs, OG metadata, an original 1200×630 photographic sharing derivative, sitemap and favicon. The site's project path is `/kensington-flowers/`.

Conservative Florist JSON-LD uses confirmed/public contact information and verified social links. Do not add unverified hours, prices, delivery areas, reviews or stock-photo business-image assertions. Visible information and structured data draw from the same configuration.

Preview uses `noindex, nofollow` plus restrictive robots rules until business verification, photography and owner sign-off. Search ranking is not guaranteed. Before commercial indexing, reconcile name/address/phone/hours across owner-managed listings.

## 15. Rights/licensing notes

Publicly posted business photography is not presumed licensed for commercial reuse. Maintain an asset register with creator, source, licence, changes and approval state. Licensed illustrative photography is clearly distinguished from business originals; no photographer endorsement is implied.

No competitor images, scraped map screenshots, removed watermarks, invented reviews or AI-generated business work. The optional map uses Google's embedded service and leaves its attribution intact. See the launch checklist for required owner image/people approvals.

## 16. Implementation sequence

1. Preserve the plan and facts; inspect the existing repository.
2. Source licensed real images; document the distinction from owner business photography.
3. Build shared static templates, styling, mobile layouts and genuine contact actions.
4. Add restrained progressive enhancement, metadata and privacy/credits pages.
5. Generate local responsive assets and run browser/accessibility/link/image checks.
6. Review desktop/mobile screenshots, fix defects and re-run checks.
7. Publish the tested artifact on GitHub Pages and verify the actual public route.
8. Hand over source/docs/test results, explicitly separating public preview deployment from commercial-launch approval.

## 17. Acceptance criteria

- Business identity, Mount Eden location and garland specialism are apparent immediately.
- Real photo-led, responsive visual design; no generic pretend luxury identity.
- All factual claims are traceable; unknown policies/hours/prices/ratings are not invented.
- Call, wedding enquiry, directions, navigation and gallery interactions work.
- No fake backend, submission success or booking availability.
- All preview photos have documented licences and visible illustrative classification.
- Core content/actions work without JavaScript; no unintended 320px+ overflow.
- Keyboard access, focus, contrast, reduced motion and automated accessibility checks are reviewed.
- Metadata and JSON-LD are accurate; preview is not represented as commercially approved.
- Actual deployment status is verified, not inferred from a committed workflow.
- Owner-specific factual, rights, privacy and photo approvals remain explicit launch gates.
