import { memo } from "react";
import logo from "../assets/logo.png";

function AnimatedLogoMark({ size = 60 }) {
  const dots = [
    {
      radius: size * 0.42,
      duration: "10s",
      delay: "0s",
      color: "#00A3FF",
    },
    {
      radius: size * 0.42,
      duration: "10s",
      delay: "-5s",
      color: "#FF9900",
    },
    {
      radius: size * 0.30,
      duration: "6s",
      delay: "-2s",
      color: "#FF5E00",
    },
  ];

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Main Glow */}
      <div
        className="absolute rounded-full animate-pulse"
        style={{
          width: size * 1.4,
          height: size * 1.4,
          background:
            "radial-gradient(circle, rgba(0,163,255,0.35) 0%, rgba(255,153,0,0.15) 40%, transparent 75%)",
          filter: "blur(12px)",
        }}
      />

      {/* Outer Gradient Ring */}
      <div
        className="absolute inset-0 rounded-full orbit-ring-a"
        style={{
          border: "2px solid rgba(0,163,255,0.6)",
          boxShadow:
            "0 0 12px rgba(0,163,255,0.6), 0 0 24px rgba(0,163,255,0.4)",
        }}
      />

      {/* Inner Gradient Ring */}
      <div
        className="absolute inset-[18%] rounded-full orbit-ring-b"
        style={{
          border: "2px solid rgba(255,153,0,0.6)",
          boxShadow:
            "0 0 10px rgba(255,153,0,0.5), 0 0 20px rgba(255,153,0,0.3)",
        }}
      />

      {/* Orbiting Dots */}
      {dots.map((dot, index) => (
        <div
          key={index}
          className="absolute inset-0 orbit-track"
          style={{
            animationDuration: dot.duration,
            animationDelay: dot.delay,
          }}
        >
          <span
            className="absolute rounded-full"
            style={{
              top: "50%",
              left: "50%",
              width: 6,
              height: 6,
              background: dot.color,
              boxShadow: `0 0 14px ${dot.color}`,
              transform: `translate(-50%, -50%) translateX(${dot.radius}px)`,
            }}
          />
        </div>
      ))}

      {/* Logo Glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 0.7,
          height: size * 0.7,
          background:
            "radial-gradient(circle, rgba(0,163,255,0.25), transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* Logo */}
      <img
        src={logo}
        alt="DSquareX"
        draggable="false"
        className="relative z-10 select-none logo-mark-core"
        style={{
          width: size * 0.50,
          height: size * 0.50,
          objectFit: "contain",
          filter:
            "drop-shadow(0 0 8px rgba(0,163,255,0.7)) drop-shadow(0 0 14px rgba(255,153,0,0.5))",
        }}
      />
    </div>
  );
}

export default memo(AnimatedLogoMark);