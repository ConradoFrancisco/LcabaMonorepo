import Link from "next/link";

function buildImageUrl(img: any): string | null {
    if (!img?.location || !img?.filename) return null;
    const base = process.env.NEXT_PUBLIC_IMAGES;
    const key = process.env.NEXT_PUBLIC_FILESERVER_KEY;
    const q = key ? ('?key=' + key) : '';
    return base + '/' + img.location + '/' + img.filename + q;
}
export default function PostSection({ posts, logo }: { posts: any[], logo?: any }) {
    if (!posts || posts.length === 0) return null;
    console.log('estoy viendo los postSection', posts)

    return (
        <section className="py-120 bg-secondary-2">
            <style>{`
                .post-card-img {
                    transition: transform 0.5s ease;
                }
                .post-card:hover .post-card-img {
                    transform: scale(1.05);
                }
            `}</style>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-12 text-center">
                        <h2 className="text-anime-style-2">Últimas Novedades</h2>
                    </div>
                </div>
                <div className="row g-4">
                    {posts.map((post: any, index: number) => {
                        const mainImage = post.images?.find((img: any) => img.image_type === 'main') || post.images?.[0];
                        const imageUrl = buildImageUrl(mainImage) || (logo ? buildImageUrl(logo) : '/assets/imgs/placeholder.png'); // Usa el logo de OIP como fallback

                        return (
                            <div key={post.id || index} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={index * 100}>
                                <div className="card h-100 border-0 rounded-4 overflow-hidden card-provide post-card" style={{ boxShadow: '0px 10px 30px 0px rgba(0, 0, 0, 0.08)' }}>
                                    <div className="position-relative" style={{ height: '240px', overflow: 'hidden' }}>
                                        <Link href={`/novedades/${post.id}`}>
                                            <img
                                                src={imageUrl}
                                                alt={post.title}
                                                className="w-100 h-100 post-card-img"
                                                style={{ objectFit: 'contain', boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.5)' }}
                                            />
                                        </Link>
                                        {post.tags && (
                                            <div className="position-absolute top-0 start-0 m-3">
                                                <span className="badge bg-primary px-3 py-2 rounded-pill fs-7">
                                                    {post.tags.split(',')[0]}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="card-body p-4 d-flex flex-column">
                                        <Link href={`/novedades/${post.id}`} className="text-decoration-none">
                                            <h5 className="card-title fw-bold text-dark mb-3 link">{post.titulo}</h5>
                                        </Link>

                                        {post.description && (
                                            <p className="card-text text-muted mb-4 flex-grow-1">
                                                {(() => {
                                                    const plainText = post.description.replace(/<[^>]*>?/gm, '');
                                                    return plainText.length > 120 ? plainText.substring(0, 120) + '...' : plainText;
                                                })()}
                                            </p>
                                        )}

                                        <div className="mt-auto pt-3 border-top border-secondary border-opacity-10 d-flex align-items-center justify-content-start">
                                            <Link href={`/novedades/${post.id}`} className="btn btn-outline-primary hover-up px-4 py-2 d-inline-flex align-items-center gap-2 rounded-pill">
                                                Leer más <i className="bi bi-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
