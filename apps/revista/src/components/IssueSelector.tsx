"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
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

export default function IssueSelector({ issues = [], currentIssueNumber }: IssueSelectorProps) {
  if (!issues || issues.length === 0) return null;

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
                      {issue.imageUrl ? (
                        <img
                          src={issue.imageUrl}
                          alt={issue.titulo}
                          className="edicion-img"
                        />
                      ) : (
                        <div className="text-center p-3 text-muted">
                          <i className="fa-regular fa-newspaper fa-2x mb-2 d-block opacity-50" />
                          <span className="small fw-bold">#{issue.numero}</span>
                        </div>
                      )}
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

        {/* Flechitas inferiores <  > estilo referencia */}
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
