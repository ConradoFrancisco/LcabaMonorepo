import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────
interface Salon {
    Nombre?: string;
    [key: string]: any;
}
interface Comision {
    Nombre?: string;
    [key: string]: any;
}
interface Expediente {
    id?: number;
    NumOrden?: number;
    Año?: number;
    Letra?: string;
    Sumario?: string;
    [key: string]: any;
}
interface Audiencia {
    Id: number;
    FechaHora: string;
    Expediente?: Expediente;
    Salon?: Salon;
    Comision?: Comision;
    Observaciones?: string;
    Descripcion?: string;
    InscripcionFechaDesde?: string;
    InscripcionFechaHasta?: string;
    Publicado: boolean;
    Suspendida: boolean;
    Habilitado: boolean;
    Formato?: string;
    inscriptos?: number;
    asignados?: number;
}

// ── Helpers ────────────────────────────────────────────────────────────────
function parseMSDate(dateStr?: string): Date | null {
    if (!dateStr) return null;
    const match = dateStr.match(/\/Date\((-?\d+)\)\//);
    if (!match) return null;
    return new Date(parseInt(match[1]));
}

function formatFecha(dateStr?: string): { dia: string; mes: string; hora: string } {
    const date = parseMSDate(dateStr);
    if (!date) return { dia: "--", mes: "---", hora: "--:--" };
    const dia = date.toLocaleDateString("es-AR", { day: "2-digit" });
    const mes = date.toLocaleDateString("es-AR", { month: "short" }).replace(".", "").toUpperCase();
    const hora = date.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false });
    return { dia, mes, hora };
}

function isInscripcionAbierta(desde?: string, hasta?: string): boolean {
    const ahora = Date.now();
    const d = parseMSDate(desde);
    const h = parseMSDate(hasta);
    if (!d || !h) return false;
    return ahora >= d.getTime() && ahora <= h.getTime();
}

// ── Component ──────────────────────────────────────────────────────────────
interface Props {
    audiencias: Audiencia[];
}

export default function AudienciasSection({ audiencias }: Props) {
    if (!audiencias?.length) return null;

    const visibles = audiencias.filter((a) => a.Publicado && a.Habilitado).slice(0, 6);

    return (
        <section className="audiencias-section py-80">
            <div className="container">
                {/* Header */}
                <div className="row align-items-end mb-50">
                    <div className="col-lg-8">
                        <span className="audiencias-badge mb-3 d-inline-block">Próximas</span>
                        <h2 className="fs-48 fw-bold mb-0">
                            Audiencias <span className="text-primary">Públicas</span>
                        </h2>
                        <p className="text-muted mt-3 mb-0" style={{ maxWidth: 520 }}>
                            Participá activamente en las audiencias públicas de la Legislatura de la Ciudad de Buenos Aires.
                        </p>
                    </div>
                    <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                        <Link href="/audiencias-publicas" className="btn btn-outline-primary btn-lg">
                            Ver todas
                            <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Cards grid */}
                <div className="row g-4 mt-4">
                    {visibles.map((audiencia) => {
                        const { dia, mes, hora } = formatFecha(audiencia.FechaHora);
                        const inscripcionAbierta = isInscripcionAbierta(
                            audiencia.InscripcionFechaDesde,
                            audiencia.InscripcionFechaHasta
                        );
                        const titulo = audiencia.Observaciones || audiencia.Descripcion || "Audiencia Pública";

                        return (
                            <div key={audiencia.Id} className="col-lg-4 col-md-6">
                                <div className={`audiencia-card h-100 ${audiencia.Suspendida ? "audiencia-card--suspendida" : ""}`}>
                                    {/* Fecha destacada */}
                                    <div className="audiencia-card__fecha">
                                        <span className="audiencia-card__dia">{dia}</span>
                                        <span className="audiencia-card__mes">{mes}</span>
                                    </div>

                                    <div className="audiencia-card__body">
                                        {/* Badges */}
                                        <div className="d-flex flex-wrap gap-2 mb-3">
                                            {audiencia.Suspendida && (
                                                <span className="audiencia-tag audiencia-tag--suspendida">Suspendida</span>
                                            )}
                                            {!audiencia.Suspendida && inscripcionAbierta && (
                                                <span className="audiencia-tag audiencia-tag--abierta">Inscripción abierta</span>
                                            )}
                                            {audiencia.Formato && (
                                                <span className="audiencia-tag audiencia-tag--formato">{audiencia.Formato}</span>
                                            )}
                                        </div>

                                        {/* Título */}
                                        <h6 className="audiencia-card__titulo">
                                            {titulo.length > 100 ? titulo.slice(0, 100) + "…" : titulo}
                                        </h6>

                                        {/* Meta */}
                                        <div className="audiencia-card__meta">
                                            {audiencia.Expediente && (audiencia.Expediente.NumOrden || audiencia.Expediente.Año) && (
                                                <div className="audiencia-meta-item audiencia-meta-item--expediente">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                                                        <path d="M4.5 4h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1zm0 3h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1zm0 3h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1z" />
                                                    </svg>
                                                    <span>
                                                        Exp.{audiencia.Expediente.Letra ? ` ${audiencia.Expediente.Letra}-` : " "}
                                                        {audiencia.Expediente.NumOrden ?? ""}
                                                        {audiencia.Expediente.Año ? `/${audiencia.Expediente.Año}` : ""}
                                                    </span>
                                                </div>
                                            )}
                                            {audiencia.Salon?.Nombre && (
                                                <div className="audiencia-meta-item">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                                    </svg>
                                                    <span>{audiencia.Salon.Nombre}</span>
                                                </div>
                                            )}
                                            <div className="audiencia-meta-item">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                                                </svg>
                                                <span>{hora} hs</span>
                                            </div>
                                            {audiencia.Comision?.Nombre && (
                                                <div className="audiencia-meta-item">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                        <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                                                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                                                    </svg>
                                                    <span>{audiencia.Comision.Nombre}</span>
                                                </div>
                                            )}
                                        </div>


                                        {/* Footer */}
                                        <div className="audiencia-card__footer">
                                            {inscripcionAbierta && !audiencia.Suspendida ? (
                                                <Link
                                                    href={`/audiencias/${audiencia.Id}`}
                                                    className="btn btn-primary btn-sm w-100"
                                                >
                                                    Inscribirme
                                                </Link>
                                            ) : (
                                                <Link
                                                    href={`/audiencias/${audiencia.Id}`}
                                                    className="btn btn-outline-secondary btn-sm w-100"
                                                >
                                                    Ver detalle
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>


        </section>
    );
}
