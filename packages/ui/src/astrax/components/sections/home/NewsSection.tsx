import Link from "next/link";

interface NewsPost {
    id: number;
    title?: string;
    titulo?: string;
    shortdesc?: string;
    copete?: string;
    date_ins?: string;
    url?: string;
    images?: { location: string; filename: string; image_type?: string }[];
}

function buildImageUrl(images: any[]): string | null {
    if (!images || images.length === 0) return null;
    const img =
        images.find((i: any) => String(i.image_type || "").toLowerCase() === "render") ||
        images[0];
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

function NewsCard({ post, delay }: { post: NewsPost; delay: string }) {
    const title = post.title || post.titulo || "";
    const desc = post.shortdesc || post.copete || "";
    const imgUrl = buildImageUrl(post.images || []);
    const url = `/publicaciones/${post.id}`;
    const date = formatDate(post.date_ins);

    return (
        <div
            className="col-lg-4 col-md-6 d-flex"
            data-aos="fade-up"
            data-aos-delay={delay}
        >
            <div className="card border-0 hover-up w-100" style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                {/* Image */}
                <Link href={url} className="d-block overflow-hidden" style={{ height: "200px" }}>
                    {imgUrl ? (
                        <img
                            src={imgUrl}
                            alt={title}
                            className="w-100 h-100"
                            style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                        />
                    ) : (
                        <div
                            className="w-100 h-100 d-flex align-items-center justify-content-center"
                            style={{ backgroundColor: "#f0f0f0" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} fill="none" viewBox="0 0 24 24" stroke="#ccc" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 9.75h18M3 6h18M3 12h18" />
                            </svg>
                        </div>
                    )}
                </Link>

                <div className="card-body px-4 py-4">
                    {date && (
                        <span className="btn-text text-primary" style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                            {date}
                        </span>
                    )}
                    <div className="card-title mt-2 mb-2">
                        <Link href={url}>
                            <h5
                                className="text-dark fw-semibold"
                                style={{
                                    fontSize: "1rem",
                                    lineHeight: 1.4,
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                }}
                            >
                                {title}
                            </h5>
                        </Link>
                    </div>
                    {desc && (
                        <p
                            className="text-muted mb-3"
                            style={{
                                fontSize: "0.875rem",
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                lineHeight: 1.6,
                            }}
                        >
                            {desc}
                        </p>
                    )}
                    <Link href={url} className="btn-text text-primary d-flex align-items-center gap-2" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                        Leer más
                        <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 16 16" fill="none">
                            <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="currentColor" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function NewsSection({ posts = [], title = "Últimas Noticias" }: { posts: NewsPost[]; title?: string }) {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="py-80">
            <div className="container">
                {/* Section header */}
                <div className="row mb-5">
                    <div className="col-12">
                        <span className="d-flex align-items-center gap-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={2} viewBox="0 0 18 2" fill="none">
                                <circle opacity="0.2" cx={1} cy={1} r={1} fill="#0D6EFD" />
                                <circle opacity="0.5" cx={9} cy={1} r={1} fill="#0D6EFD" />
                                <circle cx={17} cy={1} r={1} fill="#0D6EFD" />
                            </svg>
                            <span className="text-primary btn-text">novedades</span>
                        </span>
                        <h2 className="text-dark text-anime-style-3">{title}</h2>
                    </div>
                </div>

                {/* Cards grid */}
                <div className="row g-4">
                    {posts.map((post, index) => (
                        <NewsCard
                            key={post.id}
                            post={post}
                            delay={String((index % 4 + 1) * 200)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
