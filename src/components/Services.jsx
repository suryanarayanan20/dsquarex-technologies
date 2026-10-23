import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { publishedProjects, matchesFilter } from "../data/projects";

function Services() {
  const services = [
    {
      tag: "WB",
      title: "Website Development",
      work: "Business website",
      description:
        "Premium business websites designed to attract customers, build trust and increase conversions.",
      points: [
        "Custom design built for your business, not a recycled template",
        "Fast loading on mobile, tablet and desktop",
        "Structured to rank well on Google from launch",
      ],
    },
    {
      tag: "AI",
      title: "AI Integration",
      work: "AI integration",
      description:
        "Integrate AI-powered assistants, automation tools and intelligent workflows into your business.",
      points: [
        "Chat assistants trained on your own business information",
        "Connects with the tools your team already uses",
        "Handles routine questions so your team handles the rest",
      ],
    },
    {
      tag: "AU",
      title: "Business Automation",
      description:
        "Automate repetitive tasks and streamline operations to save time and boost productivity.",
      points: [
        "Automatic invoices, reminders and reports",
        "Fewer manual steps means fewer costly mistakes",
        "Built around how your team already works day to day",
      ],
    },
    {
      tag: "DG",
      title: "Digital Growth",
      description:
        "Modern digital strategies focused on lead generation, visibility and long-term business growth.",
      points: [
        "Clear calls-to-action that turn visitors into leads",
        "Search-friendly pages from the day you launch",
        "Simple analytics so you always know what's working",
      ],
    },
  ];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative bg-[var(--bg)] text-[var(--ink)] py-24 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="eyebrow slash">Services</p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          id="services-heading"
          className="text-4xl md:text-5xl font-semibold mt-4 max-w-2xl"
        >
          What we build
        </motion.h2>

        <p className="text-[var(--muted)] mt-5 text-lg max-w-2xl leading-relaxed">
          We help businesses build, automate and scale with digital
          solutions that are made to be used, not just launched. Here’s
          exactly what’s included with each service.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mt-14 md:mt-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="card-cross flex flex-col bg-[var(--bg-raised)] border border-white/[0.08] rounded-2xl p-7 md:p-8"
            >
              <div className="tag-mark">{service.tag}</div>
              <h3 className="text-xl font-semibold mt-6 mb-3">{service.title}</h3>
              <p className="text-[var(--muted)] leading-relaxed text-[15px]">
                {service.description}
              </p>
              <ul className="mt-5 space-y-2 border-t border-white/[0.07] pt-5 flex-1">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-2 text-[13px] text-[var(--muted)] leading-relaxed">
                    <span className="mono text-[var(--orange)] shrink-0">/</span>
                    {point}
                  </li>
                ))}
              </ul>
              {service.work && publishedProjects.some((p) => matchesFilter(p, service.work)) && (
                <Link
                  to={`/work?filter=${encodeURIComponent(service.work)}`}
                  className="relative z-10 mt-6 text-sm font-medium text-[var(--orange-soft)] hover:text-[var(--orange)] inline-flex items-center gap-1.5"
                >
                  See related work <span aria-hidden="true">→</span>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;

