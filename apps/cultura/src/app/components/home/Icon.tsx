// Material Symbols Outlined: la fuente se carga desde page.tsx (ver <link> de Google Fonts).
export default function Icon({
  name,
  size,
  filled = false,
  className = "",
}: {
  name: string;
  size?: number;
  filled?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`cl-icon ${filled ? "cl-icon--filled" : ""} ${className}`.trim()}
      style={size ? { fontSize: size } : undefined}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
