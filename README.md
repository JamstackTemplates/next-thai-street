# Soi Sabai: Thai street food

A made-to-order street-food counter website for **Soi Sabai** (ซอยสบาย), a fictitious Thai kitchen at
Queen Victoria Market, Melbourne. It is the `next-thai-street` sample in the Jamstacks gallery, built
from the `JamstackTemplates/template-next` starter. Every business detail is sample content: replace
it before publishing. The site is a self-contained Next.js static export; it does not depend on the
starter checkout or the portal repository.

Local development requires Node 24 or later and npm. Run `npm ci`, then `npm run dev` to preview.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero with the lunch counter, the three kitchen stations, the chilli-o-meter scale, weekday lunch dockets, address and hours, and the group/catering/events enquiry band. Restaurant JSON-LD. |
| `/menu/` | Full menu as laminated station cards, with the chilli-o-meter heat filter, a vegetarian & vegan toggle, the lunch dockets (`#lunch`) and the allergen key |
| `/visit/` | Address, open-now badge, hours, map, getting here and how ordering works |
| `/contact/` | Hosted enquiry form when configured; the email address is always visible |
| `/404.html` | "Wrong soi · ทางตัน" dead-end lane |

## Make it yours

| File | Owns |
| --- | --- |
| `content/menu.ts` | Menu sections, dishes, prices, chilli levels, diets, allergens, sold-out and new flags |
| `content/lunch.ts` | The four weekday lunch tickets and the lunch window |
| `content/business.ts` | Name, Thai name, email, phone, address, getting-here lines, kitchen hours, allergen and price notes, Contact copy |
| `app/page.tsx` | Home page copy in the order visitors see it (headings, station posters, buttons) |
| `app/menu/page.tsx`, `app/visit/page.tsx`, `app/contact/page.tsx`, `app/not-found.tsx` | Each page's copy and section order |
| `site.config.json` | Public name, description, domain, time zone and Jamstacks integration only |
| `app/tailwind.input.css` | Colour tokens (light, automatic dark, explicit dark), bands, station colours, textures, motion, print |
| `components/art/` | The SVG artwork: hero counter scene, tiffin carrier, chilli-o-meter scale, station motifs, tableware, counter dividers, icons, 404 art |
| `components/home.tsx`, `menu-board.tsx`, `menu-bar.tsx`, `lunch-tickets.tsx`, `hours-board.tsx`, `visit.tsx` | Section layouts behind the page copy |
| `components/site-header.tsx`, `site-footer.tsx`, `page-head.tsx` | Shopfront signboard header, soi-sign footer and signboard page heads |
| `lib/structured-data.ts` | Restaurant schema derived from `content/business.ts` |
| `app/sitemap.ts` | Public routes; update when adding a page |

### Common edits

Each of these is a one-field change, checked by `npm test`, which names the dish or ticket to fix:

- **Sold out today:** in `content/menu.ts`, set the dish's `availability: 'sold-out'`. It stays on the
  menu, greyed with a "หมด · SOLD OUT" stamp. Set it back to `'available'` when it returns.
- **New price:** change `priceCents` (AUD cents including GST, a multiple of 50, e.g. `1950` for $19.50).
- **Hotter or milder:** change `chilli` (0 ไม่เผ็ด to 4 เผ็ดมากๆ) or `adjustable` (whether the kitchen can
  move it one level). The filter, mini gauges and Home update automatically.
- **New dish:** copy an item, give it a new unique `id` (lowercase, hyphens) and the right `sectionId`,
  and add `isNew: true` for the new badge.
- **This week's lunch special:** in `content/lunch.ts`, change that day's `dishId` (it must be an
  available dish), `title`, `includes` and `priceCents` (below the dish price plus a salted lime soda).
- **Hours:** edit `business.hours` in `content/business.ts`. Hours are same-day only; overnight
  intervals fail validation. The lunch window must stay inside each ticket day's hours.
- **Page copy:** edit the text between the component tags in the route file, for example
  `<Hero.Heading>Wok-hot Thai street food, as fiery as you like.</Hero.Heading>` in `app/page.tsx`.

Rename the business in `business.name` and `site.config.json`'s `name`. Do not add business content to
`site.config.json`: the Jamstacks provisioner replaces that file wholesale, possibly adding `provisioningId`.

## Design

"The made-to-order counter" (ร้านอาหารตามสั่ง): white kitchen wall tile, brushed stainless steel, shop-sign
red with yellow Thai lettering, herb green, enamel-rim blue and blue-and-white Bangkok soi street signs.
Dark mode is the counter after dark under the tube lights: blackened steel, warm lettering and a soft
tube-light glow on the artwork. The signature element is the **chilli-o-meter**, a red enamel market
scale (ตาชั่ง) used in Home's "Pick your heat" band, as the Menu filter and as the five-pod heat scale
on every dish.

Fonts are self-hosted from npm, both by Cadson Demak under the SIL Open Font License 1.1:

- **Kanit** (`@fontsource/kanit`): shopfront signage, headings and prices
- **Sarabun** (`@fontsource/sarabun`): body copy and Thai script

All artwork is inline SVG in `components/art/`; there is no photography. `public/og.png` is the
1200×630 social image composed from the same artwork.

## Browser behaviour

Static and no-JavaScript output stays neutral; the browser adds time and filter state:

- **Open-now badge:** computed in `Australia/Melbourne` (from `site.config.json`) and refreshed every
  minute. Without JavaScript it reads "Kitchen hours", and the hours table is always visible.
- **Today's row** on hours boards and **today's lunch ticket** (lifted and punched, "On now · until 15:00"
  during the lunch window) are marked in the browser only. Without JavaScript all tickets look the same
  with "Lunch tickets run Tuesday to Friday, 11:30–15:00".
- **Chilli-o-meter filter** on Menu: a radio group (any heat, 0–4) and a vegetarian & vegan toggle.
  Dishes above the chosen heat are hidden; adjustable dishes one level hotter stay with "Ask for it a
  level milder". The choice is kept in `?heat=` and `?veg=1`, and a live region announces the count.
  Without JavaScript the controls are not shown and every dish is listed.
- **Motion** (gauge needle swing, steam, flames, ticket swing, string-light twinkle) is disabled under
  `prefers-reduced-motion`. Printing the Menu gives a plain two-column list.

The `OpenBadge`, `TimeZoneNote` and `GoogleMap` helpers come from the starter. Map links need no key.

## Public configuration

```json
{
  "name": "Business name",
  "description": "Public description",
  "domain": "next-business-minimal.jamstacks.net",
  "timeZone": "America/New_York",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

The starter itself leaves domain/timeZone unset. Gallery templates use their folder name plus
`.jamstacks.net`; customers replace the demo domain with their own. Do not invent canonical URLs when
the deployed address is unknown.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config timeZone |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

Copy .env.example to .env.local for Next.js local work. All listed values are public. Never add tokens,
SMTP credentials or publishing keys. Newer dependencies should stay within reviewed majors; update
package.json and package-lock.json together, then run the full checks.

## Contact contract

The real `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap appear only
on Contact when configured. Without a site ID there is no embed host/request. Email remains visible
in either case. The hosted runtime owns name/email/message fields, validation, submission and results.
Never register the element locally, substitute a form or intercept submission. Contact navigation uses
full document loads via SiteLink because the runtime has no remount API. Copy must describe an enquiry,
not a confirmed booking/order/payment; no attachments or extra input fields.

For local Jamstacks development, configure an explicit local CDN URL and
`JAMSTACKS_ALLOW_LOCAL_CDN=1`; remote builds reject localhost. A locally loaded component does not prove
real message delivery. Test delivery separately against a configured site/backend.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Tests cover config/provisioner compatibility, embed state, menu and lunch-ticket validation, kitchen
hours and lunch status across Melbourne DST changes, the heat filter, WCAG contrast of the palette in
both themes, copy rules (no bookings, online orders or payment) and structured-data escaping. Typecheck uses Next's generated route types.
When changing the Contact integration, base paths or canonical URLs, check the exported HTML and
sitemap. Verify both configured and unconfigured Contact with the corresponding build settings.
Test light/dark at desktop and mobile widths, keyboard navigation, unknown routes, repeated Contact
navigation and any added browser interactions. Return to a normal build before capturing final assets.

## GitHub Pages deployment

`.github/workflows/pages.yml` uses npm ci, tests, typecheck and static export. It preserves Jamstacks'
`provisioning_id` dispatch input
and correlated run name. It builds pull requests without deploying, and publishes main/manual runs.
Configure Pages to use GitHub Actions and set its custom domain to the same value as site.config.json.
DNS is managed separately; for template demos the CNAME targets `jamstacktemplates.github.io`.
Do not add public/CNAME. Enable HTTPS after the certificate is ready. This starter performs no remote setup.

## Content Security Policy

A host-level CSP must permit same-origin Next.js scripts/assets, the inline theme bootstrap (using an
appropriate hash/nonce policy), the configured Jamstacks CDN scripts/assets and the published form's
API connection origin. Derive actual directives from the deployed component. Optional maps require
`frame-src https://www.google.com`. Apply CSP at the host; static export cannot set response headers
through a running Next.js server. Do not put private credentials into CSP or relax policies blindly.

## Publishing assets and structure

`app/`, `components/`, `content/`, `lib/` and `types/` are the website. `scripts/` includes static
preview and verification, `tests/` covers customer behavior, and `.github/` supplies deployment.
`jamstacks/` is removable gallery-only source metadata. Ordinary builds, tests and Pages work after
it is deleted. To publish a gallery template, create [its manifest](jamstacks/README.md) and capture
genuine screenshots before running its separate publishing test:

```sh
node /home/mythz/src/mythz/jamstacks.net/tools/template-screenshots/capture.mjs \
  --template /path/to/next-type-style --modes light,dark --executable /usr/bin/chromium
node --test jamstacks/config.test.mjs
```

Before publication: replace neutral content and shell; validate industry data/schema and all links;
choose licensed fonts; verify both themes/base-path/embed states; create a neutral 1200×630 public/og.png
from the finished design and wire metadata; replace the icon; generate gallery captures and validate;
confirm domain/Pages settings and HTTPS; remove `plan/` and `.claude/skills/` after review. The website must not import or
link the planning folder. No stock screenshot or OG image is supplied as if it were final.
