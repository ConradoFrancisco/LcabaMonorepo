"use client";

import React from "react";

interface FullPageLoaderProps {
  message?: string;
  logoSrc?: string;
}

export default function FullPageLoader({
  message = "Cargando contenido...",
  logoSrc = "/logoNegro.png",
}: FullPageLoaderProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Contenedor central con spinner y logo */}
      <div
        style={{
          position: "relative",
          width: "150px",
          height: "150px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Spinner giratorio exterior */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "3px solid rgba(255, 255, 255, 0.15)",
            borderTopColor: "#38bdf8",
            borderRightColor: "#818cf8",
            animation: "loader-spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
            boxShadow: "0 0 20px rgba(56, 189, 248, 0.25)",
          }}
        />

        {/* Segundo aro invertido más fino para un look sofisticado */}
        <div
          style={{
            position: "absolute",
            inset: "-6px",
            borderRadius: "50%",
            border: "2px dashed rgba(255, 255, 255, 0.25)",
            animation: "loader-spin-reverse 3s linear infinite",
          }}
        />

        {/* Círculo central contenedor del logo */}
        <div
          style={{
            width: "105px",
            height: "105px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.35)",
            animation: "loader-pulse 2s ease-in-out infinite",
          }}
        >
          <img
            src={logoSrc}
            alt="LA CASA"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* Texto de carga */}
      {message && (
        <p
          style={{
            marginTop: "24px",
            color: "#f8fafc",
            fontSize: "0.95rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
            animation: "loader-fade 1.5s ease-in-out infinite alternate",
          }}
        >
          {message}
        </p>
      )}

      {/* Keyframes animaciones */}
      <style jsx global>{`
        @keyframes loader-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes loader-spin-reverse {
          0% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        @keyframes loader-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.04);
          }
        }
        @keyframes loader-fade {
          0% {
            opacity: 0.6;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
