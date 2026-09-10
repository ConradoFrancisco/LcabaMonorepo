"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import FallbackImage from "./FallbackImage";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
                <Link href={targetUrl} className="text-decoration-none">
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
                </Link>
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

