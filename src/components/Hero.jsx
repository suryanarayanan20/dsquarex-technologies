import { motion } from "framer-motion";

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-[var(--bg)] text-[var(--ink)] pt-20 overflow-hidden"
    >
      {/* Faint technical grid, restrained */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Signature: two crossing diagonal bars, echoing the D/X mark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -right-24 top-0 w-[420px] h-[900px] bg-gradient-to-b from-[var(--blue)]/25 via-[var(--blue)]/5 to-transparent rotate-[18deg] blur-2xl" />
        <div className="absolute -right-56 top-40 w-[420px] h-[900px] bg-gradient-to-b from-[var(--orange)]/25 via-[var(--orange)]/5 to-transparent -rotate-[18deg] blur-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[calc(100vh-5rem)] flex items-center">
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mono inline-flex items-center gap-2 border border-white/[0.09] text-[var(--muted)] px-4 py-2 rounded-md text-xs tracking-[0.15em]"
          >
            WEBSITES <span className="text-[var(--orange)]">/</span> AI <span className="text-[var(--orange)]">/</span> AUTOMATION
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-semibold mt-8 leading-[1.08]"
          >
            Two paths, one
            <br />
            <span className="gradient-text">working system.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="text-[var(--muted)] text-lg md:text-xl mt-8 max-w-2xl leading-relaxed font-normal"
          >
            DSquareX Technologies builds the website that brings people in
            and the automation that keeps them moving — premium web
            builds, AI-powered tools, and systems that scale with your
            business instead of slowing it down.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 mt-10"
          >
            <a
              href="https://wa.me/916282787553"
              target="_blank"
              rel="noreferrer"
              className="bg-[var(--blue)] hover:bg-[var(--blue-soft)] text-white font-medium px-8 py-4 rounded-xl transition-colors duration-300 text-center"
            >
              Get a free consultation
            </a>
            <a
              href="#projects"
              className="border border-white/[0.12] hover:border-[var(--orange)]/60 px-8 py-4 rounded-xl transition-colors duration-300 text-center"
            >
              See the work
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mono text-xs text-[var(--muted)] tracking-wide mt-4"
          >
            No lock-in contracts <span className="text-[var(--orange)]">/</span> clear pricing before we start <span className="text-[var(--orange)]">/</span> you own the code
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-3 gap-8 mt-16 max-w-xl border-t border-white/[0.08] pt-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-[var(--blue-soft)]">100%</h3>
              <p className="mono text-xs text-[var(--muted)] mt-2 tracking-wide">CLIENT FOCUSED</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[var(--orange-soft)]">24/7</h3>
              <p className="mono text-xs text-[var(--muted)] mt-2 tracking-wide">SUPPORT</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[var(--blue-soft)]">AI</h3>
              <p className="mono text-xs text-[var(--muted)] mt-2 tracking-wide">POWERED BUILDS</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
