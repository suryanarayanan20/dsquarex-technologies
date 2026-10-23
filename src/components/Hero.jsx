import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getProject, publishedProjects } from "../data/projects";
import { site } from "../data/site";

const clientCount = publishedProjects.filter((p) => p.type === "client").length;

/** Real client screenshots, layered — the work is the hero. */
function HeroShowcase() {
  const back = getProject("v-thittam-design-studio");
  const front = getProject("sraj-construction-interior");
  const phone = back?.gallery.find((g) => g.device === "mobile");
  if (!back || !front) return null;

  return (
    <div className="relative w-full max-w-[640px] mx-auto lg:mx-0 aspect-[16/12.5] sm:aspect-[16/11]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-0 top-0 w-[82%]"
      >
        <Link to={`/work/${back.slug}`} className="block frame frame-lift" aria-label={`${back.title} case study`}>
          <img
            src={back.cover.src}
            srcSet={back.cover.srcSet}
            sizes="(min-width: 1024px) 34vw, 80vw"
            width={back.cover.width}
            height={back.cover.height}
            alt=""
            fetchpriority="high"
            className="block w-full h-auto"
          />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 bottom-0 w-[72%]"
      >
        <Link to={`/work/${front.slug}`} className="block frame frame-lift shadow-2xl" aria-label={`${front.title} case study`}>
          <img
            src={front.cover.src}
            srcSet={front.cover.srcSet}
            sizes="(min-width: 1024px) 30vw, 70vw"
            width={front.cover.width}
            height={front.cover.height}
            alt=""
            className="block w-full h-auto"
          />
        </Link>
      </motion.div>

      {phone && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute right-[4%] bottom-[-4%] w-[19%] hidden sm:block"
          aria-hidden="true"
        >
          <div className="phone shadow-2xl">
            <img src={phone.src} srcSet={phone.srcSet} sizes="140px" width={phone.width} height={phone.height} alt="" className="block w-full h-auto" />
          </div>
        </motion.div>
      )}
    </div>
  );
}

function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="relative bg-[var(--bg)] text-[var(--ink)] pt-24 md:pt-28 pb-20 md:pb-24 overflow-hidden">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-cross" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-14 lg:gap-10 items-center min-h-[calc(100svh-7rem)]">
        <div className="lg:col-span-6 pt-8 lg:pt-0">
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mono inline-flex flex-wrap items-center gap-2 border border-white/[0.09] text-[var(--muted)] px-3.5 py-2 rounded-md text-[11px] sm:text-xs tracking-[0.15em]"
          >
            WEBSITES <span className="text-[var(--orange)]">/</span> WEB APPS <span className="text-[var(--orange)]">/</span> AI
          </motion.p>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[2.6rem] leading-[1.05] sm:text-6xl xl:text-7xl font-semibold mt-7 tracking-tight"
          >
            Websites that turn visitors into <span className="gradient-text">enquiries.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-[var(--muted)] text-lg md:text-xl mt-7 max-w-xl leading-relaxed"
          >
            {site.name} designs and builds business websites, custom web applications and AI-powered
            tools — with clear pricing, direct communication and code you own.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 mt-10"
          >
            <Link to="/#contact" className="btn-primary">
              Discuss your project
            </Link>
            <Link to="/work" className="btn-ghost">
              See our work <span aria-hidden="true">→</span>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mono text-[11px] sm:text-xs text-[var(--muted)] tracking-wide mt-5 leading-relaxed"
          >
            No lock-in contracts <span className="text-[var(--orange)]">/</span> clear pricing before we start{" "}
            <span className="text-[var(--orange)]">/</span> you own the code
          </motion.p>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 max-w-lg border-t border-white/[0.08] pt-7"
          >
            <div>
              <dt className="sr-only">Client website projects</dt>
              <dd className="text-2xl sm:text-3xl font-semibold text-[var(--blue-soft)]">{clientCount}</dd>
              <dd className="mono text-[10px] sm:text-[11px] text-[var(--muted)] mt-1.5 tracking-wide uppercase leading-snug">Client website projects</dd>
            </div>
            <div>
              <dt className="sr-only">Case studies</dt>
              <dd className="text-2xl sm:text-3xl font-semibold text-[var(--orange-soft)]">{publishedProjects.length}</dd>
              <dd className="mono text-[10px] sm:text-[11px] text-[var(--muted)] mt-1.5 tracking-wide uppercase leading-snug">Projects with case studies</dd>
            </div>
            <div>
              <dt className="sr-only">Client locations</dt>
              <dd className="text-lg sm:text-2xl font-semibold text-[var(--blue-soft)] leading-[1.25] sm:leading-[1.25] pt-1 sm:pt-0.5">Tamil Nadu</dd>
              <dd className="mono text-[10px] sm:text-[11px] text-[var(--muted)] mt-1.5 tracking-wide uppercase leading-snug">Clients in Chennai, Trichy, Nagercoil</dd>
            </div>
          </motion.dl>
        </div>

        <div className="lg:col-span-6">
          <HeroShowcase />
          <p className="mono text-[11px] text-[var(--muted)] mt-8 lg:mt-10 text-center lg:text-left tracking-wide">
            Recent client work <span className="text-[var(--orange)]">/</span> V Thittam Design Studio, SRAJ Construction
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
