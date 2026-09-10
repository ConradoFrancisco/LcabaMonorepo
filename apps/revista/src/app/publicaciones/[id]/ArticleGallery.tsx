"use client";

import { useState } from "react";
import FallbackImage from "../../../components/FallbackImage";

interface ArticleGalleryProps {
  images: string[];
  title?: string;
  categoryColor?: string;
}

export default function ArticleGallery({
  images = [],
  title = "",
  categoryColor = "#8b5cf6",
}: ArticleGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) return null;

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  const openLightbox = (idx: number) => {
    setCurrent(idx);
    setLightboxOpen(true);
  };

  return (
    <div className="revista-article-gallery mb-5">
      {/* Main image */}
      <div
        className="position-relative overflow-hidden rounded-3"
        style={{ cursor: "zoom-in" }}
        onClick={() => openLightbox(current)}
      >
        <FallbackImage
          src={images[current]}
          alt={`${title} - ${current + 1}`}
          withBackground
          className="w-100"
          style={{ maxHeight: "480px", objectFit: "cover", display: "block" }}
        />
        {/* Category color bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            backgroundColor: categoryColor,
          }}
        />
        {/* Zoom icon */}
        <div
          style={{
            position: "absolute",
            bottom: "12px",
            right: "12px",
            backgroundColor: "rgba(0,0,0,0.55)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>

        {/* Nav arrows (only if > 1 image) */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              style={{
                position: "absolute", top: "50%", left: "12px",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%",
                width: "36px", height: "36px", color: "white", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              style={{
                position: "absolute", top: "50%", right: "12px",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%",
                width: "36px", height: "36px", color: "white", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            {/* Counter */}
            <span
              style={{
                position: "absolute", bottom: "12px", left: "12px",
                background: "rgba(0,0,0,0.55)", color: "white",
                borderRadius: "999px", padding: "2px 10px", fontSize: "0.75rem", fontWeight: 600,
              }}
            >
              {current + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="d-flex gap-2 mt-3 flex-wrap">
          {images.map((url, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                border: i === current ? `3px solid ${categoryColor}` : "3px solid transparent",
                borderRadius: "8px",
                padding: 0,
                background: "none",
                cursor: "pointer",
                overflow: "hidden",
                width: "70px",
                height: "55px",
                opacity: i === current ? 1 : 0.6,
                transition: "all 0.2s",
              }}
            >
              <FallbackImage
                src={url}
                alt={`thumb ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            backgroundColor: "rgba(0,0,0,0.92)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            style={{
              position: "fixed", top: "20px", right: "24px",
              background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%",
              width: "44px", height: "44px", color: "white", fontSize: "1.5rem",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            ×
          </button>

          {/* Main lightbox image */}
          <FallbackImage
            src={images[current]}
            alt={title}
            withBackground
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "90vw", maxHeight: "78vh", objectFit: "contain", borderRadius: "8px" }}
          />

          {/* Lightbox navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                style={{
                  position: "fixed", top: "50%", left: "20px",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%",
                  width: "48px", height: "48px", color: "white", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                style={{
                  position: "fixed", top: "50%", right: "20px",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "50%",
                  width: "48px", height: "48px", color: "white", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* Lightbox thumbnails */}
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  marginTop: "16px", display: "flex", gap: "8px",
                  maxWidth: "90vw", overflowX: "auto", padding: "4px 0",
                }}
              >
                {images.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    style={{
                      border: i === current ? `3px solid ${categoryColor}` : "3px solid transparent",
                      borderRadius: "6px", padding: 0, background: "none",
                      cursor: "pointer", flexShrink: 0,
                      width: "60px", height: "46px",
                      opacity: i === current ? 1 : 0.5,
                      transition: "all 0.2s",
                    }}
                  >
                    <FallbackImage
                      src={url}
                      alt={`thumb ${i + 1}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: "4px" }}
                    />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
