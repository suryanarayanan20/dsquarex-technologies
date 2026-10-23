import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { featuredProjects, publishedProjects } from "../data/projects";

/** Homepage "Selected work" — client projects first, everything else one click away. */
function Projects() {
  const inhouse = publishedProjects.filter((p) => p.type === "inhouse");

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative bg-[var(--bg-raised)] text-[var(--ink)] py-24 md:py-28 seam-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="eyebrow slash">Selected work</p>
            <h2 id="projects-heading" className="text-4xl md:text-5xl font-semibold mt-4 max-w-2xl">
              Recent work for real businesses
            </h2>
            <p className="text-[var(--muted)] mt-5 text-lg max-w-2xl leading-relaxed">
              Recent builds for construction, architecture and interior firms across Tamil Nadu — each one designed
              to turn a visit into a call, a WhatsApp message or a quote request.
            </p>
          </div>
          <Link
            to="/work"
            className="shrink-0 inline-flex items-center gap-2 border border-white/[0.12] hover:border-[var(--orange)]/60 px-5 py-3 rounded-xl text-sm font-medium transition-colors self-start md:self-auto"
          >
            All {publishedProjects.length} projects <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-12 md:mt-14">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className={index === 0 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {inhouse.length > 0 && (
          <p className="text-sm text-[var(--muted)] mt-10 leading-relaxed">
            <span className="mono text-[var(--orange)] mr-2">/</span>
            Also built in-house:{" "}
            {inhouse.map((p, i) => (
              <span key={p.slug}>
                <Link to={`/work/${p.slug}`} className="text-[var(--ink)] underline decoration-white/20 underline-offset-4 hover:decoration-[var(--orange)]">
                  {p.title}
                </Link>
                {i < inhouse.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}

export default Projects;
