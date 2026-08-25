import Layout from "@lcaba/ui/astrax/components/layout/Layout";
import ImageGallery from "./ImageGallery";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNavMenu } from "@/lib/navMenu";

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
            { next: { revalidate: 60 } }
        );
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

async function getSocials() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API}/general/pages/3/socials`,
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

// ── page ──────────────────────────────────────────────────────────────────────

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [post, menuItems, socials] = await Promise.all([
        getPost(id),
        getNavMenu(),
        getSocials(),
    ]);

    if (!post) notFound();

    const { textos, images = [], videos = [], archivos = [], seteos = {} } = post;
    const title = textos?.title || "";
    const description = textos?.description || "";
    const shortdesc = textos?.shortdesc || "";
    const date = formatDate(seteos?.date_ins || seteos?.date);
    const category = seteos?.cat_name || seteos?.categoria || "";

// All valid images
    const allImages = (images as any[])
        .map((i: any) => buildImageUrl(i))
        .filter(Boolean) as string[];

    return (
        <Layout
            menuItems={menuItems}
            socials={socials}
            breadcrumbTitle={title}
            breadcrumbCategory={category}
        >

            {/* ── Main Content ─────────────────────────────────────────── */}
            <section className="py-80">
                <div className="container">
                    <div className="row g-5">

                        {/* Left: Article */}
                        <div className="col-lg-8">
                            {/* Short description */}
                            {shortdesc && (
                                <div
                                    className="fw-semibold mb-4"
                                    style={{ fontSize: "1.1rem", borderLeft: "3px solid var(--tc-primary-color, #f6bd43)", paddingLeft: "1rem" }}
                                    dangerouslySetInnerHTML={{ __html: shortdesc }}
                                />
                            )}

                            {/* Image Gallery (Main + Extra Images) Carousel */}
                            {allImages.length > 0 && (
                                <ImageGallery images={allImages} title={title} />
                            )}

                            {/* Body */}
                            {description && (
                                <div
                                    className="post-body mt-4"
                                    dangerouslySetInnerHTML={{ __html: description }}
                                    style={{ lineHeight: 1.8, fontSize: "1rem" }}
                                />
                            )}

                            {/* Videos */}
                            {(videos as any[]).length > 0 && (
                                <div className="mt-5">
                                    <h5 className="fw-semibold mb-3">Videos</h5>
                                    <div className="row g-3">
                                        {(videos as any[]).map((v: any, i: number) => {
                                            const embedUrl = v.url?.includes("youtube")
                                                ? v.url.replace("watch?v=", "embed/")
                                                : v.url;
                                            return (
                                                <div className="col-12 col-md-6" key={i}>
                                                    <div className="ratio ratio-16x9">
                                                        <iframe
                                                            src={embedUrl}
                                                            title={v.title || `Video ${i + 1}`}
                                                            allowFullScreen
                                                            className="rounded-3"
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Files */}
                            {(archivos as any[]).length > 0 && (
                                <div className="mt-5">
                                    <h5 className="fw-semibold mb-3">Archivos adjuntos</h5>
                                    <ul className="list-group list-group-flush">
                                        {(archivos as any[]).map((f: any, i: number) => {
                                            const fileUrl = buildImageUrl(f);
                                            return (
                                                <li key={i} className="list-group-item d-flex align-items-center gap-3 px-0">
                                                    <i className="bi bi-file-earmark-text text-primary fs-4" />
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

                        {/* Right: Sidebar */}
                        <div className="col-lg-4">
                            <div
                                className="p-4 rounded-4"
                                style={{ backgroundColor: "#f9f9f9", position: "sticky", top: "100px" }}
                            >
                                <h6 className="fw-semibold mb-3 text-primary">Información</h6>
                                {date && (
                                    <p className="mb-2 small">
                                        <i className="bi bi-calendar3 me-2 text-primary" />
                                        {date}
                                    </p>
                                )}
                                {category && (
                                    <p className="mb-2 small">
                                        <i className="bi bi-tag me-2 text-primary" />
                                        {category}
                                    </p>
                                )}
                                {seteos?.lugar && (
                                    <p className="mb-2 small">
                                        <i className="bi bi-geo-alt me-2 text-primary" />
                                        {seteos.lugar}
                                    </p>
                                )}
                                <hr />
                                <Link
                                    href="/publicaciones"
                                    className="btn btn-primary w-100 py-2"
                                    style={{ borderRadius: "30px" }}
                                >
                                    ← Volver al listado
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
