"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
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
            slidesPerView: 1,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        1199: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        1350: {
            slidesPerView: 1,
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

export default function Section6() {
    return (
        <>
            {/*data-analysis-home section 6*/}
            <section className="data-analysis-home-section-6 position-relative overflow-hidden pt-120">
                <div className="custom-container bg-primary rounded-5 position-relative">
                    <div className="position-absolute top-0 start-50 translate-middle-x w-100 z-0">
                        <img className="w-100" src="assets/imgs/pages/data-analysis/page-home/home-section-6/dot-map.png" alt="AstraX" />
                    </div>
                    <div className="container py-120 position-relative z-1">
                        <div className="row">
                            <div className="text-center pb-7">
                                <span className="btn-text text-white">testimonials</span>
                                <h2 className="text-white text-anime-style-2">Happy users feedback</h2>
                            </div>
                        </div>
                        <div className="row">
                            {/* Swiper */}
                            <Swiper {...swiperOptions} className="swiper slider-1">
                                <div className="swiper-wrapper z-1">
                                    <SwiperSlide>
                                        <div className="col-md-10 col-12 mx-auto card-testimonial bg-white p-5 pb-0 rounded-4" data-aos="fade-up">
                                            <div className="row align-items-center">
                                                <div className="col-lg-6">
                                                    <div className="position-relative text-center">
                                                        <img src="assets/imgs/pages/data-analysis/page-home/home-section-6/author-1.png" alt="AstraX" />
                                                        <div className="ellipse-1 position-absolute top-50 start-50 translate-middle" />
                                                        <div className="ellipse-2 position-absolute top-50 start-50 translate-middle" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 ps-md-7 mt-lg-0 mt-5 pb-lg-0 pb-5">
                                                    <div className="d-flex gap-2">
                                                        <i className="bi bi-star-fill text-primary fs-7" />
                                                        <i className="bi bi-star-fill text-primary fs-7" />
                                                        <i className="bi bi-star-fill text-primary fs-7" />
                                                        <i className="bi bi-star-fill text-primary fs-7" />
                                                        <i className="bi bi-star-fill text-primary fs-7" />
                                                    </div>
                                                    <h5 className="mt-3 pb-7 border-bottom">" Unrivaled brilliance surpassing all others. Highly recommended for novices and experts alike. We will hire them for sure. "</h5>
                                                    <div className="text-start mt-3">
                                                        <Link href="#">
                                                            <span className="btn-text">Alonso J. Carter</span>
                                                        </Link>
                                                        <p className="fs-7">Head Of Idea, Treve LLC</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="col-md-10 col-12 mx-auto card-testimonial bg-white p-5 pb-0 rounded-4" data-aos="fade-up">
                                            <div className="row align-items-center">
                                                <div className="col-lg-6">
                                                    <div className="position-relative text-center">
                                                        <img src="assets/imgs/pages/data-analysis/page-home/home-section-6/author-1.png" alt="AstraX" />
                                                        <div className="ellipse-1 position-absolute top-50 start-50 translate-middle" />
                                                        <div className="ellipse-2 position-absolute top-50 start-50 translate-middle" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 ps-md-7 mt-lg-0 mt-5 pb-lg-0 pb-5">
                                                    <div className="d-flex gap-2">
                                                        <i className="bi bi-star-fill text-primary fs-7" />
                                                        <i className="bi bi-star-fill text-primary fs-7" />
                                                        <i className="bi bi-star-fill text-primary fs-7" />
                                                        <i className="bi bi-star-fill text-primary fs-7" />
                                                        <i className="bi bi-star-fill text-primary fs-7" />
                                                    </div>
                                                    <h5 className="mt-3 pb-7 border-bottom">" Unrivaled brilliance surpassing all others. Highly recommended for novices and experts alike. We will hire them for sure. "</h5>
                                                    <div className="text-start mt-3">
                                                        <Link href="#">
                                                            <span className="btn-text">Alonso J. Carter</span>
                                                        </Link>
                                                        <p className="fs-7">Head Of Idea, Treve LLC</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </div>
                                <div className="swiper-button-prev mt-0 rounded-4 border-opacity-25 border-white border-2 icon-shape icon-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                        <g clipPath="url(#clip0_349_1382)">
                                            <path d="M4.18271 3.80852L4.99823e-08 7.99998L4.18271 12.1914L5.06751 11.3084L2.3896 8.62497L16 8.62497L16 7.37498L2.3896 7.37498L5.06751 4.69148L4.18271 3.80852Z" fill="white" />
                                        </g>
                                    </svg>
                                </div>
                                <div className="swiper-button-next mt-0 rounded-4 border-opacity-25 border-white border-2 icon-shape icon-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                        <g clipPath="url(#clip0_349_1381)">
                                            <path d="M11.8173 12.1915L16 8.00002L11.8173 3.80859L10.9325 4.69155L13.6104 7.37503L-1.55894e-07 7.37503L-2.10532e-07 8.62502L13.6104 8.62502L10.9325 11.3085L11.8173 12.1915Z" fill="white" />
                                        </g>
                                    </svg>
                                </div>
                            </Swiper>
                            {/* Swiper JS */}
                            <span className="btn-text text-center text-white text-opacity-75 mt-8">
                                next can be you, hire us for your next level journey.
                                <Link href="/contact">
                                    <span className="btn-text text-white">get in touch</span>
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
