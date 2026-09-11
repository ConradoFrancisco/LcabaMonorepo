import Link from "next/link";
import { notFound } from "next/navigation";
import { PageServices } from "@lcaba/services";
import { getCategoryColor } from "@/utils/categoryColors";
import Header from "@/components/Header";
import ArticleGallery from "@/app/publicaciones/[id]/ArticleGallery";
import ArticleCard from "@/components/ArticleCard";
import InfoCard from "@/components/InfoCard";
import AuthorityCard from "@/components/AuthorityCard";
import EnAccionGallery from "@/components/EnAccionGallery";
import AgendaCard from "@/components/AgendaCard";
import Footer from "@/components/Footer";
import WellbeingPostGrid from "@/components/WellbeingPostGrid";

// ── Helpers ───────────────────────────────────────────────────────────────────

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

function isStatusActive(status: any): boolean {
  if (status === 1 || status === "1" || status === true) return true;
  if (status && typeof status === "object" && Array.isArray(status.data)) {
    return status.data[0] === 1;
  }
  return false;
}

// Categorías que por regla de negocio muestran directamente el último post individual
const SINGLE_POST_CATEGORIES = [
  "historias de vida",
  "nuestros logros",
  "iniciativas legislativas",
  "libro del mes",
];

// Categorías que siempre muestran TODO su histórico global (sin filtrar por edición de revista)
const GLOBAL_ALL_POSTS_CATEGORIES = [
  "en casa",
  "capacitaciones",
  "beneficios en capacitaciones",
  "autoridades",
  "agenda",
];

// Categorías que usan InfoCard (logo + título + descripción completa)
const INFO_CARD_CATEGORIES = [
  "capacitaciones",
  "beneficios en capacitaciones",
];

// Categorías que usan AuthorityCard (cards horizontales con foto a la izquierda)
const AUTHORITY_CARD_CATEGORIES = [
  "autoridades",
];

// Categorías que usan EnAccionGallery (carrusel con modal/lightbox de fotos)
const EN_ACCION_CATEGORIES = [
  "en acción",
  "en accion",
];

// Categorías que usan AgendaCard
const AGENDA_CATEGORIES = [
  "agenda",
];

function normalizeSlug(slug: string): string {
  return slug
    .replace(/\.html$/, "")
    .toLowerCase()
    .trim();
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

// Obtener lista de issues para determinar el issue activo por defecto
async function getAllActiveIssues() {
  try {
    const { data: issues } = await PageServices.getIssues("magazine_");
    return issues.filter((iss: any) => isStatusActive(iss.status));
  } catch {
    return [];
  }
}



// Busca el item del menú que corresponda al slug (comparando URL o título)
function findCategoryInMenu(menuItems: any[], targetSlug: string) {
  const normalizedTarget = normalizeSlug(targetSlug);

  for (const item of menuItems) {
    // Si tiene submenús
    const submenus = item.submenus || item.subItems || [];
    for (const sub of submenus) {
      const subUrl = (sub.submenu_url || sub.url || "").replace(/^\/+/, "").replace(/\.html$/, "");
      const subTitle = (sub.submenu_title || sub.title || "").toLowerCase();
      const slugifiedTitle = subTitle.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

      if (
        subUrl === targetSlug ||
        subUrl === `seccion/${targetSlug}` ||
        subUrl.endsWith(`/${targetSlug}`) ||
        slugifiedTitle === normalizedTarget
      ) {
        return {
          cat_id: sub.cat_id || item.cat_id,
          title: sub.submenu_title || sub.title,
          color: sub.color || item.color,
          parentTitle: item.menu_title || item.title,
        };
      }
    }

    // O si coincide con el ítem principal
    const itemUrl = (item.url || "").replace(/^\/+/, "").replace(/\.html$/, "");
    const itemTitle = (item.menu_title || item.title || "").toLowerCase();
    const slugifiedItemTitle = itemTitle.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    if (
      itemUrl === targetSlug ||
      itemUrl === `seccion/${targetSlug}` ||
      itemUrl.endsWith(`/${targetSlug}`) ||
      slugifiedItemTitle === normalizedTarget
    ) {
      return {
        cat_id: item.cat_id,
        title: item.menu_title || item.title,
        color: item.color,
        parentTitle: null,
      };
    }
  }

  return null;
}

interface SeccionPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ edicion?: string; pagina?: string }>;
}

export default async function SeccionPage({ params, searchParams }: SeccionPageProps) {
  const { slug: rawSlug } = await params;
  const { edicion, pagina } = await searchParams;
  const slug = normalizeSlug(rawSlug);

  const [menuItems, pageVw, activeIssues] = await Promise.all([
    getRevistaMenu(),
    getPageData("6"),
    getAllActiveIssues(),
  ]);

  const categoryMeta = findCategoryInMenu(menuItems, slug);

  if (!categoryMeta || !categoryMeta.cat_id) {
    notFound();
  }

  const catId = categoryMeta.cat_id;
  const categoryTitle = categoryMeta.title;
  const categoryColor = categoryMeta.color || getCategoryColor(categoryTitle);
  const normalizedCategoryTitle = categoryTitle.toLowerCase().trim();

  // Determinar número / id de issue actual:
  const latestActiveIssue = activeIssues[0];
  const targetIssue = edicion ? Number(edicion) : (latestActiveIssue ? latestActiveIssue.id : undefined);

  // Logo
  const logo = pageVw?.images?.find((img: any) => img.image_type === "logo");
  const baseImg = process.env.NEXT_PUBLIC_IMAGES;
  const fileKey = process.env.NEXT_PUBLIC_FILESERVER_KEY;
  const logoUrl =
    logo?.location && logo?.filename
      ? `${baseImg}/${logo.location}${logo.filename}${fileKey ? `?key=${fileKey}` : ""}`
      : "";

  const isSinglePostCategory = SINGLE_POST_CATEGORIES.includes(normalizedCategoryTitle);
  const isGlobalAllCategory = GLOBAL_ALL_POSTS_CATEGORIES.includes(normalizedCategoryTitle);
  const homeHref = targetIssue ? `/?edicion=${targetIssue}` : "/";

  // Bienestar agrupa el histórico del padre (98) y sus tres subcategorías.
  if (String(catId) === "98") {
    const wellbeingCategories = [
      { id: "98", key: "general", label: "Bienestar" },
      { id: "99", key: "emocional", label: "Emocional" },
      { id: "100", key: "fisico", label: "Físico" },
      { id: "101", key: "laboral", label: "Laboral" },
    ] as const;

    const wellbeingResponses = await Promise.all(
      wellbeingCategories.map((wellbeingCategory) =>
        PageServices.getPosts("magazine_", false, 0, 1000, true, false, wellbeingCategory.id, "1"),
      ),
    );

    const categoryColorMap: Record<string, string> = { bienestar: categoryColor };
    const getMenuColor = (id: string) => {
      for (const item of menuItems) {
        if (String(item.cat_id) === id && item.color) return item.color;
        for (const sub of item.submenus || item.subItems || []) {
          if (String(sub.cat_id) === id) return sub.color || item.color;
        }
      }
      return categoryColor;
    };

    const wellbeingPosts = wellbeingResponses.flatMap((response, index) => {
      const posts = Array.isArray(response) ? response : response?.data || [];
      const wellbeingCategory = wellbeingCategories[index];
      const postColor = getMenuColor(wellbeingCategory.id);
      categoryColorMap[wellbeingCategory.label.toLowerCase()] = postColor;

      return posts
        .filter((post: any) => isStatusActive(post.status))
        .map((post: any) => ({
          ...post,
          // La API puede devolver un nombre histórico; los IDs 99/100/101
          // son la referencia para el badge y los filtros de Bienestar.
          categoria: wellbeingCategory.label,
          wellbeingCategory: wellbeingCategory.key,
        }));
    });

    return (
      <>
        <Header menuItems={menuItems} logo={logoUrl} currentEdicion={targetIssue} />
        <main style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
          <div style={{ backgroundColor: categoryColor, padding: "36px 0", color: "#fff" }}>
            <div className="container">
              <div className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: "0.85rem", opacity: 0.9 }}>
                <Link href={homeHref} style={{ color: "#fff", textDecoration: "none" }}>INICIO</Link>
                <span>/</span>
                <span className="fw-bold text-uppercase">{categoryTitle}</span>
              </div>
              <h1 className="fw-bold m-0 text-uppercase" style={{ fontSize: "2.3rem" }}>{categoryTitle}</h1>
              <p className="m-0 mt-2">Potenciá los hábitos saludables de cada día</p>
            </div>
          </div>
          <WellbeingPostGrid posts={wellbeingPosts} categoryColor={categoryColor} categoryColorMap={categoryColorMap} />
        </main>
        <Footer />
      </>
    );
  }

  // ── Modalidad 1: Categoría de publicación única (Historias de vida, Nuestros logros, etc.) ──
  if (isSinglePostCategory) {
    let postSummary = null;

    if (targetIssue) {
      const resIssue = await PageServices.getPosts(
        "magazine_",
        false,
        0,
        1,
        true,
        false,
        catId,
        "1",
        false,
        targetIssue
      );
      postSummary = Array.isArray(resIssue) ? resIssue[0] : (resIssue?.data?.[0] || null);
    }

    if (!postSummary) {
      const resGlobal = await PageServices.getPosts(
        "magazine_",
        false,
        0,
        1,
        true,
        false,
        catId,
        "1"
      );
      postSummary = Array.isArray(resGlobal) ? resGlobal[0] : (resGlobal?.data?.[0] || null);
    }

    if (!postSummary) {
      return (
        <>
          <Header menuItems={menuItems} logo={logoUrl} currentEdicion={targetIssue} />
          <main style={{ backgroundColor: "#fff", minHeight: "80vh" }}>
            <div style={{ backgroundColor: categoryColor, padding: "12px 0" }}>
              <div className="container d-flex align-items-center gap-3">
                <Link
                  href={homeHref}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "0.8rem",
                    fontWeight: 600,
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
                  {categoryTitle}
                </span>
              </div>
            </div>
            <div className="container py-5 text-center">
              <h2 className="mt-4" style={{ color: "#334155", fontWeight: 700 }}>
                Próximamente
              </h2>
              <p className="text-muted">
                No hay publicaciones disponibles para esta sección en la edición seleccionada.
              </p>
              <Link href={homeHref} className="btn btn-outline-secondary mt-3 rounded-pill px-4">
                Volver a la Revista
              </Link>
            </div>
          </main>
        </>
      );
    }

    // Traemos el detalle completo con imágenes, videos, audios, adjuntos
    const postDetail = await PageServices.getPostById(postSummary.id, "magazine_");
    const post = postDetail || postSummary;

    const { textos, images = [], videos = [], archivos = [], seteos = {} } = post;
    const title = textos?.title || textos?.titulo || postSummary.titulo || "";
    const description = textos?.description || textos?.cuerpo || "";
    const shortdesc = textos?.shortdesc || textos?.copete || "";
    const date = formatDate(seteos?.date_ins || seteos?.date || postSummary.fecha);

    const allImages = (images as any[])
      .map((i: any) => buildFileUrl(i))
      .filter(Boolean) as string[];

    const audioFiles = (archivos as any[]).filter((f: any) => isAudioFile(f.filename));
    const regularFiles = (archivos as any[]).filter((f: any) => !isAudioFile(f.filename));

    return (
      <>
        <Header menuItems={menuItems} logo={logoUrl} currentEdicion={targetIssue} />

        <main style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
          {/* Breadcrumb band */}
          <div style={{ backgroundColor: categoryColor, padding: "12px 0" }}>
            <div className="container d-flex align-items-center gap-3">
              <Link
                href={homeHref}
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
                {categoryTitle}
              </span>
            </div>
          </div>

          {/* Article layout */}
          <div className="container py-5">
            <div className="row g-5 justify-content-center">
              {/* Main content */}
              <div className="col-12 col-lg-8">
                {/* Category tag */}
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
                  {categoryTitle}
                </span>

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

                {/* Separator */}
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
                <div style={{ position: "sticky", top: "100px" }}>
                  <div
                    style={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: "1px solid #e2e8f0",
                      marginBottom: "24px",
                    }}
                  >
                    <div style={{ backgroundColor: categoryColor, padding: "16px 20px" }}>
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
                        Sobre esta sección
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
                        <span style={{ color: categoryColor, fontWeight: 700 }}>
                          {categoryTitle}
                        </span>
                      </div>

                      {/* Media counters */}
                      {(allImages.length > 0 ||
                        audioFiles.length > 0 ||
                        (videos as any[]).length > 0 ||
                        regularFiles.length > 0) && (
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

                  <Link
                    href={homeHref}
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

                  {/* Botón archivo histórico */}
                  <Link
                    href={`/seccion/${slug}/historico`}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "14px",
                      backgroundColor: "transparent",
                      color: categoryColor,
                      textAlign: "center",
                      borderRadius: "999px",
                      textDecoration: "none",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      border: `2px solid ${categoryColor}`,
                      marginTop: "10px",
                      transition: "all 0.2s",
                    }}
                  >
                    📂 Ver publicaciones históricas
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // ── Modalidad 2: Sección con listado de artículos y Paginación (EN CASA, Capacitaciones, Autoridades, etc.) ──
  const currentPage = Math.max(1, parseInt(pagina || "1", 10) || 1);
  const isInfoCardCategory = INFO_CARD_CATEGORIES.includes(normalizedCategoryTitle);
  const isAuthorityCardCategory = AUTHORITY_CARD_CATEGORIES.includes(normalizedCategoryTitle);
  const isEnAccionCategory = EN_ACCION_CATEGORIES.includes(normalizedCategoryTitle);
  const isAgendaCategory = AGENDA_CATEGORIES.includes(normalizedCategoryTitle);
  // InfoCard, AuthorityCard, EnAccion and Agenda categories show all/full content without pagination
  const isSpecialCategory = isInfoCardCategory || isAuthorityCardCategory || isEnAccionCategory || isAgendaCategory;
  const pageSize = isSpecialCategory ? 100 : 9;
  const offset = isSpecialCategory ? 0 : (currentPage - 1) * pageSize;

  // Si es una categoría global, no filtramos por targetIssue (trae histórico completo)
  const issueFilter = isGlobalAllCategory ? undefined : targetIssue;

  const postsRes = await PageServices.getPosts(
    "magazine_",
    false,
    offset,
    pageSize,
    true,
    false,
    catId,
    "1",
    false,
    issueFilter,
    undefined,   // notCategoria
    undefined,   // order
    isAgendaCategory // upcomingOnly: solo eventos futuros para agenda
  );

  const posts = Array.isArray(postsRes) ? postsRes : (postsRes?.data || []);
  const totalPosts = postsRes?.total ?? posts.length;
  const totalPages = isSpecialCategory ? 1 : Math.ceil(totalPosts / pageSize);
  const activePosts = posts.filter((p: any) => isStatusActive(p.status));

  // Para categorías especiales, traemos el detalle completo de cada post (textos + imágenes + dias)
  let postsWithDetail: any[] = activePosts;
  if (isSpecialCategory && activePosts.length > 0) {
    postsWithDetail = await Promise.all(
      activePosts.map(async (p: any) => {
        try {
          const detail = await PageServices.getPostById(p.id, "magazine_");
          return { ...p, detail };
        } catch {
          return { ...p, detail: null };
        }
      })
    );

    // Para autoridades, invertimos el orden
    if (isAuthorityCardCategory) {
      postsWithDetail = [...postsWithDetail].reverse();
    }

    // Para agenda: filtrar eventos ya pasados usando los días del detalle
    if (isAgendaCategory) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      postsWithDetail = postsWithDetail.filter((p: any) => {
        const detail = p.detail || p;
        const dias: any[] = detail?.dias || [];

        // Tiene días con info
        if (dias.length > 0) {
          return dias.some((dia: any) => {
            // Día recurrente sin fecha específica (ej. "todos los lunes") → siempre mostrar
            if (dia.day && !dia.date) return true;
            // Día con fecha → mostrar solo si es hoy o futuro
            if (dia.date) {
              const diaDate = new Date(dia.date);
              diaDate.setHours(0, 0, 0, 0);
              return diaDate >= today;
            }
            return false;
          });
        }

        // Sin días: buscar fecha directa en el post (campo date, no date_ins)
        const directDate = detail?.seteos?.date || detail?.date || p?.fecha_evento;
        if (directDate) {
          const d = new Date(directDate);
          d.setHours(0, 0, 0, 0);
          return d >= today;
        }

        // Sin días ni fecha → ocultar (evento sin información de fecha = probablemente viejo)
        return false;
      });
    }

  }
  // Helper para armar links de paginación preservando edición
  const buildPageUrl = (pageNumber: number) => {
    const query = new URLSearchParams();
    if (targetIssue && !isGlobalAllCategory) {
      query.set("edicion", String(targetIssue));
    }
    if (pageNumber > 1) {
      query.set("pagina", String(pageNumber));
    }
    const qStr = query.toString();
    return `/seccion/${slug}${qStr ? `?${qStr}` : ""}`;
  };

  return (
    <>
      <Header menuItems={menuItems} logo={logoUrl} currentEdicion={targetIssue} />

      <main style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
        {/* Banner de Categoría */}
        <div style={{ backgroundColor: categoryColor, padding: "36px 0", color: "#fff" }}>
          <div className="container">
            <div className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: "0.85rem", opacity: 0.9 }}>
              <Link href={homeHref} style={{ color: "#fff", textDecoration: "none" }}>
                INICIO
              </Link>
              <span>/</span>
              <span className="fw-bold text-uppercase">{categoryTitle}</span>
            </div>
            <div className="d-flex justify-content-between align-items-end flex-wrap gap-2">
              <h1 className="fw-bold m-0 text-uppercase" style={{ fontSize: "2.3rem" }}>
                {categoryTitle}
              </h1>
              {!isInfoCardCategory && !isAuthorityCardCategory && !isEnAccionCategory && !isAgendaCategory && totalPosts > 0 && (
                <span className="badge bg-white text-dark rounded-pill px-3 py-2 fw-semibold" style={{ fontSize: "0.85rem" }}>
                  {totalPosts} {totalPosts === 1 ? "publicación" : "publicaciones"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Grilla / Contenido de Publicaciones */}
        {isEnAccionCategory ? (

          // Vista especial En Acción: carrusel con modal lightbox idéntico a la Home
          <div className="py-5">
            {postsWithDetail.length > 0 ? (
              <>
                {postsWithDetail.map((p: any) => {
                  const galleryPost = {
                    ...(p.detail || p),
                    titulo: p.detail?.textos?.title || p.titulo || categoryTitle,
                    images: p.detail?.images || p.images || [],
                  };
                  const galleryDescription = p.detail?.textos?.description || p.description || undefined;
                  const galleryShortdesc = p.detail?.textos?.shortdesc || p.shortdesc || undefined;
                  return (
                    <div key={p.id} className="mb-5">
                      <EnAccionGallery
                        post={galleryPost}
                        description={galleryDescription}
                        shortdesc={galleryShortdesc}
                      />
                    </div>
                  );
                })}

                {/* Botón al histórico */}
                <div className="text-center mt-2 mb-4">
                  <Link
                    href={`/seccion/${slug}/historico`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "14px 32px",
                      backgroundColor: "transparent",
                      color: categoryColor,
                      border: `2px solid ${categoryColor}`,
                      borderRadius: "999px",
                      textDecoration: "none",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    📂 Ver todas las galerías históricas
                  </Link>
                </div>
              </>
            ) : (
              <div className="container text-center py-5">
                <p className="text-muted">No hay galerías disponibles para esta sección.</p>
                <Link href={homeHref} className="btn btn-outline-secondary rounded-pill px-4">
                  Volver al inicio
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="container py-5">
            {postsWithDetail.length > 0 ? (
              <>
                <div className="row g-4">
                  {isAuthorityCardCategory ? (
                    // AuthorityCard: cards horizontales con foto, nombre, cargo y cita
                    postsWithDetail.map((p: any) => {
                      const detail = p.detail;
                      const imgFile = detail?.images?.[0] || p?.images?.[0];
                      const imgUrl = imgFile?.location && imgFile?.filename
                        ? `${process.env.NEXT_PUBLIC_IMAGES}/${imgFile.location}${imgFile.filename}${process.env.NEXT_PUBLIC_FILESERVER_KEY ? `?key=${process.env.NEXT_PUBLIC_FILESERVER_KEY}` : ""}`
                        : undefined;
                      return (
                        <AuthorityCard
                          key={p.id}
                          id={p.id}
                          name={detail?.textos?.title || p.titulo || ""}
                          role={detail?.textos?.subtitle || p.copete || ""}
                          quote={detail?.textos?.shortdesc || p.cuerpo || ""}
                          imageUrl={imgUrl}
                          categoryColor={categoryColor}
                        />
                      );
                    })
                  ) : isInfoCardCategory ? (
                    // InfoCard: logo + título + descripción completa para Capacitaciones / Beneficios
                    postsWithDetail.map((p: any) => {
                      const detail = p.detail;
                      const imgFile = detail?.images?.[0];
                      const imgUrl = imgFile?.location && imgFile?.filename
                        ? `${process.env.NEXT_PUBLIC_IMAGES}/${imgFile.location}${imgFile.filename}${process.env.NEXT_PUBLIC_FILESERVER_KEY ? `?key=${process.env.NEXT_PUBLIC_FILESERVER_KEY}` : ""}`
                        : undefined;
                      const externalUrl = detail?.seteos?.loadcontent || detail?.textos?.url_ext || undefined;
                      return (
                        <InfoCard
                          key={p.id}
                          id={p.id}
                          title={detail?.textos?.title || p.titulo || ""}
                          description={detail?.textos?.description}
                          shortdesc={detail?.textos?.shortdesc}
                          imageUrl={imgUrl}
                          categoryColor={categoryColor}
                          externalUrl={externalUrl}
                        />
                      );
                    })
                  ) : isAgendaCategory ? (
                    // AgendaCard: eventos con días, horarios y lugar
                    postsWithDetail.length > 0 ? (
                      postsWithDetail.map((p: any) => (
                        <AgendaCard
                          key={p.id}
                          post={p.detail ? { ...p.detail, id: p.id } : p}
                          categoryColor={categoryColor}
                        />
                      ))
                    ) : (
                      <div className="col-12 text-center py-5">
                        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📅</div>
                        <h3 style={{ color: "#334155", fontWeight: 700 }}>No hay eventos al día de la fecha</h3>
                        <p className="text-muted">Próximamente publicaremos los próximos eventos.</p>
                      </div>
                    )
                  ) : (
                    // ArticleCard estándar para EN CASA y otras
                    activePosts.map((p: any) => (
                      <ArticleCard
                        key={p.id}
                        post={p}
                        categoryColorMap={{ [categoryTitle.toLowerCase()]: categoryColor }}
                      />
                    ))
                  )}
                </div>

                {/* Paginador */}
                {totalPages > 1 && (
                  <nav aria-label="Paginación de publicaciones" className="mt-5 d-flex justify-content-center">
                    <ul className="pagination pagination-md gap-1 flex-wrap justify-content-center m-0">
                      {/* Botón Anterior */}
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <Link
                          className="page-link rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "42px",
                            height: "42px",
                            border: "1px solid #e2e8f0",
                            color: currentPage === 1 ? "#94a3b8" : "#334155",
                            backgroundColor: "#fff",
                          }}
                          href={currentPage > 1 ? buildPageUrl(currentPage - 1) : "#"}
                          aria-label="Anterior"
                        >
                          <i className="fa-solid fa-chevron-left" style={{ fontSize: "0.8rem" }} />
                        </Link>
                      </li>

                      {/* Números de página */}
                      {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pNum) => {
                        const isActive = pNum === currentPage;
                        // Mostrar página actual, primera, última, y vecinas inmediatas
                        if (
                          pNum === 1 ||
                          pNum === totalPages ||
                          (pNum >= currentPage - 2 && pNum <= currentPage + 2)
                        ) {
                          return (
                            <li key={pNum} className={`page-item ${isActive ? "active" : ""}`}>
                              <Link
                                className="page-link rounded-circle d-flex align-items-center justify-content-center fw-bold"
                                style={{
                                  width: "42px",
                                  height: "42px",
                                  border: "1px solid",
                                  borderColor: isActive ? categoryColor : "#e2e8f0",
                                  backgroundColor: isActive ? categoryColor : "#fff",
                                  color: isActive ? "#ffffff" : "#334155",
                                  textDecoration: "none",
                                }}
                                href={buildPageUrl(pNum)}
                              >
                                {pNum}
                              </Link>
                            </li>
                          );
                        }

                        // Puntos suspensivos
                        if (pNum === currentPage - 3 || pNum === currentPage + 3) {
                          return (
                            <li key={pNum} className="page-item disabled">
                              <span
                                className="page-link border-0 bg-transparent text-muted d-flex align-items-center justify-content-center"
                                style={{ width: "36px", height: "42px" }}
                              >
                                ...
                              </span>
                            </li>
                          );
                        }

                        return null;
                      })}

                      {/* Botón Siguiente */}
                      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <Link
                          className="page-link rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "42px",
                            height: "42px",
                            border: "1px solid #e2e8f0",
                            color: currentPage === totalPages ? "#94a3b8" : "#334155",
                            backgroundColor: "#fff",
                          }}
                          href={currentPage < totalPages ? buildPageUrl(currentPage + 1) : "#"}
                          aria-label="Siguiente"
                        >
                          <i className="fa-solid fa-chevron-right" style={{ fontSize: "0.8rem" }} />
                        </Link>
                      </li>
                    </ul>
                  </nav>
                )}
              </>
            ) : (
              <div className="text-center py-5">
                <h3 className="text-muted fw-bold">No hay publicaciones en esta sección</h3>
                <p className="text-secondary">Pronto compartiremos novedades aquí.</p>
                <Link
                  href={homeHref}
                  className="btn btn-primary rounded-pill px-4 mt-3"
                  style={{ backgroundColor: categoryColor, borderColor: categoryColor }}
                >
                  Volver a la Revista
                </Link>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
