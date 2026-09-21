"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

interface NewsPost {
  id: number;
  title?: string;
  titulo?: string;
  shortdesc?: string;
  copete?: string;
  description?: string;
  content?: string;
  texto?: string;
  date_ins?: string;
  fecha?: string;
  categoria?: string;
  cat_name?: string;
  category?: string;
  url?: string;
  images?: { location: string; filename: string; image_type?: string }[];
}

type Orientation = "portrait" | "landscape" | "square";

// Límites del contenedor de imagen (ancho / alto): 3:4 vertical ... 16:9 horizontal.
// Fuera de ese rango la imagen se muestra completa (object-fit: contain) sobre un fondo desenfocado.
const MIN_RATIO = 0.75;
const MAX_RATIO = 1.78;
const DEFAULT_RATIO = 4 / 3;

function orientationOf(ratio: number): Orientation {
  if (ratio < 0.95) return "portrait";
  if (ratio > 1.05) return "landscape";
  return "square";
}

function buildSwiperOptions(showNav: boolean) {
  return {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 32,
    loop: showNav,
    navigation: showNav
      ? {
          nextEl: ".news-swiper-next",
          prevEl: ".news-swiper-prev",
        }
      : false,
    breakpoints: {
      768: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
    },
  };
}

function buildImageUrl(images: any[]): string | null {
  if (!images || images.length === 0) return null;
  const img =
    images.find(
      (i: any) => String(i.image_type || "").toLowerCase() === "render",
    ) || images[0];
  if (!img?.location || !img?.filename) return null;
  const base = process.env.NEXT_PUBLIC_IMAGES;
  const key = process.env.NEXT_PUBLIC_FILESERVER_KEY;
  return `${base}/${img.location}/${img.filename}${key ? `?key=${key}` : ""}`;
}

const HTML_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  aacute: "á",
  eacute: "é",
  iacute: "í",
  oacute: "ó",
  uacute: "ú",
  Aacute: "Á",
  Eacute: "É",
  Iacute: "Í",
  Oacute: "Ó",
  Uacute: "Ú",
  ntilde: "ñ",
  Ntilde: "Ñ",
  uuml: "ü",
  Uuml: "Ü",
  laquo: "«",
  raquo: "»",
  hellip: "…",
};

function decodeHtmlEntities(text: string): string {
  return text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity) => {
    if (entity[0] === "#") {
      const code =
        entity[1] === "x" || entity[1] === "X"
          ? parseInt(entity.slice(2), 16)
          : parseInt(entity.slice(1), 10);
      return Number.isNaN(code) ? match : String.fromCharCode(code);
    }
    return HTML_ENTITIES[entity] ?? match;
  });
}

function excerpt(html: string, maxLen = 170): string {
  const text = decodeHtmlEntities(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return "";
  return text.length > maxLen ? `${text.slice(0, maxLen).trim()}…` : text;
}

// Acepta "DD/MM/AAAA" o cualquier fecha que entienda Date (ISO, "AAAA-MM-DD hh:mm:ss").
function parseDate(value?: string): Date | null {
  if (!value) return null;
  const text = value.trim();
  const dmy = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(text);
  const date = dmy
    ? new Date(Number(dmy[3]), Number(dmy[2]) - 1, Number(dmy[1]))
    : new Date(text);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(value?: string): string {
  const d = parseDate(value);
  if (!d) return "";
  return d.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function MediaPlaceholder() {
  return (
    <div className="news-card-placeholder">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        viewBox="0 0 24 24"
        stroke="#ccc"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 9.75h18M3 6h18M3 12h18"
        />
      </svg>
    </div>
  );
}

// Mide la imagen real al cargar y adapta el contenedor a su proporción,
// sin importar qué imagen se suba (vertical, horizontal o cuadrada).
function NewsMedia({ src, children }: { src: string | null; children?: ReactNode }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [ratio, setRatio] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  const measure = useCallback(() => {
    const img = imgRef.current;
    if (img && img.naturalWidth > 0 && img.naturalHeight > 0) {
      setRatio(img.naturalWidth / img.naturalHeight);
    }
  }, []);

  // La imagen puede terminar de cargar (o fallar) antes de la hidratación: onLoad/onError no se dispararían.
  useEffect(() => {
    setRatio(null);
    setFailed(false);
    const img = imgRef.current;
    if (img?.complete) {
      if (img.naturalWidth > 0) measure();
      else setFailed(true);
    }
  }, [src, measure]);

  if (!src || failed) {
    return (
      <div className="news-card-media" style={{ aspectRatio: DEFAULT_RATIO }}>
        <MediaPlaceholder />
        {children}
      </div>
    );
  }

  const boxRatio = ratio
    ? Math.min(Math.max(ratio, MIN_RATIO), MAX_RATIO)
    : DEFAULT_RATIO;

  return (
    <div
      className="news-card-media"
      data-orientation={ratio ? orientationOf(ratio) : undefined}
      style={{ aspectRatio: boxRatio }}
    >
      <div
        className="news-card-media-bg"
        aria-hidden="true"
        style={{ backgroundImage: `url(${JSON.stringify(src)})` }}
      />
      <img
        ref={imgRef}
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        onLoad={measure}
        onError={() => setFailed(true)}
      />
      {children}
    </div>
  );
}

function NewsCard({ post }: { post: NewsPost }) {
  const title = post.title || post.titulo || "";
  const desc = excerpt(
    post.shortdesc ||
      post.copete ||
      post.description ||
      post.content ||
      post.texto ||
      "",
  );
  const category = post.categoria || post.cat_name || post.category || "";
  const date = formatDate(post.fecha || post.date_ins);
  const imgUrl = buildImageUrl(post.images || []);
  const url = `/publicaciones/${post.id}`;

  return (
    <article className="news-card">
      <NewsMedia src={imgUrl} />

      <div className="news-card-body">
        {(category || date) && (
          <div className="news-card-meta">
            {category && <span className="news-card-category">{category}</span>}
            {date && <span>{date}</span>}
          </div>
        )}
        <h3 className="news-card-title">
          <span className="news-card-title-text">{title}</span>
        </h3>
        {desc && <p className="news-card-desc">{desc}</p>}
        <span className="news-card-cta" aria-hidden="true">
          Conocé más
        </span>
      </div>

      <Link
        href={url}
        className="news-card-link"
        aria-label={title || "Ver publicación"}
      >
        {null}
      </Link>
    </article>
  );
}

export default function NewsSection({
  posts = [],
  title = "Últimas Noticias",
  eyebrow,
}: {
  posts: NewsPost[];
  title?: string;
  eyebrow?: string;
}) {
  if (!posts || posts.length === 0) return null;

  const showNav = posts.length > 3;
  const swiperOptions = buildSwiperOptions(showNav);

  return (
    <section className="news-section">
      <div className="news-section-inner">
        {/* Section header */}
        <div className="news-section-header">
          <div>
            {eyebrow && <p className="news-section-eyebrow">{eyebrow}</p>}
            {title && <h2 className="news-section-title">{title}</h2>}
          </div>

          <div className="news-section-actions">
            {showNav && (
              <div className="news-section-nav">
                <button
                  type="button"
                  aria-label="Anterior"
                  className="news-swiper-prev news-nav-btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Siguiente"
                  className="news-swiper-next news-nav-btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Cards carousel */}
        <Swiper {...swiperOptions} className="swiper news-swiper">
          {posts.map((post) => (
            <SwiperSlide key={post.id}>
              <NewsCard post={post} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .news-section {
          --news-bg: #fdfaf4;
          --news-card: #fff;
          --news-border: #e3ddd3;
          --news-ink: #111f34;
          --news-gold: #ca9c4e;
          --news-muted: #5e636f;
          --news-font-display: var(--tc-heading-font-family, inherit);
          --news-font-body: var(--tc-body-font-family, inherit);

          background: var(--news-bg);
          margin: 0;
          padding-block: 5rem;
        }

        .news-section-inner {
          width: 100%;
          max-width: 72rem;
          margin-inline: auto;
          padding-inline: 1.25rem;
        }

        .news-section-header {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .news-section-eyebrow {
          margin: 0;
          font-family: var(--news-font-body);
          font-size: 0.75rem;
          font-weight: 600;
          line-height: 1rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--news-gold);
        }

        .news-section-title {
          margin: 0.75rem 0 0;
          font-family: var(--news-font-display);
          font-size: 1.875rem;
          font-weight: 700;
          line-height: 2.25rem;
          color: var(--news-ink);
        }

        .news-section-title::after {
          content: "";
          display: block;
          width: 3.5rem;
          height: 2px;
          margin-top: 0.85rem;
          background: var(--news-gold);
        }

        .news-section-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .news-section-nav {
          display: flex;
          gap: 0.5rem;
        }

        .news-nav-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          padding: 0;
          border: 1px solid var(--news-ink);
          border-radius: 0;
          background: transparent;
          color: var(--news-ink);
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease;
        }

        .news-nav-btn:hover {
          background: var(--news-ink);
          color: #fff;
        }

        .news-nav-btn:focus-visible {
          outline: 2px solid var(--news-ink);
          outline-offset: 2px;
        }

        .news-nav-btn.swiper-button-disabled {
          opacity: 0.35;
          pointer-events: none;
        }

        .news-swiper .swiper-wrapper {
          align-items: stretch;
        }

        .news-swiper .swiper-slide {
          height: auto;
        }

        .news-card {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--news-card);
          border: 1px solid var(--news-border);
        }

        /* El aspect-ratio lo fija NewsMedia (inline) según la imagen real. */
        .news-card-media {
          position: relative;
          overflow: hidden;
          flex: none;
          background: var(--news-border);
          transition: aspect-ratio 0.25s ease;
        }

        /* Fondo desenfocado: rellena las barras cuando la imagen excede los límites de proporción. */
        .news-card-media-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: blur(22px) saturate(1.1);
          transform: scale(1.2);
        }

        .news-card-media img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.5s ease;
        }

        .news-card:hover .news-card-media img,
        .news-card:focus-within .news-card-media img {
          transform: scale(1.04);
        }

        .news-card-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .news-card-body {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          padding: 1.5rem;
        }

        .news-card-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--news-font-body);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--news-muted);
        }

        .news-card-category {
          color: var(--news-gold);
        }

        .news-card-title {
          margin: 0.75rem 0 0;
          font-family: var(--news-font-display);
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.375;
          color: var(--news-ink);
        }

        .news-card-title-text {
          position: relative;
        }

        .news-card-title-text::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          height: 1px;
          width: 0;
          background: var(--news-gold);
          transition: width 0.25s ease;
        }

        .news-card:hover .news-card-title-text::after,
        .news-card:focus-within .news-card-title-text::after {
          width: 100%;
        }

        .news-card-desc {
          flex: 1 1 auto;
          margin: 0.75rem 0 0;
          font-family: var(--news-font-body);
          font-size: 0.875rem;
          line-height: 1.625;
          color: var(--news-muted);
        }

        .news-card-cta {
          margin-top: 1.25rem;
          font-family: var(--news-font-body);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--news-ink);
          transition: color 0.2s ease;
        }

        .news-card:hover .news-card-cta,
        .news-card:focus-within .news-card-cta {
          color: var(--news-gold);
        }

        .news-card-link {
          position: absolute;
          inset: 0;
        }

        .news-card-link:focus-visible {
          outline: 2px solid var(--news-ink);
          outline-offset: -2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .news-card-media,
          .news-card-media img,
          .news-card-title-text::after,
          .news-nav-btn {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
