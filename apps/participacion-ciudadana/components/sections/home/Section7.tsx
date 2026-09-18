"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 3,
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
            slidesPerView: 3,
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

export default function Section7() {
    return (
        <>
            {/*coworking-space-home home section 7*/}
            <section className="coworking-space-home-section-7 py-120 bg-secondary-2 overflow-hidden">
                <div className="container swipper-root">
                    <div className="d-flex justify-content-center">
                        <div className="text-center">
                            <h2 className="stroke text-secondary-2 text-center pb-2 mb-0 text-anime-style-2">Ideal place for</h2>
                            <h2 className="mb-0 text-anime-style-2">make life easier for customer.</h2>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <Swiper {...swiperOptions} className="swiper slider-3 mt-80">
                        <div className="swiper-wrapper">
                            <SwiperSlide>
                                <img data-aos="zoom-in" src="assets/imgs/pages/coworking-space/page-home/home-section-7/img-1.png" alt="AstraX" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img data-aos="zoom-in" src="assets/imgs/pages/coworking-space/page-home/home-section-7/img-2.png" alt="AstraX" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img data-aos="zoom-in" src="assets/imgs/pages/coworking-space/page-home/home-section-7/img-3.png" alt="AstraX" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img data-aos="zoom-in" src="assets/imgs/pages/coworking-space/page-home/home-section-7/img-1.png" alt="AstraX" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img data-aos="zoom-in" src="assets/imgs/pages/coworking-space/page-home/home-section-7/img-2.png" alt="AstraX" />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img data-aos="zoom-in" src="assets/imgs/pages/coworking-space/page-home/home-section-7/img-3.png" alt="AstraX" />
                            </SwiperSlide>
                        </div>
                    </Swiper>
                </div>
            </section>
        </>
    );
}
