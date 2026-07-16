import { motion } from "framer-motion";

function Projects() {
  const projects = [
    {
      title: "AI Resume Analyzer",
      description:
        "AI-powered resume analysis platform that evaluates resumes, provides ATS scoring, identifies skill gaps, and generates improvement suggestions.",
      tech: "Java · Spring Boot · MySQL · Hugging Face API · LLaMA 3",
      live: "https://resume-analyzer-2edj.onrender.com",
      github: "https://github.com/suryanarayanan20/resume-analyzer",
    },
    {
      title: "Coffee Shop POS System",
      description:
        "Point of sale system for managing orders, billing, and database operations with optimized MySQL integration.",
      tech: "Java · JDBC · MySQL · OOP",
      live: "https://suryacoffeeshop.vercel.app/",
      github: "https://github.com/suryanarayanan20/Coffee-pos-System",
    },
    {
      title: "Personal Portfolio Website",
      description:
        "Modern responsive portfolio website showcasing projects, skills, resume, and professional experience.",
      tech: "React · JavaScript · Tailwind CSS · Vercel",
      live: "https://suryanarayanan-portfolio.vercel.app/",
      github: "https://github.com/suryanarayanan20/Protfolio-Surya-",
    },
  ];

  return (
    <section id="projects" className="relative bg-[var(--bg-raised)] text-[var(--ink)] py-28 seam-up">
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <p className="mono slash text-sm text-[var(--muted)] tracking-[0.15em]">SELECTED WORK</p>

        <h2 className="text-4xl md:text-5xl font-semibold mt-4 max-w-2xl">
          Real builds, real stacks
        </h2>
        <p className="text-[var(--muted)] mt-5 text-lg max-w-2xl leading-relaxed">
          Applications built with Java, AI and modern web technologies.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="card-cross bg-[var(--bg-raised-2)] rounded-2xl p-8 border border-white/[0.08] flex flex-col"
            >
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-[var(--muted)] mt-4 text-sm leading-relaxed flex-1">
                {project.description}
              </p>
              <div className="mono mt-5 text-[var(--orange-soft)] text-xs leading-relaxed">
                {project.tech}
              </div>
              <div className="flex gap-3 mt-8">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[var(--blue)] hover:bg-[var(--blue-soft)] px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Live demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-white/[0.12] hover:border-[var(--orange)]/60 px-5 py-2.5 rounded-lg text-sm transition-colors"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
