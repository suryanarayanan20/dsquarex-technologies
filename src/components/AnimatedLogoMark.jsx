import { motion } from "framer-motion";
import logo from "../assets/logo.png";

function AnimatedLogoMark({ size = 50 }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Background Glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 1.5,
          height: size * 1.5,
          background:
            "radial-gradient(circle, rgba(0,163,255,.25) 0%, rgba(255,153,0,.15) 45%, transparent 75%)",
          filter: "blur(10px)",
        }}
      />

      {/* Outer Ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          borderTop: "2px solid #00A3FF",
          borderRight: "2px solid transparent",
          borderBottom: "2px solid #00A3FF",
          borderLeft: "2px solid transparent",
          boxShadow: "0 0 12px rgba(0,163,255,.7)",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Inner Ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "72%",
          height: "72%",
          borderTop: "2px solid #FF9900",
          borderRight: "2px solid transparent",
          borderBottom: "2px solid #FF9900",
          borderLeft: "2px solid transparent",
          boxShadow: "0 0 10px rgba(255,153,0,.7)",
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Orbit Dot */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#00A3FF",
            boxShadow: "0 0 10px #00A3FF",
            transform: `translate(-50%, -50%) translateX(${size * 0.45}px)`,
          }}
        />
      </motion.div>

      {/* Static Logo */}
      <img
        src={logo}
        alt="DSquareX"
        draggable="false"
        className="relative z-10 select-none"
        style={{
          width: size * 0.65,
          height: size * 0.65,
          objectFit: "contain",
          filter:
            "drop-shadow(0 0 8px rgba(0,163,255,.8)) drop-shadow(0 0 16px rgba(255,153,0,.5))",
        }}
      />
    </div>
  );
}

export default AnimatedLogoMark;