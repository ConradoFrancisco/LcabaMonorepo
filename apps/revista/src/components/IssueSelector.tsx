"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import FallbackImage from "./FallbackImage";
import FullPageLoader from "./FullPageLoader";
import Link from "next/link";

interface IssueItem {
  id: number;
  numero: number;
  titulo: string;
  fecha?: string;
  status: any;
  imageUrl?: string;
}

interface IssueSelectorProps {
  issues: IssueItem[];
  currentIssueNumber?: number;
}

function IssueSkeleton() {
  return (
    <div style={{ display: "flex", gap: "24px" }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: "0 0 calc(25% - 18px)",
            borderRadius: "12px",
            backgroundColor: "#f1f5f9",
            height: "240px",
            animation: "skeleton-pulse 1.6s ease-in-out infinite",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function IssueSelector({ issues = [], currentIssueNumber }: IssueSelectorProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isChangingIssue, setIsChangingIssue] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Al actualizar el issue activo por props, apagamos el loader
  useEffect(() => {
    setIsChangingIssue(false);
  }, [currentIssueNumber]);

  const handleSelectIssue = (targetUrl: string, isCurrent: boolean) => {
    if (isCurrent || isChangingIssue) return;

    setIsChangingIssue(true);
    // Timeout para que se aprecie la animación del spinner y logo
    setTimeout(() => {
      router.push(targetUrl);
    }, 1500);
  };

  if (!issues || issues.length === 0) return null;

  if (!mounted) {
    return (
      <section className="ediciones-section">
        <div className="container">
          <h2 className="ediciones-title">Otras Ediciones</h2>
          <IssueSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="ediciones-section">
      <div className="container position-relative">
        <h2 className="ediciones-title">Otras Ediciones</h2>

        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation={{
            nextEl: ".edicion-next-btn",
            prevEl: ".edicion-prev-btn",
          }}
          className="pb-2"
        >
          {issues.map((issue) => {
            const isCurrent =
              Number(issue.id) === Number(currentIssueNumber) ||
              Number(issue.numero) === Number(currentIssueNumber);
            const targetUrl = isCurrent ? "/" : `/?edicion=${issue.id}`;

            return (
              <SwiperSlide key={issue.id}>
                <a
                  href={targetUrl}
                  className="text-decoration-none"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectIssue(targetUrl, isCurrent);
                  }}
                >
                  <div className={`edicion-card ${isCurrent ? "active-issue" : ""}`}>
                    <div className="edicion-img-wrap">
                      <FallbackImage
                        src={issue.imageUrl}
                        alt={issue.titulo}
                        withBackground
                        className="edicion-img"
                      />
                      <span className="edicion-number-badge">
                        #{issue.numero}
                      </span>
                    </div>

                    <div className="edicion-info">
                      <h4 className="edicion-item-title">
                        {issue.titulo}
                      </h4>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Flechitas inferiores < > estilo referencia */}
        <div className="edicion-arrows">
          <button
            className="edicion-arrow-btn edicion-prev-btn"
            aria-label="Edición anterior"
          >
            &lt;
          </button>
          <button
            className="edicion-arrow-btn edicion-next-btn"
            aria-label="Edición siguiente"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Modal / Overlay Loader de pantalla completa con logo y spinner */}
      {isChangingIssue && (
        <FullPageLoader message="Cargando edición seleccionada..." />
      )}
    </section>
  );
}


interface IssueItem {
  id: number;
  numero: number;
  titulo: string;
  fecha?: string;
  status: any;
  imageUrl?: string;
}

interface IssueSelectorProps {
  issues: IssueItem[];
  currentIssueNumber?: number;
}

