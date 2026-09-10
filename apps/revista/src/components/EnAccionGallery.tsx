"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import FallbackImage from "./FallbackImage";


interface EnAccionGalleryProps {
  post: any;
  description?: string;
  shortdesc?: string;
}

// Strips HTML tags and decodes basic HTML entities, returning plain text
function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")          // remove tags
    .replace(/&nbsp;/gi, " ")
    .replace(/&oacute;/gi, "ó")
    .replace(/&aacute;/gi, "á")
    .replace(/&eacute;/gi, "é")
    .replace(/&iacute;/gi, "í")
    .replace(/&uacute;/gi, "ú")
    .replace(/&ntilde;/gi, "ñ")
    .replace(/&Aacute;/gi, "Á")
    .replace(/&Eacute;/gi, "É")
    .replace(/&Iacute;/gi, "Í")
    .replace(/&Oacute;/gi, "Ó")
    .replace(/&Uacute;/gi, "Ú")
    .replace(/&Ntilde;/gi, "Ñ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")              // collapse whitespace
    .trim();
}

export default function EnAccionGallery({ post, description, shortdesc }: EnAccionGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  if (!post) return null;

  const rawImages = post.images || [];
  if (rawImages.length === 0) return null;

  const baseImg = process.env.NEXT_PUBLIC_IMAGES;
  const fileKey = process.env.NEXT_PUBLIC_FILESERVER_KEY;
  const title = post.titulo || post.title || "25 AÑOS EN ACCIÓN";

  // Strip HTML from optional text fields
  const cleanShortdesc = shortdesc ? stripHtml(shortdesc) : "";
  const cleanDescription = description ? stripHtml(description) : "";

  // Mapear todas las URLs
  const images = rawImages
    .filter((img: any) => img?.location && img?.filename)
    .map((img: any) => ({
      id: img.id,
      title: img.title,
      url: `${baseImg}/${img.location}${img.filename}${fileKey ? `?key=${fileKey}` : ""}`,
    }));

  if (images.length === 0) return null;

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="en-accion-section">
        <div className="container-fluid px-lg-3">
          <h1 className="en-accion-title">{title}</h1>
          {cleanShortdesc && (
            <p style={{ color: "#94a3b8", fontSize: "1rem", marginBottom: "6px", fontStyle: "italic" }}>
              {cleanShortdesc}
            </p>
          )}
          {cleanDescription && (
            <p style={{ color: "#64748b", fontSize: "0.82rem", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              📷 {cleanDescription}
            </p>
          )}
          <div style={{ display: "flex", gap: "16px", overflow: "hidden" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: "0 0 200px",
                  height: "200px",
                  borderRadius: "12px",
                  backgroundColor: "#f1f5f9",
                  animation: "skeleton-pulse 1.6s ease-in-out infinite",
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="en-accion-section">
        <div className="container-fluid px-lg-4">
          <h2 className="en-accion-title">{title}</h2>
          {cleanShortdesc && (
            <p style={{ color: "#94a3b8", fontSize: "1.1rem", marginBottom: "6px", fontStyle: "italic" }}>
              {cleanShortdesc}
            </p>
          )}


          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView={1.5}
            breakpoints={{
              576: { slidesPerView: 2.5 },
              768: { slidesPerView: 3.5 },
              1024: { slidesPerView: 5 },
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            loop={images.length > 5}
            className="pb-2"
          >
            {images.map((img: any, index: number) => (
              <SwiperSlide key={img.id || index}>
                <div
                  className="en-accion-img-wrap"
                  onClick={() => openLightbox(index)}
                  title="Click para ampliar imagen"
                >
                  <FallbackImage
                    src={img.url}
                    alt={img.title || `${title} ${index + 1}`}
                    withBackground
                    className="en-accion-img"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {cleanDescription && (
            <p style={{ color: "#64748b", fontSize: "1rem", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              📷 {cleanDescription}
            </p>
          )}
        </div>
      </section>

      {/* Modal / Lightbox de Galería Ampliada */}
      {isOpen && (
        <div className="en-accion-modal-overlay" onClick={closeLightbox}>
          {/* Header del modal con título y botón de cierre */}
          <div className="en-accion-modal-header" onClick={(e) => e.stopPropagation()}>
            <h3 className="en-accion-modal-title">
              {title}{" "}
              <span className="text-white-50 ms-2 small">
                ({selectedIndex + 1} de {images.length})
              </span>
            </h3>
            <button
              className="en-accion-modal-close"
              onClick={closeLightbox}
              aria-label="Cerrar modal"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>

          {/* Vista principal ampliada con controles de navegación */}
          <div className="en-accion-main-view" onClick={(e) => e.stopPropagation()}>
            <button
              className="en-accion-modal-nav prev"
              onClick={handlePrev}
              aria-label="Anterior"
            >
              <i className="fa-solid fa-chevron-left" />
            </button>

            <FallbackImage
              key={images[selectedIndex].url}
              src={images[selectedIndex].url}
              alt={images[selectedIndex].title || `${title} ampliada`}
              withBackground
              className="en-accion-main-img"
            />

            <button
              className="en-accion-modal-nav next"
              onClick={handleNext}
              aria-label="Siguiente"
            >
              <i className="fa-solid fa-chevron-right" />
            </button>
          </div>

          {/* Barra inferior de miniaturas para seleccionar cualquier imagen */}
          <div
            className="en-accion-thumbs-container"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img: any, idx: number) => (
              <div
                key={img.id || idx}
                className={`en-accion-thumb ${idx === selectedIndex ? "active" : ""}`}
                onClick={() => setSelectedIndex(idx)}
              >
                <img src={img.url} alt={`Miniatura ${idx + 1}`} onError={(e) => { (e.target as HTMLImageElement).src = "/logoNegro.png"; }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
