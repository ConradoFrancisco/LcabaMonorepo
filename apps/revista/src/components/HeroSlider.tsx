"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Link from "next/link";
import { getCategoryColor, buildImageUrl } from "../utils/categoryColors";

interface HeroSliderProps {
  posts: any[];
  categoryColorMap?: Record<string, string>;
}

export default function HeroSlider({ posts = [], categoryColorMap = {} }: HeroSliderProps) {
  if (!posts || posts.length === 0) return null;

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
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={title}
                        className="revista-slider-img"
                      />
                    ) : (
                      <div className="w-100 h-100 bg-secondary d-flex align-items-center justify-center text-white-50">
                        Sin imagen
                      </div>
                    )}

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
