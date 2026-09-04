import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { PageServices } from '@lcaba/services';
import { notFound } from 'next/navigation';

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

    if (!post) notFound();

    const logo = pageVw?.images?.find((img: any) => img.image_type === 'logo');

    // Destructure the response model from the API
    const { textos, seteos, images = [], archivos = [], videos = [] } = post;
    const title = textos?.title || 'Publicación';
    const description = textos?.description || '';
    const shortdesc = textos?.shortdesc || '';
    const subtitle = textos?.subtitle || '';
    const extradesc = textos?.extradesc || '';

    const mainImage = images.find((img: any) => img.image_type === 'main') || images[0];
    const mainImageUrl = buildImageUrl(mainImage);
    const galleryImages = images.filter((img: any) => img !== mainImage);

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
                <span style={{ position:'absolute', top:'-60px', right:'-60px', width:'320px', height:'320px', borderRadius:'50%', background:'radial-gradient(circle, rgba(121,74,255,0.12) 0%, transparent 70%)', pointerEvents:'none' }} />
                <span style={{ position:'absolute', bottom:'-40px', left:'-40px', width:'200px', height:'200px', borderRadius:'50%', background:'radial-gradient(circle, rgba(121,74,255,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />
            </section>

            {/* Main content */}
            <article className='pt-60 pb-120'>
                <div className='container'>
                    <div className='row g-5'>
                        {/* Content column */}
                        <div className='col-lg-8'>
                            {/* Main image */}
                            {mainImageUrl && (
                                <div className='mb-5 rounded-4 overflow-hidden' style={{ maxHeight: '480px' }}>
                                    <img
                                        src={mainImageUrl}
                                        alt={title}
                                        className='w-100'
                                        style={{ objectFit: 'cover', width: '100%', height: '480px' }}
                                    />
                                </div>
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

                            {/* Gallery */}
                            {galleryImages.length > 0 && (
                                <div className='mt-5'>
                                    <h6 className='fw-semibold mb-3'>Galería</h6>
                                    <div className='row g-3'>
                                        {galleryImages.map((img: any, i: number) => {
                                            const url = buildImageUrl(img);
                                            if (!url) return null;
                                            return (
                                                <div key={i} className='col-6 col-md-4'>
                                                    <a href={url} target='_blank' rel='noreferrer'>
                                                        <img src={url} alt={`Imagen ${i + 2}`} className='img-fluid rounded-3 w-100' style={{ height: '160px', objectFit: 'cover' }} />
                                                    </a>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Videos */}
                            {videos.length > 0 && (
                                <div className='mt-5'>
                                    <h6 className='fw-semibold mb-3'>Videos</h6>
                                    <div className='row g-3'>
                                        {videos.map((v: any, i: number) => (
                                            <div key={i} className='col-12'>
                                                {v.url && (
                                                    <div className='ratio ratio-16x9 rounded-4 overflow-hidden'>
                                                        <iframe src={v.url} title={v.title || `Video ${i + 1}`} allowFullScreen></iframe>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
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
                                                <li key={f.id ?? i} className='list-group-item bg-transparent d-flex align-items-center gap-3 px-0 py-3'>
                                                    <i className={`bi bi-file-earmark-${isWord ? 'word text-primary' : 'pdf text-danger'} fs-4`} />
                                                    <div className='flex-grow-1'>
                                                        <span className='fw-medium'>{f.title || f.filename || `Archivo ${i + 1}`}</span>
                                                        {f.size && <small className='text-muted d-block'>{(parseInt(f.size) / 1024).toFixed(0)} KB</small>}
                                                    </div>
                                                    {fileUrl && (
                                                        <a href={fileUrl} target='_blank' rel='noreferrer' className='btn btn-sm btn-outline-primary rounded-pill px-3'>
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
                            <div className='p-4 rounded-4 sticky-top' style={{ backgroundColor: '#f9f9f9', top: '100px' }}>
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
