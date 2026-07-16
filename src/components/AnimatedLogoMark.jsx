import logo from "../assets/logo.png";

/**
 * Prominent, always-in-motion logo mark for the hero: two
 * counter-rotating gradient rings plus a few orbiting particles
 * around a gently floating logo. Distinct from the dim page
 * watermark and the small navbar loop — this one is the standout.
 */
function AnimatedLogoMark({ size = 156 }) {
  const dots = [
    { radius: size * 0.62, duration: "9s", delay: "0s", color: "var(--blue-soft)" },
    { radius: size * 0.62, duration: "9s", delay: "-4.5s", color: "var(--orange-soft)" },
    { radius: size * 0.46, duration: "6s", delay: "-2s", color: "var(--orange-soft)" },
  ];

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className="orbit-ring orbit-ring-a absolute inset-0 rounded-full" />
      <div className="orbit-ring orbit-ring-b absolute inset-[13%] rounded-full" />

      {dots.map((dot, i) => (
        <div
          key={i}
          className="orbit-track absolute inset-0"
          style={{ animationDuration: dot.duration, animationDelay: dot.delay }}
        >
          <span
            className="absolute rounded-full"
            style={{
              top: "50%",
              left: "50%",
              width: 7,
              height: 7,
              background: dot.color,
              boxShadow: `0 0 8px ${dot.color}`,
              transform: `translate(-50%, -50%) translateX(${dot.radius}px)`,
            }}
          />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={logo}
          alt="DSquareX"
          className="logo-mark-core select-none"
          style={{ width: size * 0.5 }}
        />
      </div>
    </div>
  );
}

export default AnimatedLogoMark;
