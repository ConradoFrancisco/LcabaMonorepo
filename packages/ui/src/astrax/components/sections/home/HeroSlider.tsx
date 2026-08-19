"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";

const swiperOptions = {
    modules: [Autoplay, Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    loop: true,
    navigation: {
        nextEl: ".hero-swiper-next",
        prevEl: ".hero-swiper-prev",
    },
    pagination: {
        el: ".hero-swiper-pagination",
        clickable: true,
    },
};

function buildImageUrl(images: any[]): string | null {
    if (!images || images.length === 0) return null;
    // Prefer 'render' type, fallback to first image
    const img =
        images.find((i: any) => String(i.image_type || "").toLowerCase() === "render") ||
        images[0];
    if (!img || !img.location || !img.filename) return null;
    const base = process.env.NEXT_PUBLIC_IMAGES;
    const key = process.env.NEXT_PUBLIC_FILESERVER_KEY;
    return `${base}/${img.location}/${img.filename}${key ? `?key=${key}` : ""}`;
}

export default function HeroSlider({ posts = [] }: { posts: any[] }) {
    if (!posts || posts.length === 0) return null;

    return (
        <section
            className="hero-slider-section position-relative overflow-hidden"
            style={{ marginTop: "100px" }}
        >
            <div className="position-relative">
                <Swiper {...swiperOptions} className="swiper hero-swiper">
                    {posts.map((post: any) => {
                        const imgUrl = buildImageUrl(post.images || []);
                        const title = post.title || post.titulo || "";
                        const shortdesc = post.shortdesc || post.copete || "";
                        const url = post.url ? (post.url.startsWith("/") ? post.url : `/${post.url}`) : "#";

                        return (
                            <SwiperSlide key={post.id}>
                                <div
                                    className="hero-slide position-relative d-flex align-items-center"
                                    style={{ minHeight: "60vh" }}
                                >
                                    {/* Background image */}
                                    {imgUrl && (
                                        <div
                                            className="position-absolute top-0 start-0 w-100 h-100"
                                            style={{
                                                backgroundImage: `url(${imgUrl})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                                zIndex: 0,
                                            }}
                                        />
                                    )}
                                    {/* Dark overlay */}
                                    <div
                                        className="position-absolute top-0 start-0 w-100 h-100"
                                        style={{
                                            background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.1) 100%)",
                                            zIndex: 1,
                                        }}
                                    />
                                    {/* Content */}
                                    <div className="container position-relative" style={{ zIndex: 2 }}>
                                        <div className="row">
                                            <div className="col-lg-7 col-md-9">
                                                <div className="py-5">
                                                    <span
                                                        className="badge text-white mb-3 px-3 py-2"
                                                        style={{ backgroundColor: "var(--tc-primary-color, #6c3db5)", fontSize: "0.75rem", letterSpacing: "0.08em" }}
                                                    >
                                                        NOVEDADES
                                                    </span>
                                                    <h1
                                                        className="text-white fw-bold mb-3"
                                                        style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: 1.2, textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
                                                    >
                                                        {title}
                                                    </h1>
                                                    {shortdesc && (
                                                        <p
                                                            className="text-white mb-4"
                                                            style={{ fontSize: "1.05rem", opacity: 0.9, maxWidth: "540px", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
                                                        >
                                                            {shortdesc}
                                                        </p>
                                                    )}
                                                    <Link
                                                        href={url}
                                                        className="btn btn-primary px-4 py-2"
                                                        style={{ borderRadius: "30px", fontWeight: 600 }}
                                                    >
                                                        Ver más
                                                        <svg className="ms-2" xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                                            <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="white" />
                                                        </svg>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>

                {/* Navigation buttons */}
                <div
                    className="hero-swiper-prev position-absolute top-50 start-0 translate-middle-y d-flex align-items-center justify-content-center"
                    style={{ zIndex: 10, left: "1rem", cursor: "pointer", width: "44px", height: "44px", background: "rgba(255,255,255,0.2)", borderRadius: "50%", backdropFilter: "blur(4px)" }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </div>
                <div
                    className="hero-swiper-next position-absolute top-50 end-0 translate-middle-y d-flex align-items-center justify-content-center"
                    style={{ zIndex: 10, right: "1rem", cursor: "pointer", width: "44px", height: "44px", background: "rgba(255,255,255,0.2)", borderRadius: "50%", backdropFilter: "blur(4px)" }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </div>

                {/* Pagination dots */}
                <div
                    className="hero-swiper-pagination position-absolute bottom-0 start-50 translate-middle-x pb-4"
                    style={{ zIndex: 10 }}
                />
            </div>
        </section>
    );
}
