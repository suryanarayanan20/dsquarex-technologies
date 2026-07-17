import { memo } from "react";
import logo from "../assets/logo.png";

function AnimatedLogoMark({ size = 60 }) {
  const isMobile = size <= 60;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Soft Glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: size * 1.2,
          height: size * 1.2,
          background:
            "radial-gradient(circle, rgba(0,163,255,0.18), rgba(255,153,0,0.08), transparent 75%)",
          filter: isMobile ? "blur(6px)" : "blur(10px)",
        }}
      />

      {/* Outer Ring */}
      <div
        className="absolute inset-0 rounded-full orbit-ring-a"
        style={{
          border: "2px solid rgba(0,163,255,0.45)",
        }}
      />

      {/* Inner Ring */}
      <div
        className="absolute inset-[18%] rounded-full orbit-ring-b"
        style={{
          border: "2px solid rgba(255,153,0,0.45)",
        }}
      />

      {/* Single Orbit Dot */}
      <div
        className="absolute inset-0 orbit-track"
        style={{
          animationDuration: "10s",
        }}
      >
        <span
          className="absolute rounded-full"
          style={{
            top: "50%",
            left: "50%",
            width: isMobile ? 4 : 6,
            height: isMobile ? 4 : 6,
            background: "#00A3FF",
            boxShadow: "0 0 8px #00A3FF",
            transform: `translate(-50%, -50%) translateX(${size * 0.42}px)`,
          }}
        />
      </div>

      {/* Logo */}
      <img
        src={logo}
        alt="DSquareX"
        draggable="false"
        className="relative z-10 select-none logo-mark-core"
        style={{
          width: size * 0.65,
          height: size * 0.65,
          objectFit: "contain",
        }}
      />
    </div>
  );
}

export default memo(AnimatedLogoMark);