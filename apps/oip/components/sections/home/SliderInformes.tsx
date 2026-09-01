"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";

const IMAGES_BASE = process.env.NEXT_PUBLIC_IMAGES;
const FILESERVER_KEY = process.env.NEXT_PUBLIC_FILESERVER_KEY;

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    },
    loop: true,
    navigation: {
        nextEl: ".slider-informes-next",
        prevEl: ".slider-informes-prev",
    },
    pagination: {
        el: ".slider-informes-pagination",
        clickable: true,
    },
};

function buildImageUrl(images: any[]): string | null {
    if (!images || images.length === 0) return null;
    const img = images[0];
    if (!img || !img.location || !img.filename) return null;
    return `${IMAGES_BASE}/${img.location}/${img.filename}${FILESERVER_KEY ? `?key=${FILESERVER_KEY}` : ""}`;
}

export default function SliderInformes({ posts = [] }: { posts: any[] }) {
    if (!posts || posts.length === 0) return null;

    return (
        <section
            className="slider-informes-section position-relative overflow-hidden w-100"
            style={{ minHeight: "480px", height: "55vh", marginTop: "125px" }}
        >
            <Swiper {...swiperOptions} className="swiper slider-informes w-100 h-100">
                {posts.map((post: any, idx: number) => {
                    const imgUrl = buildImageUrl(post.images || []);
                    const title = post.titulo || post.title || post.textos?.title || post.textos?.titulo || "";
                    const subtitle = post.subtitle || post.textos?.subtitle || post.tipo || "INFORMACIÓN DESTACADA";
                    const shortdesc = post.shortdesc || post.copete || post.textos?.shortdesc || post.textos?.subtitle || "";
                    const linkUrl = post.url ? (post.url.startsWith("http") || post.url.startsWith("/") ? post.url : `/${post.url}`) : `/informes/${post.id || ""}`;

                    return (
                        <SwiperSlide key={post.id || idx} className="h-100">
                            <div className="position-relative d-flex align-items-center h-100 w-100">
                                {/* Background Image */}
                                {imgUrl ? (
                                    <div
                                        className="position-absolute top-0 start-0 w-100 h-100"
                                        style={{
                                            backgroundImage: `url(${imgUrl})`,
                                            backgroundSize: 'contain',
                                            backgroundPosition: "center",
                                            backgroundRepeat: 'no-repeat',
                                            zIndex: 0,
                                        }}
                                    />
                                ) : (
                                    <div
                                        className="position-absolute top-0 start-0 w-100 h-100"
                                        style={{
                                            background: "linear-gradient(135deg, #0390A0 0%, #014d56 100%)",
                                            zIndex: 0,
                                        }}
                                    />
                                )}

                                {/* Overlay gradient oscuro para contraste de textos */}
                                <div
                                    className="position-absolute top-0 start-0 w-100 h-100"
                                    style={{
                                        background: "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.60) 45%, rgba(0,0,0,0.15) 100%)",
                                        zIndex: 1,
                                    }}
                                />

                                {/* Slide Content */}
                                <div className="container position-relative" style={{ zIndex: 2, paddingTop: "20px", paddingBottom: "20px" }}>
                                    <div className="row align-items-center">
                                        <div className="col-lg-8 col-md-10">
                                            {title && (
                                                <h1
                                                    className="text-white text-uppercase mb-2 fw-bold"
                                                    style={{
                                                        fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                                                        lineHeight: 1.15,
                                                        letterSpacing: "0.5px",
                                                        textShadow: "0 2px 10px rgba(0,0,0,0.7)"
                                                    }}
                                                >
                                                    {title}
                                                </h1>
                                            )}

                                            {subtitle && (
                                                <span
                                                    className="text-white text-uppercase fw-semibold d-block mb-3"
                                                    style={{
                                                        fontSize: "0.95rem",
                                                        letterSpacing: "1.5px",
                                                        opacity: 0.9,
                                                        textShadow: "0 1px 4px rgba(0,0,0,0.7)"
                                                    }}
                                                >
                                                    {subtitle}
                                                </span>
                                            )}

                                            {shortdesc && (
                                                <p
                                                    className="text-white mb-4"
                                                    style={{
                                                        fontSize: "1.05rem",
                                                        lineHeight: 1.4,
                                                        maxWidth: "600px",
                                                        opacity: 0.95,
                                                        textShadow: "0 1px 4px rgba(0,0,0,0.7)"
                                                    }}
                                                >
                                                    {shortdesc}
                                                </p>
                                            )}

                                            <div className="pt-2">
                                                <Link
                                                    href={linkUrl}
                                                    className="btn text-white fw-bold hover-up"
                                                    style={{
                                                        backgroundColor: "#0390A0",
                                                        border: "none",
                                                        padding: "10px 28px",
                                                        borderRadius: "4px",
                                                        fontSize: "0.85rem",
                                                        letterSpacing: "0.8px"
                                                    }}
                                                >
                                                    CONOCÉ MÁS
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}

                {/* Nav buttons (Arrows) */}
                <div
                    className="slider-informes-prev position-absolute top-50 start-0 translate-middle-y ms-md-4 ms-2 rounded-circle border border-white border-opacity-75 d-flex align-items-center justify-content-center z-3"
                    style={{
                        cursor: "pointer",
                        width: "50px",
                        height: "50px",
                        backgroundColor: "rgba(0,0,0,0.3)",
                        backdropFilter: "blur(2px)"
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </div>

                <div
                    className="slider-informes-next position-absolute top-50 end-0 translate-middle-y me-md-4 me-2 rounded-circle border border-white border-opacity-75 d-flex align-items-center justify-content-center z-3"
                    style={{
                        cursor: "pointer",
                        width: "50px",
                        height: "50px",
                        backgroundColor: "rgba(0,0,0,0.3)",
                        backdropFilter: "blur(2px)"
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </div>

                {/* Pagination dots */}
                <div className="slider-informes-pagination position-absolute bottom-0 start-50 translate-middle-x pb-3 z-3" />
            </Swiper>
        </section>
    );
}
