import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { PageServices } from '@lcaba/services';
import { notFound } from 'next/navigation';

const PAGE_ID = 7;
const TABLE = 'evidencias_';
const LIMIT = 9;

// helpers

function buildImageUrl(img: any): string | null {
    if (!img?.location || !img?.filename) return null;
    const base = process.env.NEXT_PUBLIC_IMAGES;
    const key = process.env.NEXT_PUBLIC_FILESERVER_KEY;
    const q = key ? ('?key=' + key) : '';
    return base + '/' + img.location + '/' + img.filename + q;
}

// ── Pagination Component ───────────────────────────────────────────────────────

function Pagination({ currentPage, totalPages, basePath }: { currentPage: number; totalPages: number; basePath: string }) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const prev = currentPage > 1 ? currentPage - 1 : null;
    const next = currentPage < totalPages ? currentPage + 1 : null;

    return (
        <div className='d-flex justify-content-center align-items-center gap-2 mt-5 flex-wrap'>
            {prev && (
                <Link href={`${basePath}?page=${prev}`} className='btn btn-outline-primary rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2'>
                    <i className='bi bi-chevron-left'></i> Anterior
                </Link>
            )}

            {pages.map(p => {
                const isActive = p === currentPage;
                // Show first, last, current and neighbours; hide the rest with ellipsis
                const show = p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1;
                const showEllipsisLeft = p === 2 && currentPage > 3;
                const showEllipsisRight = p === totalPages - 1 && currentPage < totalPages - 2;

                if (!show) {
                    if (showEllipsisLeft || showEllipsisRight) {
                        return <span key={p} className='text-muted px-1'>…</span>;
                    }
                    return null;
                }

                return (
                    <Link
                        key={p}
                        href={`${basePath}?page=${p}`}
                        className={`btn rounded-circle d-flex align-items-center justify-content-center fw-semibold ${isActive ? 'btn-primary' : 'btn-outline-secondary'}`}
                        style={{ width: '42px', height: '42px', fontSize: '0.9rem' }}
                    >
                        {p}
                    </Link>
                );
            })}

            {next && (
                <Link href={`${basePath}?page=${next}`} className='btn btn-outline-primary rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2'>
                    Siguiente <i className='bi bi-chevron-right'></i>
                </Link>
            )}
        </div>
    );
}

// ── Static Page (secciones sin posts) ──────────────────────────────────────────

function StaticPageTemplate({ section, menuItems, pageVw, logo }: any) {
    const title = section?.title || '';
    const description = section?.description || '';
    const shortdesc = section?.shortdesc || '';
    const subtitle = section?.subtitle || '';
    const images = section?.images || [];
    const archivos = section?.archivos || [];
    const allImageUrls = images.map(buildImageUrl).filter(Boolean) as string[];

    return (
        <Layout menuItems={menuItems} pageVw={pageVw} logo={logo} breadcrumbTitle={title}>
            {/* Hero banner */}
            <section className='data-analysis-section-header position-relative overflow-hidden pt-160 pb-60'>
                <div className='container position-relative z-1'>
                    <div className='row'>
                        <div className='col-12'>
                            <nav aria-label='breadcrumb' className='mb-3'>
                                <ol className='breadcrumb' style={{ fontSize: '0.85rem' }}>
                                    <li className='breadcrumb-item'>
                                        <a href='/' className='text-decoration-none text-secondary'>Inicio</a>
                                    </li>
                                    <li className='breadcrumb-item active text-primary' aria-current='page'>{title}</li>
                                </ol>
                            </nav>
                            <h1 className='mb-0' style={{ fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>{title}</h1>
                            {subtitle && <p className='text-muted mt-2 mb-0 fs-5'>{subtitle}</p>}
                        </div>
                    </div>
                </div>
                <span style={{ position: 'absolute', top: '-60px', right: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(121,74,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <span style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(121,74,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
            </section>

            <section className='pt-80 pb-80'>
                <div className='container'>
                    <div className='row g-5'>
                        <div className='col-lg-8'>
                            {shortdesc && (
                                <div
                                    className='fw-semibold mb-4'
                                    style={{ fontSize: '1.1rem', borderLeft: '3px solid var(--tc-primary-color, #0d6efd)', paddingLeft: '1rem' }}
                                    dangerouslySetInnerHTML={{ __html: shortdesc }}
                                />
                            )}
                            {allImageUrls.length > 0 && (
                                <div className='mb-4'>
                                    {allImageUrls.map((url: string, i: number) => (
                                        <img key={i} src={url} alt={title + ' - imagen ' + (i + 1)} className='img-fluid rounded mb-3' style={{ width: '100%', objectFit: 'cover' }} />
                                    ))}
                                </div>
                            )}
                            {description && (
                                <div className='post-body mt-4' dangerouslySetInnerHTML={{ __html: description }} style={{ lineHeight: 1.8, fontSize: '1rem' }} />
                            )}
                            {archivos.length > 0 && (
                                <div className='mt-4'>
                                    <h6 className='fw-semibold mb-3'>Documentos</h6>
                                    <ul className='list-group list-group-flush'>
                                        {archivos.map((f: any, i: number) => {
                                            const fileUrl = buildImageUrl(f);
                                            return (
                                                <li key={f.id ?? i} className='list-group-item d-flex align-items-center gap-3 px-0'>
                                                    <i className={`bi bi-file-earmark-${f.mimetype === 'application/msword' || f.mimetype?.includes('word') ? 'word text-primary' : 'pdf text-danger'} fs-5`} />
                                                    {fileUrl ? (
                                                        <a href={fileUrl} target='_blank' rel='noreferrer' className='text-decoration-none fw-medium'>{f.title || f.filename || ('Archivo ' + (i + 1))}</a>
                                                    ) : (
                                                        <span>{f.title || f.filename || ('Archivo ' + (i + 1))}</span>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className='col-lg-4'>
                            <div className='p-4 rounded-4' style={{ backgroundColor: '#f9f9f9', position: 'sticky', top: '100px' }}>
                                <h6 className='fw-semibold mb-3 text-primary'>{title}</h6>
                                {shortdesc && <div className='text-muted small mb-3' dangerouslySetInnerHTML={{ __html: shortdesc }} />}
                                <hr />
                                <Link href='/' className='btn btn-primary w-100 py-2' style={{ borderRadius: '30px' }}>Volver al inicio</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

// ── Posts Listing Page ─────────────────────────────────────────────────────────

function PostsListTemplate({ section, posts, total, currentPage, totalPages, basePath, menuItems, pageVw, logo }: any) {
    const title = section?.title || 'Publicaciones';
    const shortdesc = section?.shortdesc || '';

    return (
        <Layout menuItems={menuItems} pageVw={pageVw} logo={logo} breadcrumbTitle={title}>
            <style>{`
                .post-list-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
                .post-list-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.10) !important; }
                .post-list-card .post-img { transition: transform 0.5s ease; }
                .post-list-card:hover .post-img { transform: scale(1.04); }
            `}</style>

            {/* Hero */}
            <section className='data-analysis-section-header position-relative overflow-hidden pt-160 pb-60'>
                <div className='container position-relative z-1'>
                    <div className='row align-items-end'>
                        <div className='col-md-8'>
                            <nav aria-label='breadcrumb' className='mb-3'>
                                <ol className='breadcrumb' style={{ fontSize: '0.85rem' }}>
                                    <li className='breadcrumb-item'>
                                        <a href='/' className='text-decoration-none text-secondary'>Inicio</a>
                                    </li>
                                    <li className='breadcrumb-item active text-primary' aria-current='page'>{title}</li>
                                </ol>
                            </nav>
                            <h1 className='mb-0' style={{ fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>{title}</h1>
                            {shortdesc && (
                                <p className='text-muted mt-2 fs-5 mb-0'>
                                    {shortdesc.replace(/<[^>]*>/g, '').slice(0, 180)}
                                </p>
                            )}
                        </div>
                        <div className='col-md-4 text-md-end mt-3 mt-md-0'>
                            <span className='badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fs-6'>
                                {total} publicación{total !== 1 ? 'es' : ''}
                            </span>
                        </div>
                    </div>
                </div>
                <span style={{ position: 'absolute', top: '-60px', right: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(121,74,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <span style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(121,74,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
            </section>

            {/* Posts Grid */}
            <section className='pt-60 pb-120 bg-secondary-2'>
                <div className='container'>
                    {posts.length === 0 ? (
                        <div className='text-center py-5 text-muted'>
                            <i className='bi bi-inbox fs-1 d-block mb-3'></i>
                            <p className='fs-5'>No hay publicaciones disponibles en este momento.</p>
                        </div>
                    ) : (
                        <>
                            <div className='row g-4'>
                                {posts.map((post: any, index: number) => {
                                    const mainImage = post.images?.find((img: any) => img.image_type === 'main') || post.images?.[0];
                                    const imageUrl = buildImageUrl(mainImage) || (logo ? buildImageUrl(logo) : null);
                                    const rawDesc = (post.description || post.shortdesc || '').replace(/<[^>]*>/g, '');
                                    const excerpt = rawDesc.length > 130 ? rawDesc.slice(0, 130) + '…' : rawDesc;
                                    const postTitle = post.titulo || post.title || 'Sin título';

                                    return (
                                        <div key={post.id || index} className='col-lg-4 col-md-6' data-aos='fade-up' data-aos-delay={index * 60}>
                                            <div className='card h-100 border-0 rounded-4 overflow-hidden post-list-card' style={{ boxShadow: '0px 8px 24px rgba(0,0,0,0.07)' }}>
                                                <div className='position-relative overflow-hidden' style={{ height: '220px' }}>
                                                    <Link href={`/novedades/${post.id}`}>
                                                        {imageUrl ? (
                                                            <img src={imageUrl} alt={postTitle} className='w-100 h-100 post-img' style={{ objectFit: 'cover' }} />
                                                        ) : (
                                                            <div className='w-100 h-100 d-flex align-items-center justify-content-center bg-light'>
                                                                <i className='bi bi-file-earmark-text text-muted' style={{ fontSize: '3rem' }}></i>
                                                            </div>
                                                        )}
                                                    </Link>
                                                    {post.dt_ins && (
                                                        <div className='position-absolute bottom-0 start-0 m-3'>
                                                            <span className='badge bg-dark bg-opacity-60 text-white px-3 py-2 rounded-pill' style={{ fontSize: '0.75rem', backdropFilter: 'blur(4px)' }}>
                                                                {new Date(post.dt_ins).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className='card-body p-4 d-flex flex-column'>
                                                    <Link href={`/novedades/${post.id}`} className='text-decoration-none'>
                                                        <h5 className='card-title fw-bold mb-3' style={{ color: '#1a1a2e', fontSize: '17px', }}>
                                                            {postTitle}
                                                        </h5>
                                                    </Link>
                                                    {excerpt && (
                                                        <p className='card-text text-muted flex-grow-1 mb-4' style={{ fontSize: '0.95rem', lineHeight: 1.65 }}>
                                                            {excerpt}
                                                        </p>
                                                    )}
                                                    <div className='mt-auto'>
                                                        <Link href={`/novedades/${post.id}`} className='btn btn-outline-primary hover-up px-4 py-2 d-inline-flex align-items-center gap-2 rounded-pill'>
                                                            Leer más <i className='bi bi-arrow-right'></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <Pagination currentPage={currentPage} totalPages={totalPages} basePath={basePath} />
                        </>
                    )}
                </div>
            </section>
        </Layout>
    );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function DynamicSectionPage({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string[] }>;
    searchParams: Promise<{ page?: string }>;
}) {
    const { slug } = await params;
    const { page: pageParam } = await searchParams;
    const slugStr = Array.isArray(slug) ? slug.join('/') : slug;
    const currentPage = Math.max(1, parseInt(pageParam || '1', 10));
    const offset = (currentPage - 1) * LIMIT;

    const [section, menuItems, pageVw] = await Promise.all([
        PageServices.getSectionByUrl(slugStr, PAGE_ID),
        PageServices.getNavMenu(PAGE_ID),
        PageServices.getPageVw(String(PAGE_ID)),
    ]);

    if (!section) notFound();

    const logo = pageVw?.images?.find((img: any) => img.image_type === 'logo');

    const isPostsListing = section?.template === 'posts-list' || 
                           section?.section === 'cat' || 
                           section?.loadcontent === '_posts_listall.php';

    if (isPostsListing) {
        const catId = section?.fk_idcat || section?.fk_menuid || null;
        // Obtenemos los posts filtrando por categoría de la sección
        const { data: posts, total } = await PageServices.getPosts(TABLE, false, offset, LIMIT, true, false, catId, 'true');
        const totalPages = Math.ceil(total / LIMIT);

        return (
            <PostsListTemplate
                section={section}
                posts={posts}
                total={total}
                currentPage={currentPage}
                totalPages={totalPages}
                basePath={`/${slugStr}`}
                menuItems={menuItems}
                pageVw={pageVw}
                logo={logo}
            />
        );
    }

    return (
        <StaticPageTemplate
            section={section}
            menuItems={menuItems}
            pageVw={pageVw}
            logo={logo}
        />
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>;
}) {
    const { slug } = await params;
    const slugStr = Array.isArray(slug) ? slug.join('/') : slug;
    const section = await PageServices.getSectionByUrl(slugStr, PAGE_ID);
    const title = section?.title || 'Seccion';
    const description = section?.shortdesc || section?.description || '';

    return {
        title: title + ' | OIP - Oficina de Integridad Publica',
        description: description.replace(/<[^>]*>/g, '').slice(0, 160),
    };
}