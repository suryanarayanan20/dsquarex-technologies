import { memo } from "react";
import logo from "../assets/logo.png";

function AnimatedLogoMark({ size = 48 }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      {/* Single Glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          background:
            "radial-gradient(circle, rgba(0,163,255,.25), transparent 70%)",
        }}
      />

      {/* Single Ring */}
      <div
        className="absolute inset-0 rounded-full orbit-ring-a"
        style={{
          border: "1px solid rgba(0,163,255,.4)",
        }}
      />

      {/* Logo */}
      <img
        src={logo}
        alt="DSquareX"
        draggable="false"
        className="relative z-10 logo-mark-core"
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