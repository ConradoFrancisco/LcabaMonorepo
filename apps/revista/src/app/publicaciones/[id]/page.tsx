import Link from "next/link";
import { notFound } from "next/navigation";
import { PageServices } from "@lcaba/services";
import Header from "../../../components/Header";
import ArticleGallery from "./ArticleGallery";
import { getCategoryColor } from "../../../utils/categoryColors";

// ── helpers ───────────────────────────────────────────────────────────────────

function buildFileUrl(file: any): string | null {
  if (!file?.location || !file?.filename) return null;
  const base = process.env.NEXT_PUBLIC_IMAGES;
  const key = process.env.NEXT_PUBLIC_FILESERVER_KEY;
  return `${base}/${file.location}/${file.filename}${key ? `?key=${key}` : ""}`;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("es-AR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function getFileIcon(filename: string = ""): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return "📄";
  if (["doc", "docx"].includes(ext)) return "📝";
  if (["xls", "xlsx"].includes(ext)) return "📊";
  if (["zip", "rar"].includes(ext)) return "🗜️";
  return "📎";
}

function isAudioFile(filename: string = ""): boolean {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  return ["mp3", "wav", "ogg", "aac", "flac", "m4a"].includes(ext);
}

async function getPageData(pageId = "6") {
  try {
    return await PageServices.getPageVw(pageId);
  } catch {
    return null;
  }
}

async function getRevistaMenu() {
  try {
    const items = await PageServices.getDynamicMenu("magazine_", 6);
    return items || [];
  } catch {
    return [];
  }
}

// ── page ──────────────────────────────────────────────────────────────────────

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [post, menuItems, pageVw] = await Promise.all([
    PageServices.getPostById(Number(id), "magazine_"),
    getRevistaMenu(),
    getPageData("6"),
  ]);

  if (!post) notFound();

  const { textos, images = [], videos = [], archivos = [], seteos = {} } = post;
  const title = textos?.title || textos?.titulo || "";
  const description = textos?.description || textos?.cuerpo || "";
  const shortdesc = textos?.shortdesc || textos?.copete || "";
  const date = formatDate(seteos?.date_ins || seteos?.date);
  const category: string = seteos?.cat_name || seteos?.categoria || "";

  // Logo
  const logo = pageVw?.images?.find((img: any) => img.image_type === "logo");
  const baseImg = process.env.NEXT_PUBLIC_IMAGES;
  const fileKey = process.env.NEXT_PUBLIC_FILESERVER_KEY;
  const logoUrl =
    logo?.location && logo?.filename
      ? `${baseImg}/${logo.location}${logo.filename}${fileKey ? `?key=${fileKey}` : ""}`
      : "";

  // Build category color
  const categoryColor = getCategoryColor(category);

  // All valid images (excluye audios de archivos)
  const allImages = (images as any[])
    .map((i: any) => buildFileUrl(i))
    .filter(Boolean) as string[];

  // Split archivos
  const audioFiles = (archivos as any[]).filter((f: any) => isAudioFile(f.filename));
  const regularFiles = (archivos as any[]).filter((f: any) => !isAudioFile(f.filename));

  return (
    <>
      <Header menuItems={menuItems} logo={logoUrl} />

      <main style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
        {/* Hero breadcrumb band */}
        <div
          style={{
            backgroundColor: categoryColor,
            padding: "12px 0",
          }}
        >
          <div className="container d-flex align-items-center gap-3">
            <Link
              href="/"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "0.8rem",
                fontWeight: 600,
                opacity: 0.85,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              ← Inicio
            </Link>
            <span style={{ color: "rgba(255,255,255,0.5)" }}>/</span>
            <span
              style={{
                color: "white",
                fontSize: "0.8rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {category || "Artículo"}
            </span>
          </div>
        </div>

        {/* Article layout */}
        <div className="container py-5">
          <div className="row g-5 justify-content-center">
            {/* Main content */}
            <div className="col-12 col-lg-8">
              {/* Category tag */}
              {category && (
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: categoryColor,
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    padding: "4px 14px",
                    borderRadius: "999px",
                    marginBottom: "16px",
                  }}
                >
                  {category}
                </span>
              )}

              {/* Title */}
              <h1
                style={{
                  fontFamily: "var(--font-franklin, 'Libre Franklin', sans-serif)",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 900,
                  lineHeight: 1.15,
                  color: "#111827",
                  marginBottom: "16px",
                }}
              >
                {title}
              </h1>

              {/* Date */}
              {date && (
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#94a3b8",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "24px",
                  }}
                >
                  {date}
                </p>
              )}

              {/* Separator line with category color */}
              <div
                style={{
                  height: "3px",
                  width: "60px",
                  backgroundColor: categoryColor,
                  borderRadius: "999px",
                  marginBottom: "28px",
                }}
              />

              {/* Short description / lead */}
              {shortdesc && (
                <div
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 500,
                    color: "#334155",
                    lineHeight: 1.7,
                    marginBottom: "32px",
                    borderLeft: `4px solid ${categoryColor}`,
                    paddingLeft: "16px",
                  }}
                  dangerouslySetInnerHTML={{ __html: shortdesc }}
                />
              )}

              {/* Image Gallery */}
              {allImages.length > 0 && (
                <ArticleGallery
                  images={allImages}
                  title={title}
                  categoryColor={categoryColor}
                />
              )}

              {/* Body text */}
              {description && (
                <div
                  className="revista-article-body"
                  dangerouslySetInnerHTML={{ __html: description }}
                  style={{ lineHeight: 1.85, fontSize: "1.05rem", color: "#334155" }}
                />
              )}

              {/* Audios */}
              {audioFiles.length > 0 && (
                <div className="mt-5">
                  <h5
                    style={{
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      fontSize: "0.85rem",
                      color: categoryColor,
                      marginBottom: "16px",
                      borderBottom: `2px solid ${categoryColor}`,
                      paddingBottom: "6px",
                    }}
                  >
                    🎧 Audios
                  </h5>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {audioFiles.map((f: any, i: number) => {
                      const fileUrl = buildFileUrl(f);
                      return (
                        <div
                          key={i}
                          style={{
                            backgroundColor: "#f8fafc",
                            borderRadius: "12px",
                            padding: "16px",
                            borderLeft: `4px solid ${categoryColor}`,
                          }}
                        >
                          <p
                            style={{
                              margin: "0 0 10px",
                              fontSize: "0.85rem",
                              fontWeight: 600,
                              color: "#475569",
                            }}
                          >
                            🎵 {f.filename || `Audio ${i + 1}`}
                          </p>
                          {fileUrl && (
                            <audio controls style={{ width: "100%" }} src={fileUrl}>
                              Tu navegador no soporta el elemento de audio.
                            </audio>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Videos */}
              {(videos as any[]).length > 0 && (
                <div className="mt-5">
                  <h5
                    style={{
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      fontSize: "0.85rem",
                      color: categoryColor,
                      marginBottom: "16px",
                      borderBottom: `2px solid ${categoryColor}`,
                      paddingBottom: "6px",
                    }}
                  >
                    ▶ Videos
                  </h5>
                  <div className="row g-3">
                    {(videos as any[]).map((v: any, i: number) => {
                      let embedUrl = v.url || "";
                      if (embedUrl.includes("youtube.com/watch"))
                        embedUrl = embedUrl.replace("watch?v=", "embed/");
                      if (embedUrl.includes("youtu.be/"))
                        embedUrl = embedUrl.replace("youtu.be/", "youtube.com/embed/");
                      return (
                        <div className="col-12 col-md-6" key={i}>
                          <div className="ratio ratio-16x9">
                            <iframe
                              src={embedUrl}
                              title={v.title || `Video ${i + 1}`}
                              allowFullScreen
                              style={{ borderRadius: "12px" }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Files */}
              {regularFiles.length > 0 && (
                <div className="mt-5">
                  <h5
                    style={{
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      fontSize: "0.85rem",
                      color: categoryColor,
                      marginBottom: "16px",
                      borderBottom: `2px solid ${categoryColor}`,
                      paddingBottom: "6px",
                    }}
                  >
                    📎 Archivos adjuntos
                  </h5>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {regularFiles.map((f: any, i: number) => {
                      const fileUrl = buildFileUrl(f);
                      return (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "12px 16px",
                            backgroundColor: "#f8fafc",
                            borderRadius: "10px",
                            border: "1px solid #e2e8f0",
                          }}
                        >
                          <span style={{ fontSize: "1.4rem" }}>{getFileIcon(f.filename)}</span>
                          {fileUrl ? (
                            <a
                              href={fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                textDecoration: "none",
                                color: categoryColor,
                                fontWeight: 600,
                                fontSize: "0.9rem",
                              }}
                            >
                              {f.filename || `Archivo ${i + 1}`}
                            </a>
                          ) : (
                            <span style={{ fontSize: "0.9rem", color: "#475569" }}>
                              {f.filename || `Archivo ${i + 1}`}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="col-12 col-lg-4">
              <div
                style={{
                  position: "sticky",
                  top: "100px",
                }}
              >
                {/* Info card */}
                <div
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid #e2e8f0",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: categoryColor,
                      padding: "16px 20px",
                    }}
                  >
                    <h6
                      style={{
                        margin: 0,
                        color: "white",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        fontSize: "0.8rem",
                      }}
                    >
                      Sobre este artículo
                    </h6>
                  </div>
                  <div style={{ padding: "20px", backgroundColor: "#fff" }}>
                    {date && (
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginBottom: "12px",
                          fontSize: "0.85rem",
                          color: "#475569",
                        }}
                      >
                        <span>📅</span>
                        <span>{date}</span>
                      </div>
                    )}
                    {category && (
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginBottom: "12px",
                          fontSize: "0.85rem",
                          color: "#475569",
                        }}
                      >
                        <span>🏷️</span>
                        <span style={{ color: categoryColor, fontWeight: 700 }}>{category}</span>
                      </div>
                    )}
                    {seteos?.lugar && (
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginBottom: "12px",
                          fontSize: "0.85rem",
                          color: "#475569",
                        }}
                      >
                        <span>📍</span>
                        <span>{seteos.lugar}</span>
                      </div>
                    )}

                    {/* Media counters */}
                    {(allImages.length > 0 || audioFiles.length > 0 || (videos as any[]).length > 0 || regularFiles.length > 0) && (
                      <>
                        <hr style={{ borderColor: "#f1f5f9", margin: "14px 0" }} />
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {allImages.length > 0 && (
                            <span style={{ fontSize: "0.82rem", color: "#94a3b8" }}>
                              🖼️ {allImages.length} imagen{allImages.length !== 1 ? "es" : ""}
                            </span>
                          )}
                          {audioFiles.length > 0 && (
                            <span style={{ fontSize: "0.82rem", color: "#94a3b8" }}>
                              🎧 {audioFiles.length} audio{audioFiles.length !== 1 ? "s" : ""}
                            </span>
                          )}
                          {(videos as any[]).length > 0 && (
                            <span style={{ fontSize: "0.82rem", color: "#94a3b8" }}>
                              ▶️ {(videos as any[]).length} video{(videos as any[]).length !== 1 ? "s" : ""}
                            </span>
                          )}
                          {regularFiles.length > 0 && (
                            <span style={{ fontSize: "0.82rem", color: "#94a3b8" }}>
                              📎 {regularFiles.length} archivo{regularFiles.length !== 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Back button */}
                <Link
                  href="/"
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "14px",
                    backgroundColor: categoryColor,
                    color: "white",
                    textAlign: "center",
                    borderRadius: "999px",
                    textDecoration: "none",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    transition: "opacity 0.2s",
                  }}
                >
                  ← Volver a la Revista
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer inline (same as main page) */}
      <footer className="py-5 mt-5" style={{ backgroundColor: "#232637", color: "#ffffff" }}>
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-12 col-md-6">
              <span className="fw-bold fs-4">Legislatura</span>
              <p className="small text-white-50 m-0 mt-1">
                Legislatura de la Ciudad Autónoma de Buenos Aires
              </p>
            </div>
            <div className="col-12 col-md-6 text-md-end">
              <div className="small text-white-50">
                lacasa@legislatura.gob.ar © {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
