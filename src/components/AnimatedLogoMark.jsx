import { motion } from "framer-motion";
import logo from "../assets/logo.png";

function AnimatedLogoMark({ size = 56 }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 1.5,
          height: size * 1.5,
          background:
            "radial-gradient(circle, rgba(0,163,255,.25), rgba(255,153,0,.15), transparent 75%)",
          filter: "blur(14px)",
        }}
      />

      {/* OUTER RING */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          borderTop: "2px solid #00A3FF",
          borderRight: "2px solid transparent",
          borderBottom: "2px solid #FF9900",
          borderLeft: "2px solid transparent",
          boxShadow: "0 0 18px rgba(0,163,255,.5)",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* INNER RING */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "70%",
          height: "70%",
          borderTop: "2px solid #FF9900",
          borderBottom: "2px solid #00A3FF",
          borderLeft: "2px solid transparent",
          borderRight: "2px solid transparent",
          boxShadow: "0 0 14px rgba(255,153,0,.5)",
        }}
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* ORBIT DOT */}
      <motion.div
        className="absolute inset-0"
        animate={{
          rotate: 360,
        }}
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
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#00A3FF",
            boxShadow: "0 0 14px #00A3FF",
            transform: `translate(-50%, -50%) translateX(${size * 0.48}px)`,
          }}
        />
      </motion.div>

      {/* STATIC LOGO */}
      <img
        src={logo}
        alt="DSquareX"
        draggable="false"
        className="relative z-10 select-none"
        style={{
          width: size * 0.68,
          height: size * 0.68,
          objectFit: "contain",
          filter:
            "drop-shadow(0 0 10px rgba(0,163,255,.8)) drop-shadow(0 0 18px rgba(255,153,0,.6))",
        }}
      />
    </div>
  );
}

export default AnimatedLogoMark;