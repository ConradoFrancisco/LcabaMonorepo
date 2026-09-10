"use client";

import Link from "next/link";
import { useState } from "react";
import FallbackImage from "./FallbackImage";

interface InfoCardProps {
  id: number;
  title: string;
  description?: string;
  shortdesc?: string;
  imageUrl?: string;
  categoryColor: string;
  externalUrl?: string;
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

export default function InfoCard({
  id,
  title,
  description,
  shortdesc,
  imageUrl,
  categoryColor,
  externalUrl,
}: InfoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const rawDesc = stripHtml(description);
  const rawShort = stripHtml(shortdesc);
  const displayText = !isPlaceholder(rawDesc) ? rawDesc : !isPlaceholder(rawShort) ? rawShort : "";

  const href = externalUrl || `/publicaciones/${id}`;
  const isExternal = !!externalUrl;

  return (
    <div className="col-12 col-sm-6 col-lg-3 d-flex">
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer noopener" : undefined}
        className="text-decoration-none w-100 d-flex"
        style={{ color: "inherit" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="w-100 d-flex flex-column"
          style={{
            borderRadius: "18px",
            backgroundColor: "#ffffff",
            overflow: "hidden",
            border: isHovered ? `1.5px solid ${categoryColor}66` : "1.5px solid #e9ecef",
            boxShadow: isHovered
              ? "0 16px 32px -8px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04)"
              : "0 4px 16px rgba(0, 0, 0, 0.05)",
            transform: isHovered ? "translateY(-6px)" : "translateY(0)",
            transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
          }}
        >
          {/* ── Contenedor Imagen Cover ── */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "190px",
              overflow: "hidden",
              backgroundColor: "#f8fafc",
            }}
          >
            <FallbackImage
              src={imageUrl}
              alt={title}
              withBackground
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                transform: isHovered ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.45s ease",
                position: "absolute",
                inset: 0,
              }}
            />
            {/* Degradina sutil inferior para suavizar la transición al cuerpo */}
            {imageUrl && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0.2) 100%)",
                  pointerEvents: "none",
                }}
              />
            )}

            {/* Borde sutil superior con el color de la categoría */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                backgroundColor: categoryColor,
              }}
            />
          </div>

          {/* ── Contenido de la Card ── */}
          <div
            className="d-flex flex-column flex-grow-1"
            style={{
              padding: "18px 18px 16px 18px",
              gap: "10px",
            }}
          >
            {/* Título */}
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: isHovered ? categoryColor : "#1e293b",
                lineHeight: 1.35,
                margin: 0,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                transition: "color 0.2s ease",
              }}
              title={title}
            >
              {title}
            </h3>

            {/* Descripción completa o multilínea limpia */}
            {displayText && (
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#64748b",
                  lineHeight: 1.55,
                  margin: 0,
                  whiteSpace: "pre-line",
                  display: "-webkit-box",
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {displayText}
              </p>
            )}

            {/* Footer / Botón CTA */}
            <div
              className="mt-auto d-flex align-items-center justify-content-between pt-3"
              style={{
                borderTop: "1px solid #f1f5f9",
              }}
            >
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: categoryColor,
                  letterSpacing: "0.03em",
                }}
              >
                {isExternal ? "Accedé" : "Ver más"}
              </span>

              <span
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: isHovered ? categoryColor : `${categoryColor}18`,
                  color: isHovered ? "#ffffff" : categoryColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.25s ease",
                  transform: isHovered ? "translateX(3px)" : "translateX(0)",
                }}
              >
                <i
                  className={isExternal ? "fa-solid fa-arrow-up-right-from-square" : "fa-solid fa-arrow-right"}
                  style={{ fontSize: "0.7rem" }}
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
