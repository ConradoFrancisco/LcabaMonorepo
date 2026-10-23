import ImageGallery from "./ImageGallery";
import Link from "next/link";
import { notFound } from "next/navigation";
import ParlamentariaIndividualAccordions from "./ParlamentariaAccordion";

// ── helpers ──────────────────────────────────────────────────────────────────

function buildImageUrl(img: any): string | null {
  if (!img?.location || !img?.filename) return null;
  const base = process.env.NEXT_PUBLIC_IMAGES;
  const key = process.env.NEXT_PUBLIC_FILESERVER_KEY;
  return `${base}/${img.location}/${img.filename}${key ? `?key=${key}` : ""}`;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

// ── data fetchers ─────────────────────────────────────────────────────────────

async function getPost(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/posts/post/${id}?table=cultura_`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ── page ──────────────────────────────────────────────────────────────────────

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);
  console.log(post)
  if (!post) notFound();

  const { textos, images = [], videos = [], archivos = [], seteos = {}, infoParlamentaria } = post;
  const title = textos?.title || "";
  const subtitle = textos?.subtitle || "";
  const description = textos?.description || "";
  const shortdesc = textos?.shortdesc || "";
  const date = formatDate(seteos?.date_ins || seteos?.date);
  const category = seteos?.cat_name || seteos?.categoria || "";

  const proyectos: any[] = infoParlamentaria?.proyectos || [];
  const comisiones: any[] = infoParlamentaria?.comisiones || [];
  const legisladores: any[] = infoParlamentaria?.legisladores || infoParlamentaria?.diputados || [];
  const sesiones: any[] = infoParlamentaria?.sesiones || [];
  const audiencias: any[] = infoParlamentaria?.audiencias || [];

  // All valid images
  const allImages = (images as any[])
    .map((i: any) => buildImageUrl(i))
    .filter(Boolean) as string[];

  return (
    <>
      {/* ── Banner de Publicación (Full Width con Gradiente) ── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          background:
            "radial-gradient(circle at 12% 25%, rgba(201, 0, 61, 0.35) 0%, transparent 55%), radial-gradient(circle at 88% 75%, rgba(217, 144, 0, 0.22) 0%, transparent 50%), linear-gradient(135deg, #181116 0%, #29111e 55%, #130e13 100%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          padding: "clamp(3.5rem, 6vw, 4.8rem) 0",
          overflow: "hidden",
        }}
      >
        <div className="container position-relative">
          {/* Breadcrumb integrado */}
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb mb-0" style={{ fontSize: "0.875rem" }}>
              <li className="breadcrumb-item">
                <Link
                  href="/"
                  className="text-white-50 text-decoration-none"
                  style={{ transition: "color 0.2s" }}
                >
                  Inicio
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link
                  href="/publicaciones"
                  className="text-white-50 text-decoration-none"
                  style={{ transition: "color 0.2s" }}
                >
                  Publicaciones
                </Link>
              </li>
              {category && (
                <li
                  className="breadcrumb-item active"
                  aria-current="page"

                  style={{ color: '#ffd580', opacity: 0.85 }}
                >
                  {category}
                </li>
              )}
            </ol>
          </nav>

          {/* Categoría Badge opcional */}
          {/*  {category && (
            <div className="mb-3">
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#ffd580",
                  backgroundColor: "rgba(217, 144, 0, 0.2)",
                  border: "1px solid rgba(217, 144, 0, 0.35)",
                  borderRadius: "20px",
                }}
              >
                {category}
              </span>
            </div>
          )} */}

          {/* Título de la publicación */}
          {title && (
            <h1
              className="fw-bold mb-0 text-white"
              style={{
                fontSize: "clamp(2rem, 3.8vw, 3rem)",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                maxWidth: "960px",
                textShadow: "0 2px 12px rgba(0, 0, 0, 0.4)",
              }}
            >
              {title}
            </h1>
          )}

          {/* Subtítulo de la publicación integrado en el Banner */}
          {subtitle && (
            <div
              className="cl-post-banner__subtitle mt-3"
              style={{
                fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                lineHeight: 1.6,
                maxWidth: "900px",
                color: "rgba(255, 255, 255, 0.88)",
                fontWeight: 300,
                textShadow: "0 1px 8px rgba(0, 0, 0, 0.3)",
              }}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          )}
        </div>
      </section>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <section className="py-5" style={{ backgroundColor: "#fcf8fc" }}>
        <style>{`
          .cl-post-banner__subtitle p {
            margin-bottom: 0;
            color: inherit;
            font-size: inherit;
            line-height: inherit;
          }
          .cl-post-body {
            font-size: 1.075rem;
            line-height: 1.85;
            color: #353036;
          }
          .cl-post-body p {
            margin-bottom: 1.5rem;
          }
          .cl-post-body h2, .cl-post-body h3, .cl-post-body h4 {
            font-family: var(--cl-display, "Libre Franklin", sans-serif);
            font-weight: 700;
            color: #1a1619;
            margin-top: 2.25rem;
            margin-bottom: 1rem;
            letter-spacing: -0.01em;
          }
          .cl-post-body h2 { font-size: 1.65rem; }
          .cl-post-body h3 { font-size: 1.35rem; }
          .cl-post-body a {
            color: #c9003d;
            text-decoration: underline;
            text-underline-offset: 3px;
            font-weight: 500;
            transition: color 0.2s;
          }
          .cl-post-body a:hover {
            color: #a60032;
          }
          .cl-post-body blockquote {
            margin: 2rem 0;
            padding: 1.25rem 1.75rem;
            background: #f7f3f6;
            border-left: 4px solid #c9003d;
            border-radius: 0 12px 12px 0;
            font-style: italic;
            color: #4a4248;
          }
          .cl-post-body img {
            max-width: 100%;
            height: auto;
            border-radius: 14px;
            margin: 1.75rem 0;
            box-shadow: 0 6px 20px rgba(0,0,0,0.08);
          }
          .cl-post-body ul, .cl-post-body ol {
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
          }
          .cl-post-body li {
            margin-bottom: 0.5rem;
          }
          .cl-file-card {
            transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
          }
          .cl-file-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important;
            border-color: #c9003d !important;
          }
          .cl-share-btn {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: #4a4248;
            background-color: #f3edf2;
            transition: all 0.2s;
            text-decoration: none;
          }
          .cl-share-btn:hover {
            background-color: #c9003d;
            color: #ffffff;
            transform: translateY(-2px);
          }
        `}</style>

        <div className="container">
          <div className="row g-5">

            {/* Left Column: Article */}
            <div className="col-lg-8">
              {/* Short description / Copete destacado (si existe y es distinto al subtítulo) */}
              {shortdesc && shortdesc.trim() !== subtitle.trim() && (
                <div
                  className="p-4 mb-4 rounded-4"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(0, 0, 0, 0.06)",
                    borderLeft: "4px solid #c9003d",
                    boxShadow: "0 4px 18px rgba(0, 0, 0, 0.03)",
                    fontSize: "1.15rem",
                    lineHeight: 1.75,
                    color: "#28232a",
                    fontWeight: 500,
                  }}
                  dangerouslySetInnerHTML={{ __html: shortdesc }}
                />
              )}

              {/* Image Gallery (Main + Extra Images) Carousel */}
              {allImages.length > 0 && (
                <ImageGallery images={allImages} title={title} />
              )}

              {/* Cuerpo del Artículo */}
              {description && (
                <div
                  className="cl-post-body"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}

              {/* Sección de Videos */}
              {(videos as any[]).length > 0 && (
                <div className="mt-5 pt-4 border-top">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <span
                      className="d-inline-flex align-items-center justify-content-center text-white rounded-circle"
                      style={{ width: 34, height: 34, backgroundColor: "#c9003d" }}
                    >
                      <i className="bi bi-play-fill fs-5" />
                    </span>
                    <h4 className="fw-bold mb-0" style={{ fontSize: "1.35rem", color: "#1a1619" }}>
                      Videos relacionados
                    </h4>
                  </div>
                  <div className="row g-4">
                    {(videos as any[]).map((v: any, i: number) => {
                      const embedUrl = v.url?.includes("youtube")
                        ? v.url.replace("watch?v=", "embed/")
                        : v.url;
                      return (
                        <div className="col-12 col-md-6" key={i}>
                          <div
                            className="card border-0 rounded-4 overflow-hidden shadow-sm h-100"
                            style={{ backgroundColor: "#ffffff" }}
                          >
                            <div className="ratio ratio-16x9">
                              <iframe
                                src={embedUrl}
                                title={v.title || `Video ${i + 1}`}
                                allowFullScreen
                              />
                            </div>
                            {v.title && (
                              <div className="p-3">
                                <p className="mb-0 small fw-semibold text-truncate">
                                  {v.title}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Información Parlamentaria en Acordeones Individuales */}
              <ParlamentariaIndividualAccordions
                proyectos={proyectos}
                comisiones={comisiones}
                legisladores={legisladores}
                sesiones={sesiones}
                audiencias={audiencias}
              />

              {/* Sección de Archivos adjuntos / Documentos */}
              {(archivos as any[]).length > 0 && (
                <div className="mt-5 pt-4 border-top">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <span
                      className="d-inline-flex align-items-center justify-content-center text-white rounded-circle"
                      style={{ width: 34, height: 34, backgroundColor: "#825500" }}
                    >
                      <i className="bi bi-file-earmark-arrow-down fs-5" />
                    </span>
                    <h4 className="fw-bold mb-0" style={{ fontSize: "1.35rem", color: "#1a1619" }}>
                      Archivos descargables
                    </h4>
                  </div>
                  <div className="row g-3">
                    {(archivos as any[]).map((f: any, i: number) => {
                      const fileUrl = buildImageUrl(f);
                      const filename = f.filename || `Archivo_${i + 1}`;
                      const ext = filename.split(".").pop()?.toUpperCase() || "DOC";
                      return (
                        <div className="col-12 col-md-6" key={i}>
                          {fileUrl ? (
                            <a
                              href={fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="card border p-3 rounded-3 text-decoration-none cl-file-card h-100 d-flex flex-row align-items-center justify-content-between"
                              style={{
                                backgroundColor: "#ffffff",
                                borderColor: "#ede6ec",
                              }}
                            >
                              <div className="d-flex align-items-center gap-3 overflow-hidden pe-2">
                                <span
                                  className="d-inline-flex align-items-center justify-content-center rounded-2 px-2 py-1 fw-bold"
                                  style={{
                                    backgroundColor: "rgba(201, 0, 61, 0.1)",
                                    color: "#c9003d",
                                    fontSize: "0.75rem",
                                    minWidth: 44,
                                  }}
                                >
                                  {ext}
                                </span>
                                <span className="text-dark fw-medium text-truncate small">
                                  {filename}
                                </span>
                              </div>
                              <i className="bi bi-download text-muted fs-5 flex-shrink-0" />
                            </a>
                          ) : (
                            <div
                              className="card border p-3 rounded-3 h-100 d-flex flex-row align-items-center gap-3"
                              style={{ backgroundColor: "#f9f8fa" }}
                            >
                              <i className="bi bi-file-earmark text-muted fs-4" />
                              <span className="text-muted small text-truncate">
                                {filename}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Sidebar */}
            <div className="col-lg-4">
              <div
                className="p-4 rounded-4"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.04)",
                  position: "sticky",
                  top: "110px",
                }}
              >
                <div className="d-flex align-items-center gap-2 mb-4 pb-2 border-bottom">
                  <i className="bi bi-info-circle-fill text-danger fs-5" style={{ color: "#c9003d" }} />
                  <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: "1.05rem" }}>
                    Información
                  </h6>
                </div>

                <div className="d-flex flex-column gap-3 mb-4">
                  {date && (
                    <div className="d-flex align-items-start gap-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: 38,
                          height: 38,
                          backgroundColor: "rgba(201, 0, 61, 0.08)",
                          color: "#c9003d",
                        }}
                      >
                        <i className="bi bi-calendar3 fs-6" />
                      </div>
                      <div>
                        <span className="d-block text-muted small fw-medium">Fecha</span>
                        <span className="fw-semibold text-dark small">{date}</span>
                      </div>
                    </div>
                  )}

                  {category && (
                    <div className="d-flex align-items-start gap-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: 38,
                          height: 38,
                          backgroundColor: "rgba(217, 144, 0, 0.12)",
                          color: "#996600",
                        }}
                      >
                        <i className="bi bi-tag fs-6" />
                      </div>
                      <div>
                        <span className="d-block text-muted small fw-medium">Categoría</span>
                        <span className="fw-semibold text-dark small">{category}</span>
                      </div>
                    </div>
                  )}

                  {seteos?.lugar && (
                    <div className="d-flex align-items-start gap-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: 38,
                          height: 38,
                          backgroundColor: "rgba(0, 105, 114, 0.1)",
                          color: "#006972",
                        }}
                      >
                        <i className="bi bi-geo-alt fs-6" />
                      </div>
                      <div>
                        <span className="d-block text-muted small fw-medium">Ubicación</span>
                        <span className="fw-semibold text-dark small">{seteos.lugar}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Compartir en redes sociales */}
                <div className="pt-3 border-top mb-4">
                  <span className="d-block text-muted small fw-semibold mb-2">
                    Compartir esta publicación
                  </span>
                  <div className="d-flex gap-2">
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="cl-share-btn"
                      aria-label="Compartir en WhatsApp"
                    >
                      <i className="bi bi-whatsapp" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="cl-share-btn"
                      aria-label="Compartir en X"
                    >
                      <i className="bi bi-twitter-x" />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php`}
                      target="_blank"
                      rel="noreferrer"
                      className="cl-share-btn"
                      aria-label="Compartir en Facebook"
                    >
                      <i className="bi bi-facebook" />
                    </a>
                  </div>
                </div>

                {/* Botón de volver */}
                <Link
                  href="/publicaciones"
                  className="btn w-100 py-2 d-flex align-items-center justify-content-center gap-2 fw-semibold text-white shadow-sm"
                  style={{
                    backgroundColor: "#c9003d",
                    borderRadius: "30px",
                    fontSize: "0.9rem",
                    transition: "all 0.2s",
                  }}
                >
                  <i className="bi bi-arrow-left" />
                  <span>Volver a publicaciones</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
