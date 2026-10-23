/**
 * SINGLE SOURCE OF TRUTH for brand name, domain and contact details.
 *
 * Everything below is read by:
 *  - the React app (navbar, hero, about, contact, footer, enquiry form,
 *    case-study CTAs, page titles)
 *  - vite.config.js → fills index.html (<title>, meta, Open Graph, JSON-LD)
 *    and generates robots.txt + site.webmanifest at build time
 *  - scripts/prerender.mjs → per-page metadata, JSON-LD and sitemap.xml
 *
 * Change a value here once and every page, link and metadata tag follows.
 * Keep this file free of browser-only APIs: it is also imported by Node.
 */
export const SITE_URL = "https://www.desquarextechnologies.in";

export const site = {
  name: "DSquareX Technologies",
  shortName: "DSquareX",
  tagline: "Websites, web apps and AI tools for growing businesses.",
  email: "sn3139132@gmail.com",
  phoneDisplay: "+91 62827 87553",
  phoneE164: "+916282787553",
  whatsappNumber: "916282787553",
  github: "https://github.com/suryanarayanan20",
  themeColor: "#0b0d12",
};

/** Opening line of the WhatsApp/email messages the buttons and enquiry form pre-fill. */
site.greeting = `Hi ${site.shortName}, I'd like to discuss a project.`;

/** Default (homepage) metadata. Other pages build their own titles from site.name. */
export const seo = {
  homeTitle: `${site.name} — Websites, Web Apps & AI Integration`,
  homeDescription: `${site.name} designs and builds business websites, custom web applications and AI-powered tools. See our client work for construction, architecture and interior firms in Tamil Nadu.`,
  orgDescription: `${site.name} designs and builds business websites, custom web applications and AI-powered tools.`,
  ogImage: "/og-image.png",
  ogImageAlt: `${site.name} — Websites, AI Integration and Automation`,
  keywords:
    "web development, website design, AI integration, business automation, custom web apps, Java backend",
  workTitle: `Work — Websites, Web Apps & AI Projects | ${site.name}`,
  workDescription: `Case studies from ${site.name}: business websites for construction, architecture and interior firms in Tamil Nadu, plus in-house AI and web application builds.`,
};

export const telHref = `tel:${site.phoneE164}`;

export function whatsappHref(message) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailtoHref(subject, body) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const q = params.toString().replace(/\+/g, "%20");
  return `mailto:${site.email}${q ? `?${q}` : ""}`;
}

/** Services offered — also used as options in the enquiry form. */
export const serviceOptions = [
  "Business website",
  "Custom web application",
  "AI integration",
  "Business automation",
  "Website redesign or fixes",
  "Not sure yet",
];

/** schema.org graph for the homepage. prerender.mjs adapts the WebPage node per route. */
export function structuredData({ path = "/", title = seo.homeTitle, description = seo.orgDescription } = {}) {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const org = `${SITE_URL}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: site.name,
        alternateName: site.shortName,
        url: `${SITE_URL}/`,
        description: seo.orgDescription,
        slogan: "Building digital solutions that help businesses grow.",
        email: site.email,
        telephone: site.phoneE164,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          url: `${SITE_URL}/logo.png`,
          contentUrl: `${SITE_URL}/logo.png`,
          width: 500,
          height: 500,
          caption: site.name,
        },
        image: { "@id": `${SITE_URL}/#logo` },
        address: { "@type": "PostalAddress", addressCountry: "IN" },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: site.phoneE164,
            email: site.email,
            availableLanguage: ["en", "ml", "ta"],
            areaServed: "IN",
          },
        ],
        sameAs: [site.github],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: site.name,
        inLanguage: "en-IN",
        publisher: { "@id": org },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: title,
        description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": org },
        inLanguage: "en-IN",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: site.name,
        url: `${SITE_URL}/`,
        image: `${SITE_URL}${seo.ogImage}`,
        telephone: site.phoneE164,
        email: site.email,
        parentOrganization: { "@id": org },
        areaServed: { "@type": "Country", name: "India" },
        address: { "@type": "PostalAddress", addressCountry: "IN" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: [
            "Website Design & Development",
            "Custom Web Applications",
            "AI Integration",
            "Business Automation",
          ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        },
      },
    ],
  };
}
