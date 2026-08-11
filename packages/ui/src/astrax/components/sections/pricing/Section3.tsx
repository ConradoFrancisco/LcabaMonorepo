"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 2,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        575: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        767: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1199: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1350: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
};
export default function Section3() {
    return (
        <>
            {/*business-pricing section 3*/}
            <section className="business-pricing-section-3 position-relative overflow-hidden py-120 bg-primary">
                <div className="container position-relative z-1">
                    <div className="row">
                        <div className="col-lg-5">
                            <span className="d-flex align-items-center gap-2 mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={2} viewBox="0 0 18 2" fill="none">
                                    <circle opacity="0.2" cx={1} cy={1} r={1} fill="white" />
                                    <circle opacity="0.5" cx={9} cy={1} r={1} fill="white" />
                                    <circle cx={17} cy={1} r={1} fill="white" />
                                </svg>
                                <span className="text-white btn-text">Expert Team</span>
                            </span>
                            <h2 className="text-white mb-3 text-anime-style-2">
                                Let’s Talk With <br />
                                Our Consultants
                            </h2>
                            <p className="text-white mb-5 text-anime-style-3">
                                We specialize in transforming businesses and driving <br />
                                growth with strategic insights and unmatched expertise.
                            </p>
                            <Link href="/team" className="btn btn-dark button--calypso">
                                <span>Meet our team</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                    <g clipPath="url(#clip0_1396_1198)">
                                        <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="white" />
                                    </g>
                                </svg>
                            </Link>
                        </div>
                        <div className="col-lg-7 position-relative mt-lg-0 mt-8 wow img-custom-anim-left">
                            <div className="px-8">
                                <Swiper {...swiperOptions} className="swiper slider-2">
                                    <div className="swiper-wrapper">
                                        <SwiperSlide>
                                            <div className="position-relative d-inline-block">
                                                <Link href="#">
                                                    <img className="rounded-4" src="assets/imgs/pages/business/page-about/author-1.png" alt="AstraX" />
                                                </Link>
                                                <div className="card-body px-0 mb-2 pt-4">
                                                    <div className="card-title">
                                                        <Link href="#">
                                                            <h5 className="btn-text text-white">Ava Wilson</h5>
                                                        </Link>
                                                    </div>
                                                    <p className="text-white">Sales Manager</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="position-relative d-inline-block">
                                                <Link href="#">
                                                    <img className="rounded-4" src="assets/imgs/pages/business/page-about/author-2.png" alt="AstraX" />
                                                </Link>
                                                <div className="card-body px-0 mb-2 pt-4">
                                                    <div className="card-title">
                                                        <Link href="#">
                                                            <h5 className="btn-text text-white">Michael Anderson</h5>
                                                        </Link>
                                                    </div>
                                                    <p className="text-white">Chief Financial Officer (CFO)</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="position-relative d-inline-block">
                                                <Link href="#">
                                                    <img className="rounded-4" src="assets/imgs/pages/business/page-about/author-3.png" alt="AstraX" />
                                                </Link>
                                                <div className="card-body px-0 mb-2 pt-4">
                                                    <div className="card-title">
                                                        <Link href="#">
                                                            <h5 className="btn-text text-white">Sophia Martinez</h5>
                                                        </Link>
                                                    </div>
                                                    <p className="text-white">Chief Operating Officer (COO)</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    </div>
                                </Swiper>
                                <div className="swiper-button-prev">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                        <g clipPath="url(#clip0_349_1382)">
                                            <path d="M4.18271 3.80852L4.99823e-08 7.99998L4.18271 12.1914L5.06751 11.3084L2.3896 8.62497L16 8.62497L16 7.37498L2.3896 7.37498L5.06751 4.69148L4.18271 3.80852Z" fill="#292929" />
                                        </g>
                                    </svg>
                                </div>
                                <div className="swiper-button-next">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                        <g clipPath="url(#clip0_349_1381)">
                                            <path d="M11.8173 12.1915L16 8.00002L11.8173 3.80859L10.9325 4.69155L13.6104 7.37503L-1.55894e-07 7.37503L-2.10532e-07 8.62502L13.6104 8.62502L10.9325 11.3085L11.8173 12.1915Z" fill="#292929" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
