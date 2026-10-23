import { motion } from "framer-motion";

function Process() {
  const steps = [
    {
      num: "01",
      title: "Discover",
      desc: "A short call to understand your business, your customers, and what the site actually needs to do for you.",
    },
    {
      num: "02",
      title: "Design",
      desc: "You see a clickable design before a single line of code is written, so you approve the look and feel first.",
    },
    {
      num: "03",
      title: "Build & review",
      desc: "We build in stages, then share a live demo link so you can review every page on your own phone and computer. Your feedback goes in before launch.",
    },
    {
      num: "04",
      title: "Launch & support",
      desc: "We connect your domain, run a final check across devices and browsers, and go live — then stay on for support as your business grows.",
    },
  ];

  return (
    <section id="process" aria-labelledby="process-heading" className="relative bg-[var(--bg-raised)] text-[var(--ink)] py-24 md:py-28 seam-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <p className="eyebrow slash">How we work</p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          id="process-heading"
          className="text-4xl md:text-5xl font-semibold mt-4 max-w-2xl"
        >
          From first call to <span className="gradient-text">live site</span>
        </motion.h2>

        <p className="text-[var(--muted)] mt-5 text-lg max-w-2xl leading-relaxed">
          No black box. Here’s exactly what happens at each stage, so
          you always know where your project stands.
        </p>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mt-14 md:mt-16">
          {steps.map((step, index) => (
            <motion.li
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="relative bg-[var(--bg-raised-2)] border border-white/[0.08] rounded-2xl p-7 md:p-8"
            >
              <span aria-hidden="true" className="mono text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--blue-soft)] to-[var(--orange-soft)]">
                {step.num}
              </span>
              <h3 className="text-xl font-semibold mt-4 mb-3">{step.title}</h3>
              <p className="text-[var(--muted)] leading-relaxed text-[15px]">{step.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Process;
