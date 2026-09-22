"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Icon from "./Icon";
import {
  buildImageUrls,
  postCategory,
  postExcerpt,
  postHref,
  postTitle,
  type HomePost,
} from "./utils";

const AUTOPLAY_MS = 5000;

// Foto de fondo del hero: la de tipo "slider"; si no hay, la gráfica "render".
const HERO_IMAGE_TYPES = ["slider", "render"];

// Fondo de una diapositiva. Si una imagen no carga (archivo faltante en el file server) pasa a la siguiente.
function HeroBg({ urls, current }: { urls: string[]; current: boolean }) {
  const [attempt, setAttempt] = useState(0);
  const src = urls[attempt];
  // El error puede ocurrir antes de la hidratación, cuando onError todavía no está enganchado.
  const imgRef = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth === 0) setAttempt((n) => n + 1);
  }, []);
  if (!src) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt=""
      aria-hidden="true"
      className={`cl-hero__bg ${current ? "is-current" : ""}`}
      onError={() => setAttempt((n) => n + 1)}
    />
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function HeroSlider({ posts = [] }: { posts?: HomePost[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = posts.length;

  const go = useCallback(
    (delta: number) => setIndex((i) => (i + delta + total) % total),
    [total],
  );

  useEffect(() => {
    if (total < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [total, paused, go]);

  if (total === 0) return null;

  const post = posts[index];
  const title = postTitle(post);
  const desc = postExcerpt(post, 220);
  const category = postCategory(post);

  return (
    <section
      className="cl-hero"
      aria-roledescription="carrusel"
      aria-label="Novedades destacadas"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {posts.map((p, i) => (
        <HeroBg key={p.id} urls={buildImageUrls(p.images, HERO_IMAGE_TYPES)} current={i === index} />
      ))}
      <div className="cl-hero__scrim" />

      <div className="cl-hero__content">
        <div className="cl-hero__text" key={post.id}>
          <div className="cl-badge">
            <Icon name="campaign" size={14} />
            <span>NOVEDADES</span>
          </div>
          <h1 className="cl-hero__title">{title}</h1>
          {desc && <p className="cl-hero__desc">{desc}</p>}
          <div className="cl-hero__ctas">
            <Link href={postHref(post)} className="cl-btn cl-btn--gold">
              <span>Ver más</span>
              <Icon name="arrow_forward" size={18} />
            </Link>
            <Link href="/#visitas" className="cl-btn cl-btn--glass">
              <Icon name="confirmation_number" size={18} />
              <span>Reservar Ubicación</span>
            </Link>
          </div>
        </div>

        <div className="cl-hero__footer">
          <div className="cl-hero__progress">
            <span className="cl-hero__count cl-hero__count--current">{pad(index + 1)}</span>
            <div className="cl-hero__track" aria-hidden="true">
              <div
                className="cl-hero__fill"
                style={{ width: `${((index + 1) / total) * 100}%` }}
              />
            </div>
            <span className="cl-hero__count">{pad(total)}</span>
            {category && <span className="cl-hero__caption">{category}</span>}
          </div>

          {total > 1 && (
            <div className="cl-hero__arrows">
              <button
                type="button"
                className="cl-hero__arrow"
                aria-label="Diapositiva anterior"
                onClick={() => go(-1)}
              >
                <Icon name="chevron_left" size={20} />
              </button>
              <button
                type="button"
                className="cl-hero__arrow"
                aria-label="Diapositiva siguiente"
                onClick={() => go(1)}
              >
                <Icon name="chevron_right" size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
