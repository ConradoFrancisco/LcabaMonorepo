'use client';

import React, { useState } from 'react';

// Componente base de Acordeón individual
function AccordionCard({
    title,
    icon,
    count,
    color = '#0d6efd',
    defaultOpen = true,
    children,
}: {
    title: string;
    icon: string;
    count: number;
    color?: string;
    defaultOpen?: boolean;
    children: React.ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div
            className='mt-4 rounded-4 overflow-hidden shadow-sm transition-all'
            style={{
                backgroundColor: '#ffffff',
                border: isOpen ? `1px solid ${color}35` : '1px solid #e2e8f0',
                transition: 'all 0.25s ease',
            }}
        >
            {/* Header del Acordeón Individual */}
            <button
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className='w-100 p-3 px-4 d-flex align-items-center justify-content-between text-start border-0 bg-white'
                style={{ cursor: 'pointer' }}
                aria-expanded={isOpen}
            >
                <div className='d-flex align-items-center gap-3'>
                    <span
                        className='d-inline-flex align-items-center justify-content-center rounded-3'
                        style={{
                            width: '38px',
                            height: '38px',
                            backgroundColor: `${color}15`,
                            color: color,
                        }}
                    >
                        <i className={`bi ${icon} fs-5`}></i>
                    </span>
                    <span className='fw-bold text-dark fs-6' style={{ letterSpacing: '-0.2px' }}>
                        {title}
                    </span>
                    <span
                        className='badge rounded-pill'
                        style={{
                            backgroundColor: `${color}15`,
                            color: color,
                            fontSize: '0.78rem',
                            padding: '4px 9px',
                        }}
                    >
                        {count}
                    </span>
                </div>
                <div
                    className='d-inline-flex align-items-center justify-content-center rounded-circle'
                    style={{
                        width: '28px',
                        height: '28px',
                        backgroundColor: '#f1f5f9',
                        color: '#64748b',
                    }}
                >
                    <i
                        className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}
                        style={{ fontSize: '0.85rem' }}
                    ></i>
                </div>
            </button>

            {/* Contenido desplegable */}
            {isOpen && (
                <div className='p-4 pt-2 border-top' style={{ borderColor: '#f1f5f9' }}>
                    {children}
                </div>
            )}
        </div>
    );
}

// 1. Acordeón Individual de Expedientes
export function ExpedientesAccordion({ proyectos = [] }: { proyectos: any[] }) {
    if (!proyectos.length) return null;
    return (
        <AccordionCard
            title='Expedientes Relacionados'
            icon='bi-bank'
            count={proyectos.length}
            color='#0d6efd'
            defaultOpen={true}
        >
            <div className='d-flex flex-column gap-3'>
                {proyectos.map((proyecto: any, i: number) => {
                    const det = proyecto.detalleExpediente || proyecto;
                    const expNro = det?.nro_de_expediente || proyecto.expediente_id || `Expediente ${i + 1}`;
                    const sumario = det?.sumario || '';
                    const autor = det?.autor_des || '';
                    const tipo = det?.proyecto_tipo_des || '';

                    return (
                        <div
                            key={proyecto.id || i}
                            className='p-3 bg-white rounded-3 shadow-sm border border-light'
                            style={{ borderLeft: '4px solid #0d6efd !important' }}
                        >
                            <div className='d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2'>
                                <span className='fw-bold text-dark fs-6'>
                                    Expediente: {expNro}
                                </span>
                                {tipo && (
                                    <span className='badge bg-light text-secondary border px-3 py-1 rounded-pill' style={{ fontSize: '0.75rem' }}>
                                        {tipo}
                                    </span>
                                )}
                            </div>
                            {sumario && (
                                <p className='mb-2 text-secondary' style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>
                                    <strong className='text-dark'>Sumario: </strong>
                                    {sumario}
                                </p>
                            )}
                            {autor && (
                                <div className='small text-muted'>
                                    <strong className='text-secondary'>Autor/es: </strong>
                                    {autor}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </AccordionCard>
    );
}

// 2. Acordeón Individual de Comisiones
export function ComisionesAccordion({ comisiones = [] }: { comisiones: any[] }) {
    if (!comisiones.length) return null;
    return (
        <AccordionCard
            title='Comisiones Relacionadas'
            icon='bi-diagram-3'
            count={comisiones.length}
            color='#6366f1'
            defaultOpen={true}
        >
            <div className='d-flex flex-column gap-3'>
                {comisiones.map((comision: any, i: number) => {
                    const det = Array.isArray(comision.detalleComision) ? comision.detalleComision[0] : (comision.detalleComision || comision);
                    const nombre = det?.nombre || `Comisión #${comision.comision_id || i + 1}`;
                    const competencia = det?.competencia || '';
                    const tipo = det?.tipo || '';

                    return (
                        <div
                            key={comision.id || i}
                            className='p-3 bg-white rounded-3 shadow-sm border border-light'
                            style={{ borderLeft: '4px solid #6366f1 !important' }}
                        >
                            <div className='d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2'>
                                <span className='fw-bold text-dark fs-6'>
                                    {nombre}
                                </span>
                                {tipo && (
                                    <span className='badge bg-light text-secondary border px-3 py-1 rounded-pill' style={{ fontSize: '0.75rem' }}>
                                        {tipo}
                                    </span>
                                )}
                            </div>
                            {competencia && (
                                <p className='mb-0 text-secondary' style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>
                                    <strong className='text-dark'>Competencia: </strong>
                                    {competencia}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </AccordionCard>
    );
}

// 3. Acordeón Individual de Diputados
export function DiputadosAccordion({ legisladores = [] }: { legisladores: any[] }) {
    if (!legisladores.length) return null;
    return (
        <AccordionCard
            title='Diputados Relacionados'
            icon='bi-people'
            count={legisladores.length}
            color='#059669'
            defaultOpen={true}
        >
            <div className='row g-3'>
                {legisladores.map((leg: any, i: number) => {
                    const det = leg.detalleLegislador || leg;
                    const nombreCompleto = det?.apellido && det?.nombre ? `${det.nombre} ${det.apellido}` : (det?.nombre || det?.apellido || `Diputado #${leg.legislador_id || i + 1}`);
                    const fotoUrl = det?.fotoM || det?.fotoS || det?.foto;
                    const bloque = det?.bloque;
                    const bloqueColor = det?.bloque_color ? `#${det.bloque_color}` : null;
                    const mandato = det?.fecha_fin_mandato ? `Mandato hasta ${det.fecha_fin_mandato}` : null;

                    return (
                        <div key={leg.id || i} className='col-12 col-md-6'>
                            <div className='p-3 bg-white rounded-3 shadow-sm border border-light h-100 d-flex align-items-center gap-3'>
                                {fotoUrl ? (
                                    <img
                                        src={fotoUrl}
                                        alt={nombreCompleto}
                                        className='rounded-circle flex-shrink-0'
                                        style={{ width: '56px', height: '56px', objectFit: 'cover', border: '2px solid #e2e8f0' }}
                                    />
                                ) : (
                                    <div
                                        className='rounded-circle flex-shrink-0 d-flex align-items-center justify-content-center bg-light text-secondary'
                                        style={{ width: '56px', height: '56px', border: '2px solid #e2e8f0' }}
                                    >
                                        <i className='bi bi-person-fill fs-3'></i>
                                    </div>
                                )}
                                <div className='flex-grow-1 min-w-0'>
                                    <h6 className='mb-1 fw-bold text-dark text-truncate' title={nombreCompleto}>
                                        {nombreCompleto}
                                    </h6>
                                    {bloque && (
                                        <span
                                            className='badge rounded-pill mb-1 d-inline-block text-truncate'
                                            style={{
                                                backgroundColor: bloqueColor ? `${bloqueColor}15` : '#e0e7ff',
                                                color: bloqueColor || '#4338ca',
                                                border: `1px solid ${bloqueColor ? `${bloqueColor}40` : '#c7d2fe'}`,
                                                fontSize: '0.75rem',
                                                maxWidth: '100%',
                                            }}
                                        >
                                            {bloque}
                                        </span>
                                    )}
                                    {mandato && (
                                        <div className='small text-muted d-flex align-items-center gap-1' style={{ fontSize: '0.78rem' }}>
                                            <i className='bi bi-calendar-event'></i>
                                            <span>{mandato}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </AccordionCard>
    );
}

// 4. Acordeón Individual de Sesiones
export function SesionesAccordion({ sesiones = [] }: { sesiones: any[] }) {
    if (!sesiones.length) return null;
    return (
        <AccordionCard
            title='Sesiones Relacionadas'
            icon='bi-calendar3-event'
            count={sesiones.length}
            color='#d97706'
            defaultOpen={true}
        >
            <div className='d-flex flex-column gap-3'>
                {sesiones.map((sesion: any, i: number) => {
                    const det = sesion.detalleSesion || sesion;
                    const nroSesion = det?.nro_de_sesion || `Sesión ${i + 1}`;
                    const tipo = det?.dsc_sesion_tipo || det?.abrev_sesion_tipo || '';
                    const fecha = det?.fch_sesion_lp || det?.ve_fechasesion || '';
                    const ano = det?.ano_parlamentario || '';

                    return (
                        <div
                            key={sesion.id || i}
                            className='p-3 bg-white rounded-3 shadow-sm border border-light'
                            style={{ borderLeft: '4px solid #d97706 !important' }}
                        >
                            <div className='d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2'>
                                <span className='fw-bold text-dark fs-6'>
                                    Sesión: {nroSesion}
                                </span>
                                {tipo && (
                                    <span className='badge bg-light text-secondary border px-3 py-1 rounded-pill' style={{ fontSize: '0.75rem' }}>
                                        {tipo}
                                    </span>
                                )}
                            </div>
                            <div className='d-flex flex-wrap gap-3 small text-muted'>
                                {fecha && (
                                    <span className='d-inline-flex align-items-center gap-1'>
                                        <i className='bi bi-calendar-check text-primary'></i>
                                        Fecha: <strong>{fecha}</strong>
                                    </span>
                                )}
                                {ano && (
                                    <span className='d-inline-flex align-items-center gap-1'>
                                        <i className='bi bi-clock-history text-secondary'></i>
                                        Año parlamentario: <strong>{ano}</strong>
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </AccordionCard>
    );
}

// 5. Acordeón Individual de Audiencias
export function AudienciasAccordion({ audiencias = [] }: { audiencias: any[] }) {
    if (!audiencias.length) return null;
    return (
        <AccordionCard
            title='Audiencias Relacionadas'
            icon='bi-megaphone'
            count={audiencias.length}
            color='#dc2626'
            defaultOpen={true}
        >
            <div className='d-flex flex-column gap-3'>
                {audiencias.map((aud: any, i: number) => {
                    const det = aud.detalleAudiencia || aud;
                    const expediente = det?.expediente || '';
                    const comision = det?.comision || '';
                    const fechaHora = det?.fecha_hora || '';
                    const sala = det?.sala_reunion || '';
                    const sumario = det?.sumario || det?.observaciones || '';
                    const inscriptos = det?.total_inscriptos;

                    return (
                        <div
                            key={aud.id || i}
                            className='p-3 bg-white rounded-3 shadow-sm border border-light'
                            style={{ borderLeft: '4px solid #dc2626 !important' }}
                        >
                            <div className='d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2'>
                                <span className='fw-bold text-dark fs-6'>
                                    {expediente ? `Expediente: ${expediente}` : `Audiencia #${det?.id_audiencia || i + 1}`}
                                </span>
                                {inscriptos !== undefined && (
                                    <span className='badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 px-3 py-1 rounded-pill' style={{ fontSize: '0.75rem' }}>
                                        {inscriptos} inscriptos
                                    </span>
                                )}
                            </div>
                            {comision && (
                                <div className='small mb-2 text-primary fw-medium'>
                                    <i className='bi bi-diagram-3 me-1'></i>
                                    {comision}
                                </div>
                            )}
                            {sumario && (
                                <p className='mb-2 text-secondary' style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>
                                    {sumario}
                                </p>
                            )}
                            <div className='d-flex flex-wrap gap-3 small text-muted pt-1 border-top'>
                                {fechaHora && (
                                    <span className='d-inline-flex align-items-center gap-1'>
                                        <i className='bi bi-clock text-secondary'></i>
                                        {fechaHora}
                                    </span>
                                )}
                                {sala && (
                                    <span className='d-inline-flex align-items-center gap-1'>
                                        <i className='bi bi-geo-alt text-danger'></i>
                                        {sala}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </AccordionCard>
    );
}

// Export default que renderiza los acordeones individuales que tengan datos
export default function ParlamentariaIndividualAccordions({
    proyectos = [],
    comisiones = [],
    legisladores = [],
    sesiones = [],
    audiencias = [],
}: {
    proyectos?: any[];
    comisiones?: any[];
    legisladores?: any[];
    sesiones?: any[];
    audiencias?: any[];
}) {
    return (
        <>
            <ExpedientesAccordion proyectos={proyectos} />
            <ComisionesAccordion comisiones={comisiones} />
            <DiputadosAccordion legisladores={legisladores} />
            <SesionesAccordion sesiones={sesiones} />
            <AudienciasAccordion audiencias={audiencias} />
        </>
    );
}
