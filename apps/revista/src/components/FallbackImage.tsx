"use client";

import { useState, ImgHTMLAttributes } from "react";

const FALLBACK_SRC = "/logoNegro.png";

interface FallbackImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Si es true, el fallback se muestra centrado sobre fondo oscuro (#2e2d3d) */
  withBackground?: boolean;
  /** Clases CSS adicionales para el wrapper del fallback */
  fallbackWrapperClassName?: string;
}

/**
 * Drop-in replacement for <img> that automatically shows /logoNegro.png
 * when the src is missing, empty, or fails to load (broken link, 4xx, etc.)
 */
export default function FallbackImage({
  src,
  alt,
  withBackground = false,
  fallbackWrapperClassName,
  style,
  className,
  ...rest
}: FallbackImageProps) {
  const [error, setError] = useState(false);

  const showFallback = !src || error;

  if (showFallback) {
    if (withBackground) {
      return (
        <div
          className={`w-100 h-100 d-flex align-items-center justify-content-center ${fallbackWrapperClassName ?? ""}`}
          style={{ backgroundColor: "#2e2d3d" }}
        >
          <img
            src={FALLBACK_SRC}
            alt="La Casa"
            style={{ width: "75%", maxWidth: "200px", objectFit: "contain" }}
          />
        </div>
      );
    }

    return (
      <img
        src={FALLBACK_SRC}
        alt="La Casa"
        className={className}
        style={style}
        {...rest}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setError(true)}
      {...rest}
    />
  );
}
