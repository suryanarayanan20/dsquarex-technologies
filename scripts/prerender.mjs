/**
 * Post-build step (runs after `vite build`):
 *  1. writes dist/work/index.html and dist/work/<slug>/index.html, each with its
 *     own <title>, description, canonical URL, Open Graph/Twitter tags and a
 *     JSON-LD WebPage node for that URL;
 *  2. writes dist/404.html (noindex) — Vercel serves it with a real 404 status
 *     for any URL that isn't a known page;
 *  3. writes dist/sitemap.xml from the published projects.
 *
 * The React app still renders every page; this makes sure crawlers and link
 * previews (WhatsApp, LinkedIn, X…) that don't run JavaScript see the right
 * metadata. Brand, domain and project data come from src/data.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_URL, site, seo, structuredData } from "../src/data/site.js";
import { publishedProjects, projectMeta } from "../src/data/projects.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const today = new Date().toISOString().slice(0, 10);
const template = readFileSync(join(dist, "index.html"), "utf8");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function render({ path, title, description, image, noindex = false }) {
  const url = `${SITE_URL}${path}`;
  const img = `${SITE_URL}${image || seo.ogImage}`;
  let html = template;
  const rep = (re, val) => {
    if (!re.test(html)) throw new Error(`prerender: pattern not found ${re}`);
    html = html.replace(re, val);
  };
  rep(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  rep(/(<meta name="description" content=")[^"]*(")/, `$1${esc(description)}$2`);
  rep(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  rep(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  rep(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
  rep(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`);
  rep(/(<meta property="og:image" content=")[^"]*(")/, `$1${img}$2`);
  rep(/(<meta property="og:image:secure_url" content=")[^"]*(")/, `$1${img}$2`);
  rep(/(<meta name="twitter:url" content=")[^"]*(")/, `$1${url}$2`);
  rep(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`);
  rep(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(description)}$2`);
  rep(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${img}$2`);
  rep(
    /(<script type="application\/ld\+json" id="structured-data">)[\s\S]*?(<\/script>)/,
    (_, a, b) => `${a}${JSON.stringify(structuredData({ path, title, description }), null, 2).replace(/</g, "\\u003c")}${b}`
  );
  if (noindex) {
    rep(/(<meta name="robots" content=")[^"]*(")/, `$1noindex, follow$2`);
    // a 404 page has no canonical URL of its own
    html = html.replace(/\s*<link rel="canonical"[^>]*>/, "");
  }
  return html;
}

function write(path, html) {
  const dir = join(dist, path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
}

const routes = [
  { path: "/work", title: seo.workTitle, description: seo.workDescription, image: "/work/v-thittam-design-studio/og.jpg" },
  ...publishedProjects.map(projectMeta),
];
for (const r of routes) write(r.path, render(r));

writeFileSync(
  join(dist, "404.html"),
  render({
    path: "/404",
    title: `Page not found | ${site.name}`,
    description: "The page you were looking for doesn’t exist.",
    noindex: true,
  })
);

const urls = ["/", ...routes.map((r) => r.path)];
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url>\n    <loc>${SITE_URL}${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join("\n")}\n</urlset>\n`
);

console.log(`prerender: wrote ${routes.length} page(s), 404.html and sitemap.xml (${urls.length} URLs)`);
if (!process.env.VITE_WEB3FORMS_KEY) {
  console.warn(
    "prerender: note — VITE_WEB3FORMS_KEY was not in this shell's environment. If it isn't in a .env file either, " +
      "the enquiry form in this build runs in 'continue on WhatsApp' mode."
  );
}
