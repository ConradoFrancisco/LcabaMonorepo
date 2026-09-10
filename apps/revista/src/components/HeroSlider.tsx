"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Link from "next/link";
import { getCategoryColor, buildImageUrl } from "../utils/categoryColors";
import FallbackImage from "./FallbackImage";

interface HeroSliderProps {
  posts: any[];
  categoryColorMap?: Record<string, string>;
}

// Skeleton de una card del slider
function SliderCardSkeleton() {
  return (
    <div
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#f1f5f9",
        height: "320px",
        animation: "skeleton-pulse 1.6s ease-in-out infinite",
      }}
    />
  );
}

export default function HeroSlider({ posts = [], categoryColorMap = {} }: HeroSliderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!posts || posts.length === 0) return null;

  // Mientras no hidrata: mostrar skeletons con el mismo layout que tendría Swiper
  if (!mounted) {
    return (
      <section className="revista-hero-slider py-4">
        <div className="container-fluid">
          <div className="row g-4">
            {Array.from({ length: Math.min(posts.length, 3) }).map((_, i) => (
              <div className="col-12 col-md-6 col-lg-4" key={i}>
                <SliderCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="revista-hero-slider py-4">
      <div className="container-fluid position-relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".revista-next-btn",
            prevEl: ".revista-prev-btn",
          }}
          loop={posts.length > 3}
          className="pb-2"
        >
          {posts.map((post) => {
            const imgUrl = buildImageUrl(post.images || []);
            const title = post.titulo || post.title || "";
            const category = post.categoria || post.category || "";
            const categoryBg = categoryColorMap[category?.toLowerCase()] || getCategoryColor(category);
            const postUrl = `/publicaciones/${post.id}`;

            return (
              <SwiperSlide key={post.id}>
                <Link href={postUrl} className="text-decoration-none d-block">
                  <div className="revista-slider-card">
                    {/* Badge Categoría con color dinámico */}
                    {category && (
                      <span
                        className="revista-category-badge"
                        style={{ backgroundColor: categoryBg }}
                      >
                        {category}
                      </span>
                    )}

                    {/* Imagen Principal */}
                    <FallbackImage
                      src={imgUrl}
                      alt={title}
                      withBackground
                      className="revista-slider-img"
                    />

                    {/* Barra inferior oscura con título */}
                    <div className="revista-slider-overlay">
                      <h3 className="revista-slider-title">{title}</h3>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Botones de navegación personalizados estilo AstraX */}
        <button
          className="revista-prev-btn position-absolute top-50 start-0 translate-middle-y btn btn-dark rounded-circle shadow d-none d-md-flex align-items-center justify-content-center z-3"
          style={{ width: "42px", height: "42px", marginLeft: "-15px" }}
          aria-label="Anterior"
        >
          <i className="fa-solid fa-chevron-left" />
        </button>

        <button
          className="revista-next-btn position-absolute top-50 end-0 translate-middle-y btn btn-dark rounded-circle shadow d-none d-md-flex align-items-center justify-content-center z-3"
          style={{ width: "42px", height: "42px", marginRight: "-15px" }}
          aria-label="Siguiente"
        >
          <i className="fa-solid fa-chevron-right" />
        </button>
      </div>
    </section>
  );
}

