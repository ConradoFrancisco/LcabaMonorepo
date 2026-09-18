"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ReactNode } from "react";

type CarouselTickerProps = {
    slides: ReactNode[];
};

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 5,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,
};

export default function CarouselTicker({ slides }: CarouselTickerProps) {
    return (
        <Swiper {...swiperOptions} className="carouselTicker carouselTicker-left position-relative z-1">
            <div className="carouselTicker__list">
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="carouselTicker__item">
                        {slide}
                    </SwiperSlide>
                ))}
            </div>
        </Swiper>
    );
}
