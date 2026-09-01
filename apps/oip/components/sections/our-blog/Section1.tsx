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
            {/*data-analysis blog section 1*/}
            <section className="data-analysis-blog-section-1 position-relative overflow-hidden">
                <div className="container">
                    <Swiper {...swiperOptions} className="swiper slider-1">
                        <div className="swiper-wrapper">
                            <SwiperSlide>
                                <div className="row py-9">
                                    <div className="col-md-10 mx-auto">
                                        <div className="card-blog-sec1 d-flex align-items-center overflow-hidden" data-aos="fade-up" data-aos-delay={1000}>
                                            <div className="content p-md-7 p-5">
                                                <span className="btn-text text-primary">Machine Learning</span>
                                                <Link href="#">
                                                    <h5 className="mt-2 pb-3">How AI is Shaping the Future of Data Analytics</h5>
                                                </Link>
                                                <p className="pb-5">Artificial intelligence is at the forefront of data analysis, offering unprecedented opportunities for businesses to improve efficiency, automate processes, and unlock hidden insights. Learn how AI is changing the landscape of data analytics.</p>
                                                <div className="d-flex justify-content-between">
                                                    <Link href="#">
                                                        <p className="fs-7 mb-0">David Miller</p>
                                                    </Link>
                                                    <p className="fs-7 mb-0">February 19, 2025</p>
                                                </div>
                                            </div>
                                            <div className="d-inline-block d-none d-lg-block">
                                                <Link href="#">
                                                    <img src="assets/imgs/pages/data-analysis/page-child/img-6.png" alt="AstraX" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="row py-9">
                                    <div className="col-md-10 mx-auto">
                                        <div className="card-blog-sec1 d-flex align-items-center overflow-hidden" data-aos="fade-up" data-aos-delay={1000}>
                                            <div className="content p-md-7 p-5">
                                                <span className="btn-text text-primary">Machine Learning</span>
                                                <Link href="#">
                                                    <h5 className="mt-2 pb-3">How AI is Shaping the Future of Data Analytics</h5>
                                                </Link>
                                                <p className="pb-5">Artificial intelligence is at the forefront of data analysis, offering unprecedented opportunities for businesses to improve efficiency, automate processes, and unlock hidden insights. Learn how AI is changing the landscape of data analytics.</p>
                                                <div className="d-flex justify-content-between">
                                                    <Link href="#">
                                                        <p className="fs-7 mb-0">David Miller</p>
                                                    </Link>
                                                    <p className="fs-7 mb-0">February 19, 2025</p>
                                                </div>
                                            </div>
                                            <div className="d-inline-block d-none d-lg-block">
                                                <Link href="#">
                                                    <img src="assets/imgs/pages/data-analysis/page-child/img-6.png" alt="AstraX" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </div>
                    </Swiper>
                </div>
            </section>
        </>
    );
}
