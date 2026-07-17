import { motion } from "framer-motion";
import logo from "../assets/logo.png";

function AnimatedLogoMark({ size = 56 }) {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {/* Glow Ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: "2px solid rgba(0,163,255,.5)",
          boxShadow: "0 0 15px rgba(0,163,255,.4)",
        }}
      />

      {/* Orange Ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "75%",
          height: "75%",
          border: "2px solid rgba(255,153,0,.5)",
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating Logo */}
      <motion.img
        src={logo}
        alt="DSquareX"
        className="z-10"
        style={{
          width: size * 0.7,
          height: size * 0.7,
          objectFit: "contain",
        }}
        animate={{
          y: [0, -4, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}

export default AnimatedLogoMark;