"use client";

import { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";
import Link from "next/link";

export default function Section4() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/*coworking-space-home home section 4*/}
            <section className="coworking-space-home-section-4 position-relative overflow-hidden">
                <div className="position-relative d-flex align-items-center justify-content-center wow img-custom-anim-top">
                    <div className="position-absolute z-1 top-50 start-50 translate-middle bg-white icon-shape icon-160 rounded-circle border border-primary">
                        <Link
                            href="#"
                            className="popup-video w-100"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsOpen(true);
                            }}
                        >
                            <i className="ri-play-fill text-dark fs-3" />
                        </Link>
                        <div className="position-absolute top-50 start-50 translate-middle w-100">
                            <h6 className="circle-text rotateme text-primary fw-regular">
                                <span className="text-primary fw-regular">/ play /</span>
                                <span className="text-primary fw-regular">play /</span>
                                <span className="text-primary fw-regular">play /</span>
                                <span className="text-primary fw-regular">play /</span>
                                <span className="text-primary fw-regular">play /</span>
                                <span className="text-primary fw-regular">play /</span>
                                <span className="text-primary fw-regular">/</span>
                            </h6>
                        </div>
                    </div>
                    <div className="banner w-100" data-background="assets/imgs/pages/coworking-space/page-home/home-section-4/img-bg.png" />
                    <div className="position-absolute bottom-0 start-50 translate-middle-x w-100 z-0">
                        <svg width="100%">
                            <text className="fs-120 opacity-50" x="50%" y="50%">
                                Astrax Coworking Space
                            </text>
                        </svg>
                    </div>
                </div>
            </section>
            <ModalVideo channel="youtube" isOpen={isOpen} videoId="2GOTlI8pYeo" onClose={() => setIsOpen(false)} />
        </>
    );
}
