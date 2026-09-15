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
  image?: string;
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

const IMG_BASE = "/assets/imgs/menu-buttons";

const defaultButtons: MenuButton[] = [
  {
    label: "Institucional",
    href: "/institucional",
    icon: Building2,
    image: `${IMG_BASE}/institucional.jpeg`,
  },
  {
    label: "Acción Cultural",
    href: "/accion-cultural",
    icon: HeartHandshake,
    image: `${IMG_BASE}/accion-cultural.jpg`,
  },
  {
    label: "Biblioteca",
    href: "/biblioteca",
    icon: BookOpen,
    image: `${IMG_BASE}/biblioteca.jpg`,
  },
  {
    label: "Hemeroteca",
    href: "/hemeroteca",
    icon: Archive,
    image: `${IMG_BASE}/hemeroteca.jpg`,
  },
  {
    label: "Museo",
    href: "/museo",
    icon: Dome,
    image: `${IMG_BASE}/museo.jpg`,
  },
  {
    label: "Patrimonio",
    href: "/patrimonio",
    icon: Landmark,
    image: `${IMG_BASE}/patrimonio.jpg`,
  },
  {
    label: "Sitios Recomendados",
    href: "/sitios-recomendados",
    icon: MapPin,
    image: `${IMG_BASE}/sitios-recomendados.jpg`,
  },
];

export default function MenuButtons({
  buttons = defaultButtons,
  title = "CONOCÉ MÁS SOBRE NUESTRAS ÁREAS",
  description = "Recorré cada una de nuestras áreas: cultura, patrimonio, memoria y participación ciudadana, todo en un mismo lugar.",
}: {
  buttons?: MenuButton[];
  title?: string;
  description?: string;
}) {
  return (
    <div className="py-5" style={{ background: "#F1EFEA" }}>
      <div className="container">
        <div className="row align-items-end mb-4 gy-3">
          <div className="col-lg-7">
            <h2
              className="fw-bold mb-0"
              style={{
                fontSize: "2.25rem",
                color: "#17171A",
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h2>
          </div>
          <div className="col-lg-5">
            <p
              className="mb-0 text-lg-end"
              style={{ color: "#6B6A66", fontSize: "0.95rem" }}
            >
              {description}
            </p>
          </div>
        </div>

        <div className="menu-bento">
          {buttons.map((btn, i) => {
            const Icon = btn.icon ?? Landmark;
            const color = btn.color ?? PALETTE[i % PALETTE.length];
            const isLarge = i % 4 === 0;
            const hasImage = Boolean(btn.image);
            return (
              <Link
                key={i}
                href={btn.href}
                className={`menu-bento-card text-decoration-none${
                  isLarge ? " menu-bento-card--lg" : ""
                }${hasImage ? " menu-bento-card--photo" : ""}`}
              >
                {hasImage && (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={btn.image}
                      alt=""
                      aria-hidden="true"
                      className="menu-bento-photo"
                    />
                    <span className="menu-bento-scrim" aria-hidden="true" />
                  </>
                )}
                <span
                  className="menu-bento-icon"
                  style={
                    hasImage
                      ? { background: "rgba(255,255,255,0.2)", color: "#fff" }
                      : { background: `${color}1F`, color }
                  }
                >
                  <Icon size={isLarge ? 34 : 26} strokeWidth={1.6} />
                </span>
                <span className="menu-bento-label">{btn.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
                .menu-bento {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-auto-rows: 150px;
                    gap: 1rem;
                }
                .menu-bento-card {
                    position: relative;
                    background: #ffffff;
                    border-radius: 1.25rem;
                    border: 1px solid rgba(0, 0, 0, 0.06);
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    gap: 0.9rem;
                    overflow: hidden;
                    transition: transform 0.25s ease, box-shadow 0.25s ease;
                }
                .menu-bento-card--lg {
                    grid-row: span 2;
                    justify-content: space-between;
                }
                .menu-bento-photo {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: 0;
                    transition: transform 0.4s ease;
                }
                .menu-bento-scrim {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    background: linear-gradient(
                        180deg,
                        rgba(10, 10, 12, 0) 35%,
                        rgba(10, 10, 12, 0.78) 100%
                    );
                }
                .menu-bento-card--photo:hover .menu-bento-photo {
                    transform: scale(1.05);
                }
                .menu-bento-icon {
                    position: relative;
                    z-index: 1;
                    width: 3.25rem;
                    height: 3.25rem;
                    border-radius: 0.9rem;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .menu-bento-label {
                    position: relative;
                    z-index: 1;
                    font-weight: 700;
                    font-size: 1.05rem;
                    color: #17171a;
                }
                .menu-bento-card--photo .menu-bento-label {
                    color: #ffffff;
                }
                .menu-bento-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
                }
                @media (max-width: 767px) {
                    .menu-bento {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .menu-bento-card--lg {
                        grid-row: span 1;
                    }
                }
            `}</style>
    </div>
  );
}
