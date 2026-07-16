import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
import AnimatedLogoMark from "./AnimatedLogoMark";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Why us", href: "#why-us" },
    { name: "Work", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/[0.07] bg-[#0b0d12]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <img src={logo} alt="DSquareX" className="logo-nav h-20 w-20 object-contain" />
          <div className="leading-tight">
            <p className="font-[Space_Grotesk] font-semibold text-lg text-[var(--ink)]">
              DSquareX
            </p>
            <p className="mono text-[10px] tracking-[0.2em] text-[var(--muted)]">
              TECHNOLOGIES
            </p>
          </div>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="mono text-sm text-[var(--muted)] hover:text-[var(--ink)] transition-colors duration-300"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + animated mark, top-right corner */}
        <div className="hidden md:flex items-center gap-3">
          <AnimatedLogoMark size={60} />
          <a
            href="https://wa.me/916282787553"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-[var(--orange)]/50 hover:bg-[var(--orange)]/10 text-[var(--ink)] font-medium px-5 py-2.5 rounded-lg transition-colors duration-300"
          >
            Start a project <span className="text-[var(--orange)]">/</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-[var(--ink)]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
     <AnimatePresence>
  {menuOpen && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="md:hidden border-t border-white/[0.07] bg-[#0b0d12] overflow-hidden"
    >
      <ul className="flex flex-col text-center py-2">
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-4 mono text-sm text-[var(--muted)] hover:text-[var(--ink)]"
            >
              {link.name}
            </a>
          </li>
        ))}

        <li className="p-4">
          <a
            href="https://wa.me/916282787553"
            target="_blank"
            rel="noreferrer"
            className="block border border-[var(--orange)]/50 text-[var(--ink)] font-medium py-3 rounded-lg"
          >
            Start a Project
          </a>
        </li>
      </ul>
    </motion.div>
  )}
</AnimatePresence>
    </nav>
  );
}

export default Navbar;
