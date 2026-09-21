"use client";

import Link from "next/link";
import { useState } from "react";

// Contenido estático tomado del diseño de Stitch (no viene de la API).
const FILTERS = ["Todas las áreas", "Música", "Artes Visuales", "Letras"] as const;

const EVENTS = [
  {
    month: "ABR",
    day: "03",
    tone: "gold",
    kicker: "Música Clásica • Salón Dorado",
    title: "Ensamble Porteño de Cuerdas: Bach y Piazzolla",
    detail: "Jueves 19:00 hs • Entrada libre por orden de llegada hasta colmar capacidad.",
    area: "Música",
  },
  {
    month: "ABR",
    day: "05",
    tone: "teal",
    kicker: "Letras • Sala de Lectura Biblioteca",
    title: 'Presentación del libro: "Arquitectura e Historia de las Leyes Porteñas"',
    detail: "Sábado 17:30 hs • Panel de autores y firma de ejemplares.",
    area: "Letras",
  },
  {
    month: "ABR",
    day: "08",
    tone: "crimson",
    kicker: "Artes Plásticas • Galería Central",
    title: 'Inauguración de Muestra Colectiva: "Cartografías Urbanas 2025"',
    detail: "Martes 18:00 hs • Artistas visuales contemporáneos de los 48 barrios porteños.",
    area: "Artes Visuales",
  },
] as const;

export default function WeeklyAgenda() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>(FILTERS[0]);
  const events = EVENTS.filter((e) => filter === FILTERS[0] || e.area === filter);

  return (
    <section className="cl-section cl-agenda" id="agenda">
      <div className="cl-agenda__panel">
        <div className="cl-agenda__head">
          <div>
            <span className="cl-agenda__eyebrow">PROGRAMACIÓN ABIERTA</span>
            <h3 className="cl-agenda__title">Agenda de la Semana</h3>
          </div>
          <div className="cl-agenda__filters" role="group" aria-label="Filtrar por área">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`cl-chip ${f === filter ? "is-active" : ""}`}
                aria-pressed={f === filter}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="cl-agenda__list">
          {events.map((e) => (
            <div className="cl-event" key={e.day}>
              <div className="cl-event__main">
                <div className="cl-event__date">
                  <span className="cl-event__month">{e.month}</span>
                  <span className="cl-event__day">{e.day}</span>
                </div>
                <div>
                  <span className={`cl-event__kicker cl-event__kicker--${e.tone}`}>{e.kicker}</span>
                  <h4 className="cl-event__title">{e.title}</h4>
                  <p className="cl-event__detail">{e.detail}</p>
                </div>
              </div>
              <Link href="/publicaciones" className="cl-outline-btn">
                Más información
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
