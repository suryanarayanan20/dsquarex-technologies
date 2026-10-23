import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import usePageMeta from "../hooks/usePageMeta";
import { publishedProjects, projectFilters, matchesFilter } from "../data/projects";
import { seo } from "../data/site";

function Work() {
  usePageMeta({
    title: seo.workTitle,
    description: seo.workDescription,
    path: "/work",
    image: "/work/v-thittam-design-studio/og.jpg",
  });

  const [params, setParams] = useSearchParams();
  const requested = params.get("filter");
  const active = projectFilters.includes(requested) ? requested : "All";

  const visible = useMemo(() => publishedProjects.filter((p) => matchesFilter(p, active)), [active]);

  const choose = (f) => {
    const next = new URLSearchParams(params);
    if (f === "All") next.delete("filter");
    else next.set("filter", f);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  return (
    <div className="bg-[var(--bg)] text-[var(--ink)] pt-28 md:pt-36 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="mono text-xs text-[var(--muted)]">
          <Link to="/" className="hover:text-[var(--ink)]">Home</Link>
          <span className="mx-2 text-[var(--orange)]">/</span>
          <span aria-current="page">Work</span>
        </nav>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mt-6 max-w-3xl leading-[1.08]">
          Work we’ve designed, built and shipped
        </h1>
        <p className="text-[var(--muted)] text-lg mt-6 max-w-2xl leading-relaxed">
          Client websites first, then the products we build in-house to sharpen our AI and backend skills. Every
          screenshot is from the real project.
        </p>

        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2 mt-10">
          {projectFilters.map((f) => {
            const count = publishedProjects.filter((p) => matchesFilter(p, f)).length;
            const on = f === active;
            return (
              <button
                key={f}
                type="button"
                onClick={() => choose(f)}
                aria-pressed={on}
                className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                  on
                    ? "bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]"
                    : "border-white/[0.12] text-[var(--muted)] hover:text-[var(--ink)] hover:border-white/30"
                }`}
              >
                {f} <span className={`mono text-xs ${on ? "opacity-70" : "opacity-60"}`}>{count}</span>
              </button>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
          {active !== "All" ? ` in ${active}` : ""}.
        </p>

        <motion.ul layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-10">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.li
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} priority={i < 3} headingLevel={2} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <div className="mt-20 rounded-2xl border border-white/[0.08] bg-[var(--bg-raised)] p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Have a project like these?</h2>
            <p className="text-[var(--muted)] mt-2">Tell us what you need — we reply with a clear plan and a quote.</p>
          </div>
          <Link to="/#contact" className="btn-primary shrink-0">
            Discuss your project
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Work;
