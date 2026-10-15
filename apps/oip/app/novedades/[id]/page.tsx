import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { PageServices } from '@lcaba/services';
import { notFound } from 'next/navigation';
import ArticleGallery from '@/components/elements/ArticleGallery';

const PAGE_ID = 7;
const TABLE = 'evidencias_';

function buildImageUrl(img: any): string | null {
    if (!img?.location || !img?.filename) return null;
    const base = process.env.NEXT_PUBLIC_IMAGES;
    const key = process.env.NEXT_PUBLIC_FILESERVER_KEY;
    const q = key ? ('?key=' + key) : '';
    return base + '/' + img.location + '/' + img.filename + q;
}

export default async function NovedadDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) notFound();

    const [post, menuItems, pageVw] = await Promise.all([
        PageServices.getPostById(numId, TABLE),
        PageServices.getNavMenu(PAGE_ID),
        PageServices.getPageVw(String(PAGE_ID)),
    ]);

    console.log(post);
    if (!post) notFound();

    const logo = pageVw?.images?.find((img: any) => img.image_type === 'logo');

    // Destructure the response model from the API
    const { textos, seteos, images = [], archivos = [], videos = [], infoParlamentaria } = post;
    const title = textos?.title || 'Publicación';
    const description = textos?.description || '';
    const shortdesc = textos?.shortdesc || '';
    const subtitle = textos?.subtitle || '';
    const extradesc = textos?.extradesc || '';
    const proyectos: any[] = infoParlamentaria?.proyectos || [];

    // Todas las imágenes válidas del posteo ordenadas (principal primero si existe)
    const mainImage = images.find((img: any) => img.image_type === 'main');
    const otherImages = images.filter((img: any) => img !== mainImage);
    const sortedImages = mainImage ? [mainImage, ...otherImages] : images;
    const allImageUrls = sortedImages.map(buildImageUrl).filter(Boolean) as string[];

    // Helper para convertir URLs de YouTube a formato embed
    const getEmbedVideoUrl = (videoUrl: string): string => {
        if (!videoUrl) return '';
        if (videoUrl.includes('youtube.com/embed/')) return videoUrl;
        const match = videoUrl.match(/^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
        if (match && match[1]?.length === 11) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }
        return videoUrl;
    };

    return (
        <Layout menuItems={menuItems} pageVw={pageVw} logo={logo} breadcrumbTitle={title}>
            {/* Hero */}
            <section className='data-analysis-section-header position-relative overflow-hidden pt-160 pb-60'>
                <div className='container position-relative z-1'>
                    <div className='row'>
                        <div className='col-lg-8'>
                            <nav aria-label='breadcrumb' className='mb-3'>
                                <ol className='breadcrumb' style={{ fontSize: '0.85rem' }}>
                                    <li className='breadcrumb-item'>
                                        <a href='/' className='text-decoration-none text-secondary'>Inicio</a>
                                    </li>
                                    <li className='breadcrumb-item'>
                                        <Link href='/comunicacion/informacion-y-comunicacion' className='text-decoration-none text-secondary'>Novedades</Link>
                                    </li>
                                    <li className='breadcrumb-item active text-primary' aria-current='page'>{title}</li>
                                </ol>
                            </nav>

                            {seteos?.dt_ins && (
                                <span className='badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3 d-inline-flex align-items-center gap-2'>
                                    <i className='bi bi-calendar3'></i>
                                    {new Date(seteos.dt_ins).toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                </span>
                            )}

                            <h1 className='mb-0' style={{ fontWeight: 700, fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', lineHeight: 1.2 }}>{title}</h1>
                            {subtitle && <p className='text-muted mt-3 mb-0 fs-5'>{subtitle}</p>}
                        </div>
                    </div>
                </div>
                <span style={{ position: 'absolute', top: '-60px', right: '-60px', width: '320px', height: '320px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(121,74,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <span style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(121,74,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
            </section>

            {/* Main content */}
            <article className='pt-60 pb-120'>
                <div className='container'>
                    <div className='row g-5'>
                        {/* Content column */}
                        <div className='col-lg-8'>
                            {/* Carrusel / Galería interactiva con Lightbox */}
                            {allImageUrls.length > 0 && (
                                <ArticleGallery
                                    images={allImageUrls}
                                    title={title}
                                />
                            )}

                            {/* Short description highlight */}
                            {shortdesc && (
                                <div
                                    className='fw-semibold mb-4 fs-5'
                                    style={{ borderLeft: '4px solid var(--tc-primary-color, #0d6efd)', paddingLeft: '1.25rem', lineHeight: 1.7 }}
                                    dangerouslySetInnerHTML={{ __html: shortdesc }}
                                />
                            )}

                            {/* Main description */}
                            {description && (
                                <div
                                    className='post-body'
                                    dangerouslySetInnerHTML={{ __html: description }}
                                    style={{ lineHeight: 1.85, fontSize: '1.05rem' }}
                                />
                            )}

                            {/* Extra description */}
                            {extradesc && (
                                <div
                                    className='post-body mt-5 pt-4 border-top'
                                    dangerouslySetInnerHTML={{ __html: extradesc }}
                                    style={{ lineHeight: 1.85, fontSize: '1.05rem' }}
                                />
                            )}

                            {/* Videos */}
                            {videos.length > 0 && (
                                <div className='mt-5'>
                                    <h6 className='fw-semibold mb-3 d-flex align-items-center gap-2'>
                                        <i className='bi bi-play-btn text-danger'></i> Videos
                                    </h6>
                                    <div className='row g-4'>
                                        {videos.map((v: any, i: number) => {
                                            const embedUrl = getEmbedVideoUrl(v.url);
                                            return (
                                                <div key={v.id || i} className='col-12'>
                                                    {embedUrl ? (
                                                        <div className='ratio ratio-16x9 rounded-4 overflow-hidden shadow-sm'>
                                                            <iframe
                                                                src={embedUrl}
                                                                title={v.title || `Video ${i + 1}`}
                                                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                                                allowFullScreen
                                                            />
                                                        </div>
                                                    ) : null}
                                                    {v.title && (
                                                        <h6 className='mt-2 fw-semibold text-dark'>{v.title}</h6>
                                                    )}
                                                    {v.description && (
                                                        <p className='text-muted small mt-1'>{v.description}</p>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Expedientes Relacionados */}
                            {proyectos.length > 0 && (
                                <div className='mt-5 p-4 rounded-4' style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                    <h6 className='fw-semibold mb-3 d-flex align-items-center gap-2 text-primary'>
                                        <i className='bi bi-bank fs-5'></i> Expedientes Relacionados
                                    </h6>
                                    <div className='d-flex flex-column gap-3'>
                                        {proyectos.map((proyecto: any, i: number) => {
                                            const det = proyecto.detalleExpediente || proyecto;
                                            const expNro = det?.nro_de_expediente || proyecto.expediente_id || `Expediente ${i + 1}`;
                                            const sumario = det?.sumario || '';
                                            const autor = det?.autor_des || '';
                                            const tipo = det?.proyecto_tipo_des || '';

                                            return (
                                                <div
                                                    key={proyecto.id || i}
                                                    className='p-3 bg-white rounded-3 shadow-sm border border-light'
                                                    style={{ borderLeft: '4px solid var(--tc-theme-primary, #0d6efd) !important' }}
                                                >
                                                    <div className='d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2'>
                                                        <span className='fw-bold text-dark fs-6'>
                                                            Expediente: {expNro}
                                                        </span>
                                                        {tipo && (
                                                            <span className='badge bg-light text-secondary border px-3 py-1 rounded-pill' style={{ fontSize: '0.75rem' }}>
                                                                {tipo}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {sumario && (
                                                        <p className='mb-2 text-secondary' style={{ fontSize: '0.92rem', lineHeight: 1.6 }}>
                                                            <strong className='text-dark'>Sumario: </strong>
                                                            {sumario}
                                                        </p>
                                                    )}

                                                    {autor && (
                                                        <div className='small text-muted'>
                                                            <strong className='text-secondary'>Autor/es: </strong>
                                                            {autor}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Archivos */}
                            {archivos.length > 0 && (
                                <div className='mt-5 p-4 rounded-4' style={{ backgroundColor: '#f8f9fa' }}>
                                    <h6 className='fw-semibold mb-3 d-flex align-items-center gap-2'>
                                        <i className='bi bi-paperclip text-primary'></i> Documentos adjuntos
                                    </h6>
                                    <ul className='list-group list-group-flush'>
                                        {archivos.map((f: any, i: number) => {
                                            const fileUrl = buildImageUrl(f);
                                            const isWord = f.mimetype === 'application/msword' || f.mimetype?.includes('word');
                                            return (
                                                <li key={f.id ?? i} className='list-group-item bg-transparent d-flex flex-wrap align-items-center gap-3 px-0 py-3'>
                                                    <i className={`bi bi-file-earmark-${isWord ? 'word text-primary' : 'pdf text-danger'} fs-4`} />
                                                    <div className='flex-grow-1'>
                                                        <span className='fw-medium'>{f.title || f.filename || `Archivo ${i + 1}`}</span>
                                                        {f.size && <small className='text-muted d-block'>{(parseInt(f.size) / 1024).toFixed(0)} KB</small>}
                                                    </div>
                                                    {fileUrl && (
                                                        <a href={fileUrl} target='_blank' rel='noreferrer' className='btn btn-sm btn-outline-primary rounded-pill px-3 w-100 w-sm-auto'>
                                                            <i className='bi bi-download me-1'></i> Descargar
                                                        </a>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className='col-lg-4'>
                            <div className='p-4 rounded-4 sticky-top' style={{ backgroundColor: '#f9f9f9', top: '100px', zIndex: 10 }}>
                                <h6 className='fw-semibold mb-3 text-primary'>Compartir</h6>
                                <div className='d-flex gap-2 flex-wrap mb-4'>
                                    <a
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                        target='_blank' rel='noreferrer'
                                        className='btn btn-sm btn-outline-secondary rounded-pill px-3 d-inline-flex align-items-center gap-2'
                                    >
                                        <i className='bi bi-facebook'></i> Facebook
                                    </a>
                                    <a
                                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(title)}`}
                                        target='_blank' rel='noreferrer'
                                        className='btn btn-sm btn-outline-secondary rounded-pill px-3 d-inline-flex align-items-center gap-2'
                                    >
                                        <i className='bi bi-twitter-x'></i> X
                                    </a>
                                    <a
                                        href={`https://wa.me/?text=${encodeURIComponent(title + ' - ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                                        target='_blank' rel='noreferrer'
                                        className='btn btn-sm btn-outline-success rounded-pill px-3 d-inline-flex align-items-center gap-2'
                                    >
                                        <i className='bi bi-whatsapp'></i> WhatsApp
                                    </a>
                                </div>
                                <hr />
                                <Link href='/comunicacion/informacion-y-comunicacion' className='btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center gap-2' style={{ borderRadius: '30px' }}>
                                    <i className='bi bi-arrow-left'></i> Volver a Novedades
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Layout>
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const numId = parseInt(id, 10);
    if (isNaN(numId)) return {};

    const post = await PageServices.getPostById(numId, TABLE);
    if (!post) return {};

    const title = post.textos?.title || 'Publicación';
    const description = (post.textos?.shortdesc || post.textos?.description || '').replace(/<[^>]*>/g, '').slice(0, 160);
    const mainImage = post.images?.find((img: any) => img.image_type === 'main') || post.images?.[0];
    const imageUrl = buildImageUrl(mainImage);

    return {
        title: title + ' | OIP - Oficina de Integridad Pública',
        description,
        openGraph: {
            title,
            description,
            ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
        },
    };
}
