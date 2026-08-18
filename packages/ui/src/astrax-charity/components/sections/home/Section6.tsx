"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 4,
    spaceBetween: 30,
    centerSlides: true,
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
            slidesPerView: 5,
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
            {/*charity-home section 6*/}
            <section className="charity-home-section-6 position-relative bg-dark-2 overflow-hidden pt-120">
                <div className="custom-container container position-relative">
                    <div className="position-absolute top-50 start-50 translate-middle w-100 z-0">
                        <img className="w-100 h-100" src="assets/imgs/pages/charity/page-home/home-section-6/img-bg.png" alt="AstraX" />
                    </div>
                    <div className="container position-relative z-1">
                        <div className="row text-center">
                            <div className="number-step d-flex align-items-center justify-content-center gap-3">
                                <i className="fa-solid fa-heart text-primary" />
                                <span className="btn-text text-white">testimonials</span>
                            </div>
                            <h2 className="text-white my-3 text-anime-style-2">
                                Meet with some
                                <span className="bg-primary border border-dark rounded-5 px-2 text-dark">awesome</span> <br />
                                review &amp; feedback
                            </h2>
                        </div>
                        <div className="row mt-80 g-lg-0 g-5 pb-150">
                            <div className="col-lg-4  pb-lg-0 pb-5 border-primary" data-aos="fade-up" data-aos-delay={0}>
                                <div className="card-testimonial px-lg-7 rounded-0">
                                    <div className="d-flex gap-2">
                                        <i className="bi bi-star-fill text-primary fs-10" />
                                        <i className="bi bi-star-fill text-primary fs-10" />
                                        <i className="bi bi-star-fill text-primary  fs-10" />
                                        <i className="bi bi-star-fill text-primary fs-10" />
                                        <i className="bi bi-star-fill text-primary fs-10" />
                                    </div>
                                    <Link href="#">
                                        <h6 className="mt-2 fs-20 text-white">Good support team</h6>
                                    </Link>
                                    <p className="mb-0 mt-4 content">“ Hands down one of the best shirts I’ve ever owned. Fits great, feels amazing, seems to stay cool and is somewhat water resistant anyway. “</p>
                                    <div className="d-flex align-items-center mt-5 position-relative z-1">
                                        <Link href="#">
                                            <img className="rounded-circle icon-shape icon-50" src="assets/imgs/pages/charity/page-home/home-section-5/img-3.png" alt="AstraX" />
                                        </Link>
                                        <div className="text-start ms-3">
                                            <Link href="#">
                                                <h6 className="fw-regular fs-6 text-white">Isabella F. Monroe</h6>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4  pb-lg-0 pb-5 border-primary" data-aos="fade-up" data-aos-delay={200}>
                                <div className="card-testimonial px-lg-7 rounded-0">
                                    <div className="d-flex gap-2">
                                        <i className="bi bi-star-fill text-primary fs-10" />
                                        <i className="bi bi-star-fill text-primary fs-10" />
                                        <i className="bi bi-star-fill text-primary  fs-10" />
                                        <i className="bi bi-star-fill text-primary fs-10" />
                                        <i className="bi bi-star-fill text-primary fs-10" />
                                    </div>
                                    <Link href="#">
                                        <h6 className="mt-2 fs-20 text-white">Volunteer</h6>
                                    </Link>
                                    <p className="mb-0 mt-4 content">“ Hands down one of the best shirts I’ve ever owned. Fits great, feels amazing, seems to stay cool and is somewhat water resistant anyway. “</p>
                                    <div className="d-flex align-items-center mt-5 position-relative z-1">
                                        <Link href="#">
                                            <img className="rounded-circle icon-shape icon-50" src="assets/imgs/pages/charity/page-home/home-section-5/img-4.png" alt="AstraX" />
                                        </Link>
                                        <div className="text-start ms-3">
                                            <Link href="#">
                                                <h6 className="fw-regular fs-6 text-white">Isabella F. Monroe</h6>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4" data-aos="fade-up" data-aos-delay={400}>
                                <div className="card-testimonial px-lg-7 rounded-0">
                                    <div className="d-flex gap-2">
                                        <i className="bi bi-star-fill text-primary fs-10" />
                                        <i className="bi bi-star-fill text-primary fs-10" />
                                        <i className="bi bi-star-fill text-primary fs-10" />
                                        <i className="bi bi-star-fill text-primary fs-10" />
                                        <i className="bi bi-star-fill text-primary fs-10" />
                                    </div>
                                    <Link href="#">
                                        <h6 className="mt-2 fs-20 text-white">Development team</h6>
                                    </Link>
                                    <p className="mb-0 mt-4 content">“ Hands down one of the best shirts I’ve ever owned. Fits great, feels amazing, seems to stay cool and is somewhat water resistant anyway. “</p>
                                    <div className="d-flex align-items-center mt-5 position-relative z-1">
                                        <Link href="#">
                                            <img className="rounded-circle icon-shape icon-50" src="assets/imgs/pages/charity/page-home/home-section-5/img-5.png" alt="AstraX" />
                                        </Link>
                                        <div className="text-start ms-3">
                                            <Link href="#">
                                                <h6 className="fw-regular fs-6 text-white">Sophia J. Carter</h6>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid position-relative">
                    <div className="bg-white position-absolute top-50 start-50 translate-middle-x w-100 h-50" />
                    <Swiper {...swiperOptions} className="swiper slider-6 ps-3">
                        <div className="swiper-wrapper z-1 align-items-center">
                            <SwiperSlide>
                                <div className="card-service position-relative d-inline-flex">
                                    <img className="rounded-4" data-aos="zoom-in" data-aos-delay={0} src="assets/imgs/pages/charity/page-home/home-section-6/img-1.png" alt="AstraX" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="card-service position-relative d-inline-flex">
                                    <img className="rounded-4" data-aos="zoom-in" data-aos-delay={200} src="assets/imgs/pages/charity/page-home/home-section-6/img-2.png" alt="AstraX" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="card-service position-relative d-inline-flex">
                                    <img className="rounded-4" data-aos="zoom-in" data-aos-delay={400} src="assets/imgs/pages/charity/page-home/home-section-6/img-3.png" alt="AstraX" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="card-service position-relative d-inline-flex">
                                    <img className="rounded-4" data-aos="zoom-in" data-aos-delay={600} src="assets/imgs/pages/charity/page-home/home-section-6/img-4.png" alt="AstraX" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="card-service position-relative d-inline-flex">
                                    <img className="rounded-4" data-aos="zoom-in" data-aos-delay={800} src="assets/imgs/pages/charity/page-home/home-section-6/img-5.png" alt="AstraX" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="card-service position-relative d-inline-flex">
                                    <img className="rounded-4" data-aos="zoom-in" data-aos-delay={1000} src="assets/imgs/pages/charity/page-home/home-section-6/img-3.png" alt="AstraX" />
                                </div>
                            </SwiperSlide>
                        </div>
                    </Swiper>
                </div>
            </section>
        </>
    );
}
