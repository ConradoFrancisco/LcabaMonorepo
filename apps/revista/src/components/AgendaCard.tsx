"use client";

import FallbackImage from "./FallbackImage";

// ── Helpers ───────────────────────────────────────────────────────────────────

const DAY_MAP: Record<string, number> = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
};

const DAY_ES: Record<string, string> = {
  Monday: "Lunes",
  Tuesday: "Martes",
  Wednesday: "Miércoles",
  Thursday: "Jueves",
  Friday: "Viernes",
  Saturday: "Sábado",
  Sunday: "Domingo",
};

function dayTranslate(day?: string): string {
  if (!day) return "";
  return DAY_ES[day] ?? day;
}

function getDayIndex(day: string): number {
  return DAY_MAP[day] ?? -1;
}

function formatAgendaDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("es-AR", { day: "2-digit", month: "long" });
  } catch {
    return dateStr;
  }
}

function deduplicateDays(dias: any[]): any[] {
  if (!dias || dias.length === 0) return [];
  const seen = new Set<string>();
  return dias.filter((dia) => {
    const key = `${dia?.day}-${dia?.hour_start}-${dia?.hour_end}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function formatDayRange(dias: any[]): string {
  if (!dias || dias.length === 0) return "";
  const sorted = [...dias].sort((a, b) => getDayIndex(a.day) - getDayIndex(b.day));
  const first = dayTranslate(sorted[0]?.day);
  const last = dayTranslate(sorted[sorted.length - 1]?.day);
  return dias.length === 1 ? `Todos los ${first}s` : `De ${first} a ${last}`;
}

function formatDayHeading(dias: any[]): string {
  if (!dias || dias.length === 0) return "";
  const sorted = [...dias].sort((a, b) => getDayIndex(a.day) - getDayIndex(b.day));
  const allSameDay = sorted.every((d) => d.day === sorted[0].day);

  if (sorted.length === 1) {
    const name = dayTranslate(sorted[0]?.day);
    const date = sorted[0]?.date ? ` ${formatAgendaDate(sorted[0].date)}` : "";
    return `${name}${date}`;
  }

  if (allSameDay) {
    const items = sorted.map((d) => {
      const name = dayTranslate(d.day);
      const date = d?.date ? ` ${formatAgendaDate(d.date)}` : "";
      return `${name}${date}`;
    });
    if (items.length === 2) return `${items[0]} y ${items[1]}`;
    return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
  }

  if (sorted.length === 2) {
    return `${dayTranslate(sorted[0].day)} y ${dayTranslate(sorted[1].day)}`;
  }

  return formatDayRange(sorted);
}

// ── Component ─────────────────────────────────────────────────────────────────

interface AgendaCardProps {
  post: any;
  categoryColor: string;
}

export default function AgendaCard({ post, categoryColor }: AgendaCardProps) {
  const baseImg = process.env.NEXT_PUBLIC_IMAGES;
  const fileKey = process.env.NEXT_PUBLIC_FILESERVER_KEY;

  // Extraer datos — soporta estructura plana (lista) y detail (textos/images)
  const textos = post?.textos || {};
  const titulo = textos?.title || post?.titulo || "";
  const descripcion = textos?.description || post?.descripcion || "";
  const extra = textos?.extra || post?.extra || "";

  // Imagen
  const imgFile = post?.images?.[0] || null;
  const imgUrl = imgFile?.location && imgFile?.filename
    ? `${baseImg}/${imgFile.location}${imgFile.filename}${fileKey ? `?key=${fileKey}` : ""}`
    : post?.location && post?.filename
    ? `${baseImg}/${post.location}/${post.filename}`
    : null;

  // Días: buscar en distintos lugares posibles
  const originalDays: any[] = post?.dias || post?.detail?.dias || [];
  const dedupedDays = deduplicateDays(originalDays);

  // Heading de días
  let dayHeading = "";
  if (originalDays.length > 0) {
    dayHeading = formatDayHeading(originalDays);
  } else if (post?.date && post?.day !== "NULL") {
    dayHeading = formatAgendaDate(post.date);
  }

  // Horario fallback (cuando no hay dias)
  const hourStart = post?.hour_start?.slice(0, 5) || "";
  const hourEnd = post?.hour_end?.slice(0, 5) || "";

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-12 d-flex">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          border: "1px solid #f1f5f9",
          width: "100%",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        className="agenda-card"
      >
        {/* Imagen */}
        <div style={{ position: "relative", overflow: "hidden", height: "200px", background: "#f8fafc" }}>
          <FallbackImage
            src={imgUrl ?? undefined}
            alt={titulo}
            withBackground
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              padding: "8px",
            }}
          />

          {/* Badge de días */}
          {dayHeading && (
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                right: "10px",
                backgroundColor: categoryColor,
                color: "#fff",
                borderRadius: "8px",
                padding: "4px 10px",
                fontSize: "0.78rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              📅 {dayHeading}
            </div>
          )}
        </div>

        {/* Contenido */}
        <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
          {/* Título */}
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: 800,
              color: "#1e293b",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {titulo}
          </h3>

          {/* Horarios */}
          {dedupedDays.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {dedupedDays.map((dia, i) => (
                <div
                  key={`${dia?.day}-${dia?.hour_start}-${i}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.82rem",
                    color: "#475569",
                    fontWeight: 600,
                  }}
                >
                  <span style={{ color: categoryColor }}>🕐</span>
                  <span>
                    {dayTranslate(dia?.day)}{" "}
                    {dia?.hour_start?.slice(0, 5)}
                    {dia?.hour_end ? ` - ${dia.hour_end.slice(0, 5)}` : ""} hs
                  </span>
                </div>
              ))}
            </div>
          ) : hourStart ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.82rem",
                color: "#475569",
                fontWeight: 600,
              }}
            >
              <span style={{ color: categoryColor }}>🕐</span>
              <span>
                {hourStart}
                {hourEnd ? ` - ${hourEnd}` : ""} hs
              </span>
            </div>
          ) : null}

          {/* Descripción / Lugar */}
          {descripcion && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "6px",
                fontSize: "0.82rem",
                color: "#64748b",
                lineHeight: 1.5,
              }}
            >
              <span style={{ flexShrink: 0, marginTop: "1px" }}>📍</span>
              <div dangerouslySetInnerHTML={{ __html: descripcion }} />
            </div>
          )}

          {/* Spacer para empujar botón al fondo */}
          <div style={{ flex: 1 }} />

          {/* Botón Leer más */}
          {extra && (
            <a
              href={`/publicaciones/${post?.id || post?.post_id}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "9px 20px",
                backgroundColor: "transparent",
                color: categoryColor,
                border: `2px solid ${categoryColor}`,
                borderRadius: "999px",
                textDecoration: "none",
                fontWeight: 700,
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                transition: "all 0.2s",
                alignSelf: "flex-start",
              }}
            >
              Leer más →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
