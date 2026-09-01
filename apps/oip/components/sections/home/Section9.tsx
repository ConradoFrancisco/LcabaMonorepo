"use client";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.css";
import Link from "next/link";

export default function Section9() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            {/*data-analysis home section 9*/}
            <section className="data-analysis-home-section-9 position-relative overflow-hidden py-150 ">
                <div className="container position-relative z-3">
                    <div className="row">
                        <div className="text-center">
                            <Link
                                href="https://www.youtube.com/watch?v=2GOTlI8pYeo"
                                className="d-inline-flex fs-7 fw-semibold align-items-center bg-transparent rounded-circle popup-video play-btn hover-up icon-shape icon-100 border border-4 border-white border-opacity-10"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsOpen(true);
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" fill="none">
                                    <g clipPath="url(#clip0_349_659)">
                                        <path d="M3.82909 0.396886C2.20629 -0.533976 0.890625 0.228597 0.890625 2.09878V15.8999C0.890625 17.772 2.20629 18.5335 3.82909 17.6036L15.892 10.6856C17.5153 9.75439 17.5153 8.24572 15.892 7.31475L3.82909 0.396886Z" fill="white" />
                                    </g>
                                </svg>
                            </Link>
                            <h2 className="text-white mb-3 mt-5 text-anime-style-2">Let’s have a look office</h2>
                            <p className="text-stroke mb-8">
                                We offer a wide range of digital marketing services that cater to businesses of all <br />
                                sizes a forward-thinking and clever approach.
                            </p>
                            <Link href="/contact" className="btn btn-outline-secondary hover-up">
                                <span>let’s talk</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                    <g clipPath="url(#clip0_816_117)">
                                        <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="#292929" />
                                    </g>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="img-bg position-absolute top-50 start-50 translate-middle w-100 h-100" data-background="assets/imgs/pages/data-analysis/page-home/home-section-9/img-bg.png" />
                <div className="linearGradient position-absolute top-50 start-50 translate-middle w-100 h-100" />
            </section>
            <ModalVideo channel="youtube" isOpen={isOpen} videoId="2GOTlI8pYeo" onClose={() => setIsOpen(false)} />
        </>
    );
}
