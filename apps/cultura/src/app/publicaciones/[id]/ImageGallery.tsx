"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const swiperOptions = {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: {
        nextEl: ".gallery-swiper-next",
        prevEl: ".gallery-swiper-prev",
    },
    pagination: {
        el: ".gallery-swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 4000,
        disableOnInteraction: true,
    },
    loop: true,
};

export default function ImageGallery({ images = [], title = "" }: { images: string[]; title: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    if (images.length === 0) return null;

    const openModal = (url: string) => {
        setSelectedImage(url);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className="mb-4">
            <h6 className="fw-semibold text-muted mb-3">Imágenes ({images.length})</h6>
            
            {/* Carousel Container */}
            <div className="position-relative rounded-4 overflow-hidden shadow-sm" style={{ backgroundColor: "#f9f9f9" }}>
                <Swiper {...swiperOptions} className="gallery-swiper">
                    {images.map((url, i) => (
                        <SwiperSlide key={i}>
                            <div 
                                className="d-flex align-items-center justify-content-center cursor-pointer"
                                style={{ height: "450px", cursor: "zoom-in" }}
                                onClick={() => openModal(url)}
                            >
                                <img
                                    src={url}
                                    alt={`${title} - ${i + 1}`}
                                    className="w-100 h-100"
                                    style={{ objectFit: "contain", maxWeight: "100%", maxHeight: "450px" }}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation */}
                {images.length > 1 && (
                    <>
                        <div
                            className="gallery-swiper-prev position-absolute top-50 start-0 translate-middle-y d-flex align-items-center justify-content-center"
                            style={{ zIndex: 10, left: "1rem", cursor: "pointer", width: "40px", height: "40px", background: "rgba(0,0,0,0.5)", borderRadius: "50%" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </div>
                        <div
                            className="gallery-swiper-next position-absolute top-50 end-0 translate-middle-y d-flex align-items-center justify-content-center"
                            style={{ zIndex: 10, right: "1rem", cursor: "pointer", width: "40px", height: "40px", background: "rgba(0,0,0,0.5)", borderRadius: "50%" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </div>
                        <div
                            className="gallery-swiper-pagination position-absolute bottom-0 start-50 translate-middle-x pb-3"
                            style={{ zIndex: 10 }}
                        />
                    </>
                )}
            </div>

            {/* Bootstrap Modal Overlay */}
            {isOpen && (
                <div 
                    className="modal fade show d-block" 
                    tabIndex={-1} 
                    style={{ backgroundColor: "rgba(0,0,0,0.85)", zIndex: 1050 }}
                    onClick={closeModal}
                >
                    <div className="modal-dialog modal-dialog-centered modal-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content border-0 bg-transparent text-end">
                            <div className="modal-header border-0 pe-0">
                                <button 
                                    type="button" 
                                    className="btn-close btn-close-white fs-4" 
                                    aria-label="Close"
                                    onClick={closeModal}
                                />
                            </div>
                            <div className="modal-body text-center p-0">
                                <img
                                    src={selectedImage}
                                    alt="Zoom"
                                    className="img-fluid rounded"
                                    style={{ maxHeight: "85vh", objectFit: "contain" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
