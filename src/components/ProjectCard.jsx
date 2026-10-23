import { Link } from "react-router-dom";

const hostOf = (url) => {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return null;
  }
};

export function StatusBadge({ status }) {
  const tone =
    status === "Live"
      ? "text-emerald-300 border-emerald-400/30 bg-emerald-400/[0.07]"
      : status === "In development"
      ? "text-[var(--orange-soft)] border-[var(--orange)]/35 bg-[var(--orange)]/[0.07]"
      : "text-[var(--blue-soft)] border-[var(--blue)]/40 bg-[var(--blue)]/[0.08]";
  return (
    <span className={`mono inline-flex items-center gap-1.5 text-[11px] tracking-wide border rounded-full px-2.5 py-1 ${tone}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  );
}

/** Screenshot inside a minimal browser frame. Shows the real domain when there is one. */
export function BrowserFrame({ image, url, priority = false, sizes, className = "" }) {
  const host = url ? hostOf(url) : null;
  return (
    <div className={`frame ${className}`}>
      <div className="frame-bar" aria-hidden="true">
        <span className="frame-dot" />
        <span className="frame-dot" />
        <span className="frame-dot" />
        {host && <span className="mono frame-url">{host}</span>}
      </div>
      {image ? (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={sizes || "(min-width: 1024px) 40vw, 100vw"}
          width={image.width}
          height={image.height}
          alt={image.alt}
          loading={priority ? "eager" : "lazy"}
          fetchpriority={priority ? "high" : undefined}
          decoding="async"
          className="block w-full h-auto"
        />
      ) : (
        <div className="aspect-[16/10] grid place-items-center bg-[var(--bg-raised-2)] text-center px-6">
          <p className="mono text-xs text-[var(--muted)] tracking-wide">Screenshots coming soon</p>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, priority = false, headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  return (
    <article className="group relative flex flex-col h-full rounded-2xl border border-white/[0.08] bg-[var(--bg-raised-2)] overflow-hidden transition-colors duration-300 hover:border-[var(--orange)]/40 focus-within:border-[var(--orange)]/60">
      <div className="p-3 pb-0">
        <BrowserFrame
          image={project.cover}
          url={project.liveUrl}
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-500 group-hover:-translate-y-1"
        />
      </div>
      <div className="flex flex-col flex-1 p-6 md:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} />
          <span className="mono text-[11px] tracking-wide text-[var(--muted)]">
            {project.type === "client" ? "Client project" : "In-house build"}
          </span>
        </div>
        <H className="text-xl md:text-[22px] font-semibold mt-4 leading-snug">
          <Link to={`/work/${project.slug}`} className="card-link">
            {project.title}
          </Link>
        </H>
        <p className="text-sm text-[var(--muted)] mt-1">
          {project.industry}
          {project.location ? ` · ${project.location}` : ""}
        </p>
        <p className="text-[15px] text-[var(--ink)]/80 leading-relaxed mt-4 flex-1">{project.summary}</p>
        <ul className="flex flex-wrap gap-1.5 mt-5" aria-label="Technologies">
          {project.tech.slice(0, 4).map((t) => (
            <li key={t} className="mono text-[11px] text-[var(--muted)] border border-white/[0.08] rounded-md px-2 py-1">
              {t}
            </li>
          ))}
          {project.tech.length > 4 && (
            <li className="mono text-[11px] text-[var(--muted)] px-1 py-1">+{project.tech.length - 4}</li>
          )}
        </ul>
        <span className="mt-6 text-sm font-medium text-[var(--orange-soft)] inline-flex items-center gap-2" aria-hidden="true">
          View case study
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </article>
  );
}

export default ProjectCard;
