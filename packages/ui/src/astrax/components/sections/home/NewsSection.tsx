"use client";

import Link from "next/link";
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

function buildSwiperOptions(showNav: boolean) {
  return {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 28,
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

function formatDateParts(dateStr?: string): { day: string; month: string } | null {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return null;
    const day = d.toLocaleDateString("es-AR", { day: "2-digit" });
    const month = d
      .toLocaleDateString("es-AR", { month: "short" })
      .replace(".", "")
      .toUpperCase();
    return { day, month };
  } catch {
    return null;
  }
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
  const dateParts = formatDateParts(post.fecha || post.date_ins);
  const imgUrl = buildImageUrl(post.images || []);
  const url = `/publicaciones/${post.id}`;

  return (
    <article className="news-card h-100">
      <div className="news-card-media">
        {imgUrl ? (
          <img src={imgUrl} alt="" />
        ) : (
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
        )}
        {dateParts && (
          <span className="news-card-date" aria-hidden="true">
            <strong>{dateParts.day}</strong>
            <em>{dateParts.month}</em>
          </span>
        )}
      </div>

      <div className="news-card-body">
        {category && <span className="news-card-eyebrow">{category}</span>}
        <h5 className="news-card-title">{title}</h5>
        {desc && <p className="news-card-desc">{desc}</p>}
        <span className="news-card-cta" aria-hidden="true">
          Leer más
          <span className="news-card-cta-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={13}
              height={13}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
            </svg>
          </span>
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
}: {
  posts: NewsPost[];
  title?: string;
}) {
  if (!posts || posts.length === 0) return null;

  const showNav = posts.length > 3;
  const swiperOptions = buildSwiperOptions(showNav);

  return (
    <section className="news-section py-80">
      <div
        className="container-fluid"
        style={{
          maxWidth: "1680px",
          paddingInline: "clamp(1.25rem, 4vw, 4rem)",
        }}
      >
        {/* Section header */}
        <div className="news-section-header">
          <div>
            <h2 className="news-section-title">{title}</h2>
          </div>

          {showNav && (
            <div className="news-section-nav">
              <button
                type="button"
                aria-label="Anterior"
                className="news-swiper-prev news-nav-btn news-nav-btn--prev"
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
                className="news-swiper-next news-nav-btn news-nav-btn--next"
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

        {/* Cards carousel */}
        <Swiper {...swiperOptions} className="swiper news-swiper">
          {posts.map((post) => (
            <SwiperSlide key={post.id}>
              <NewsCard post={post} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Ver todas */}
        <div className="news-section-footer">
          <Link href="/publicaciones" className="news-view-all">
            Ver todas
          </Link>
        </div>
      </div>

      <style>{`
        .news-section {
          background: var(--news-bg, #f7e8d2);
          margin: 0;
          box-shadow: 0 1px 0 rgba(23, 20, 18, 0.04);
        }

        .news-section-header {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .news-section-title {
          font-family: var(--tc-heading-font-family, inherit);
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 700;
          color: #171412;
          margin: 0;
        }

        .news-section-nav {
          display: flex;
          gap: 0.6rem;
        }

        .news-nav-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          padding: 0;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.15s ease, background-color 0.15s ease, opacity 0.15s ease;
        }

        .news-nav-btn--prev {
          background: #fff;
          border: 1.5px solid #d8cdb9;
          color: #171412;
        }

        .news-nav-btn--next {
          background: #171412;
          border: 1.5px solid #171412;
          color: #fff;
        }

        .news-nav-btn:hover {
          transform: translateY(-2px);
        }

        .news-nav-btn:focus-visible,
        .news-view-all:focus-visible {
          outline: 2.5px solid #171412;
          outline-offset: 2px;
        }

        .news-nav-btn.swiper-button-disabled {
          opacity: 0.35;
          pointer-events: none;
          transform: none;
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
          background: #fff;
          border-radius: 26px;
          overflow: hidden;
          box-shadow: 0 10px 28px rgba(23, 20, 18, 0.07);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .news-card:hover,
        .news-card:focus-within {
          transform: translateY(-5px);
          box-shadow: 0 20px 36px rgba(23, 20, 18, 0.13);
        }

        .news-card-media {
          position: relative;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          background: #efece5;
        }

        .news-card-media img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .news-card:hover .news-card-media img,
        .news-card:focus-within .news-card-media img {
          transform: scale(1.06);
        }

        .news-card-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .news-card-date {
          position: absolute;
          top: 1rem;
          left: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1;
          padding: 0.5rem 0.65rem 0.45rem;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 6px 16px rgba(23, 20, 18, 0.18);
        }

        .news-card-date strong {
          font-family: var(--tc-heading-font-family, inherit);
          font-size: 1.1rem;
          font-weight: 800;
          color: #171412;
        }

        .news-card-date em {
          margin-top: 0.2rem;
          font-style: normal;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--tc-primary-color, #b8862f);
        }

        .news-card-body {
          padding: 1.6rem 1.6rem 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          flex: 1 1 auto;
        }

        .news-card-eyebrow {
          display: inline-block;
          width: fit-content;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--tc-primary-color, #b8862f);
        }

        .news-card-title {
          font-family: var(--tc-heading-font-family, inherit);
          font-size: 1.2rem;
          font-weight: 700;
          line-height: 1.3;
          color: #171412;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .news-card-desc {
          font-family: var(--tc-body-font-family, inherit);
          font-size: 0.88rem;
          line-height: 1.6;
          color: #6b6259;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .news-card-cta {
          margin-top: auto;
          align-self: flex-end;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: #171412;
          color: #fff;
          border-radius: 999px;
          padding: 0.5rem 0.5rem 0.5rem 1.15rem;
          font-size: 0.82rem;
          font-weight: 700;
        }

        .news-card-cta-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #fff;
          color: #171412;
          transition: transform 0.25s ease;
        }

        .news-card:hover .news-card-cta-icon,
        .news-card:focus-within .news-card-cta-icon {
          transform: translateX(3px);
        }

        .news-card-link {
          position: absolute;
          inset: 0;
          border-radius: inherit;
        }

        .news-card-link:focus-visible {
          outline: 2.5px solid #171412;
          outline-offset: -2px;
        }

        @media (min-width: 768px) {
          .news-card-body {
            padding: 1.85rem 1.85rem 1.6rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .news-card,
          .news-card-media img,
          .news-card-cta-icon,
          .news-nav-btn,
          .news-view-all {
            transition: none !important;
            transform: none !important;
          }
        }

        .news-section-footer {
          display: flex;
          justify-content: flex-end;
          margin-top: 2rem;
        }

        .news-view-all {
          display: inline-flex;
          align-items: center;
          padding: 0.65rem 1.4rem;
          border-radius: 999px;
          background: #fff;
          border: 1.5px solid #171412;
          color: #171412;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          transition: transform 0.15s ease;
        }

        .news-view-all:hover {
          transform: translateY(-1px);
          color: #171412;
        }
      `}</style>
    </section>
  );
}
