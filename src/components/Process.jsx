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
      title: "Build",
      desc: "Development happens in stages with regular check-ins, so you see steady progress instead of silence until launch day.",
    },
    {
      num: "04",
      title: "Launch & support",
      desc: "Your site goes live, and we stay on for support so it keeps working as your business grows.",
    },
  ];

  return (
    <section id="process" className="relative bg-[var(--bg)] text-[var(--ink)] py-28">
      <div className="max-w-7xl mx-auto px-6">
        <p className="mono slash text-sm text-[var(--muted)] tracking-[0.15em]">HOW WE WORK</p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold mt-4 max-w-2xl"
        >
          From first call to <span className="gradient-text">live site</span>
        </motion.h2>

        <p className="text-[var(--muted)] mt-5 text-lg max-w-2xl leading-relaxed">
          No black box. Here's exactly what happens at each stage, so
          you always know where your project stands.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="card-cross bg-[var(--bg-raised)] border border-white/[0.08] rounded-2xl p-8"
            >
              <span className="mono text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--blue-soft)] to-[var(--orange-soft)]">
                {step.num}
              </span>
              <h3 className="text-xl font-semibold mt-4 mb-3">{step.title}</h3>
              <p className="text-[var(--muted)] leading-relaxed text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
