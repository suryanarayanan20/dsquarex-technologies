import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
import AnimatedLogoMark from "./AnimatedLogoMark";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Why Us", href: "#why-us" },
    { name: "Work", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/[0.06] bg-[#0A111E]/85 backdrop-blur-xl">
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">

        {/* Left Logo */}
        <a href="#home" className="flex items-center gap-2">

          <img
            src={logo}
            alt="DSquareX"
            className="h-12 w-12 md:h-16 md:w-16 object-contain shrink-0"
          />

          <div className="leading-tight">
            <p className="font-[Space_Grotesk] font-semibold text-base md:text-lg text-white">
              DSquareX
            </p>

            <p className="text-[8px] md:text-[10px] tracking-[0.2em] text-slate-400 uppercase">
              Technologies
            </p>
          </div>

        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">

          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-sm text-slate-400 hover:text-[#00A3FF] transition-all duration-300"
              >
                {link.name}
              </a>
            </li>
          ))}

        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">

         {/* Mobile Animated Logo */}
<div className="md:hidden">
  <AnimatedLogoMark size={70} />
</div>

{/* Desktop Animated Logo */}
<div className="hidden md:block">
  <AnimatedLogoMark size={80} />
</div>


          {/* Desktop CTA */}
          <a
            href="https://wa.me/916282787553"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 border border-[#FF9900]/40 hover:bg-[#FF9900]/10 text-white font-medium px-5 py-2.5 rounded-xl transition-all duration-300"
          >
            Start a Project
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-white ml-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0A111E] border-t border-white/[0.06] overflow-hidden"
          >
            <ul className="flex flex-col text-center py-3">

              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-4 text-slate-300 hover:text-[#00A3FF] transition"
                  >
                    {link.name}
                  </a>
                </li>
              ))}

              <li className="px-5 py-4">
                <a
                  href="https://wa.me/916282787553"
                  target="_blank"
                  rel="noreferrer"
                  className="block bg-gradient-to-r from-[#00A3FF] to-[#0052D4] text-white font-medium py-3 rounded-xl"
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