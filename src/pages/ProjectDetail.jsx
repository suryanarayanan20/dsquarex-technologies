import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import usePageMeta from "../hooks/usePageMeta";
import { getProject, getRelated, projectMeta } from "../data/projects";
import ProjectCard, { BrowserFrame, StatusBadge } from "../components/ProjectCard";
import Lightbox from "../components/Lightbox";
import NotFound from "./NotFound";
import { site } from "../data/site";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

function SectionLabel({ children }) {
  return <p className="eyebrow slash">{children}</p>;
}

function Bullets({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-[var(--ink)]/85">
          <span className="mono text-[var(--orange)] shrink-0" aria-hidden="true">/</span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);
  const [shot, setShot] = useState(null);

  usePageMeta(
    project
      ? projectMeta(project)
      : { title: `Project not found | ${site.name}`, description: "This project could not be found.", path: `/work/${slug}`, noindex: true }
  );

  if (!project) return <NotFound />;

  const related = getRelated(project, 3);
  const images = [project.cover, ...project.gallery].filter(Boolean);
  const desktopShots = project.gallery.filter((g) => g.device === "desktop");
  const mobileShots = project.gallery.filter((g) => g.device === "mobile");
  const openShot = (img) => setShot(images.indexOf(img));

  const facts = [
    project.client && ["Client", project.client],
    ["Industry", project.industry],
    project.location && ["Location", project.location],
    ["Year", project.year],
    ["Type", project.type === "client" ? "Client project" : "In-house build"],
  ].filter(Boolean);

  return (
    <article className="bg-[var(--bg)] text-[var(--ink)]">
      {/* ---------- Hero ---------- */}
      <header className="relative pt-28 md:pt-36 pb-16 overflow-hidden">
        <div className="hero-grid" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mono text-xs text-[var(--muted)]">
            <Link to="/" className="hover:text-[var(--ink)]">Home</Link>
            <span className="mx-2 text-[var(--orange)]">/</span>
            <Link to="/work" className="hover:text-[var(--ink)]">Work</Link>
            <span className="mx-2 text-[var(--orange)]">/</span>
            <span aria-current="page">{project.title}</span>
          </nav>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 mt-8 items-start">
            <div className="lg:col-span-5">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={project.status} />
                {project.categories.map((c) => (
                  <span key={c} className="mono text-[11px] tracking-wide text-[var(--muted)] border border-white/[0.08] rounded-full px-2.5 py-1">
                    {c}
                  </span>
                ))}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold mt-6 leading-[1.06]">{project.title}</h1>
              <p className="text-lg text-[var(--muted)] mt-6 leading-relaxed">{project.summary}</p>
              {project.status === "In development" && (
                <p className="mt-6 rounded-xl border border-[var(--orange)]/30 bg-[var(--orange)]/[0.06] px-4 py-3 text-sm text-[var(--ink)]/85 leading-relaxed">
                  <strong className="text-[var(--orange-soft)] font-medium">In development.</strong> This site hasn’t launched
                  yet. Screenshots show the hero and services sections of the current build.
                </p>
              )}

              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 mt-10 border-t border-white/[0.08] pt-8">
                {facts.map(([k, v]) => (
                  <div key={k} className={k === "Client" || k === "Location" ? "col-span-2 sm:col-span-1" : ""}>
                    <dt className="mono text-[11px] tracking-[0.14em] uppercase text-[var(--muted)]">{k}</dt>
                    <dd className="mt-1.5 text-[15px]">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-col sm:flex-row gap-3 mt-10">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    {project.status === "Live demo" ? "Open live demo" : "Visit live site"}
                    <span aria-hidden="true">↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    Source on GitHub <span aria-hidden="true">↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                {!project.liveUrl && (
                  <p className="mono text-xs text-[var(--muted)] self-center">Live link available after launch</p>
                )}
              </div>
            </div>

            <div className="lg:col-span-7">
              {project.cover ? (
                <button type="button" onClick={() => openShot(project.cover)} className="block w-full text-left zoomable" aria-label={`Enlarge screenshot: ${project.cover.alt}`}>
                  <BrowserFrame image={project.cover} url={project.liveUrl} priority sizes="(min-width: 1024px) 58vw, 100vw" />
                </button>
              ) : (
                <BrowserFrame image={null} url={project.liveUrl} />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ---------- Outcomes ---------- */}
      {project.outcomes.length > 0 && (
        <section aria-label="Results" className="border-y border-white/[0.08] bg-[var(--bg-raised)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {project.outcomes.map((o) => (
              <div key={o.label}>
                <p className="text-3xl md:text-4xl font-semibold text-[var(--orange-soft)]">{o.value}</p>
                <p className="text-sm text-[var(--muted)] mt-2 leading-snug">{o.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------- Brief & approach ---------- */}
      {(project.challenge || project.solution) && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-24 grid md:grid-cols-2 gap-12 md:gap-16">
          {project.challenge && (
            <motion.div {...fade}>
              <SectionLabel>The brief</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-semibold mt-4">What needed solving</h2>
              <p className="text-[var(--ink)]/80 text-lg leading-relaxed mt-5">{project.challenge}</p>
            </motion.div>
          )}
          {project.solution && (
            <motion.div {...fade}>
              <SectionLabel>Our approach</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-semibold mt-4">What we built</h2>
              <p className="text-[var(--ink)]/80 text-lg leading-relaxed mt-5">{project.solution}</p>
            </motion.div>
          )}
        </section>
      )}

      {/* ---------- Screenshots ---------- */}
      {project.gallery.length > 0 && (
        <section aria-labelledby="shots-heading" className="bg-[var(--bg-raised)] py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionLabel>Screenshots</SectionLabel>
            <h2 id="shots-heading" className="text-2xl md:text-3xl font-semibold mt-4">
              Inside the {project.type === "client" ? "website" : "build"}
            </h2>
            {project.status === "In development" && (
              <p className="text-sm text-[var(--muted)] mt-3">Captured from the current development build.</p>
            )}

            {desktopShots.length > 0 && (
              <div className="grid md:grid-cols-2 gap-5 md:gap-6 mt-10">
                {desktopShots.map((img) => (
                  <figure key={img.src}>
                    <button type="button" onClick={() => openShot(img)} className="block w-full zoomable" aria-label={`Enlarge screenshot: ${img.alt}`}>
                      <BrowserFrame image={img} url={project.liveUrl} sizes="(min-width: 768px) 45vw, 100vw" />
                    </button>
                    <figcaption className="text-sm text-[var(--muted)] mt-3">{img.alt}</figcaption>
                  </figure>
                ))}
              </div>
            )}

            {mobileShots.length > 0 && (
              <div className="mt-14">
                <p className="mono text-xs tracking-[0.14em] uppercase text-[var(--muted)]">On mobile</p>
                <div className="flex gap-5 mt-5 overflow-x-auto pb-2 snap-x">
                  {mobileShots.map((img) => (
                    <figure key={img.src} className="snap-start shrink-0 w-[200px] sm:w-[230px]">
                      <button type="button" onClick={() => openShot(img)} className="block w-full zoomable phone" aria-label={`Enlarge screenshot: ${img.alt}`}>
                        <img src={img.src} srcSet={img.srcSet} sizes="230px" width={img.width} height={img.height} alt={img.alt} loading="lazy" decoding="async" className="block w-full h-auto" />
                      </button>
                      <figcaption className="text-xs text-[var(--muted)] mt-3">{img.alt}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ---------- Features, decisions, contribution, stack ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-24 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-7 space-y-16">
          {project.features.length > 0 && (
            <motion.div {...fade}>
              <SectionLabel>Key features</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-semibold mt-4 mb-8">What’s in it</h2>
              <Bullets items={project.features} />
            </motion.div>
          )}
          {project.decisions.length > 0 && (
            <motion.div {...fade}>
              <SectionLabel>Technical decisions</SectionLabel>
              <h2 className="text-2xl md:text-3xl font-semibold mt-4 mb-8">Why it’s built this way</h2>
              <Bullets items={project.decisions} />
            </motion.div>
          )}
        </div>

        <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-28 self-start">
          <div className="rounded-2xl border border-white/[0.08] bg-[var(--bg-raised)] p-7">
            <h2 className="mono text-xs tracking-[0.14em] uppercase text-[var(--muted)]">Our contribution</h2>
            <ul className="mt-5 space-y-2.5">
              {project.contribution.map((c) => (
                <li key={c} className="text-[15px] flex gap-3">
                  <span className="text-[var(--blue-soft)]" aria-hidden="true">✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-[var(--bg-raised)] p-7">
            <h2 className="mono text-xs tracking-[0.14em] uppercase text-[var(--muted)]">Technology</h2>
            <ul className="flex flex-wrap gap-2 mt-5">
              {project.tech.map((t) => (
                <li key={t} className="mono text-xs border border-white/[0.1] rounded-md px-2.5 py-1.5">
                  {t}
                </li>
              ))}
            </ul>
            <h2 className="mono text-xs tracking-[0.14em] uppercase text-[var(--muted)] mt-8">Services</h2>
            <p className="text-[15px] mt-3 leading-relaxed text-[var(--ink)]/85">{project.services.join(" · ")}</p>
          </div>
        </aside>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-[var(--bg-raised)] p-8 sm:p-12 md:p-16">
          <div className="cta-cross" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold">Want something similar for your business?</h2>
            <p className="text-[var(--muted)] text-lg mt-4 leading-relaxed">
              Tell us about your business and what the site needs to do. We’ll come back with a clear scope and a
              quote before any work starts.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link to={`/?project=${project.slug}#contact`} className="btn-primary">
                Start a similar project
              </Link>
              <Link to="/work" className="btn-ghost">
                See more work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Related ---------- */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-24">
          <SectionLabel>Related work</SectionLabel>
          <h2 id="related-heading" className="text-2xl md:text-3xl font-semibold mt-4">More projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-10">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}

      <Lightbox images={images} index={shot} onClose={() => setShot(null)} onIndex={setShot} />
    </article>
  );
}

export default ProjectDetail;
