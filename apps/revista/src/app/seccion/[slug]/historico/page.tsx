import Link from "next/link";
import { notFound } from "next/navigation";
import { PageServices } from "@lcaba/services";
import { getCategoryColor } from "@/utils/categoryColors";
import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import Footer from "@/components/Footer";

// ── Helpers ───────────────────────────────────────────────────────────────────

function normalizeSlug(slug: string): string {
  return slug
    .replace(/\.html$/, "")
    .toLowerCase()
    .trim();
}

function isStatusActive(status: any): boolean {
  if (status === 1 || status === "1" || status === true) return true;
  if (status && typeof status === "object" && Array.isArray(status.data)) {
    return status.data[0] === 1;
  }
  return false;
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

function findCategoryInMenu(menuItems: any[], targetSlug: string) {
  const normalizedTarget = normalizeSlug(targetSlug);

  for (const item of menuItems) {
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

// ── Page ─────────────────────────────────────────────────────────────────────

interface HistoricoPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ pagina?: string }>;
}

const PAGE_SIZE = 12;

export default async function HistoricoPage({ params, searchParams }: HistoricoPageProps) {
  const { slug: rawSlug } = await params;
  const { pagina } = await searchParams;
  const slug = normalizeSlug(rawSlug);

  const [menuItems, pageVw] = await Promise.all([
    getRevistaMenu(),
    getPageData("6"),
  ]);

  const categoryMeta = findCategoryInMenu(menuItems, slug);
  if (!categoryMeta || !categoryMeta.cat_id) notFound();

  const catId = categoryMeta.cat_id;
  const categoryTitle = categoryMeta.title;
  const categoryColor = categoryMeta.color || getCategoryColor(categoryTitle);

  // Logo
  const logo = pageVw?.images?.find((img: any) => img.image_type === "logo");
  const baseImg = process.env.NEXT_PUBLIC_IMAGES;
  const fileKey = process.env.NEXT_PUBLIC_FILESERVER_KEY;
  const logoUrl =
    logo?.location && logo?.filename
      ? `${baseImg}/${logo.location}${logo.filename}${fileKey ? `?key=${fileKey}` : ""}`
      : "";

  const currentPage = Math.max(1, parseInt(pagina || "1", 10) || 1);
  const offset = (currentPage - 1) * PAGE_SIZE;

  // Traemos TODOS los posts de esta categoría (sin filtro de edición = histórico completo)
  const postsRes = await PageServices.getPosts(
    "magazine_",
    false,
    offset,
    PAGE_SIZE,
    true,
    false,
    catId,
    "1",
    false,
    undefined  // sin filtro de edición → histórico
  );

  const posts = Array.isArray(postsRes) ? postsRes : (postsRes?.data || []);
  const totalPosts = postsRes?.total ?? posts.length;
  const totalPages = Math.ceil(totalPosts / PAGE_SIZE);
  const activePosts = posts.filter((p: any) => isStatusActive(p.status));

  const sectionHref = `/seccion/${slug}`;

  const buildPageUrl = (pageNumber: number) => {
    const query = new URLSearchParams();
    if (pageNumber > 1) query.set("pagina", String(pageNumber));
    const qStr = query.toString();
    return `/seccion/${slug}/historico${qStr ? `?${qStr}` : ""}`;
  };

  return (
    <>
      <Header menuItems={menuItems} logo={logoUrl} />

      <main style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
        {/* Banner */}
        <div style={{ backgroundColor: categoryColor, padding: "36px 0", color: "#fff" }}>
          <div className="container">
            <div className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: "0.85rem", opacity: 0.9 }}>
              <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>INICIO</Link>
              <span>/</span>
              <Link href={sectionHref} style={{ color: "#fff", textDecoration: "none" }}>
                {categoryTitle}
              </Link>
              <span>/</span>
              <span className="fw-bold text-uppercase">Histórico</span>
            </div>
            <div className="d-flex justify-content-between align-items-end flex-wrap gap-2">
              <div>
                <h1 className="fw-bold m-0 text-uppercase" style={{ fontSize: "2rem" }}>
                  {categoryTitle}
                </h1>
                <p className="m-0 mt-1" style={{ opacity: 0.85, fontSize: "0.95rem" }}>
                  Archivo histórico de publicaciones
                </p>
              </div>
              {totalPosts > 0 && (
                <span
                  className="badge bg-white text-dark rounded-pill px-3 py-2 fw-semibold"
                  style={{ fontSize: "0.85rem" }}
                >
                  {totalPosts} {totalPosts === 1 ? "publicación" : "publicaciones"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Grilla de artículos */}
        <div className="container py-5">
          {activePosts.length > 0 ? (
            <>
              <div className="row g-4">
                {activePosts.map((p: any) => (
                  <ArticleCard
                    key={p.id}
                    post={p}
                    categoryColorMap={{ [categoryTitle.toLowerCase()]: categoryColor }}
                  />
                ))}
              </div>

              {/* Paginador */}
              {totalPages > 1 && (
                <nav aria-label="Paginación" className="mt-5 d-flex justify-content-center">
                  <ul className="pagination pagination-md gap-1 flex-wrap justify-content-center m-0">
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

                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pNum) => {
                      const isActive = pNum === currentPage;
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

              {/* Volver */}
              <div className="text-center mt-5">
                <Link
                  href={sectionHref}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 28px",
                    backgroundColor: "transparent",
                    color: categoryColor,
                    border: `2px solid ${categoryColor}`,
                    borderRadius: "999px",
                    textDecoration: "none",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    transition: "all 0.2s",
                  }}
                >
                  ← Volver
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-5">
              <h3 className="text-muted fw-bold">No hay publicaciones en el histórico</h3>
              <p className="text-secondary">Próximamente habrá contenido disponible aquí.</p>
              <Link
                href={sectionHref}
                className="btn rounded-pill px-4 mt-3"
                style={{ backgroundColor: categoryColor, color: "#fff", borderColor: categoryColor }}
              >
                Volver
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
