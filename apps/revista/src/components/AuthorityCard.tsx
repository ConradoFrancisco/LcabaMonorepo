"use client";

import Link from "next/link";
import { useState } from "react";
import FallbackImage from "./FallbackImage";

interface AuthorityCardProps {
  id: number;
  name: string; // Título (ej: CLARA MUZZIO)
  role?: string; // Cargo (ej: Presidente de la Legislatura...)
  quote?: string; // Texto / cita / bajada
  imageUrl?: string;
  categoryColor: string;
}

function stripHtml(html?: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&aacute;/g, "á")
    .replace(/&eacute;/g, "é")
    .replace(/&iacute;/g, "í")
    .replace(/&oacute;/g, "ó")
    .replace(/&uacute;/g, "ú")
    .replace(/&ntilde;/g, "ñ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isPlaceholder(text: string): boolean {
  const t = text.trim().toLowerCase();
  return t === "-" || t === "" || t === "." || t === "null";
}

export default function AuthorityCard({
  id,
  name,
  role,
  quote,
  imageUrl,
  categoryColor,
}: AuthorityCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cleanQuote = stripHtml(quote);
  const cleanRole = stripHtml(role);
  const displayQuote = !isPlaceholder(cleanQuote) ? cleanQuote : "";
  const displayRole = !isPlaceholder(cleanRole) ? cleanRole : "";

  return (
    <div className="col-12">
      <Link
        href={`/publicaciones/${id}`}
        className="text-decoration-none text-reset d-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="d-flex flex-column flex-md-row"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "24px",
            overflow: "hidden",
            border: isHovered ? `1.5px solid ${categoryColor}66` : "1.5px solid #e9ecef",
            boxShadow: isHovered
              ? "0 20px 35px -10px rgba(0,0,0,0.12), 0 6px 15px rgba(0,0,0,0.04)"
              : "0 4px 18px rgba(0,0,0,0.05)",
            transform: isHovered ? "translateY(-4px)" : "translateY(0)",
            transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
            minHeight: "240px",
          }}
        >
          {/* ── Foto / Imagen Izquierda ── */}
          <div
            className="col-12 col-md-4 col-lg-4 position-relative"
            style={{
              overflow: "hidden",
              minHeight: "220px",
              backgroundColor: "#f1f5f9",
            }}
          >
            <FallbackImage
              src={imageUrl || undefined}
              alt={name}
              withBackground
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                transform: isHovered ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.45s ease",
                position: "absolute",
                inset: 0,
              }}
            />
            {/* Degradina sutil a la derecha para pantallas md+ */}
            {imageUrl && (
              <div
                className="d-none d-md-block position-absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(0,0,0,0) 70%, rgba(255,255,255,0.15) 100%)",
                  pointerEvents: "none",
                }}
              />
            )}

            {/* Borde acento vertical o superior */}
            <div
              className="position-absolute"
              style={{
                top: 0,
                bottom: 0,
                left: 0,
                width: "5px",
                backgroundColor: categoryColor,
              }}
            />
          </div>

          {/* ── Textos / Contenido Derecho ── */}
          <div
            className="col-12 col-md-8 col-lg-8 p-4 p-lg-5 d-flex flex-column justify-content-between"
            style={{ gap: "14px" }}
          >
            <div>
              {/* Nombre de la autoridad */}
              <h2
                className="fw-bold text-uppercase m-0"
                style={{
                  fontSize: "1.35rem",
                  letterSpacing: "0.02em",
                  color: isHovered ? categoryColor : "#111827",
                  transition: "color 0.2s ease",
                }}
              >
                {name}
              </h2>

              {/* Cargo / Subtítulo */}
              {displayRole && (
                <div
                  className="mt-1"
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "#64748b",
                  }}
                >
                  {displayRole}
                </div>
              )}

              {/* Cita / Bajada / Texto */}
              {displayQuote && (
                <p
                  className="mt-3"
                  style={{
                    fontSize: "0.92rem",
                    color: "#334155",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {displayQuote}
                </p>
              )}
            </div>

            {/* Botón Leer más en esquina inferior derecha */}
            <div className="d-flex justify-content-end align-items-center pt-2">
              <span
                className="d-inline-flex align-items-center justify-content-center px-4 py-2 fw-medium"
                style={{
                  backgroundColor: isHovered ? "#cbd5e1" : "#e2e8f0",
                  color: "#334155",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  transition: "all 0.2s ease",
                  border: "1px solid #cbd5e1",
                }}
              >
                Leer más
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
