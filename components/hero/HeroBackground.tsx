const centerX = 640;
const centerY = 390;

export default function HeroBackground() {
  const rings = Array.from({ length: 17 }, (_, index) => {
    const theta = ((index + 1) * 8 * Math.PI) / 180;
    return 260 * Math.tan(theta / 2);
  });

  const spokes = Array.from({ length: 36 }, (_, index) => {
    const angle = (index * 10 * Math.PI) / 180;
    return {
      x: centerX + Math.cos(angle) * 1500,
      y: centerY + Math.sin(angle) * 1500,
      opacity: index % 3 === 0 ? 0.34 : 0.1,
    };
  });

  return (
    <svg
      aria-hidden="true"
      className="hero-background pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1280 780"
    >
      <g
        className="hero-background-spokes"
        style={{ transformOrigin: `${centerX}px ${centerY}px` }}
      >
        {spokes.map((spoke, index) => (
          <line
            key={index}
            x1={centerX + Math.cos((index * 10 * Math.PI) / 180) * 14}
            y1={centerY + Math.sin((index * 10 * Math.PI) / 180) * 14}
            x2={spoke.x}
            y2={spoke.y}
            stroke="white"
            strokeOpacity={spoke.opacity}
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
      <g fill="none" stroke="white" strokeOpacity="0.13" strokeWidth="1.2">
        {rings.map((radius, index) => (
          <circle
            cx={centerX}
            cy={centerY}
            key={index}
            r={radius}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}
