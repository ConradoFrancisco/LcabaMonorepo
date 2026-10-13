'use client';

import React, { useState, useMemo } from 'react';

export interface DocumentItem {
    id: number;
    title: string;
    description?: string | null;
    location: string;
    filename: string;
    mimetype?: string | null;
    size?: number | string | null;
    dt_ins?: string | null;
}

interface DocumentsDataTableProps {
    documents: DocumentItem[];
    siteTitle?: string;
    sectionTitle?: string;
}

function buildFileUrl(img: any): string | null {
    if (!img?.location || !img?.filename) return null;
    const base = process.env.NEXT_PUBLIC_IMAGES;
    const key = process.env.NEXT_PUBLIC_FILESERVER_KEY;
    const q = key ? ('?key=' + key) : '';
    return base + '/' + img.location + '/' + img.filename + q;
}

function formatBytes(bytes: number | string | null | undefined, decimals = 2): string {
    if (!bytes) return '-';
    const num = Number(bytes);
    if (isNaN(num) || num === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(num) / Math.log(k));
    return parseFloat((num / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function getFileType(mimetype?: string | null, filename?: string): string {
    if (mimetype) {
        if (mimetype.includes('pdf')) return 'PDF';
        if (mimetype.includes('word') || mimetype.includes('msword')) return 'DOC / DOCX';
        if (mimetype.includes('excel') || mimetype.includes('sheet')) return 'XLS / XLSX';
        if (mimetype.includes('zip') || mimetype.includes('compressed')) return 'ZIP';
        if (mimetype.includes('image')) return 'IMG';
    }
    if (filename) {
        const ext = filename.split('.').pop()?.toUpperCase();
        if (ext) return ext;
    }
    return 'Archivo';
}

export default function DocumentsDataTable({
    documents,
    siteTitle = 'Oficina de Integridad Pública (OIP)',
    sectionTitle = 'Documentos',
}: DocumentsDataTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [pageSize, setPageSize] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [copyAlert, setCopyAlert] = useState(false);

    // Filtrado
    const filteredDocs = useMemo(() => {
        if (!searchTerm.trim()) return documents;
        const q = searchTerm.toLowerCase();
        return documents.filter((doc) => {
            const titleMatch = (doc.title || doc.filename || '').toLowerCase().includes(q);
            const descMatch = (doc.description || '').toLowerCase().includes(q);
            const typeMatch = getFileType(doc.mimetype, doc.filename).toLowerCase().includes(q);
            return titleMatch || descMatch || typeMatch;
        });
    }, [documents, searchTerm]);

    // Paginación
    const totalPages = Math.ceil(filteredDocs.length / pageSize) || 1;
    const effectivePage = Math.min(currentPage, totalPages);
    const paginatedDocs = useMemo(() => {
        const start = (effectivePage - 1) * pageSize;
        return filteredDocs.slice(start, start + pageSize);
    }, [filteredDocs, effectivePage, pageSize]);

    // Acciones de Exportación
    const handleCopy = () => {
        const header = ['Título', 'Detalle', 'Tipo', 'Tamaño', 'Enlace'];
        const rows = filteredDocs.map((doc) => [
            doc.title || doc.filename || '',
            (doc.description || '').replace(/<[^>]*>/g, ''),
            getFileType(doc.mimetype, doc.filename),
            formatBytes(doc.size),
            buildFileUrl(doc) || '',
        ]);
        const text = [header.join('\t'), ...rows.map((r) => r.join('\t'))].join('\n');
        navigator.clipboard.writeText(text);
        setCopyAlert(true);
        setTimeout(() => setCopyAlert(false), 2500);
    };

    const handleExportCSV = () => {
        const header = ['"Título"', '"Detalle"', '"Tipo"', '"Tamaño"', '"URL"'];
        const rows = filteredDocs.map((doc) => [
            `"${(doc.title || doc.filename || '').replace(/"/g, '""')}"`,
            `"${(doc.description || '').replace(/<[^>]*>/g, '').replace(/"/g, '""')}"`,
            `"${getFileType(doc.mimetype, doc.filename)}"`,
            `"${formatBytes(doc.size)}"`,
            `"${buildFileUrl(doc) || ''}"`,
        ]);
        const csvContent = '\uFEFF' + [header.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${sectionTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_listado.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleExportExcel = () => {
        // Genera formato XML Spreadsheet compatible con Excel (.xls)
        const rowsXml = filteredDocs
            .map(
                (doc) => `
                <Row>
                    <Cell><Data ss:Type="String">${escapeXml(doc.title || doc.filename || '')}</Data></Cell>
                    <Cell><Data ss:Type="String">${escapeXml((doc.description || '').replace(/<[^>]*>/g, ''))}</Data></Cell>
                    <Cell><Data ss:Type="String">${escapeXml(getFileType(doc.mimetype, doc.filename))}</Data></Cell>
                    <Cell><Data ss:Type="String">${escapeXml(formatBytes(doc.size))}</Data></Cell>
                    <Cell><Data ss:Type="String">${escapeXml(buildFileUrl(doc) || '')}</Data></Cell>
                </Row>`
            )
            .join('');

        const excelXml = `<?xml version="1.0"?>
        <?mso-application progid="Excel.Sheet"?>
        <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
                  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
            <Worksheet ss:Name="Documentos">
                <Table>
                    <Row>
                        <Cell><Data ss:Type="String">Título</Data></Cell>
                        <Cell><Data ss:Type="String">Detalle</Data></Cell>
                        <Cell><Data ss:Type="String">Tipo</Data></Cell>
                        <Cell><Data ss:Type="String">Tamaño</Data></Cell>
                        <Cell><Data ss:Type="String">Enlace</Data></Cell>
                    </Row>
                    ${rowsXml}
                </Table>
            </Worksheet>
        </Workbook>`;

        const blob = new Blob([excelXml], { type: 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${sectionTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_listado.xls`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        const tableHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${sectionTitle} - ${siteTitle}</title>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 11px; margin: 20px; color: #222; }
                    h2 { margin-bottom: 4px; }
                    p.sub { color: #666; margin-top: 0; margin-bottom: 16px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                    th, td { border: 1px solid #ddd; padding: 7px 10px; text-align: left; }
                    th { background-color: #f5f5f5; font-weight: 600; }
                    a { color: #0d6efd; text-decoration: none; }
                </style>
            </head>
            <body>
                <h2>${sectionTitle}</h2>
                <p class="sub">${siteTitle}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Detalle</th>
                            <th>Tipo</th>
                            <th>Tamaño</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filteredDocs
                            .map(
                                (d) => `<tr>
                                    <td><strong>${d.title || d.filename || ''}</strong></td>
                                    <td>${(d.description || '').replace(/<[^>]*>/g, '') || '-'}</td>
                                    <td>${getFileType(d.mimetype, d.filename)}</td>
                                    <td>${formatBytes(d.size)}</td>
                                </tr>`
                            )
                            .join('')}
                    </tbody>
                </table>
            </body>
            </html>
        `;
        printWindow.document.write(tableHtml);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 300);
    };

    const handleExportPDF = () => {
        // Ventana optimizada de impresión como PDF
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Exportar a PDF - ${sectionTitle}</title>
                <style>
                    @page { size: landscape; margin: 15mm; }
                    body { font-family: Arial, sans-serif; font-size: 11px; color: #111; }
                    .header { border-bottom: 2px solid #0d6efd; padding-bottom: 8px; margin-bottom: 14px; }
                    .header h2 { margin: 0 0 4px 0; color: #0d6efd; }
                    .header p { margin: 0; color: #555; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; }
                    th { background: #eef2f7; font-weight: bold; }
                    tr:nth-child(even) { background: #fbfbfb; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h2>${sectionTitle}</h2>
                    <p>${siteTitle} | Legislatura de la Ciudad Autónoma de Buenos Aires</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th style="width: 45%;">Título</th>
                            <th style="width: 30%;">Detalle</th>
                            <th style="width: 12%;">Tipo</th>
                            <th style="width: 13%;">Tamaño</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filteredDocs
                            .map(
                                (d) => `<tr>
                                    <td><strong>${d.title || d.filename || ''}</strong></td>
                                    <td>${(d.description || '').replace(/<[^>]*>/g, '') || '-'}</td>
                                    <td>${getFileType(d.mimetype, d.filename)}</td>
                                    <td>${formatBytes(d.size)}</td>
                                </tr>`
                            )
                            .join('')}
                    </tbody>
                </table>
                <script>
                    window.onload = function() {
                        window.print();
                    };
                </script>
            </body>
            </html>
        `;
        printWindow.document.write(html);
        printWindow.document.close();
    };

    function escapeXml(unsafe: string) {
        return unsafe.replace(/[<>&'"]/g, (c) => {
            switch (c) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case '\'': return '&apos;';
                case '"': return '&quot;';
                default: return c;
            }
        });
    }

    if (documents.length === 0) {
        return (
            <div className="alert alert-light border text-muted">
                No hay documentos disponibles en esta sección.
            </div>
        );
    }

    return (
        <div className="documents-datatable-container mt-4">
            {/* Barra de Acciones / Botones estilo DataTables */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3 pb-2 border-bottom">
                <div className="d-flex flex-wrap align-items-center gap-2">
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1 shadow-sm"
                        style={{ fontSize: '0.85rem' }}
                        title="Copiar al portapapeles"
                    >
                        <i className="bi bi-clipboard"></i> Copy
                    </button>
                    <button
                        type="button"
                        onClick={handleExportCSV}
                        className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1 shadow-sm"
                        style={{ fontSize: '0.85rem' }}
                        title="Descargar como CSV"
                    >
                        <i className="bi bi-filetype-csv"></i> CSV
                    </button>
                    <button
                        type="button"
                        onClick={handleExportExcel}
                        className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1 shadow-sm"
                        style={{ fontSize: '0.85rem' }}
                        title="Descargar como Excel"
                    >
                        <i className="bi bi-file-earmark-excel"></i> Excel
                    </button>
                    <button
                        type="button"
                        onClick={handlePrint}
                        className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1 shadow-sm"
                        style={{ fontSize: '0.85rem' }}
                        title="Imprimir"
                    >
                        <i className="bi bi-printer"></i> Print
                    </button>
                    <button
                        type="button"
                        onClick={handleExportPDF}
                        className="btn btn-sm btn-link text-decoration-none d-inline-flex align-items-center gap-1 text-primary fw-semibold"
                        style={{ fontSize: '0.88rem' }}
                        title="Exportar tabla a formato PDF"
                    >
                        <i className="bi bi-file-earmark-pdf"></i>
                        <u>E</u>xportar Tabla a (PDF)
                    </button>
                </div>

                {/* Buscador */}
                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="dt-search" className="text-muted small fw-medium mb-0">
                        Buscar:
                    </label>
                    <input
                        id="dt-search"
                        type="search"
                        className="form-control form-control-sm"
                        placeholder="Filtrar registros..."
                        style={{ width: '200px' }}
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            </div>

            {/* Selector de registros a mostrar */}
            <div className="d-flex align-items-center gap-2 mb-3">
                <span className="text-muted text-uppercase" style={{ fontSize: '0.78rem', letterSpacing: '0.5px' }}>
                    Mostrar
                </span>
                <select
                    className="form-select form-select-sm"
                    style={{ width: '80px', fontSize: '0.85rem' }}
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
                <span className="text-muted text-uppercase" style={{ fontSize: '0.78rem', letterSpacing: '0.5px' }}>
                    registros
                </span>
            </div>

            {copyAlert && (
                <div className="alert alert-success py-2 px-3 small d-inline-flex align-items-center gap-2 mb-3">
                    <i className="bi bi-check-circle-fill"></i> ¡Copiado al portapapeles!
                </div>
            )}

            {/* Tabla */}
            <div className="table-responsive bg-white rounded-3 border shadow-sm">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                            <th scope="col" className="py-3 px-3">Título</th>
                            <th scope="col" className="py-3 px-3 d-none d-lg-table-cell">Detalle</th>
                            <th scope="col" className="py-3 px-3 d-none d-md-table-cell">Tipo</th>
                            <th scope="col" className="py-3 px-3 d-none d-md-table-cell">Tamaño</th>
                            <th scope="col" className="py-3 px-3 text-end">Descargar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedDocs.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-muted">
                                    No se encontraron registros que coincidan con la búsqueda.
                                </td>
                            </tr>
                        ) : (
                            paginatedDocs.map((doc, idx) => {
                                const fileUrl = buildFileUrl(doc);
                                const fileType = getFileType(doc.mimetype, doc.filename);
                                const isWord = fileType.includes('DOC');
                                const isPdf = fileType.includes('PDF');

                                return (
                                    <tr key={doc.id ?? idx}>
                                        <td className="py-3 px-3">
                                            <div className="d-flex align-items-center gap-2">
                                                <i
                                                    className={`bi bi-file-earmark-${
                                                        isWord ? 'word text-primary' : isPdf ? 'pdf text-danger' : 'text text-secondary'
                                                    } fs-5`}
                                                />
                                                {fileUrl ? (
                                                    <a
                                                        href={fileUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-decoration-none fw-semibold text-dark hover-primary"
                                                    >
                                                        {doc.title || doc.filename || `Archivo ${idx + 1}`}
                                                    </a>
                                                ) : (
                                                    <span className="fw-semibold text-dark">
                                                        {doc.title || doc.filename || `Archivo ${idx + 1}`}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 px-3 d-none d-lg-table-cell text-muted small">
                                            {doc.description ? (
                                                <div dangerouslySetInnerHTML={{ __html: doc.description }} />
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                        <td className="py-3 px-3 d-none d-md-table-cell">
                                            <span className="badge bg-light text-secondary border">
                                                {fileType}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 d-none d-md-table-cell text-muted small">
                                            {formatBytes(doc.size)}
                                        </td>
                                        <td className="py-3 px-3 text-end">
                                            {fileUrl ? (
                                                <a
                                                    href={fileUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="btn btn-sm btn-outline-primary rounded-pill px-3 d-inline-flex align-items-center gap-1"
                                                    style={{ fontSize: '0.82rem' }}
                                                >
                                                    <i className="bi bi-download"></i> Descargar
                                                </a>
                                            ) : (
                                                <span className="text-muted small">No disponible</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Paginación e información de registros */}
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mt-3 pt-2">
                <span className="text-muted small">
                    Mostrando{' '}
                    {filteredDocs.length === 0
                        ? 0
                        : (effectivePage - 1) * pageSize + 1}{' '}
                    a {Math.min(effectivePage * pageSize, filteredDocs.length)} de{' '}
                    {filteredDocs.length} registros
                    {documents.length !== filteredDocs.length && ` (filtrado de ${documents.length} en total)`}
                </span>

                {totalPages > 1 && (
                    <nav aria-label="Navegación de páginas">
                        <ul className="pagination mb-0 gap-1 align-items-center">
                            {/* Botón Primera página */}
                            <li className={`page-item ${effectivePage <= 1 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link d-flex align-items-center justify-content-center border-0 shadow-none"
                                    onClick={() => setCurrentPage(1)}
                                    disabled={effectivePage <= 1}
                                    title="Primera página"
                                    aria-label="Primera página"
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '8px',
                                        background: effectivePage <= 1 ? 'transparent' : 'var(--tc-bg-light, #f3f4f6)',
                                        color: effectivePage <= 1 ? '#9ca3af' : 'var(--tc-system-black, #1f2937)',
                                        cursor: effectivePage <= 1 ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="11 17 6 12 11 7"></polyline>
                                        <polyline points="18 17 13 12 18 7"></polyline>
                                    </svg>
                                </button>
                            </li>

                            {/* Botón Anterior */}
                            <li className={`page-item ${effectivePage <= 1 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link d-flex align-items-center justify-content-center border-0 shadow-none"
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={effectivePage <= 1}
                                    title="Página anterior"
                                    aria-label="Anterior"
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '8px',
                                        background: effectivePage <= 1 ? 'transparent' : 'var(--tc-bg-light, #f3f4f6)',
                                        color: effectivePage <= 1 ? '#9ca3af' : 'var(--tc-system-black, #1f2937)',
                                        cursor: effectivePage <= 1 ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6"></polyline>
                                    </svg>
                                </button>
                            </li>

                            {/* Números de página con elipsis */}
                            {(() => {
                                const pages: (number | string)[] = [];
                                const delta = 1;
                                const left = effectivePage - delta;
                                const right = effectivePage + delta;
                                let prev: number | null = null;

                                for (let i = 1; i <= totalPages; i++) {
                                    if (i === 1 || i === totalPages || (i >= left && i <= right)) {
                                        if (prev && i - prev === 2) {
                                            pages.push(prev + 1);
                                        } else if (prev && i - prev > 2) {
                                            pages.push('...');
                                        }
                                        pages.push(i);
                                        prev = i;
                                    }
                                }

                                return pages.map((page, idx) => {
                                    if (typeof page === 'string') {
                                        return (
                                            <li key={`ellipsis-${idx}`} className="page-item disabled px-1">
                                                <span
                                                    className="d-flex align-items-center justify-content-center text-muted"
                                                    style={{ width: '28px', height: '36px', fontWeight: 600 }}
                                                >
                                                    …
                                                </span>
                                            </li>
                                        );
                                    }

                                    const isActive = page === effectivePage;
                                    return (
                                        <li key={page} className="page-item">
                                            <button
                                                className={`page-link d-flex align-items-center justify-content-center border-0 shadow-none fw-medium`}
                                                onClick={() => setCurrentPage(page)}
                                                style={{
                                                    minWidth: '36px',
                                                    height: '36px',
                                                    padding: '0 10px',
                                                    borderRadius: '8px',
                                                    background: isActive ? 'var(--tc-theme-primary, #0d6efd)' : 'var(--tc-bg-light, #f3f4f6)',
                                                    color: isActive ? '#ffffff' : 'var(--tc-system-black, #1f2937)',
                                                    fontWeight: isActive ? 600 : 500,
                                                    fontSize: '0.875rem',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease',
                                                    boxShadow: isActive ? '0 2px 6px rgba(0,0,0,0.15)' : 'none',
                                                }}
                                            >
                                                {page}
                                            </button>
                                        </li>
                                    );
                                });
                            })()}

                            {/* Botón Siguiente */}
                            <li className={`page-item ${effectivePage >= totalPages ? 'disabled' : ''}`}>
                                <button
                                    className="page-link d-flex align-items-center justify-content-center border-0 shadow-none"
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={effectivePage >= totalPages}
                                    title="Página siguiente"
                                    aria-label="Siguiente"
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '8px',
                                        background: effectivePage >= totalPages ? 'transparent' : 'var(--tc-bg-light, #f3f4f6)',
                                        color: effectivePage >= totalPages ? '#9ca3af' : 'var(--tc-system-black, #1f2937)',
                                        cursor: effectivePage >= totalPages ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </button>
                            </li>

                            {/* Botón Última página */}
                            <li className={`page-item ${effectivePage >= totalPages ? 'disabled' : ''}`}>
                                <button
                                    className="page-link d-flex align-items-center justify-content-center border-0 shadow-none"
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={effectivePage >= totalPages}
                                    title="Última página"
                                    aria-label="Última página"
                                    style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '8px',
                                        background: effectivePage >= totalPages ? 'transparent' : 'var(--tc-bg-light, #f3f4f6)',
                                        color: effectivePage >= totalPages ? '#9ca3af' : 'var(--tc-system-black, #1f2937)',
                                        cursor: effectivePage >= totalPages ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="13 17 18 12 13 7"></polyline>
                                        <polyline points="6 17 11 12 6 7"></polyline>
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
}
