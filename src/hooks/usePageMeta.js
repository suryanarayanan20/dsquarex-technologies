import { useEffect } from "react";
import { SITE_URL, seo } from "../data/site";

const DEFAULT_IMAGE = `${SITE_URL}${seo.ogImage}`;

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Keeps <title>, description, canonical and social tags in step with the
 * current route during client-side navigation. The same values are written
 * into static HTML at build time by scripts/prerender.mjs for crawlers.
 */
export default function usePageMeta({ title, description, path = "/", image, noindex = false }) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const img = image ? `${SITE_URL}${image}` : DEFAULT_IMAGE;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
    if (noindex) document.head.querySelector('link[rel="canonical"]')?.remove();
    else setCanonical(url);
    setMeta("property", "og:url", url);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", img);
    setMeta("property", "og:image:secure_url", img);
    setMeta("name", "twitter:url", url);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", img);
  }, [title, description, path, image, noindex]);
}
