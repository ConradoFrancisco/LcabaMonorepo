import Link from "next/link";
import NewsSection from "@lcaba/ui/astrax/components/sections/home/NewsSection";
import ImageGallery from "../publicaciones/[id]/ImageGallery";
import { PageServices } from "@lcaba/services";
import { notFound } from "next/navigation";
import SubItemCard from "./SubItemCard";

const PAGE_ID = 3;

// ── helpers ───────────────────────────────────────────────────────────────────

function buildImageUrl(img: any): string | null {
  if (!img?.location || !img?.filename) return null;
  const base = process.env.NEXT_PUBLIC_IMAGES;
  const key = process.env.NEXT_PUBLIC_FILESERVER_KEY;
  return `${base}/${img.location}/${img.filename}${key ? `?key=${key}` : ""}`;
}

// ── Banner Component ──────────────────────────────────────────────────────────

function SectionBanner({
  title,
  subtitle,
  parent,
}: {
  title?: string;
  subtitle?: string;
  parent?: { title: string; url?: string } | null;
}) {
  if (!title) return null;

  const parentHref = parent?.url
    ? "/" +
    parent.url
      .toLowerCase()
      .replace(/^\//, "")
      .replace(/\.html?$/, "")
      .replace(/^seccion\//, "")
    : null;

  return (
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
        {/* Breadcrumb integrado con Inicio / Padre (si existe) / Actual */}
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
            {parent && (
              <li className="breadcrumb-item">
                {parentHref ? (
                  <Link
                    href={parentHref}
                    className="text-white-50 text-decoration-none"
                    style={{ transition: "color 0.2s" }}
                  >
                    {parent.title}
                  </Link>
                ) : (
                  <span className="text-white-50">{parent.title}</span>
                )}
              </li>
            )}
            <li
              className="breadcrumb-item active text-white"
              aria-current="page"
              style={{ opacity: 0.85 }}
            >
              {title}
            </li>
          </ol>
        </nav>

        {/* Categoría / Menú Padre como Badge destacado (idéntico a publicaciones/[id]) */}
        {/*  {parent && (
          <div className="mb-3">
            {parentHref ? (
              <Link
                href={parentHref}
                className="text-decoration-none"
                style={{
                  display: "inline-block",
                  padding: "4px 14px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#ffd580",
                  backgroundColor: "rgba(217, 144, 0, 0.2)",
                  border: "1px solid rgba(217, 144, 0, 0.35)",
                  borderRadius: "20px",
                  transition: "all 0.2s ease",
                }}
              >
                {parent.title}
              </Link>
            ) : (
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 14px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#ffd580",
                  backgroundColor: "rgba(217, 144, 0, 0.2)",
                  border: "1px solid rgba(217, 144, 0, 0.35)",
                  borderRadius: "20px",
                }}
              >
                {parent.title}
              </span>
            )}
          </div>
        )} */}

        {/* Título de la sección */}
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

        {/* Subtítulo integrado en el Banner */}
        {subtitle && (
          <div
            className="mt-3"
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
  );
}

// ── Templates ─────────────────────────────────────────────────────────────────

/**
 * Template para secciones de tipo categoría o publicaciones filtradas.
 * Muestra las imágenes y copete a la izquierda, descripción a la derecha,
 * y abajo en otra sección los posteos de la categoría.
 */
function PostsListTemplate({ section, posts, parent }: any) {
  const title = section?.title || "";
  const subtitle = section?.subtitle || "";
  const description = section?.description || "";
  const shortdesc = section?.shortdesc || "";
  const images = section?.images || [];
  const allImageUrls = images.map(buildImageUrl).filter(Boolean) as string[];

  const hasEditorialContent =
    shortdesc || description || allImageUrls.length > 0;

  return (
    <>
      {/* Banner idéntico a publicaciones/[id] */}
      <SectionBanner title={title} subtitle={subtitle} parent={parent} />

      {/* Intro editorial: Carrusel a la izquierda, información/texto destacado a la derecha, y descripción debajo */}
      {hasEditorialContent && (
        <section className="py-5" style={{ backgroundColor: "#ffffff" }}>
          <div className="container">
            {/* Fila superior: Imágenes (Izquierda) + Información/Copete (Derecha) */}
            <div className="row g-4 align-items-start mb-4">
              {/* Columna Izquierda: Galería / Carrusel de Imágenes */}
              {allImageUrls.length > 0 ? (
                <div className={shortdesc ? "col-lg-7" : "col-12"}>
                  <ImageGallery images={allImageUrls} title={title} />
                </div>
              ) : null}

              {/* Columna Derecha: Texto destacado / Datos / Copete */}
              {shortdesc ? (
                <div className={allImageUrls.length > 0 ? "col-lg-5" : "col-12"}>
                  <div
                    className="fw-semibold"
                    style={{
                      fontSize: "1.05rem",
                      borderLeft: "4px solid var(--tc-primary-color, #f6bd43)",
                      paddingLeft: "1.2rem",
                      lineHeight: 1.7,
                      color: "#2b2b2b",
                    }}
                    dangerouslySetInnerHTML={{ __html: shortdesc }}
                  />
                </div>
              ) : null}
            </div>

            {/* Descripción completa debajo del carrusel */}
            {description && (
              <div className="row">
                <div className="col-12">
                  <div
                    className="post-body pt-3"
                    dangerouslySetInnerHTML={{ __html: description }}
                    style={{ lineHeight: 1.85, fontSize: "1.05rem", color: "#333333" }}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Posts grid en sección separada */}
      {posts && posts.length > 0 && (
        <section className="py-5" style={{ backgroundColor: "#f9f9fb" }}>
          <div className="container">
            <NewsSection
              posts={posts}
              title="Publicaciones"
            />
          </div>
        </section>
      )}
    </>
  );
}

/**
 * Template para secciones estáticas:
 * - Fila superior: Carrusel a la izquierda y copete/contacto a la derecha
 * - Descripción completa debajo del carrusel
 * - Archivos adjuntos
 * - SubItems (hijos / actividades) si existen
 * - Publicaciones relacionadas abajo
 */
function StaticPageTemplate({ section, posts, parent }: any) {
  const title = section?.title || "";
  const description = section?.description || "";
  const shortdesc = section?.shortdesc || "";
  const subtitle = section?.subtitle || "";
  const images = section?.images || [];
  const archivos = section?.archivos || [];
  const subItems: any[] = section?.subItems ?? [];
  const hasChildren = subItems.length > 0;

  const allImageUrls = images.map(buildImageUrl).filter(Boolean) as string[];

  return (
    <>
      {/* Banner idéntico a publicaciones/[id] */}
      <SectionBanner title={title} subtitle={subtitle} parent={parent} />

      {/* ── Main content ── */}
      <section className="py-5" style={{ backgroundColor: "#ffffff" }}>
        <div className="container">
          {/* Fila superior: Imágenes a la izquierda, Copete/Info a la derecha */}
          <div className="row g-4 align-items-start mb-4">
            {/* Columna Izquierda: Carrusel de imágenes */}
            {allImageUrls.length > 0 ? (
              <div className={shortdesc ? "col-lg-7" : "col-12"}>
                <ImageGallery images={allImageUrls} title={title} />
              </div>
            ) : null}

            {/* Columna Derecha: Copete / Datos de contacto con borde amarillo */}
            {shortdesc ? (
              <div className={allImageUrls.length > 0 ? "col-lg-5" : "col-12"}>
                <div
                  className="fw-semibold"
                  style={{
                    fontSize: "0.9rem",
                    borderLeft: "4px solid var(--tc-primary-color, #f6bd43)",
                    paddingLeft: "1.2rem",
                    lineHeight: 1.7,
                    color: "#2b2b2b",
                  }}
                  dangerouslySetInnerHTML={{ __html: shortdesc }}
                />
              </div>
            ) : null}
          </div>

          {/* Descripción debajo del carrusel y de la información */}
          {description && (
            <div className="row mb-4">
              <div className="col-12">
                <div
                  className="post-body pt-2"
                  dangerouslySetInnerHTML={{ __html: description }}
                  style={{ lineHeight: 1.85, fontSize: "1.05rem", color: "#333333" }}
                />
              </div>
            </div>
          )}

          {/* Documentos y Archivos */}
          {archivos.length > 0 && (
            <div className="mb-5 pt-3 border-top">
              <h6 className="fw-semibold mb-3">Documentos y Archivos</h6>
              <ul className="list-group list-group-flush">
                {archivos.map((f: any, i: number) => {
                  const fileUrl = buildImageUrl(f);
                  return (
                    <li
                      key={i}
                      className="list-group-item d-flex align-items-center gap-3 px-0 bg-transparent"
                    >
                      <i className="bi bi-file-earmark-text text-primary fs-5" />
                      {fileUrl ? (
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-decoration-none"
                        >
                          {f.filename || `Archivo ${i + 1}`}
                        </a>
                      ) : (
                        <span>{f.filename || `Archivo ${i + 1}`}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* SubItems Grid si existen (hijos directos / ramas) */}
          {hasChildren && (
            <div className="pt-4 border-top">
              <h4 className="fw-bold mb-4" style={{ color: "#181116" }}>
                Secciones y Actividades
              </h4>
              <div className="row g-4">
                {subItems.map((item: any, idx: number) => (
                  <div key={item.id ?? idx} className="col-sm-6 col-lg-4">
                    <SubItemCard item={item} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Posts de la sección abajo en otra sección si existen */}
      {posts && posts.length > 0 && (
        <section className="py-5" style={{ backgroundColor: "#f9f9fb" }}>
          <div className="container">
            <NewsSection
              posts={posts}
              title="Publicaciones relacionadas"
            />
          </div>
        </section>
      )}
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function DynamicSectionPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugStr = Array.isArray(slug) ? slug.join("/") : slug;

  const section = await PageServices.getSectionByUrl(slugStr, PAGE_ID);

  if (!section) notFound();

  // ── Nav menu lookup (for parent hierarchy and child items) ──────────────────
  const navMenu = await PageServices.getNavMenu(PAGE_ID);

  /**
   * Recursively find a nav item whose title slug matches the target slug or title.
   * Also returns the parent item if it is a child.
   */
  function findNavItemWithParent(
    items: any[],
    targetSlug: string,
    targetTitle: string,
    currentParent: any = null,
  ): { item?: any; parent?: any } {
    const slugify = (t: string) =>
      t
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    for (const item of items) {
      const itemSlug = slugify(item.title || "");
      const rawUrl = (item.url || "")
        .toLowerCase()
        .replace(/^\//, "")
        .replace(/\.html?$/, "")
        .replace(/^seccion\//, "");

      if (
        itemSlug === targetSlug ||
        rawUrl === targetSlug ||
        slugify(targetTitle) === itemSlug
      ) {
        return { item, parent: currentParent };
      }
      if (item.subItems?.length) {
        const found = findNavItemWithParent(item.subItems, targetSlug, targetTitle, item);
        if (found.item) return found;
      }
    }
    return { item: undefined, parent: undefined };
  }

  const lastSlugSeg = slugStr.includes("/")
    ? slugStr.split("/").pop()!
    : slugStr;

  const { item: navItem, parent: parentMenuItem } = findNavItemWithParent(
    navMenu,
    lastSlugSeg,
    section?.title || "",
  );
  const navSubItems: any[] = navItem?.subItems ?? [];

  /**
   * Auto-detect template:
   * 1. Manual override via DB field `template` (optional)
   * 2. section.section === 'cat'  → posts-list (category/filtro de publicaciones)
   * 3. Everything else            → static-page (contenido editorial)
   */
  const template: string =
    section?.template ||
    (section?.section === "cat" ? "posts-list" : "static-page");

  if (template === "posts-list") {
    // Collect the category IDs to filter by:
    // - If the section itself is a category, use its fk_idcat
    // - If it also has child categories (subItems with section='cat'), include them too
    const ownCatId: number | undefined =
      section?.fk_idcat || section?.fk_menuid || undefined;

    const childCatIds: number[] = (section?.subItems ?? [])
      .filter((s: any) => s?.section === "cat" && s?.fk_idcat)
      .map((s: any) => s.fk_idcat as number);

    // If there are child categories, fetch by all children (not the parent)
    // Otherwise fall back to the section's own cat id
    const allCatIds: number[] = childCatIds.length > 0 ? childCatIds : (ownCatId ? [ownCatId] : []);
    const categoriaParam = allCatIds.length > 0 ? allCatIds.join(",") : (ownCatId ?? undefined);

    const { data: posts } = await PageServices.getPosts(
      "cultura",
      false,
      0,
      9,
      true,
      false,
      categoriaParam ?? null,
      "true",
    );
    return (
      <PostsListTemplate
        section={section}
        posts={posts}
        parent={parentMenuItem}
      />
    );
  }

  // Merge: prefer nav subItems (reliable), fall back to DB subItems
  const enrichedSection = {
    ...section,
    subItems:
      navSubItems.length > 0
        ? navSubItems.reverse()
        : (section?.subItems ?? []),
  };

  // Fetch posts if this static section has an associated category (or child categories)
  const ownCatId: number | undefined =
    section?.fk_idcat || section?.fk_menuid || undefined;
  const childCatIds: number[] = (enrichedSection?.subItems ?? [])
    .filter((s: any) => s?.fk_idcat)
    .map((s: any) => s.fk_idcat as number);
  const allCatIds: number[] = childCatIds.length > 0 ? childCatIds : (ownCatId ? [ownCatId] : []);
  const categoriaParam = allCatIds.length > 0 ? allCatIds.join(",") : (ownCatId ? String(ownCatId) : undefined);

  let staticPosts: any[] = [];
  if (categoriaParam) {
    try {
      const { data } = await PageServices.getPosts(
        "cultura",
        false,
        0,
        6,
        true,
        false,
        categoriaParam,
        "true",
      );
      staticPosts = data || [];
    } catch {
      staticPosts = [];
    }
  }

  return (
    <StaticPageTemplate
      section={enrichedSection}
      posts={staticPosts}
      parent={parentMenuItem}
    />
  );
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugStr = Array.isArray(slug) ? slug.join("/") : slug;
  const section = await PageServices.getSectionByUrl(slugStr, PAGE_ID);
  const title = section?.title || "Sección";
  const description = section?.shortdesc || section?.description || "";

  return {
    title: `${title} | Cultura LCABA`,
    description: description.replace(/<[^>]*>/g, "").slice(0, 160),
  };
}
