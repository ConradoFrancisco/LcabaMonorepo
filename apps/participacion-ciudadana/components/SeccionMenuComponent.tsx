"use client";

import Link from "next/link";

interface SeccionMenuComponentProps {
    seccion: any;
    slug: string[];
}

export default function SeccionMenuComponent({ seccion, slug }: SeccionMenuComponentProps) {
    const titulo = seccion?.title || seccion?.name || slug[slug.length - 1]?.replace(/-/g, " ");
    const descripcion = seccion?.description || seccion?.content || seccion?.body || null;
    const imagen = seccion?.image || seccion?.img || seccion?.thumbnail || null;
    const parent = slug.length > 1 ? slug[0] : null;

    return (
        <section className="section-menu-page py-5">
            {/* Header de sección */}
            <div className="section-menu-hero position-relative overflow-hidden mb-0">
                <div
                    className="section-menu-hero-bg"
                    style={{
                        background: "linear-gradient(135deg, #1a237e 0%, #283593 50%, #1565c0 100%)",
                        minHeight: "260px",
                    }}
                >
                    {imagen && (
                        <div
                            className="position-absolute inset-0 w-100 h-100"
                            style={{
                                backgroundImage: `url(${imagen})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                opacity: 0.25,
                                top: 0, left: 0,
                            }}
                        />
                    )}
                    <div className="container position-relative py-5">
                        {/* Breadcrumb */}
                        <nav aria-label="breadcrumb" className="mb-3">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item">
                                    <Link href="/" className="text-white text-opacity-75 text-decoration-none small">
                                        <i className="ri-home-4-line me-1" />Inicio
                                    </Link>
                                </li>
                                {parent && (
                                    <li className="breadcrumb-item">
                                        <Link href={`/${parent}`} className="text-white text-opacity-75 text-decoration-none small text-capitalize">
                                            {parent.replace(/-/g, " ")}
                                        </Link>
                                    </li>
                                )}
                                <li className="breadcrumb-item active" aria-current="page">
                                    <span className="text-white small text-capitalize">{titulo}</span>
                                </li>
                            </ol>
                        </nav>

                        <h1 className="text-white fw-bold mb-2 text-capitalize" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
                            {titulo}
                        </h1>
                        {seccion?.subtitle && (
                            <p className="text-white text-opacity-75 lead mb-0">{seccion.subtitle}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="container py-5">
                {descripcion ? (
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10">
                            <div
                                className="section-content prose"
                                style={{ lineHeight: 1.8, fontSize: "1.05rem", color: "#374151" }}
                                dangerouslySetInnerHTML={{ __html: descripcion }}
                            />
                        </div>
                    </div>
                ) : (
                    /* Sub-ítems del menú si los hay */
                    seccion?.subItems && seccion.subItems.length > 0 ? (
                        <div>
                            <h2 className="fw-semibold mb-4 text-dark" style={{ fontSize: "1.4rem" }}>
                                Secciones
                            </h2>
                            <div className="row g-4">
                                {seccion.subItems.map((sub: any, idx: number) => (
                                    <div key={sub.id ?? idx} className="col-12 col-sm-6 col-md-4">
                                        <Link
                                            href={`/${slug[0]}/${sub.title?.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[^a-z0-9]+/g, "-")}`}
                                            className="d-block text-decoration-none h-100"
                                        >
                                            <div
                                                className="card border-0 shadow-sm h-100 rounded-4 p-4 text-center transition-all"
                                                style={{ transition: "transform .2s, box-shadow .2s" }}
                                                onMouseEnter={e => {
                                                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                                                    (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 30px rgba(0,0,0,.12)";
                                                }}
                                                onMouseLeave={e => {
                                                    (e.currentTarget as HTMLElement).style.transform = "";
                                                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                                                }}
                                            >
                                                <div
                                                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                                                    style={{ width: 56, height: 56, background: "rgba(21,101,192,.1)" }}
                                                >
                                                    <i className="ri-article-line text-primary" style={{ fontSize: 26 }} />
                                                </div>
                                                <h5 className="fw-semibold text-dark mb-1 text-capitalize" style={{ fontSize: "1rem" }}>
                                                    {sub.title}
                                                </h5>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Fallback: sección existe pero sin contenido aún */
                        <div className="text-center py-5 text-muted">
                            <i className="ri-file-text-line" style={{ fontSize: 56, opacity: .35 }} />
                            <p className="mt-3 mb-0 fs-5">El contenido de esta sección se encuentra en construcción.</p>
                            <Link href="/" className="btn btn-outline-primary rounded-pill px-4 py-2 mt-4 fw-semibold">
                                <i className="ri-arrow-left-line me-2" />Volver al inicio
                            </Link>
                        </div>
                    )
                )}
            </div>
        </section>
    );
}
