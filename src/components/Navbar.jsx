import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLogoMark from "./AnimatedLogoMark";
import { telHref, site } from "../data/site";

const links = [
  { name: "Work", to: "/work" },
  { name: "Services", to: "/#services" },
  { name: "Process", to: "/#process" },
  { name: "About", to: "/#about" },
  { name: "Contact", to: "/#contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();

  // close the mobile menu on navigation
  useEffect(() => setMenuOpen(false), [pathname, hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (to) => (to === "/work" ? pathname.startsWith("/work") : pathname === "/" && hash === to.slice(1));

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 ${
        scrolled || menuOpen ? "bg-[var(--bg)]/90 backdrop-blur-xl border-white/[0.07]" : "bg-transparent border-transparent"
      }`}
    >
      <nav aria-label="Main" className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label={`${site.name} — home`}>
          <AnimatedLogoMark size={44} />
          <span className="leading-tight">
            <span className="block font-[family-name:var(--font-display)] font-semibold text-base md:text-lg text-[var(--ink)]">{site.shortName}</span>
            <span className="block text-[9px] md:text-[10px] tracking-[0.2em] text-[var(--muted)] uppercase">{site.name.replace(site.shortName, "").trim()}</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1 lg:gap-2">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.to}
                aria-current={isActive(link.to) ? "page" : undefined}
                className={`relative px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive(link.to) ? "text-[var(--ink)]" : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                {link.name}
                {isActive(link.to) && <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-[var(--orange)]" aria-hidden="true" />}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={telHref} className="hidden lg:inline-flex mono text-xs text-[var(--muted)] hover:text-[var(--ink)] px-3 py-2 transition-colors">
            {site.phoneDisplay}
          </a>
          <Link to="/#contact" className="hidden md:inline-flex btn-primary !py-2.5 !px-5 !text-sm">
            Start a project
          </Link>
          <button
            type="button"
            className="md:hidden icon-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span aria-hidden="true" className="text-lg leading-none">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[var(--bg)] border-t border-white/[0.06] overflow-hidden"
          >
            <ul className="flex flex-col px-4 py-3">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    aria-current={isActive(link.to) ? "page" : undefined}
                    className="flex items-center justify-between py-4 border-b border-white/[0.06] text-lg text-[var(--ink)]"
                  >
                    {link.name}
                    <span className="text-[var(--orange)]" aria-hidden="true">/</span>
                  </Link>
                </li>
              ))}
              <li className="grid grid-cols-2 gap-3 pt-5 pb-3">
                <a href={telHref} className="btn-ghost !px-3">Call us</a>
                <Link to="/#contact" className="btn-primary !px-3">Start a project</Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
