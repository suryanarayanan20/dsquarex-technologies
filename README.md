# DSquareX Technologies — Website

React 18 + Vite 5 + Tailwind CSS 4 + Framer Motion, with React Router for the
portfolio pages. Deployed on Vercel.

## Run it

```bash
npm install
npm run dev        # local dev server
npm run build      # vite build + scripts/prerender.mjs → dist/
npm run preview    # serve the production build
npm run lint       # ESLint (React, hooks, jsx-a11y) — must pass with 0 warnings
```

## Routes

| Route | What it is |
|---|---|
| `/` | Home — hero, selected work, services, process, about, contact/enquiry form |
| `/work` | All projects with category filters (`/work?filter=AI%20integration` is shareable) |
| `/work/:slug` | Case study for one project |
| anything else | 404 page — served with a real HTTP 404 status on Vercel (`dist/404.html`, `noindex`) |

`npm run build` also runs `scripts/prerender.mjs`. It writes a static
`dist/work/<slug>/index.html` for every case study, each with its own title,
description, canonical URL and Open Graph image, so link previews and crawlers
that don't run JavaScript get the right metadata. It also generates
`dist/sitemap.xml` from the project list, and `dist/404.html`. Don't edit a sitemap by hand.

`vercel.json` rewrites `/work` and `/work/:slug` to those prerendered files;
every other unknown URL gets the 404 page. URLs with a trailing slash redirect
to the version without one.

## Adding or editing a project

Everything comes from **`src/data/projects.js`**: the /work grid, the homepage
"Selected work" cards, the case-study pages, the filters, related projects and
the sitemap.

1. Save screenshots to `public/work/<slug>/` as WebP:
   - desktop captures at 1440×900: `<name>-1440.webp` + `<name>-720.webp`
   - mobile captures at 780×1688: `<name>-780.webp` + `<name>-390.webp`
   - `og.jpg` at 1200×630 for link previews
2. Add an entry to `projects` (copy an existing one). Leave a field empty or
   `null` when you can't verify it. The page hides empty sections.
3. Set `featured: true` to show it on the homepage, or `published: false` to
   hide it everywhere.

Filters are built from each project's `categories`, so a filter can never be
empty.

## Brand, domain and contact details

Everything lives in **`src/data/site.js`**: the brand name, domain
(`SITE_URL`), email, phone, WhatsApp number, GitHub link, homepage metadata
and the structured data (JSON-LD). It feeds:

- the React app: navbar, hero, about, contact, footer, enquiry form, and
  page titles
- `index.html`: the `%…%` placeholders are filled at build time by the
  `siteHtml` plugin in `vite.config.js`
- `robots.txt` and `site.webmanifest`: generated at build time by the same
  plugin, so they are no longer in `public/`
- `scripts/prerender.mjs`: per-page metadata, JSON-LD and the sitemap

The primary domain is **https://www.desquarextechnologies.in** (www). The
apex-to-www redirect is configured in Vercel → Domains, not in this repo.

## Enquiry form

The form is in `src/components/EnquiryForm.jsx` and `src/lib/enquiry.js`.

- **With `VITE_WEB3FORMS_KEY` set:** submissions are emailed through
  [Web3Forms](https://web3forms.com). Success is shown **only** after Web3Forms
  confirms delivery. On any failure the visitor sees an error, keeps their
  typed details, and is offered WhatsApp and email fallbacks pre-filled with
  their message.
- **Without the key:** the button reads "Continue on WhatsApp". It opens
  WhatsApp with the message pre-filled and tells the visitor it only reaches us
  once they press send. It never claims the enquiry was sent.

To turn on email delivery:

1. Create a free access key at https://web3forms.com. Use the inbox that should
   receive enquiries.
2. In Vercel, go to Project → Settings → Environment Variables and add
   `VITE_WEB3FORMS_KEY` (Production and Preview).
3. Redeploy. Vite inlines the key at build time, so a local `.env` has no
   effect on the live site.

A successful submission also fires a Meta Pixel `Lead` event, using the
existing pixel in `index.html`.

## Content still needed (see the delivery report)

- Coffee Shop POS: screenshots. The case study currently shows "Screenshots
  coming soon".
- AI Resume Analyzer: a screenshot of a real analysis result. The current
  cover is the empty upload screen.
- JohnslyPREM: live URL once launched, plus permission to show more sections.
  The site currently uses placeholder project imagery, so only hero and
  services screenshots are shown.
- Client approval to name V Thittam, SRAJ and JohnslyPREM publicly, plus any
  testimonial quotes they're happy to give.
- Confirm the "brief" wording on each case study. It was written from the
  delivered scope and DSquareX's own progress and QA reports.
