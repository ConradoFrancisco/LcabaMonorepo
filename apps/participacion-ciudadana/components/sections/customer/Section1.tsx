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
export default function Section1() {
    return (
        <>
            {/*seo-agency customer section 1*/}
            <section className="seo-agency-customer-section-1 position-relative overflow-hidden py-90">
                <div className="container position-relative z-1">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <img data-aos="zoom-in" src="assets/imgs/pages/seo-agency/page-customer/img-1.png" alt="AstraX" />
                        </div>
                        <div className="col-lg-5 mx-auto">
                            <Swiper {...swiperOptions}>
                                <div className="swiper-wrapper z-1">
                                    <SwiperSlide>
                                        <div className="card-testimonial mb-lg-0 mb-5" data-aos="fade-up">
                                            <div className="d-flex align-items-center mt-5">
                                                <Link href="#">
                                                    <img className="rounded-circle icon-shape icon-60" src="assets/imgs/pages/seo-agency/page-customer/avatar-1.png" alt="AstraX" />
                                                </Link>
                                                <div className="text-start ms-3">
                                                    <Link href="#">
                                                        <span className="fs-24 text-primary fw-semibold ds-xs-6">Sarah Lind</span>
                                                    </Link>
                                                    <p className="mb-0">E-commerce Business Owner</p>
                                                </div>
                                            </div>
                                            <h6 className="mb-0 mt-4">"The team at HouseBox transformed our digital marketing strategy. Within months, our online sales skyrocketed, and we’re now reaching customers we never thought possible. Their expertise and dedication are unmatched!"</h6>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="card-testimonial mb-lg-0 mb-5" data-aos="fade-up">
                                            <div className="d-flex align-items-center mt-5">
                                                <Link href="#">
                                                    <img className="rounded-circle icon-shape icon-60" src="assets/imgs/pages/seo-agency/page-customer/avatar-2.png" alt="AstraX" />
                                                </Link>
                                                <div className="text-start ms-3">
                                                    <Link href="#">
                                                        <span className="fs-24 text-primary fw-semibold ds-xs-6">Sarah Lind</span>
                                                    </Link>
                                                    <p className="mb-0">E-commerce Business Owner</p>
                                                </div>
                                            </div>
                                            <h6 className="mb-0 mt-4">"The team at HouseBox transformed our digital marketing strategy. Within months, our online sales skyrocketed, and we’re now reaching customers we never thought possible. Their expertise and dedication are unmatched!"</h6>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="card-testimonial mb-lg-0 mb-5" data-aos="fade-up">
                                            <div className="d-flex align-items-center mt-5">
                                                <Link href="#">
                                                    <img className="rounded-circle icon-shape icon-60" src="assets/imgs/pages/seo-agency/page-customer/avatar-3.png" alt="AstraX" />
                                                </Link>
                                                <div className="text-start ms-3">
                                                    <Link href="#">
                                                        <span className="fs-24 text-primary fw-semibold ds-xs-6">Sarah Lind</span>
                                                    </Link>
                                                    <p className="mb-0">E-commerce Business Owner</p>
                                                </div>
                                            </div>
                                            <h6 className="mb-0 mt-4">"The team at HouseBox transformed our digital marketing strategy. Within months, our online sales skyrocketed, and we’re now reaching customers we never thought possible. Their expertise and dedication are unmatched!"</h6>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="card-testimonial mb-lg-0 mb-5" data-aos="fade-up">
                                            <div className="d-flex align-items-center mt-5">
                                                <Link href="#">
                                                    <img className="rounded-circle icon-shape icon-60" src="assets/imgs/pages/seo-agency/page-customer/avatar-2.png" alt="AstraX" />
                                                </Link>
                                                <div className="text-start ms-3">
                                                    <Link href="#">
                                                        <span className="fs-24 text-primary fw-semibold ds-xs-6">Sarah Lind</span>
                                                    </Link>
                                                    <p className="mb-0">E-commerce Business Owner</p>
                                                </div>
                                            </div>
                                            <h6 className="mb-0 mt-4">"The team at HouseBox transformed our digital marketing strategy. Within months, our online sales skyrocketed, and we’re now reaching customers we never thought possible. Their expertise and dedication are unmatched!"</h6>
                                        </div>
                                    </SwiperSlide>
                                </div>
                            </Swiper>
                            <div className="col-lg-4 col-md-4 col-6 me-lg-auto text-center mt-5">
                                <div className="position-relative mx-auto">
                                    <div className="d-inline-flex border h-100 d-flex align-items-center gap-1 rounded-pill mx-auto bg-white position-relative z-1">
                                        <div className="swiper-button-prev mt-0 position-relative border-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                                <g clipPath="url(#clip0_349_1382)">
                                                    <path d="M4.18271 3.80852L4.99823e-08 7.99998L4.18271 12.1914L5.06751 11.3084L2.3896 8.62497L16 8.62497L16 7.37498L2.3896 7.37498L5.06751 4.69148L4.18271 3.80852Z" fill="#292929" />
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="swiper-pagination position-relative top-0 bottom-0 mb-1" />
                                        <div className="swiper-button-next mt-0 position-relative border-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                                <g clipPath="url(#clip0_349_1381)">
                                                    <path d="M11.8173 12.1915L16 8.00002L11.8173 3.80859L10.9325 4.69155L13.6104 7.37503L-1.55894e-07 7.37503L-2.10532e-07 8.62502L13.6104 8.62502L10.9325 11.3085L11.8173 12.1915Z" fill="#292929" />
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="border-top position-absolute top-50 start-50 translate-middle w-100 z-0" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
