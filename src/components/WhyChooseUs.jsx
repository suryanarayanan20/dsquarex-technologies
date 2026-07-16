import { motion } from "framer-motion";

function WhyChooseUs() {
  const features = [
    {
      tag: "SPD",
      title: "Fast Performance",
      desc: "Lightning-fast websites optimized for speed, so visitors don't bounce before the page even finishes loading.",
    },
    {
      tag: "RWD",
      title: "Fully Responsive",
      desc: "A perfect experience on mobile, tablet and desktop — built mobile-first, since that's where most visitors land.",
    },
    {
      tag: "BIZ",
      title: "Business Focused",
      desc: "Every page is designed to generate leads, build trust and turn visitors into paying customers.",
    },
    {
      tag: "SEO",
      title: "SEO Optimized",
      desc: "Built with search engine best practices from day one, so people can actually find you on Google.",
    },
    {
      tag: "SUP",
      title: "Dedicated Support",
      desc: "Direct access to the person who built your site — real answers, not a ticket queue.",
    },
    {
      tag: "FUT",
      title: "Future Ready",
      desc: "Built on modern technology that scales as your business grows, so you won't need a rebuild in a year.",
    },
  ];

  return (
    <section
      id="why-us"
      className="relative bg-[var(--bg)] text-[var(--ink)] py-28"
    >
      <div className="max-w-7xl mx-auto px-6">
        <p className="mono slash text-sm text-[var(--muted)] tracking-[0.15em]">WHY US</p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold mt-4 max-w-2xl"
        >
          Why teams choose <span className="gradient-text">DSquareX</span>
        </motion.h2>

        <p className="text-[var(--muted)] mt-5 text-lg max-w-2xl leading-relaxed">
          We build digital experiences that help businesses grow, earn
          trust and stand out from the competition.
        </p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="card-cross bg-[var(--bg-raised)] border border-white/[0.08] rounded-2xl p-8"
            >
              <span className="mono text-xs text-[var(--orange-soft)] tracking-widest">{feature.tag}</span>
              <h3 className="text-xl font-semibold mt-4 mb-3">{feature.title}</h3>
              <p className="text-[var(--muted)] leading-relaxed text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
