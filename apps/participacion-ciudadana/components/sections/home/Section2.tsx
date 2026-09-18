"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import SwiperPadding from "@/components/elements/BoxSwiperPadding";
import Link from "next/link";
const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 4,
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
            slidesPerView: 2,
            spaceBetween: 30,
        },
        767: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1199: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1350: {
            slidesPerView: 4,
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

export default function Section2() {
    return (
        <>
            {/*coworking-space-home section 2*/}
            <SwiperPadding />
            <section className="coworking-space-home-section-2 position-relative overflow-hidden py-120">
                <div className="container swipper-root">
                    <div className="d-flex justify-content-center">
                        <div className="text-center">
                            <h2 className="stroke text-white text-center pb-2 mb-0 text-anime-style-2">Ideal place for</h2>
                            <h2 className="text-anime-style-2">potential growth</h2>
                        </div>
                    </div>
                </div>
                <div className="row pt-80">
                    <div className="col-12 position-relative">
                        {/* Swiper */}
                        <div className="box-swiper-padding">
                            <Swiper {...swiperOptions} className="swiper slider-4 pb-1">
                                <div className="swiper-wrapper z-1">
                                    <SwiperSlide>
                                        <div className="card-news position-relative mb-lg-0 mb-8" data-aos="fade-up" data-aos-delay={0}>
                                            <Link href="/our-services-details" className="card-news-img position-relative d-block">
                                                <img className="w-100" src="assets/imgs/pages/coworking-space/page-home/home-section-2/img-1.png" alt="AstraX" />
                                                <div className="icon-shape icon-100 rounded-circle bg-primary position-absolute top-100 end-0 translate-middle-y me-5">
                                                    <div>
                                                        <h6 className="text-white mb-0">$99</h6>
                                                        <p className="fs-8 fw-regular text-white mb-0">Monthly</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="card-news-body border p-4 rounded-top-0 border-top-0">
                                                <div className="card-news-title mt-2 mb-4">
                                                    <Link href="/our-services-details">
                                                        <h6 className="fw-semibold">Private offices</h6>
                                                    </Link>
                                                    <p>We offer a wide range of digital market services that cater to business.</p>
                                                </div>
                                                <div className="d-flex align-items-center gap-2 mb-2">
                                                    <i className="fa-solid fa-calendar-days text-primary" />
                                                    <p className="mb-0 fs-7 text-dark">By month or year</p>
                                                </div>
                                                <div className="d-flex align-items-center gap-2">
                                                    <i className="fa-regular fa-user text-primary" />
                                                    <p className="mb-0 fs-7 text-dark">Teams of any size</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="card-news position-relative mb-lg-0 mb-8" data-aos="fade-up" data-aos-delay={200}>
                                            <Link href="/our-services-details" className="card-news-img position-relative d-block">
                                                <img className="w-100" src="assets/imgs/pages/coworking-space/page-home/home-section-2/img-2.png" alt="AstraX" />
                                                <div className="icon-shape icon-100 rounded-circle bg-primary position-absolute top-100 end-0 translate-middle-y me-5">
                                                    <div>
                                                        <h6 className="text-white mb-0">$49</h6>
                                                        <p className="fs-8 fw-regular text-white mb-0">Monthly</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="card-news-body border p-4 rounded-top-0 border-top-0">
                                                <div className="card-news-title mt-2 mb-4">
                                                    <Link href="/our-services-details">
                                                        <h6 className="fw-semibold">Custom desk</h6>
                                                    </Link>
                                                    <p>We offer a wide range of digital market services that cater to business.</p>
                                                </div>
                                                <div className="d-flex align-items-center gap-2 mb-2">
                                                    <i className="fa-solid fa-calendar-days text-primary" />
                                                    <p className="mb-0 fs-7 text-dark">By month or year</p>
                                                </div>
                                                <div className="d-flex align-items-center gap-2">
                                                    <i className="fa-regular fa-user text-primary" />
                                                    <p className="mb-0 fs-7 text-dark">Teams of any size</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="card-news position-relative mb-lg-0 mb-8" data-aos="fade-up" data-aos-delay={400}>
                                            <Link href="/our-services-details" className="card-news-img position-relative d-block">
                                                <img className="w-100" src="assets/imgs/pages/coworking-space/page-home/home-section-2/img-3.png" alt="AstraX" />
                                                <div className="icon-shape icon-100 rounded-circle bg-primary position-absolute top-100 end-0 translate-middle-y me-5">
                                                    <div>
                                                        <h6 className="text-white mb-0">$39</h6>
                                                        <p className="fs-8 fw-regular text-white mb-0">Monthly</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="card-news-body border p-4 rounded-top-0 border-top-0">
                                                <div className="card-news-title mt-2 mb-4">
                                                    <Link href="/our-services-details">
                                                        <h6 className="fw-semibold">Day/night office</h6>
                                                    </Link>
                                                    <p>We offer a wide range of digital market services that cater to business.</p>
                                                </div>
                                                <div className="d-flex align-items-center gap-2 mb-2">
                                                    <i className="fa-solid fa-calendar-days text-primary" />
                                                    <p className="mb-0 fs-7 text-dark">By month or year</p>
                                                </div>
                                                <div className="d-flex align-items-center gap-2">
                                                    <i className="fa-regular fa-user text-primary" />
                                                    <p className="mb-0 fs-7 text-dark">Teams of any size</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="card-news position-relative mb-lg-0 mb-8" data-aos="fade-up" data-aos-delay={600}>
                                            <Link href="/our-services-details" className="card-news-img position-relative d-block">
                                                <img className="w-100" src="assets/imgs/pages/coworking-space/page-home/home-section-2/img-4.png" alt="AstraX" />
                                                <div className="icon-shape icon-100 rounded-circle bg-primary position-absolute top-100 end-0 translate-middle-y me-5">
                                                    <div>
                                                        <h6 className="text-white mb-0">$99</h6>
                                                        <p className="fs-8 fw-regular text-white mb-0">Monthly</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="card-news-body border p-4 rounded-top-0 border-top-0">
                                                <div className="card-news-title mt-2 mb-4">
                                                    <Link href="/our-services-details">
                                                        <h6 className="fw-semibold">Office membership</h6>
                                                    </Link>
                                                    <p>We offer a wide range of digital market services that cater to business.</p>
                                                </div>
                                                <div className="d-flex align-items-center gap-2 mb-2">
                                                    <i className="fa-solid fa-calendar-days text-primary" />
                                                    <p className="mb-0 fs-7 text-dark">By month or year</p>
                                                </div>
                                                <div className="d-flex align-items-center gap-2">
                                                    <i className="fa-regular fa-user text-primary" />
                                                    <p className="mb-0 fs-7 text-dark">Teams of any size</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className="card-news position-relative mb-lg-0 mb-8" data-aos="fade-up" data-aos-delay={800}>
                                            <Link href="/our-services-details" className="card-news-img position-relative d-block">
                                                <img className="w-100" src="assets/imgs/pages/coworking-space/page-home/home-section-2/img-2.png" alt="AstraX" />
                                                <div className="icon-shape icon-100 rounded-circle bg-primary position-absolute top-100 end-0 translate-middle-y me-5">
                                                    <div>
                                                        <h6 className="text-white mb-0">$49</h6>
                                                        <p className="fs-8 fw-regular text-white mb-0">Monthly</p>
                                                    </div>
                                                </div>
                                            </Link>
                                            <div className="card-news-body border p-4 rounded-top-0 border-top-0">
                                                <div className="card-news-title mt-2 mb-4">
                                                    <Link href="/our-services-details">
                                                        <h6 className="fw-semibold">Custom desk</h6>
                                                    </Link>
                                                    <p>We offer a wide range of digital market services that cater to business.</p>
                                                </div>
                                                <div className="d-flex align-items-center gap-2 mb-2">
                                                    <i className="fa-solid fa-calendar-days text-primary" />
                                                    <p className="mb-0 fs-7 text-dark">By month or year</p>
                                                </div>
                                                <div className="d-flex align-items-center gap-2">
                                                    <i className="fa-regular fa-user text-primary" />
                                                    <p className="mb-0 fs-7 text-dark">Teams of any size</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </div>
                            </Swiper>
                        </div>
                    </div>
                </div>
                {/* Swiper JS */}
            </section>
        </>
    );
}
