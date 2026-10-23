import { Link } from "react-router-dom";
import { site, telHref, whatsappHref, mailtoHref } from "../data/site";
import { featuredProjects } from "../data/projects";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[var(--bg)] border-t border-white/[0.08] text-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-[var(--ink)] font-semibold text-lg font-[family-name:var(--font-display)]">{site.name}</p>
          <p className="mt-2 text-sm leading-relaxed max-w-xs">{site.tagline}</p>
          <Link to="/#contact" className="btn-primary !py-2.5 !px-5 !text-sm mt-6">
            Start a project
          </Link>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <p className="mono text-[11px] tracking-[0.14em] uppercase text-[var(--ink)]/70">Company</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/work" className="hover:text-[var(--ink)]">Work</Link></li>
            <li><Link to="/#services" className="hover:text-[var(--ink)]">Services</Link></li>
            <li><Link to="/#process" className="hover:text-[var(--ink)]">Process</Link></li>
            <li><Link to="/#about" className="hover:text-[var(--ink)]">About</Link></li>
            <li><Link to="/#contact" className="hover:text-[var(--ink)]">Contact</Link></li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="mono text-[11px] tracking-[0.14em] uppercase text-[var(--ink)]/70">Case studies</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {featuredProjects.map((p) => (
              <li key={p.slug}>
                <Link to={`/work/${p.slug}`} className="hover:text-[var(--ink)]">{p.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className="mono text-[11px] tracking-[0.14em] uppercase text-[var(--ink)]/70">Get in touch</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ink)]">WhatsApp {site.phoneDisplay}</a></li>
            <li><a href={telHref} className="hover:text-[var(--ink)]">Call {site.phoneDisplay}</a></li>
            <li><a href={mailtoHref()} className="hover:text-[var(--ink)] break-all">{site.email}</a></li>
            <li><a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ink)]">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/[0.06]">
        <p className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-xs">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
