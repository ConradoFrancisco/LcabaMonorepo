import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  BookOpen,
  Archive,
  Landmark,
  MapPin,
  Dome,
  HeartHandshake,
} from "lucide-react";

type MenuButton = {
  label: string;
  href: string;
  icon?: LucideIcon;
  color?: string;
};

const PALETTE = [
  "#12A7B5",
  "#7B6FC7",
  "#B22894",
  "#F16A5B",
  "#5E9F52",
  "#4A3A73",
  "#E08A2E",
];

const defaultButtons: MenuButton[] = [
  { label: "Institucional", href: "/institucional", icon: Building2 },
  { label: "Acción Cultural", href: "/accion-cultural", icon: HeartHandshake },
  { label: "Biblioteca", href: "/biblioteca", icon: BookOpen },
  { label: "Hemeroteca", href: "/hemeroteca", icon: Archive },
  { label: "Museo", href: "/museo", icon: Dome },
  { label: "Patrimonio", href: "/patrimonio", icon: Landmark },
  { label: "Sitios Recomendados", href: "/sitios-recomendados", icon: MapPin },
];

export default function MenuButtons({
  buttons = defaultButtons,
}: {
  buttons?: MenuButton[];
}) {
  return (
    <div
      className="py-5"
      style={{
        background:
          "linear-gradient(120deg, #12A0D6 0%, #6B4FA0 20%, #E8622C 38%, #D6217A 52%, #8FC63A 68%, #1E9E8C 82%, #E08A2E 100%)",
      }}
    >
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h2
              className="text-white fw-bold mb-0"
              style={{ fontSize: "2rem" }}
            >
              CONOCÉ MÁS SOBRE NUESTRAS ÁREAS
            </h2>
          </div>
        </div>
        <div className="row g-3 justify-content-center">
          {buttons.map((btn, i) => {
            const Icon = btn.icon ?? Landmark;
            const color = btn.color ?? PALETTE[i % PALETTE.length];
            const letter = btn.label.trim().charAt(0).toLowerCase();
            return (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <Link
                  href={btn.href}
                  className="menu-btn-card d-flex align-items-center justify-content-between w-100 text-white text-decoration-none"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    background: color,
                    borderRadius: "6px",
                    minHeight: "110px",
                    padding: "1.25rem 1.5rem",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="menu-letter"
                    style={{
                      position: "absolute",
                      left: "-0.5rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 0,
                      fontSize: "6rem",
                      fontWeight: 800,
                      lineHeight: 1,
                      color: "rgba(255,255,255,0.18)",
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    {letter}
                  </span>
                  <span
                    className="fw-bold"
                    style={{
                      position: "relative",
                      zIndex: 1,
                      fontSize: "1.15rem",
                      paddingLeft: "2.5rem",
                    }}
                  >
                    {btn.label}
                  </span>
                  <Icon
                    aria-hidden="true"
                    size={40}
                    strokeWidth={1.5}
                    style={{
                      position: "relative",
                      zIndex: 1,
                      flexShrink: 0,
                      color: "rgba(255,255,255,0.9)",
                    }}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
                .menu-btn-card {
                    transition: transform 0.25s ease, box-shadow 0.25s ease;
                }
                .menu-btn-card:hover,
                .menu-btn-card:hover span {
                    color: #fff !important;
                }
                .menu-btn-card:hover .menu-letter {
                    color: rgba(0, 0, 0, 0.35) !important;
                }
                .menu-btn-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 24px rgba(255, 255, 255, 0.2);
                }
            `}</style>
    </div>
  );
}
