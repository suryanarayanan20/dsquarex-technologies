import { motion } from "framer-motion";
import logo from "../assets/logo-mark.webp";

/**
 * Brand mark with the two counter-rotating rings (blue / orange) that echo
 * the crossing D/X. Rings stop automatically for visitors who prefer reduced
 * motion (App wraps everything in <MotionConfig reducedMotion="user">).
 */
function AnimatedLogoMark({ size = 44 }) {
  return (
    <span className="relative inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }} aria-hidden="true">
      <span
        className="absolute rounded-full"
        style={{
          width: size * 1.35,
          height: size * 1.35,
          background: "radial-gradient(circle, rgba(30,111,224,.22), rgba(232,121,12,.12), transparent 72%)",
          filter: "blur(10px)",
        }}
      />
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ border: "1.5px solid transparent", borderTopColor: "var(--blue-soft)", borderBottomColor: "var(--orange)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      />
      <motion.span
        className="absolute rounded-full"
        style={{ width: "74%", height: "74%", border: "1.5px solid transparent", borderTopColor: "var(--orange)", borderBottomColor: "var(--blue-soft)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <img
        src={logo}
        alt=""
        width={size}
        height={size}
        draggable="false"
        className="relative z-10 select-none object-contain"
        style={{ width: size * 0.62, height: size * 0.62 }}
      />
    </span>
  );
}

export default AnimatedLogoMark;
