"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";

export default function ImageGallery({
  images = [],
  title = "",
}: {
  images: string[];
  title: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const swiperRef = useRef<SwiperClass | null>(null);

  const total = images.length;

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const nextModal = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevModal = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Manejo de teclado para el Lightbox modal (Escape, flechas izquierda y derecha)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextModal();
      if (e.key === "ArrowLeft") prevModal();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, nextModal, prevModal]);

  // Sincronizar el swiper cuando cambia currentIndex desde el modal o thumbnails
  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
    swiperRef.current?.slideTo(idx);
  };

  if (total === 0) return null;

  return (
    <div className="cl-gallery-wrapper mb-5">
      {/* ── Visor Principal ── */}
      <div
        className="cl-gallery-main position-relative rounded-4 overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at center, #221a20 0%, #120e11 100%)",
          boxShadow:
            "0 10px 30px -5px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.06)",
        }}
      >
        {total === 1 ? (
          /* Foto única: sin Swiper para máximo rendimiento y sin warnings */
          <div
            className="d-flex align-items-center justify-content-center position-relative"
            style={{
              minHeight: "340px",
              maxHeight: "520px",
              cursor: "zoom-in",
              padding: "1rem",
            }}
            onClick={() => openModal(0)}
          >
            <img
              src={images[0]}
              alt={title}
              style={{
                maxWidth: "100%",
                maxHeight: "480px",
                width: "auto",
                height: "auto",
                objectFit: "contain",
                borderRadius: "8px",
                transition: "transform 0.3s ease",
              }}
              className="cl-gallery-img"
            />
            {/* Botón flotante para ampliar */}
            <button
              type="button"
              className="btn position-absolute bottom-0 end-0 m-3 px-3 py-2 text-white border-0 d-flex align-items-center gap-2"
              style={{
                background: "rgba(0, 0, 0, 0.65)",
                backdropFilter: "blur(10px)",
                borderRadius: "30px",
                fontSize: "0.85rem",
                fontWeight: 500,
              }}
              onClick={(e) => {
                e.stopPropagation();
                openModal(0);
              }}
              aria-label="Ampliar imagen"
            >
              <i className="bi bi-arrows-fullscreen" />
              <span>Ampliar</span>
            </button>
          </div>
        ) : (
          /* Múltiples fotos: Carrusel interactivo */
          <>
            {/* Barra superior con contador y botón de ampliar */}
            <div
              className="position-absolute top-0 start-0 end-0 p-3 d-flex justify-content-between align-items-center"
              style={{ zIndex: 10, pointerEvents: "none" }}
            >
              <span
                className="px-3 py-1 text-white rounded-pill"
                style={{
                  background: "rgba(0, 0, 0, 0.6)",
                  backdropFilter: "blur(8px)",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                }}
              >
                {currentIndex + 1} / {total}
              </span>

              <button
                type="button"
                className="btn px-3 py-1 text-white border-0 d-flex align-items-center gap-2 rounded-pill"
                style={{
                  background: "rgba(0, 0, 0, 0.6)",
                  backdropFilter: "blur(8px)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  pointerEvents: "auto",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onClick={() => openModal(currentIndex)}
                aria-label="Ampliar foto actual"
              >
                <i className="bi bi-arrows-fullscreen" />
                <span>Ampliar</span>
              </button>
            </div>

            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setCurrentIndex(swiper.activeIndex);
              }}
              className="w-100"
            >
              {images.map((url, i) => (
                <SwiperSlide key={i}>
                  <div
                    className="d-flex align-items-center justify-content-center p-3"
                    style={{
                      minHeight: "360px",
                      maxHeight: "520px",
                      cursor: "zoom-in",
                    }}
                    onClick={() => openModal(i)}
                  >
                    <img
                      src={url}
                      alt={`${title} - foto ${i + 1}`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "480px",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Flechas de navegación personalizadas */}
            <button
              type="button"
              className="btn position-absolute top-50 start-0 translate-middle-y ms-3 d-flex align-items-center justify-content-center text-white border-0"
              style={{
                zIndex: 10,
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(0, 0, 0, 0.55)",
                backdropFilter: "blur(6px)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onClick={() => {
                swiperRef.current?.slidePrev();
              }}
              aria-label="Foto anterior"
            >
              <i className="bi bi-chevron-left fs-5" />
            </button>

            <button
              type="button"
              className="btn position-absolute top-50 end-0 translate-middle-y me-3 d-flex align-items-center justify-content-center text-white border-0"
              style={{
                zIndex: 10,
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(0, 0, 0, 0.55)",
                backdropFilter: "blur(6px)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onClick={() => {
                swiperRef.current?.slideNext();
              }}
              aria-label="Siguiente foto"
            >
              <i className="bi bi-chevron-right fs-5" />
            </button>
          </>
        )}
      </div>

      {/* ── Tira de Miniaturas (Thumbnails) ── */}
      {total > 1 && (
        <div
          className="d-flex gap-2 mt-3 p-2 rounded-3 overflow-x-auto"
          style={{
            scrollbarWidth: "thin",
            backgroundColor: "#f4f1f4",
          }}
        >
          {images.map((url, i) => {
            const isActive = i === currentIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => goToSlide(i)}
                className="btn p-0 border-0 flex-shrink-0 rounded-3 overflow-hidden position-relative"
                style={{
                  width: 84,
                  height: 60,
                  outline: isActive ? "3px solid #c9003d" : "2px solid transparent",
                  outlineOffset: "2px",
                  opacity: isActive ? 1 : 0.65,
                  transform: isActive ? "scale(1.02)" : "scale(1)",
                  transition: "all 0.2s ease",
                  backgroundColor: "#20181e",
                  cursor: "pointer",
                }}
                aria-label={`Ir a foto ${i + 1}`}
              >
                <img
                  src={url}
                  alt={`Miniatura ${i + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </button>
            );
          })}
        </div>
      )}

      {/* ── Modal Lightbox Pantalla Completa ── */}
      {isOpen && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{
            backgroundColor: "rgba(12, 9, 13, 0.95)",
            backdropFilter: "blur(12px)",
            zIndex: 9999,
          }}
          onClick={closeModal}
        >
          {/* Header del Lightbox */}
          <div
            className="position-fixed top-0 start-0 end-0 p-3 d-flex justify-content-between align-items-center text-white"
            style={{ zIndex: 10001 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex align-items-center gap-3">
              <span
                className="px-3 py-1 rounded-pill"
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                {currentIndex + 1} de {total}
              </span>
              <span
                className="text-white-50 d-none d-md-inline"
                style={{ fontSize: "0.9rem" }}
              >
                {title}
              </span>
            </div>

            <button
              type="button"
              className="btn btn-close btn-close-white p-2"
              onClick={closeModal}
              aria-label="Cerrar visor"
              style={{ fontSize: "1.2rem", cursor: "pointer" }}
            />
          </div>

          {/* Flecha Anterior en Lightbox */}
          {total > 1 && (
            <button
              type="button"
              className="btn position-fixed top-50 start-0 translate-middle-y ms-3 d-flex align-items-center justify-content-center text-white border-0"
              style={{
                zIndex: 10001,
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(8px)",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onClick={(e) => {
                e.stopPropagation();
                prevModal();
              }}
              aria-label="Foto anterior"
            >
              <i className="bi bi-chevron-left fs-4" />
            </button>
          )}

          {/* Imagen central */}
          <div
            className="d-flex align-items-center justify-content-center w-100 h-100 p-4"
            onClick={closeModal}
          >
            <div
              className="d-inline-block text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[currentIndex]}
                alt={`${title} - foto ${currentIndex + 1}`}
                className="rounded-3 shadow-lg"
                style={{
                  maxHeight: "85vh",
                  maxWidth: "90vw",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          {/* Flecha Siguiente en Lightbox */}
          {total > 1 && (
            <button
              type="button"
              className="btn position-fixed top-50 end-0 translate-middle-y me-3 d-flex align-items-center justify-content-center text-white border-0"
              style={{
                zIndex: 10001,
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(8px)",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onClick={(e) => {
                e.stopPropagation();
                nextModal();
              }}
              aria-label="Siguiente foto"
            >
              <i className="bi bi-chevron-right fs-4" />
            </button>
          )}

          {/* Indicador de atajos de teclado en el footer */}
          <div
            className="position-fixed bottom-0 start-50 translate-middle-x pb-3 text-white-50 text-center d-none d-md-block"
            style={{ fontSize: "0.8rem", zIndex: 10001, pointerEvents: "none" }}
          >
            Usa las flechas ← → del teclado para navegar • Esc para cerrar
          </div>
        </div>
      )}
    </div>
  );
}
