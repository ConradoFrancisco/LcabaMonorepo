"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Icon from "../components/home/Icon";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AgendaPost {
  id: number;
  title?: string;
  shortdesc?: string;
  description?: string;
  date_ini?: string | null;
  date_end?: string | null;
  date_article?: string | null;
  tipo_post?: string | null;
  fk_idcat?: number | null;
  url?: string | null;
  bgcolor?: string | null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const COLOR_CLASSES = [
  "cl-cal__event--c0",
  "cl-cal__event--c1",
  "cl-cal__event--c2",
  "cl-cal__event--c3",
  "cl-cal__event--c4",
  "cl-cal__event--c5",
];

const COLOR_HEXES = [
  "#c9003d",
  "#006972",
  "#825500",
  "#7b5ea7",
  "#1976a8",
  "#2e7d32",
];

const MONTHS_ES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const DAYS_ES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function parseLocalDate(str?: string | null): Date | null {
  if (!str) return null;
  // "YYYY-MM-DD" or "YYYY-MM-DD HH:mm:ss" — parse as local to avoid UTC drift
  const m = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function formatDateLabel(d: Date): string {
  return d.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatRangeLabel(ini?: string | null, end?: string | null): string {
  const s = parseLocalDate(ini);
  const e = parseLocalDate(end);
  if (!s) return "";
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  if (!e || isSameDay(s, e)) return s.toLocaleDateString("es-AR", { ...opts, year: "numeric" });
  return `${s.toLocaleDateString("es-AR", opts)} — ${e.toLocaleDateString("es-AR", { ...opts, year: "numeric" })}`;
}

// Strips HTML tags for a safe plain-text excerpt
function htmlToText(html: string, maxLen = 180): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLen);
}

// ── Calendar computation ───────────────────────────────────────────────────────

interface CalEvent {
  post: AgendaPost;
  colorIdx: number;
  startDate: Date;
  endDate: Date;
}

interface PlacedBar {
  event: CalEvent;
  /** col index 0-6 where this bar starts in the week row */
  startCol: number;
  /** how many cols it spans */
  spanCols: number;
  /** which "track" (visual row inside the event layer) it occupies */
  track: number;
  /** positional type */
  shape: "single" | "start" | "middle" | "end";
}

function buildWeeks(year: number, month: number): Date[][] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  // pad to start on Sunday
  const startPad = first.getDay(); // 0 = Sun
  const start = addDays(first, -startPad);
  const endPad = 6 - last.getDay();
  const end = addDays(last, endPad);
  const weeks: Date[][] = [];
  let cur = start;
  while (cur <= end) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(cur));
      cur = addDays(cur, 1);
    }
    weeks.push(week);
  }
  return weeks;
}

function placeEventsInWeek(week: Date[], events: CalEvent[]): { bars: PlacedBar[]; overflow: Map<string, number> } {
  // tracks per weekday col: which tracks are occupied
  const trackOccupied: Set<number>[] = Array.from({ length: 7 }, () => new Set<number>());
  const bars: PlacedBar[] = [];
  const overflow = new Map<string, number>();

  const MAX_TRACKS = 3; // show max 3 event rows visually

  // Sort by duration desc so longer events get priority (top tracks)
  const sorted = [...events].sort((a, b) => {
    const da = a.endDate.getTime() - a.startDate.getTime();
    const db = b.endDate.getTime() - b.startDate.getTime();
    return db - da;
  });

  for (const event of sorted) {
    // Find which cols of this week the event occupies
    let startCol = -1;
    let endCol = -1;
    for (let c = 0; c < 7; c++) {
      const d = week[c];
      if (d >= event.startDate && d <= event.endDate) {
        if (startCol === -1) startCol = c;
        endCol = c;
      }
    }
    if (startCol === -1) continue;

    // Find an available track for this span
    let track = -1;
    for (let t = 0; t < MAX_TRACKS; t++) {
      let available = true;
      for (let c = startCol; c <= endCol; c++) {
        if (trackOccupied[c].has(t)) { available = false; break; }
      }
      if (available) { track = t; break; }
    }

    if (track === -1) {
      // Mark overflow for each day
      for (let c = startCol; c <= endCol; c++) {
        const key = dateKey(week[c]);
        overflow.set(key, (overflow.get(key) ?? 0) + 1);
      }
      continue;
    }

    // Mark track as occupied
    for (let c = startCol; c <= endCol; c++) trackOccupied[c].add(track);

    // Determine shape
    const isStart = isSameDay(week[startCol], event.startDate);
    const isEnd = isSameDay(week[endCol], event.endDate);
    const span = endCol - startCol + 1;
    let shape: PlacedBar["shape"] = "middle";
    if (span === 1) {
      shape = isStart && isEnd ? "single" : isStart ? "start" : isEnd ? "end" : "middle";
    } else {
      shape = isStart && isEnd ? "single" : isStart ? "start" : isEnd ? "end" : "middle";
    }

    bars.push({ event, startCol, spanCols: span, track, shape });
  }

  return { bars, overflow };
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function EventBar({ bar, onSelect, selected }: {
  bar: PlacedBar;
  onSelect: (post: AgendaPost) => void;
  selected: boolean;
}) {
  const colWidth = 100 / 7;
  const left = `${bar.startCol * colWidth}%`;
  const width = `${bar.spanCols * colWidth}%`;
  const top = `${bar.track * 25}px`;
  const colorClass = COLOR_CLASSES[bar.event.colorIdx % COLOR_CLASSES.length];
  const shapeClass = `cl-cal__event--${bar.shape}`;

  return (
    <div
      className={`cl-cal__event ${colorClass} ${shapeClass} ${selected ? "is-selected" : ""}`}
      style={{ left, width, top, position: "absolute", outline: selected ? "2px solid #fff" : undefined }}
      title={bar.event.post.title}
      onClick={() => onSelect(bar.event.post)}
    >
      {(bar.shape === "single" || bar.shape === "start") && (
        <span className="cl-cal__event-label">{bar.event.post.title}</span>
      )}
    </div>
  );
}

// ── Main Calendar Component ────────────────────────────────────────────────────

export default function AgendaCalendar({ posts }: { posts: AgendaPost[] }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedPost, setSelectedPost] = useState<AgendaPost | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  // Build CalEvents with color index
  const calEvents: CalEvent[] = useMemo(() => {
    return posts
      .map((p, i): CalEvent | null => {
        const startDate = parseLocalDate(p.date_ini);
        if (!startDate) return null;
        const parsedEnd = parseLocalDate(p.date_end);
        const endDate = parsedEnd ?? startDate;
        return {
          post: {
            ...p,
            title: p.title || (p as any).titulo || "Sin título",
          },
          colorIdx: i % COLOR_CLASSES.length,
          startDate,
          endDate: endDate < startDate ? startDate : endDate,
        };
      })
      .filter((e): e is CalEvent => e !== null);
  }, [posts]);

  const weeks = useMemo(() => buildWeeks(viewYear, viewMonth), [viewYear, viewMonth]);

  // For each week, compute which events overlap
  const weekData = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonth, 1);
    const lastDay = new Date(viewYear, viewMonth + 1, 0);

    return weeks.map((week) => {
      // Events that touch this week
      const weekStart = week[0];
      const weekEnd = week[6];
      const relevant = calEvents.filter(
        (e) => e.endDate >= weekStart && e.startDate <= weekEnd,
      );
      return placeEventsInWeek(week, relevant);
    });
  }, [weeks, calEvents, viewYear, viewMonth]);

  const prevMonth = useCallback(() => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  }, [viewMonth]);

  const nextMonth = useCallback(() => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  }, [viewMonth]);

  const goToday = useCallback(() => {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setSelectedDay(null);
    setSelectedPost(null);
  }, []);

  // Events that start/span on the selected day
  const dayEvents = useMemo(() => {
    if (!selectedDay) return [];
    return calEvents.filter(
      (e) => selectedDay >= e.startDate && selectedDay <= e.endDate,
    );
  }, [selectedDay, calEvents]);

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
    const eventsOnDay = calEvents.filter(
      (e) => day >= e.startDate && day <= e.endDate,
    );
    if (eventsOnDay.length === 1) {
      setSelectedPost(eventsOnDay[0].post);
    } else {
      setSelectedPost(null);
    }
  };

  const monthLabel = `${MONTHS_ES[viewMonth]} ${viewYear}`;
  const monthEventCount = calEvents.filter(
    (e) =>
      e.startDate <= new Date(viewYear, viewMonth + 1, 0) &&
      e.endDate >= new Date(viewYear, viewMonth, 1),
  ).length;

  return (
    <div className="cl-agenda">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p className="cl-agenda__eyebrow">
            <Icon name="calendar_month" size={14} />
            Agenda Cultural
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h1 className="cl-agenda__title">Calendario de Eventos</h1>
              <p className="cl-agenda__subtitle">
                Actividades, exposiciones y eventos del Palacio de la Legislatura Porteña
              </p>
            </div>
            <span className="cl-agenda__count">
              <Icon name="event" size={14} />
              {monthEventCount} evento{monthEventCount !== 1 ? "s" : ""} este mes
            </span>
          </div>
        </div>

        <div className="cl-agenda__layout">
          {/* Calendar */}
          <div>
            {/* Nav */}
            <div className="cl-cal-nav">
              <button className="cl-cal-nav__btn" onClick={prevMonth} aria-label="Mes anterior">
                <Icon name="chevron_left" size={20} />
              </button>
              <h2 className="cl-cal-nav__month">{monthLabel}</h2>
              <button className="cl-cal-nav__btn" onClick={nextMonth} aria-label="Mes siguiente">
                <Icon name="chevron_right" size={20} />
              </button>
              <button className="cl-cal-nav__today" onClick={goToday}>
                <Icon name="today" size={14} />
                Hoy
              </button>
            </div>

            {/* Grid */}
            <div className="cl-cal">
              {/* Weekday headers */}
              <div className="cl-cal__weekdays">
                {DAYS_ES.map((d) => (
                  <div key={d} className="cl-cal__wd">{d}</div>
                ))}
              </div>

              {/* Week rows */}
              <div className="cl-cal__rows">
                {weeks.map((week, wi) => {
                  const { bars, overflow } = weekData[wi];
                  return (
                    <div key={wi} className="cl-cal__week">
                      {/* Day number cells */}
                      <div className="cl-cal__days">
                        {week.map((day, di) => {
                          const isToday = isSameDay(day, today);
                          const isOutside = day.getMonth() !== viewMonth;
                          const isSun = day.getDay() === 0;
                          const isSelected = selectedDay && isSameDay(day, selectedDay);
                          const overflowCount = overflow.get(dateKey(day)) ?? 0;

                          return (
                            <div
                              key={di}
                              className={[
                                "cl-cal__day",
                                isToday ? "cl-cal__day--today" : "",
                                isOutside ? "cl-cal__day--outside" : "",
                                isSun ? "cl-cal__day--sun" : "",
                                isSelected ? "cl-cal__day--selected" : "",
                              ].join(" ")}
                              onClick={() => handleDayClick(day)}
                              style={isSelected ? { background: "var(--cl-surface-container-high)" } : undefined}
                            >
                              <div className="cl-cal__day-num">{day.getDate()}</div>
                              {overflowCount > 0 && (
                                <div className="cl-cal__more">+{overflowCount} más</div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Event bars — absolute layer above the cells */}
                      <div className="cl-cal__events-layer">
                        {/* We need a single positioned container spanning all 7 cols */}
                        <div style={{ position: "relative", height: `${3 * 25}px` }}>
                          {bars.map((bar, bi) => (
                            <EventBar
                              key={`${bar.event.post.id}-${wi}-${bi}`}
                              bar={bar}
                              onSelect={(post) => {
                                setSelectedPost(post);
                                setSelectedDay(bar.event.startDate);
                              }}
                              selected={selectedPost?.id === bar.event.post.id}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="cl-agenda__legend">
              <span style={{ fontSize: 12, color: "var(--cl-on-variant)", fontWeight: 600 }}>Referencias:</span>
              {COLOR_HEXES.slice(0, 4).map((hex, i) => (
                <span key={i} className="cl-agenda__legend-item">
                  <span className="cl-agenda__legend-dot" style={{ background: hex }} />
                  Evento {i + 1}
                </span>
              ))}
              <span className="cl-agenda__legend-item">
                <span className="cl-agenda__legend-dot" style={{ background: "var(--cl-crimson)", borderRadius: "50%" }} />
                Hoy
              </span>
            </div>
          </div>

          {/* Detail panel */}
          <div className="cl-agenda__detail">
            {selectedDay && dayEvents.length > 0 ? (
              <>
                {/* Day header */}
                <div className="cl-agenda__detail-head">
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--cl-crimson)", marginBottom: 4 }}>
                    {DAYS_ES[selectedDay.getDay()]} {selectedDay.getDate()} de {MONTHS_ES[selectedDay.getMonth()]}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--cl-on-variant)" }}>
                    {dayEvents.length} evento{dayEvents.length !== 1 ? "s" : ""}
                  </div>
                </div>

                {/* List of events on this day */}
                <div className="cl-agenda__day-events">
                  {dayEvents.map((ev) => (
                    <div
                      key={ev.post.id}
                      className={`cl-agenda__day-event-item ${selectedPost?.id === ev.post.id ? "is-selected" : ""}`}
                      onClick={() => setSelectedPost(ev.post)}
                    >
                      <div
                        className="cl-agenda__day-event-stripe"
                        style={{ background: COLOR_HEXES[ev.colorIdx % COLOR_HEXES.length] }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="cl-agenda__day-event-name">{ev.post.title}</div>
                        <div className="cl-agenda__day-event-range">
                          {formatRangeLabel(ev.post.date_ini, ev.post.date_end)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Selected event detail */}
                {selectedPost && (
                  <div style={{ borderTop: "1px solid var(--cl-outline-variant)" }}>
                    <div className="cl-agenda__detail-head">
                      <div
                        className="cl-agenda__detail-badge"
                        style={{
                          background: COLOR_HEXES[
                            (calEvents.findIndex((e) => e.post.id === selectedPost.id)) % COLOR_HEXES.length
                          ],
                        }}
                      >
                        <Icon name="event" size={10} />
                        {selectedPost.tipo_post || "Evento"}
                      </div>
                      <h3 className="cl-agenda__detail-title">{selectedPost.title}</h3>
                      <div className="cl-agenda__detail-date">
                        <Icon name="date_range" size={14} />
                        {formatRangeLabel(selectedPost.date_ini, selectedPost.date_end)}
                      </div>
                    </div>
                    <div className="cl-agenda__detail-body">
                      {(selectedPost.shortdesc || selectedPost.description) && (
                        <p className="cl-agenda__detail-desc">
                          {htmlToText(selectedPost.shortdesc || selectedPost.description || "", 220)}
                          {(selectedPost.shortdesc || selectedPost.description || "").length > 220 ? "…" : ""}
                        </p>
                      )}
                      {selectedPost.url && (
                        <Link href={`/publicaciones/${selectedPost.id}`} className="cl-agenda__detail-link">
                          <Icon name="open_in_new" size={14} />
                          Ver más
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : selectedDay && dayEvents.length === 0 ? (
              <div className="cl-agenda__detail-empty">
                <div className="cl-agenda__detail-empty-icon">
                  <Icon name="event_busy" size={40} />
                </div>
                <p>No hay eventos el {selectedDay.getDate()} de {MONTHS_ES[selectedDay.getMonth()]}</p>
              </div>
            ) : (
              <div className="cl-agenda__detail-empty">
                <div className="cl-agenda__detail-empty-icon">
                  <Icon name="touch_app" size={40} />
                </div>
                <p>Hacé clic en un día o en un evento del calendario para ver los detalles</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
