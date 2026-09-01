import Link from "next/link";
import Layout from "@lcaba/ui/astrax/components/layout/Layout";
import NewsSection from "@lcaba/ui/astrax/components/sections/home/NewsSection";
import ImageGallery from "../publicaciones/[id]/ImageGallery";
import { getNavMenu } from "@lcaba/services/page";
import { notFound } from "next/navigation";

const PAGE_ID = 3;

// ── helpers ───────────────────────────────────────────────────────────────────

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

function buildImageUrl(img: any): string | null {
    if (!img?.location || !img?.filename) return null;
    const base = process.env.NEXT_PUBLIC_IMAGES;
    const key = process.env.NEXT_PUBLIC_FILESERVER_KEY;
    return `${base}/${img.location}/${img.filename}${key ? `?key=${key}` : ""}`;
}

// ── data fetchers ─────────────────────────────────────────────────────────────

async function getSectionByUrl(slug: string) {
    try {
        const url = `/${slug}`;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API}/nav-menu/by-url?url=${encodeURIComponent(url)}&pageId=${PAGE_ID}`,
            { next: { revalidate: 60 } }
        );
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

async function getPostsBySection(section: any) {
    try {
        const catId = section?.fk_idcat || section?.id || section?.fk_menuid || null;
        const query = catId
            ? `${process.env.NEXT_PUBLIC_API}/posts?table=cultura_&status=true&withImages=true&categoria=${catId}`
            : `${process.env.NEXT_PUBLIC_API}/posts?table=cultura_&status=true&withImages=true`;

        const res = await fetch(query, { next: { revalidate: 60 } });
        const data = await res.json();
        return Array.isArray(data) ? data : data.data || [];
    } catch {
        return [];
    }
}

async function getSocials() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API}/general/pages/${PAGE_ID}/socials`,
            { next: { revalidate: 60 } }
        );
        const data = await res.json();
        if (Array.isArray(data)) return data;
        if (data.value && Array.isArray(data.value)) return data.value;
        return [];
    } catch {
        return [];
    }
}

// ── Templates ─────────────────────────────────────────────────────────────────

/**
 * Template para secciones de tipo categoría o publicaciones filtradas.
 * Muestra la lista de publicaciones con la descripción y galería si existen.
 */
function PostsListTemplate({ section, posts, menuItems, socials }: any) {
    const title = section?.title || "";
    const subtitle = section?.subtitle || "";
    const description = section?.description || "";
    const shortdesc = section?.shortdesc || "";
    const images = section?.images || [];
    const allImageUrls = images.map(buildImageUrl).filter(Boolean) as string[];

    return (
        <Layout menuItems={menuItems} socials={socials} breadcrumbTitle={title}>
            {/* Intro text / description if exists for this section */}
            {(subtitle || shortdesc || description || allImageUrls.length > 0) && (
                <section className="pt-5 pb-2">
                    <div className="container">
                        {subtitle && <p className="text-muted fs-5 mb-3">{subtitle}</p>}
                        {shortdesc && (
                            <div
                                className="fw-semibold mb-4"
                                style={{
                                    fontSize: "1.1rem",
                                    borderLeft: "3px solid var(--tc-primary-color, #f6bd43)",
                                    paddingLeft: "1rem",
                                }}
                                dangerouslySetInnerHTML={{ __html: shortdesc }}
                            />
                        )}

                        {allImageUrls.length > 0 && (
                            <ImageGallery images={allImageUrls} title={title} />
                        )}

                        {description && (
                            <div
                                className="post-body mb-4"
                                dangerouslySetInnerHTML={{ __html: description }}
                                style={{ lineHeight: 1.8, fontSize: "1rem" }}
                            />
                        )}
                    </div>
                </section>
            )}

            {/* Posts grid */}
            <NewsSection posts={posts} title={posts.length > 0 ? "Publicaciones" : ""} />
        </Layout>
    );
}

/**
 * Template para secciones estáticas: muestra copete, galería de imágenes,
 * cuerpo HTML y archivos adjuntos.
 */
function StaticPageTemplate({ section, menuItems, socials }: any) {
    const title = section?.title || "";
    const description = section?.description || "";
    const shortdesc = section?.shortdesc || "";
    const subtitle = section?.subtitle || "";
    const images = section?.images || [];
    const archivos = section?.archivos || [];

    const allImageUrls = images.map(buildImageUrl).filter(Boolean) as string[];

    return (
        <Layout menuItems={menuItems} socials={socials} breadcrumbTitle={title}>
            {/* Content */}
            <section className="py-80">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-8">
                            {subtitle && <p className="text-muted fs-5 mb-3">{subtitle}</p>}

                            {/* Short description / copete */}
                            {shortdesc && (
                                <div
                                    className="fw-semibold mb-4"
                                    style={{
                                        fontSize: "1.1rem",
                                        borderLeft: "3px solid var(--tc-primary-color, #f6bd43)",
                                        paddingLeft: "1rem",
                                    }}
                                    dangerouslySetInnerHTML={{ __html: shortdesc }}
                                />
                            )}

                            {/* Image Gallery Swiper + Fullscreen Modal */}
                            {allImageUrls.length > 0 && (
                                <ImageGallery images={allImageUrls} title={title} />
                            )}

                            {/* Body / Description */}
                            {description && (
                                <div
                                    className="post-body mt-4"
                                    dangerouslySetInnerHTML={{ __html: description }}
                                    style={{ lineHeight: 1.8, fontSize: "1rem" }}
                                />
                            )}

                            {/* Attached Files */}
                            {archivos.length > 0 && (
                                <div className="mt-4">
                                    <h6 className="fw-semibold mb-3">Documentos</h6>
                                    <ul className="list-group list-group-flush">
                                        {archivos.map((f: any, i: number) => {
                                            const fileUrl = buildImageUrl(f);
                                            return (
                                                <li key={i} className="list-group-item d-flex align-items-center gap-3 px-0">
                                                    <i className="bi bi-file-earmark-text text-primary fs-5" />
                                                    {fileUrl ? (
                                                        <a href={fileUrl} target="_blank" rel="noreferrer" className="text-decoration-none">
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
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4">
                            <div
                                className="p-4 rounded-4"
                                style={{ backgroundColor: "#f9f9f9", position: "sticky", top: "100px" }}
                            >
                                <h6 className="fw-semibold mb-3 text-primary">{title}</h6>
                                {shortdesc && (
                                    <div
                                        className="text-muted small mb-3"
                                        dangerouslySetInnerHTML={{ __html: shortdesc }}
                                    />
                                )}
                                <hr />
                                <Link href="/" className="btn btn-primary w-100 py-2" style={{ borderRadius: "30px" }}>
                                    ← Volver al inicio
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
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

    const [section, menuItems, socials] = await Promise.all([
        getSectionByUrl(slugStr),
        getNavMenu(PAGE_ID),
        getSocials(),
    ]);

    if (!section) notFound();

    /**
     * Auto-detect template:
     * 1. Manual override via DB field `template` (optional)
     * 2. section.section === 'cat'  → posts-list (category/filtro de publicaciones)
     * 3. Everything else            → static-page (contenido editorial)
     */
    const template: string =
        section?.template ||
        (section?.section === 'cat' ? 'posts-list' : 'static-page');

    if (template === 'posts-list') {
        const posts = await getPostsBySection(section);
        return <PostsListTemplate section={section} posts={posts} menuItems={menuItems} socials={socials} />;
    }

    return <StaticPageTemplate section={section} menuItems={menuItems} socials={socials} />;
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}) {
    const { slug } = await params;
    const slugStr = Array.isArray(slug) ? slug.join("/") : slug;
    const section = await getSectionByUrl(slugStr);
    const title = section?.title || "Sección";
    const description = section?.shortdesc || section?.description || "";

    return {
        title: `${title} | Cultura LCABA`,
        description: description.replace(/<[^>]*>/g, "").slice(0, 160),
    };
}
