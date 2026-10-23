import EnquiryForm from "./EnquiryForm";
import { site, telHref, whatsappHref, mailtoHref } from "../data/site";

const channels = [
  {
    label: "WhatsApp",
    value: site.phoneDisplay,
    href: whatsappHref(site.greeting),
    external: true,
  },
  { label: "Call", value: site.phoneDisplay, href: telHref },
  { label: "Email", value: site.email, href: mailtoHref("Project enquiry") },
];

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative bg-[var(--bg-raised)] text-[var(--ink)] py-24 md:py-28 seam-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 grid lg:grid-cols-12 gap-12 lg:gap-14">
        <div className="lg:col-span-5">
          <p className="eyebrow slash">Contact</p>
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-semibold mt-4">
            Let’s talk about your project
          </h2>
          <p className="text-[var(--muted)] text-lg mt-6 leading-relaxed">
            Need a professional website, a custom web app, or AI built into how you work? Share a few details and
            we’ll come back with a clear next step — no obligation, no hard sell.
          </p>

          <ul className="mt-10 space-y-3">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-white/[0.09] bg-[var(--bg)] px-5 py-4 hover:border-[var(--orange)]/50 transition-colors"
                >
                  <span>
                    <span className="mono block text-[11px] tracking-[0.14em] uppercase text-[var(--muted)]">{c.label}</span>
                    <span className="block mt-1 text-[15px] break-all">{c.value}</span>
                  </span>
                  <span className="text-[var(--orange)] transition-transform group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                  {c.external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}

export default Contact;
