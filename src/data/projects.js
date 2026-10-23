/**
 * PORTFOLIO DATA — the single source for the /work grid, the homepage
 * "Selected work" section, every case-study page and the prerendered
 * metadata/sitemap (scripts/prerender.mjs imports this file).
 *
 * Rules for editing:
 *  - Only publish facts you can stand behind. Every statement below is taken
 *    from the project's own code, README, git history or DSquareX's client
 *    reports. Fields you can't verify yet stay empty — the page hides them.
 *  - `outcomes` = verifiable results only (live URL, delivered scope, audit
 *    numbers). No invented traffic or revenue figures.
 *  - Screenshots live in /public/work/<slug>/ as <name>-<width>.webp.
 *    Desktop captures are 1440×900, mobile captures are 780×1688.
 *  - Set `published: false` to hide a project everywhere without deleting it.
 */

import { site } from "./site.js";

const desktop = (slug, name, alt) => ({
  src: `/work/${slug}/${name}-1440.webp`,
  srcSet: `/work/${slug}/${name}-720.webp 720w, /work/${slug}/${name}-1440.webp 1440w`,
  width: 1440,
  height: 900,
  device: "desktop",
  alt,
});

const mobile = (slug, name, alt) => ({
  src: `/work/${slug}/${name}-780.webp`,
  srcSet: `/work/${slug}/${name}-390.webp 390w, /work/${slug}/${name}-780.webp 780w`,
  width: 780,
  height: 1688,
  device: "mobile",
  alt,
});

export const projects = [
  {
    slug: "v-thittam-design-studio",
    published: true,
    featured: true,
    type: "client",
    title: "V Thittam Design Studio",
    client: "V Thittam Design Studio",
    industry: "Architecture, interiors & construction",
    location: "Tiruchirappalli (Trichy), Tamil Nadu",
    year: "2026",
    status: "Live",
    categories: ["Business website", "Lead generation"],
    services: ["UI/UX design", "Web development", "Quote request flow", "Technical SEO", "QA & accessibility"],
    summary:
      "A marketing website and quote-request flow for an architecture, interior design and construction studio in Trichy.",
    challenge:
      "The studio needed one place to present three lines of work — architecture, interiors and turnkey construction — and a dependable way for prospective clients to request a consultation.",
    solution:
      "We designed a custom architectural design system and built a twelve-section home page, a dedicated quote page with a nine-field project brief, and a project gallery organised by residential, commercial and interior work. Enquiries are delivered straight to the studio inbox, and every page ships with its own metadata.",
    contribution: [
      "UI/UX design and custom design system",
      "Front-end development (React + Vite)",
      "Quote form with delivery to the studio inbox",
      "Content revisions requested during client review",
      "QA audit remediation, accessibility and performance work",
      "Deployment configuration, sitemap and robots generation",
    ],
    features: [
      "Twelve-section home page: hero, studio, services, projects, packages, process, FAQ and contact",
      "Dedicated quote page with a nine-field project brief, delivered to the studio inbox in real time",
      "Project gallery with lightbox, grouped into residential, commercial and interior work",
      "Nine-stage construction timeline, from client & site study to quality control",
      "Studio location pinned to its verified Google Business listing",
      "Services section managed from a Firestore collection",
      "Clean, bookmarkable routes with a 404 view and per-route prerendered metadata",
      "Reduced-motion support, focus-trapped lightbox and labelled sections for screen readers",
    ],
    decisions: [
      "A ~120-line History API router instead of a routing library, keeping the bundle small for a two-route site.",
      "A build-time guard that fails a production deploy if the form key is missing, so a misconfigured site can't silently drop enquiries.",
      "Responsive image variants (400–1800px WebP) for every gallery photo.",
    ],
    tech: ["React 18", "Vite 5", "Tailwind CSS", "Framer Motion", "Firebase Firestore", "Web3Forms", "Vercel"],
    outcomes: [
      { value: "Live", label: "on the studio's own domain" },
      { value: "46 / 50", label: "QA audit issues fixed in code (1 withdrawn, 3 owner actions)" },
      { value: "~420 KB", label: "removed from a retina phone's first load" },
    ],
    liveUrl: "https://www.thittamdesignstudio.in/",
    repoUrl: null,
    cover: desktop("v-thittam-design-studio", "hero", "V Thittam Design Studio website — hero section with night-time residence photograph and the headline 'Plot to dream home.'"),
    gallery: [
      desktop("v-thittam-design-studio", "about", "Studio section with mission, vision and values cards"),
      desktop("v-thittam-design-studio", "projects", "Project gallery grouped into residential, commercial and interior work"),
      desktop("v-thittam-design-studio", "interior", "Interior design section with material, furniture and lighting services"),
      desktop("v-thittam-design-studio", "construction", "Turnkey construction package with the staged construction timeline"),
      desktop("v-thittam-design-studio", "quote", "Dedicated quote request page"),
      mobile("v-thittam-design-studio", "mobile-hero", "Mobile view of the hero section"),
      mobile("v-thittam-design-studio", "mobile-projects", "Mobile view of the project gallery"),
    ],
  },
  {
    slug: "sraj-construction-interior",
    published: true,
    featured: true,
    type: "client",
    title: "SRAJ Construction & Interior",
    client: "SRAJ Construction & Interior",
    industry: "Construction & interior design",
    location: "Chennai, Trichy & Tirunelveli, Tamil Nadu",
    year: "2026",
    status: "Live demo",
    categories: ["Business website", "Lead generation"],
    services: ["UI/UX design", "Web development", "Pricing & package presentation", "WhatsApp lead capture", "Technical SEO"],
    summary:
      "A premium website for a Chennai-headquartered construction and interior firm, built around transparent, fixed-rate construction packages.",
    challenge:
      "SRAJ sells fixed-rate construction packages across four tiers, with detailed specifications per tier. That information lived in a spreadsheet; it needed to become something a homeowner could compare on a phone and act on immediately.",
    solution:
      "We turned the client's cost sheet into structured package data and built a tiered pricing section with a category-by-category specification comparison. Every call-to-action leads to a direct conversation: one-tap call, WhatsApp, an enquiry modal and a contact form that open a pre-filled WhatsApp message.",
    contribution: [
      "UI/UX design and brand-derived colour system",
      "Next.js development with TypeScript",
      "Package and interior rate data structured from the client's cost sheet",
      "Enquiry flows (modal, contact form, floating call & WhatsApp buttons)",
      "SEO setup — metadata, sitemap and robots",
      "Live demo deployment for client review",
    ],
    features: [
      "Four construction package tiers with per-sq.ft rates and a specification comparison by category",
      "Six services: civil contracting, residential, architecture & design, interiors, turnkey and renovation",
      "Project gallery for construction and interior work",
      "Service areas for Chennai, Trichy and Tirunelveli",
      "Enquiry modal and contact form that hand off to WhatsApp with the visitor's details pre-filled",
      "Floating one-tap call and WhatsApp buttons on every screen",
      "Embedded Google Map of the head office",
      "Six-stage construction process and FAQ",
    ],
    decisions: [
      "Package specifications kept as typed data files so the client's rates can be updated without touching layout code.",
      "WhatsApp chosen as the enquiry channel because no CRM or mail backend was specified — every form produces a ready-to-send message.",
      "Smooth scrolling (Lenis) and GSAP counters kept to the hero and anchors so motion never blocks reading.",
    ],
    tech: ["Next.js (App Router)", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "React Hook Form", "Vercel"],
    outcomes: [
      { value: "12 / 12", label: "planned features delivered for client review" },
      { value: "4", label: "construction package tiers, fully specified" },
    ],
    liveUrl: "https://sirajcontructionwebsite.vercel.app/",
    repoUrl: null,
    cover: desktop("sraj-construction-interior", "hero", "SRAJ Construction & Interior website — navy hero with the headline 'We build homes that stand for Generations.'"),
    gallery: [
      desktop("sraj-construction-interior", "about", "About section introducing the Chennai-headquartered construction partner"),
      desktop("sraj-construction-interior", "services", "Six construction and design service cards"),
      desktop("sraj-construction-interior", "packages", "Construction package tiers with the specification comparison table"),
      desktop("sraj-construction-interior", "locations", "Service areas for Chennai, Trichy and Tirunelveli"),
      desktop("sraj-construction-interior", "contact", "Contact section with enquiry form"),
      mobile("sraj-construction-interior", "mobile-hero", "Mobile view of the hero section"),
    ],
  },
  {
    slug: "johnslyprem-construction",
    published: true,
    featured: true,
    type: "client",
    title: "JohnslyPREM Construction",
    client: "JohnslyPREM Construction Pvt. Ltd.",
    industry: "Construction, architecture & project management",
    location: "Nagercoil, Tamil Nadu",
    year: "2026",
    status: "In development",
    categories: ["Business website"],
    services: ["UI/UX design", "Web development", "Motion & interaction design"],
    summary:
      "An editorial, motion-led website for a construction group with roots going back to 1996, spanning construction, architecture and project management.",
    challenge:
      "The group's history runs from 1996 across several entities and sectors. The site needed to tell that story clearly and still make it easy to request a consultation from a phone.",
    solution:
      "We built an editorial layout with a pinned, scroll-driven stage narrative on desktop (and a lighter stacked version on mobile), a one-time 3D intro, a services index, service areas and a consultation form that composes a WhatsApp message. All contact details come from one config file.",
    contribution: [
      "Art direction and UI design",
      "Front-end development (React + TypeScript)",
      "Scroll and 3D motion design",
      "Consultation form and contact configuration",
    ],
    features: [
      "Pinned, scroll-scrubbed 'concept to completion' narrative on desktop, with a non-pinned mobile and reduced-motion fallback",
      "One-time 3D intro scene, lazy-loaded so it never delays the first paint",
      "Eight-part services index and service-area cards",
      "Consultation form that composes a WhatsApp enquiry",
      "Office location map using free CARTO tiles — no API key required",
      "Project detail routes ready for the client's real project archive",
    ],
    decisions: [
      "GSAP only drives the pin; typography motion stays in Framer Motion, so the ScrollTrigger plugin loads in a lazy chunk rather than the main bundle.",
      "Fonts self-hosted, with no Google Fonts request at runtime.",
      "Accessibility linting (jsx-a11y rules via oxlint) in the toolchain.",
    ],
    tech: ["React 19", "TypeScript", "Vite", "Tailwind CSS 4", "Framer Motion", "GSAP", "Three.js", "React Router", "Leaflet"],
    outcomes: [],
    liveUrl: null,
    repoUrl: null,
    cover: desktop("johnslyprem-construction", "hero", "JohnslyPREM Construction website — dark green hero with the company name and 'Building with Purpose. Creating for Generations.'"),
    gallery: [
      desktop("johnslyprem-construction", "services", "Services index"),
      mobile("johnslyprem-construction", "mobile-hero", "Mobile view of the hero section"),
      mobile("johnslyprem-construction", "mobile-services", "Mobile view of the services index"),
    ],
  },
  {
    slug: "ai-resume-analyzer",
    published: true,
    featured: false,
    type: "inhouse",
    title: "AI Resume Analyzer",
    client: null,
    industry: "Careers & recruiting",
    location: null,
    year: "2026",
    status: "Live demo",
    categories: ["AI integration", "Web application"],
    services: ["AI integration", "Full-stack development"],
    summary:
      "An in-house tool that reads a resume, compares it with a target job role and returns a score, ATS-style checks, missing skills and practical suggestions.",
    challenge:
      "Give job seekers specific, structured feedback on how well a resume fits a particular role — not generic advice.",
    solution:
      "A Node.js/Express backend extracts text from PDF, DOCX, plain-text or image resumes (images are read with OCR), sends it to Meta's LLaMA 3 8B Instruct through the Hugging Face Inference API with a strict JSON-only prompt, and renders the result — with a downloadable PDF report.",
    contribution: ["Product idea and prompt design", "Backend and AI integration", "Front-end", "Deployment"],
    features: [
      "Resume score based on skills, projects, experience and education",
      "Job-role match percentage and simulated ATS score",
      "Missing-skills detection and practical improvement suggestions",
      "Accepts PDF, DOCX and plain-text resumes; image uploads are read with OCR",
      "Downloadable PDF report",
    ],
    decisions: [
      "The model is forced to return pure JSON against a fixed schema, so the UI never has to parse free text.",
      "Documented limitations: the ATS score is simulated, and results depend on an external AI API.",
    ],
    tech: ["Node.js", "Express", "Hugging Face Inference API", "LLaMA 3 8B Instruct", "pdf-parse", "Mammoth", "Tesseract.js", "PDFKit", "Render"],
    outcomes: [],
    liveUrl: "https://resume-analyzer-2edj.onrender.com",
    repoUrl: "https://github.com/suryanarayanan20/resume-analyzer",
    cover: desktop("ai-resume-analyzer", "hero", "AI Resume Analyzer — job role input, resume upload and Analyze button"),
    gallery: [],
  },
  {
    slug: "coffee-shop-pos",
    published: true,
    featured: false,
    type: "inhouse",
    title: "Coffee Shop POS System",
    client: null,
    industry: "Food & beverage retail",
    location: null,
    year: "2026",
    status: "Live demo",
    categories: ["Web application"],
    services: ["Full-stack development", "Backend & database design"],
    summary:
      "An in-house point-of-sale system for a coffee shop: billing with tax, printable receipts, order history and an admin area for products, customers and sales figures.",
    challenge:
      "Model a café's day-to-day workflow — taking orders, billing, and managing products and customers — in one connected system.",
    solution:
      "The main version pairs a React front end with a FastAPI and MongoDB API that handles login, products, orders, customers and dashboard statistics. The same repository also contains a second implementation of the POS backend in Java — Spring Boot and Spring Data JPA over MySQL — with a plain JavaScript front end.",
    contribution: ["Database and API design", "Backend development (Python and Java versions)", "Front-end development"],
    features: [
      "POS screen with cart, 12% tax calculation and printable receipt",
      "Customer phone captured with each order",
      "Order history",
      "Admin area for managing products and customers",
      "Dashboard with today's revenue, total revenue, orders, products and customers",
      "Login and registration, with the admin area shown only to admin users",
    ],
    decisions: [
      "Role-based routing: the admin section is only mounted for users with the admin role.",
      "Passwords hashed with bcrypt and sessions issued as JWTs in the FastAPI version.",
      "Layered Spring architecture in the Java version — controllers, services, repositories and JPA entities.",
    ],
    tech: ["React", "Tailwind CSS", "FastAPI", "MongoDB", "JWT", "Java", "Spring Boot", "Spring Data JPA", "MySQL"],
    outcomes: [],
    liveUrl: "https://suryacoffeeshop.vercel.app/",
    repoUrl: "https://github.com/suryanarayanan20/Coffee-pos-System",
    cover: null, // screenshots still needed — see README "Content still needed"
    gallery: [],
  },
  {
    slug: "surya-portfolio",
    published: true,
    featured: false,
    type: "inhouse",
    title: "Founder Portfolio Website",
    client: null,
    industry: "Personal brand",
    location: null,
    year: "2026",
    status: "Live",
    categories: ["Business website"],
    services: ["Web design", "Front-end development"],
    summary:
      `A responsive portfolio for ${site.shortName}'s founder, presenting skills, services, experience, projects and a downloadable resume.`,
    challenge: null,
    solution: null,
    contribution: ["Design", "Front-end development", "Deployment"],
    features: [
      "Hero, about, skills, services, experience and projects sections",
      "Downloadable resume",
      "Contact form and social links",
    ],
    decisions: [],
    tech: ["React 19", "Vite", "Tailwind CSS", "Vercel"],
    outcomes: [],
    liveUrl: "https://suryanarayanan-portfolio.vercel.app/",
    repoUrl: "https://github.com/suryanarayanan20/Protfolio-Surya-",
    cover: desktop("surya-portfolio", "hero", "Founder portfolio website — hero section"),
    gallery: [],
  },
];

export const publishedProjects = projects.filter((p) => p.published);

export const featuredProjects = publishedProjects.filter((p) => p.featured);

export function getProject(slug) {
  return publishedProjects.find((p) => p.slug === slug) || null;
}

/** Filter chips are derived from the data, so a filter can never be empty. */
export const projectFilters = [
  "All",
  "Client work",
  ...Array.from(new Set(publishedProjects.flatMap((p) => p.categories))),
];

export function matchesFilter(project, filter) {
  if (filter === "All") return true;
  if (filter === "Client work") return project.type === "client";
  return project.categories.includes(filter);
}

/** Related = shares a category, client work first, never itself. */
export function getRelated(project, limit = 2) {
  return publishedProjects
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({
      p,
      score:
        p.categories.filter((c) => project.categories.includes(c)).length * 2 +
        (p.type === project.type ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

/** Page metadata for a case study — shared by the React page and scripts/prerender.mjs. */
export function projectMeta(p) {
  const inDev = p.status === "In development";
  return {
    title: `${p.title} — Case Study${inDev ? " (In Development)" : ""} | ${site.name}`,
    description: inDev ? `In development: ${p.summary}` : p.summary,
    path: `/work/${p.slug}`,
    image: p.cover ? `/work/${p.slug}/og.jpg` : undefined,
  };
}
