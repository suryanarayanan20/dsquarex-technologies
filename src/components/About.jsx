import { motion } from "framer-motion";
import { site } from "../data/site";

/** Each principle is something visitors can check in our case studies. */
const principles = [
  {
    tag: "DIR",
    title: "You talk to the builder",
    desc: "Direct communication with the person building your site — no handoffs, no middlemen.",
  },
  {
    tag: "MOB",
    title: "Mobile-first, enquiry-first",
    desc: "Designed for the phone first. Client sites ship with one-tap call and WhatsApp buttons and a clear route to a quote.",
  },
  {
    tag: "SEO",
    title: "Search-ready at launch",
    desc: "Page titles, descriptions, sitemap and structured markup are in place before the site goes live.",
  },
  {
    tag: "MNT",
    title: "Easy to keep up to date",
    desc: "Content such as packages, projects and contact details lives in one place, so updates don't mean a rebuild.",
  },
  {
    tag: "ADV",
    title: "Honest advice",
    desc: "We recommend what your business actually needs — even when that's a simpler, cheaper build.",
  },
  {
    tag: "OWN",
    title: "You own it",
    desc: "No lock-in contracts. Your code, your domain, your content.",
  },
];

function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-[var(--bg)] text-[var(--ink)] py-24 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow slash">About</p>
          <h2 id="about-heading" className="text-4xl md:text-5xl font-semibold mt-4">
            About {site.name}
          </h2>
          <p className="text-[var(--muted)] text-lg mt-8 leading-relaxed">
            {site.name} is a digital solutions company focused on helping businesses establish a strong
            online presence through modern websites, custom web applications and scalable backend solutions.
          </p>
          <p className="text-[var(--muted)] text-lg mt-5 leading-relaxed">
            We combine technology, creativity and business strategy to deliver work that looks professional and
            gives customers an easy way to get in touch.
          </p>
        </div>

        <div className="lg:col-span-7">
          <h3 className="mono text-xs tracking-[0.15em] uppercase text-[var(--muted)]">What working with us looks like</h3>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-9 mt-8">
            {principles.map((p, i) => (
              <motion.li
                key={p.tag}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border-t border-white/[0.08] pt-5"
              >
                <span className="mono text-[11px] text-[var(--orange-soft)] tracking-widest" aria-hidden="true">
                  {p.tag}
                </span>
                <h4 className="text-lg font-semibold mt-2">{p.title}</h4>
                <p className="text-[15px] text-[var(--muted)] leading-relaxed mt-2">{p.desc}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;
