"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper/modules";
import SwiperCore from "swiper";
import Link from "next/link";

export default function Section5() {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
    return (
        <>
            {/*coworking-space-about section 5*/}
            <section className="coworking-space-about-section-5 position-relative overflow-hidden py-120">
                <div className="container swipper-root">
                    <div className="text-center mb-80">
                        <h2 className="stroke text-white text-center pb-2 mb-0 text-anime-style-2">Workspaces That Inspire</h2>
                        <h2 className="mb-0 text-anime-style-2">Results That Prove It</h2>
                    </div>
                </div>
                <div className="container position-relative">
                    <div className="row">
                        <div className="col-lg-10 mx-lg-auto">
                            <div className="row align-items-center">
                                <div className="col-lg-1 d-none d-lg-block">
                                    <div className="position-relative d-flex flex-column gap-5">
                                        <div className="swiper-button-prev position-relative z-0 top-0 start-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={41} height={41} viewBox="0 0 41 41" fill="none">
                                                <g clipPath="url(#clip0_1795_34697)">
                                                    <path d="M11.4452 26.7462C10.7768 27.396 9.69311 27.396 9.02472 26.7462C8.35634 26.0964 8.35634 25.0428 9.02472 24.393L19.2937 14.4092C19.9417 13.7793 20.985 13.7573 21.6605 14.3592L31.9295 23.511C32.6263 24.132 32.6733 25.1846 32.0346 25.862C31.3959 26.5394 30.3132 26.5852 29.6165 25.9642L20.5554 17.889L11.4452 26.7462Z" fill="#1AAA59" />
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="swiper-button-next position-relative z-0 top-0 start-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={41} height={41} viewBox="0 0 41 41" fill="none">
                                                <g clipPath="url(#clip0_1795_34703)">
                                                    <path d="M29.5588 14.2538C30.2271 13.604 31.3108 13.604 31.9792 14.2538C32.6476 14.9036 32.6476 15.9572 31.9792 16.607L21.7102 26.5908C21.0622 27.2207 20.0189 27.2427 19.3434 26.6408L9.07444 17.489C8.37765 16.868 8.33058 15.8154 8.9693 15.138C9.60802 14.4606 10.6907 14.4148 11.3874 15.0358L20.4485 23.111L29.5588 14.2538Z" fill="#1AAA59" />
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 pe-lg-5">
                                    <Swiper modules={[Autoplay, Pagination, Navigation, Thumbs]} onSwiper={setThumbsSwiper} direction="vertical" spaceBetween={10} slidesPerView={3} freeMode={true} watchSlidesProgress={true} style={{ height: "350px" }} className="gallery-thumbs">
                                        <div className="swiper-wrapper d-flex flex-column">
                                            <SwiperSlide className="swiper-slide w-100">
                                                <div className="about-thumbs d-flex align-items-center gap-3 bg-secondary-2 p-3 mb-3" data-aos="fade-up" data-aos-delay={0}>
                                                    <div className="icon-shape icon-80 rounded-circle overflow-hidden">
                                                        <img src="assets/imgs/pages/coworking-space/page-about/avatar-1.png" alt="AstraX" />
                                                    </div>
                                                    <div>
                                                        <h6 className="fs-20 fw-semibold">Alex Robertson</h6>
                                                        <p className="mb-0">Photographer</p>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="swiper-slide w-100">
                                                <div className="about-thumbs d-flex align-items-center gap-3 bg-secondary-2 p-3 mb-3" data-aos="fade-up" data-aos-delay={200}>
                                                    <div className="icon-shape icon-80 rounded-circle overflow-hidden">
                                                        <img src="assets/imgs/pages/coworking-space/page-about/avatar-2.png" alt="AstraX" />
                                                    </div>
                                                    <div>
                                                        <h6 className="fs-20 fw-semibold">Sheldon Jackson</h6>
                                                        <p className="mb-0">Shop Store Owner</p>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="swiper-slide w-100">
                                                <div className="about-thumbs d-flex align-items-center gap-3 bg-secondary-2 p-3 mb-3" data-aos="fade-up" data-aos-delay={400}>
                                                    <div className="icon-shape icon-80 rounded-circle overflow-hidden">
                                                        <img src="assets/imgs/pages/coworking-space/page-about/avatar-3.png" alt="AstraX" />
                                                    </div>
                                                    <div>
                                                        <h6 className="fs-20 fw-semibold">Tawhid Uddin</h6>
                                                        <p className="mb-0">Food Blogger</p>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        </div>
                                    </Swiper>
                                </div>
                                <div className="col-lg-7 ms-auto mt-lg-0 mt-8 wow img-custom-anim-left">
                                    <Swiper
                                        modules={[Autoplay, Pagination, Navigation, Thumbs]}
                                        spaceBetween={10}
                                        navigation={{
                                            nextEl: ".swiper-button-next",
                                            prevEl: ".swiper-button-prev",
                                        }}
                                        thumbs={{ swiper: thumbsSwiper }}
                                        className="main-swiper"
                                    >
                                        <div className="swiper-wrapper">
                                            <SwiperSlide className="swiper-slide w-100">
                                                <div className="card__inner p-5 bg-secondary-2">
                                                    <div className="d-flex gap-1 mb-4">
                                                        <i className="fa-solid fa-star fs-20 text-yellow" />
                                                        <i className="fa-solid fa-star fs-20 text-yellow" />
                                                        <i className="fa-solid fa-star fs-20 text-yellow" />
                                                        <i className="fa-solid fa-star fs-20 text-yellow" />
                                                        <i className="fa-solid fa-star fs-20 text-yellow" />
                                                    </div>
                                                    <h5 className="fs-22 fw-regular">“This space has completely transformed how I’m work. The environment is inspiring, and I’ve never been more productive. I love the flexibility an the attention detail that make everything seamless.”</h5>
                                                    <Link href="#" className="about-thumbs d-flex align-items-center gap-3 mt-5">
                                                        <div className="icon-shape icon-80 rounded-circle overflow-hidden">
                                                            <img src="assets/imgs/pages/coworking-space/page-about/avatar-1.png" alt="AstraX" />
                                                        </div>
                                                        <div>
                                                            <h6 className="fw-semibold">Alex Robertson</h6>
                                                            <p className="mb-0">Photographer</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="swiper-slide w-100">
                                                <div className="card__inner p-5 bg-secondary-2">
                                                    <div className="d-flex gap-1 mb-4">
                                                        <i className="fa-solid fa-star fs-20 text-yellow" />
                                                        <i className="fa-solid fa-star fs-20 text-yellow" />
                                                        <i className="fa-solid fa-star fs-20 text-yellow" />
                                                        <i className="fa-solid fa-star fs-20 text-yellow" />
                                                        <i className="fa-solid fa-star fs-20 text-yellow" />
                                                    </div>
                                                    <h5 className="fs-22 fw-regular">“This space has completely transformed how I’m work. The environment is inspiring, and I’ve never been more productive. I love the flexibility an the attention detail that make everything seamless.”</h5>
                                                    <Link href="#" className="about-thumbs d-flex align-items-center gap-3 mt-5">
                                                        <div className="icon-shape icon-80 rounded-circle overflow-hidden">
                                                            <img src="assets/imgs/pages/coworking-space/page-about/avatar-2.png" alt="AstraX" />
                                                        </div>
                                                        <div>
                                                            <h6 className="fw-semibold">Sheldon Jackson</h6>
                                                            <p className="mb-0">Shop Store Owner</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </SwiperSlide>
                                            <SwiperSlide className="swiper-slide w-100">
                                                <div className="card__inner p-5 bg-secondary-2">
                                                    <div className="d-flex gap-1 mb-4">
                                                        <i className="fa-solid fa-star fs-20 text-yellow" />
                                                        <i className="fa-solid fa-star fs-20 text-yellow" />
                                                        <i className="fa-solid fa-star fs-20 text-yellow" />
                                                        <i className="fa-solid fa-star fs-20 text-yellow" />
                                                        <i className="fa-solid fa-star fs-20 text-yellow" />
                                                    </div>
                                                    <h5 className="fs-22 fw-regular">“This space has completely transformed how I’m work. The environment is inspiring, and I’ve never been more productive. I love the flexibility an the attention detail that make everything seamless.”</h5>
                                                    <Link href="#" className="about-thumbs d-flex align-items-center gap-3 mt-5">
                                                        <div className="icon-shape icon-80 rounded-circle overflow-hidden">
                                                            <img src="assets/imgs/pages/coworking-space/page-about/avatar-3.png" alt="AstraX" />
                                                        </div>
                                                        <div>
                                                            <h6 className="fw-semibold">Tawhid Uddin</h6>
                                                            <p className="mb-0">Food Blogger</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </SwiperSlide>
                                        </div>
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
