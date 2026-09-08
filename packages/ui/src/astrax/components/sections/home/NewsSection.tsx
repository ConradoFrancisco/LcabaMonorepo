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

const swiperOptions = {
  modules: [Navigation],
  slidesPerView: 1,
  spaceBetween: 24,
  navigation: {
    nextEl: ".news-swiper-next",
    prevEl: ".news-swiper-prev",
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
  },
};

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

function excerpt(html: string, maxLen = 130): string {
  const text = decodeHtmlEntities(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return "";
  return text.length > maxLen ? `${text.slice(0, maxLen).trim()}…` : text;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function NewsCard({ post }: { post: NewsPost }) {
  const title = post.title || post.titulo || "";
  const desc = excerpt(
    post.shortdesc || post.copete || post.description || post.content || post.texto || "",
  );
  const eyebrow =
    post.categoria ||
    post.cat_name ||
    post.category ||
    formatDate(post.fecha || post.date_ins);
  const imgUrl = buildImageUrl(post.images || []);
  const url = `/publicaciones/${post.id}`;

  return (
    <div className="h-100">
      {/* Image */}
      <Link
        href={url}
        className="d-block overflow-hidden"
        style={{ height: "260px", borderRadius: "14px" }}
      >
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={title}
            className="w-100 h-100"
            style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
          />
        ) : (
          <div
            className="w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: "#f0f0f0" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={48}
              height={48}
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
      </Link>

      <div className="pt-3">
        {eyebrow && (
          <span
            className="d-block fw-bold text-dark mb-1"
            style={{ fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            {eyebrow}
          </span>
        )}
        <Link href={url} className="d-block">
          <h5
            className="text-dark fw-bold mb-2"
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.35,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </h5>
        </Link>
        {desc && (
          <p
            className="mb-2"
            style={{
              fontSize: "0.9rem",
              color: "#4a4a4a",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.6,
            }}
          >
            {desc}
          </p>
        )}
        <Link
          href={url}
          className="fw-bold text-uppercase"
          style={{
            fontSize: "0.8rem",
            letterSpacing: "0.03em",
            color: "var(--tc-primary-color, #f6bd43)",
          }}
        >
          + Leer más...
        </Link>
      </div>
    </div>
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

  return (
    <section className="py-80">
      <div className="container-fluid" style={{ maxWidth: "1680px", paddingInline: "clamp(1.25rem, 4vw, 4rem)" }}>
        {/* Section header */}
        <div className="row mb-4 mb-lg-5">
          <div className="col-12">
            <h2 className="text-dark fw-bold mb-0" style={{ fontSize: "2rem" }}>
              {title}
            </h2>
          </div>
        </div>

        {/* Cards carousel */}
        <div className="position-relative">
          <Swiper {...swiperOptions} className="swiper news-swiper">
            {posts.map((post) => (
              <SwiperSlide key={post.id}>
                <NewsCard post={post} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            aria-label="Anterior"
            className="news-swiper-prev d-none d-md-flex align-items-center justify-content-center position-absolute top-0"
            style={{
              left: "-22px",
              width: "44px",
              height: "260px",
              background: "transparent",
              border: "none",
              zIndex: 5,
              cursor: "pointer",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            className="news-swiper-next d-none d-md-flex align-items-center justify-content-center position-absolute top-0"
            style={{
              right: "-22px",
              width: "44px",
              height: "260px",
              background: "transparent",
              border: "none",
              zIndex: 5,
              cursor: "pointer",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .news-swiper-prev.swiper-button-disabled,
        .news-swiper-next.swiper-button-disabled {
          opacity: 0.25;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}
