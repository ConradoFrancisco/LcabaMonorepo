"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import Icon from "./Icon";
import {
  buildImageUrl,
  postCategory,
  postDate,
  postExcerpt,
  postHref,
  postTitle,
  type HomePost,
} from "./utils";

const PAGE_SIZE = 3;

// Dentro de este rango de proporciones (ancho / alto) la foto llena la tarjeta;
// fuera de él (afiches verticales, panorámicas) se muestra completa sobre un fondo desenfocado.
const COVER_MIN_RATIO = 1.2;
const COVER_MAX_RATIO = 2.1;

function fitFor(img: HTMLImageElement): "cover" | "contain" {
  const ratio = img.naturalWidth / img.naturalHeight;
  return ratio < COVER_MIN_RATIO || ratio > COVER_MAX_RATIO ? "contain" : "cover";
}

function CardMedia({ src }: { src: string | null }) {
  const [fit, setFit] = useState<"cover" | "contain">("cover");
  const [failed, setFailed] = useState(false);

  // La imagen puede terminar de cargar (o fallar) antes de la hidratación: onLoad/onError no se dispararían.
  const imgRef = useCallback((img: HTMLImageElement | null) => {
    if (!img?.complete) return;
    if (img.naturalWidth > 0) setFit(fitFor(img));
    else setFailed(true);
  }, []);

  if (!src || failed) {
    return (
      <div className="cl-card__placeholder" aria-hidden="true">
        <Icon name="image" size={40} />
      </div>
    );
  }

  return (
    <>
      {fit === "contain" && (
        <div
          className="cl-card__media-bg"
          aria-hidden="true"
          style={{ backgroundImage: `url(${JSON.stringify(src)})` }}
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className={`cl-card__img cl-card__img--${fit}`}
        onLoad={(e) => setFit(fitFor(e.currentTarget))}
        onError={() => setFailed(true)}
      />
    </>
  );
}

function NewsCard({ post }: { post: HomePost }) {
  const title = postTitle(post);
  const desc = postExcerpt(post);
  const category = postCategory(post);
  const date = postDate(post);
  const href = postHref(post);

  return (
    <article className="cl-card">
      <div className="cl-card__media">
        <CardMedia src={buildImageUrl(post.images)} />
        {category && (
          <div className="cl-card__badge-wrap">
            <span className="cl-card__badge">{category}</span>
          </div>
        )}
      </div>
      <div className="cl-card__body">
        <div>
          {date && (
            <div className="cl-card__date">
              <Icon name="calendar_today" size={14} />
              <time dateTime={date.iso}>{date.label}</time>
            </div>
          )}
          <h3 className="cl-card__title">
            <Link href={href}>{title}</Link>
          </h3>
          {desc && <p className="cl-card__desc">{desc}</p>}
        </div>
        <div className="cl-card__footer">
          <Link href={href} className="cl-pill" aria-label={`Leer más: ${title}`}>
            <span>Leer más</span>
            <Icon name="arrow_forward" size={12} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function NewsSection({
  posts = [],
  title = "NOVEDADES",
  eyebrow = "ACTUALIDAD Y ACTIVIDADES",
}: {
  posts?: HomePost[];
  title?: string;
  eyebrow?: string;
}) {
  const [page, setPage] = useState(0);
  if (posts.length === 0) return null;

  const pages = Math.ceil(posts.length / PAGE_SIZE);
  const current = Math.min(page, pages - 1);
  const visible = posts.slice(current * PAGE_SIZE, (current + 1) * PAGE_SIZE);
  const go = (delta: number) => setPage((current + delta + pages) % pages);

  return (
    <section className="cl-section cl-news" id="novedades">
      <div className="cl-news__head">
        <div>
          <div className="cl-news__eyebrow">
            <span className="cl-news__dot" aria-hidden="true" />
            <span>{eyebrow}</span>
          </div>
          <h2 className="cl-news__title">{title}</h2>
        </div>
        {pages > 1 && (
          <div className="cl-news__arrows">
            <button type="button" className="cl-round-btn" aria-label="Anterior" onClick={() => go(-1)}>
              <Icon name="chevron_left" size={18} />
            </button>
            <button type="button" className="cl-round-btn" aria-label="Siguiente" onClick={() => go(1)}>
              <Icon name="chevron_right" size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="cl-news__grid">
        {visible.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
