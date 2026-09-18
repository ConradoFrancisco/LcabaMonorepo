type SectionWaveProps = {
  topColor?: string;
  bottomColor?: string;
  dotColor?: string;
  flip?: boolean;
  className?: string;
};

export default function SectionWave({
  topColor = "#ffffff",
  bottomColor = "#F1EFEA",
  dotColor = "var(--tc-primary-color, #6c3db5)",
  flip = false,
  className = "",
}: SectionWaveProps) {
  return (
    <div
      className={`section-wave ${className}`}
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        height: "90px",
        overflow: "hidden",
        lineHeight: 0,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          background: topColor,
        }}
      >
        <path
          d="M0,40 C150,95 350,0 600,45 C850,90 1050,5 1200,55 L1200,120 L0,120 Z"
          fill={bottomColor}
        />
        <circle cx="90" cy="35" r="7" fill={bottomColor} opacity="0.55" />
        <circle cx="640" cy="18" r="10" fill={dotColor} opacity="0.9" />
        <circle cx="682" cy="44" r="5" fill={dotColor} opacity="0.7" />
        <circle cx="1080" cy="30" r="8" fill={dotColor} opacity="0.85" />
      </svg>
    </div>
  );
}
