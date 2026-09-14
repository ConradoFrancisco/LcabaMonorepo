"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from "./DatePicker";

interface FiltrosPublicacionesCulturaProps {
  initialSearch?: string;
  initialFechaDesde?: string;
  initialFechaHasta?: string;
}

// Convierte "dd-mm-yyyy" (formato que entrega el DatePicker) a Date para poder comparar.
function parseDMY(value: string): Date | null {
  if (!value) return null;
  const [day, month, year] = value.split("-").map(Number);
  if (!day || !month || !year) return null;
  return new Date(year, month - 1, day);
}

export function FiltrosPublicacionesCultura({
  initialSearch = "",
  initialFechaDesde = "",
  initialFechaHasta = "",
}: FiltrosPublicacionesCulturaProps) {
  const router = useRouter();

  const [search, setSearch] = useState(initialSearch);
  const [fechaDesde, setFechaDesde] = useState(initialFechaDesde);
  const [fechaHasta, setFechaHasta] = useState(initialFechaHasta);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const buildUrl = (params: { search: string; fechaDesde: string; fechaHasta: string }) => {
    const usp = new URLSearchParams();
    if (params.search) usp.set("search", params.search);
    if (params.fechaDesde) usp.set("fechaDesde", params.fechaDesde);
    if (params.fechaHasta) usp.set("fechaHasta", params.fechaHasta);
    const qs = usp.toString();
    return qs ? `/publicaciones?${qs}` : "/publicaciones";
  };

  const handleBuscar = () => {
    const desde = parseDMY(fechaDesde);
    const hasta = parseDMY(fechaHasta);
    if (desde && hasta && hasta < desde) {
      setError("La fecha hasta no puede ser menor que la fecha desde.");
      return;
    }
    setError("");
    router.push(buildUrl({ search, fechaDesde, fechaHasta }));
  };

  const handleLimpiar = () => {
    setSearch("");
    setFechaDesde("");
    setFechaHasta("");
    setError("");
    router.push("/publicaciones");
  };

  return (
    <div className="row mb-4">
      <style>{`
        .cultura-filtro-input {
          height: 44px;
          border-radius: 10px;
          border: 1px solid #e2e5ea;
          padding: 0 14px;
          font-size: .875rem;
          color: #1a1a2e;
          transition: border-color .15s, box-shadow .15s;
          outline: none;
        }
        .cultura-filtro-input::placeholder { color: #9aa0a8; }
        .cultura-filtro-input:hover { border-color: #c9003d55; }
        .cultura-filtro-input:focus {
          border-color: #c9003d;
          box-shadow: 0 0 0 3px rgba(201, 0, 61, .12);
        }
        .cultura-filtro-btn-primary {
          height: 44px;
          border-radius: 10px;
          border: none;
          padding: 0 22px;
          background-color: #c9003d;
          color: #fff;
          font-weight: 600;
          font-size: .875rem;
          transition: background-color .15s;
        }
        .cultura-filtro-btn-primary:hover { background-color: #a80233; color: #fff; }
        .cultura-filtro-btn-secondary {
          height: 44px;
          border-radius: 10px;
          border: 1px solid #d7dade;
          padding: 0 22px;
          background-color: #fff;
          color: #495057;
          font-weight: 500;
          font-size: .875rem;
          transition: background-color .15s, border-color .15s;
        }
        .cultura-filtro-btn-secondary:hover { background-color: #f8f9fa; border-color: #c3c7cd; }
        .cultura-filtro-toggle {
          border: none;
          background: transparent;
          color: #9aa0a8;
          transition: color .15s;
        }
        .cultura-filtro-toggle:hover { color: #c9003d; }
      `}</style>

      <div className="col-12">
        <div
          className="bg-white p-4"
          style={{ borderRadius: "14px", border: "1px solid #e2e5ea", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}
        >
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <h6 className="fw-bold mb-0" style={{ color: "#1a1a2e", fontSize: "1.05rem" }}>
              Filtros
            </h6>
            <button
              type="button"
              className="cultura-filtro-toggle"
              aria-label={showFilters ? "Colapsar filtros" : "Expandir filtros"}
            >
              <i className={`bi ${showFilters ? "bi-chevron-up" : "bi-chevron-down"}`} style={{ fontSize: "1.1rem" }} />
            </button>
          </div>

          {showFilters && (
            <div className="d-flex flex-wrap flex-md-nowrap align-items-end gap-3 mt-4">
              <div className="d-flex flex-column gap-1" style={{ flex: "1 1 200px", minWidth: 180 }}>
                <label
                  htmlFor="filtro-search"
                  className="text-uppercase fw-semibold text-muted"
                  style={{ fontSize: ".7rem", letterSpacing: ".02em" }}
                >
                  Buscar por título
                </label>
                <div className="position-relative">
                  <i
                    className="bi bi-search position-absolute text-muted"
                    style={{ left: 14, top: "50%", transform: "translateY(-50%)", fontSize: ".85rem", pointerEvents: "none" }}
                  />
                  <input
                    id="filtro-search"
                    type="text"
                    placeholder="Título de la publicación"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleBuscar();
                    }}
                    className="cultura-filtro-input w-100"
                    style={{ paddingLeft: 38 }}
                  />
                </div>
              </div>

              <DatePicker
                id="filtro-fecha-desde"
                label="Desde"
                value={fechaDesde}
                maxDate={parseDMY(fechaHasta) ?? undefined}
                onChange={(_dates, dateStr) => setFechaDesde(dateStr)}
              />

              <DatePicker
                id="filtro-fecha-hasta"
                label="Hasta"
                value={fechaHasta}
                minDate={parseDMY(fechaDesde) ?? undefined}
                onChange={(_dates, dateStr) => setFechaHasta(dateStr)}
              />

              <div className="d-flex gap-2">
                <button type="button" onClick={handleBuscar} className="cultura-filtro-btn-primary">
                  Buscar
                </button>
                <button type="button" onClick={handleLimpiar} className="cultura-filtro-btn-secondary">
                  Limpiar
                </button>
              </div>
            </div>
          )}

          {showFilters && error && (
            <div className="mt-2 d-flex align-items-center gap-1" style={{ color: "#c9003d", fontSize: ".85rem" }}>
              <i className="bi bi-exclamation-circle" />
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
