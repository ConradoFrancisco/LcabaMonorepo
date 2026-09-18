import Link from "next/link";

export default function Section1() {
    return (
        <>
            {/*coworking-space-about home section 1*/}
            <section className="coworking-space-about-home-section-1 position-relative py-120 overflow-hidden">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 order-lg-1 order-2">
                            <div className="position-relative mt-lg-0 mt-8">
                                <div className="pb-10 position-relative z-2">
                                    <img data-aos="fade-up-left" data-aos-delay={1000} className="rounded-4 mb-md-5" src="assets/imgs/pages/coworking-space/page-about/img-1.png" alt="AstraX" />
                                </div>
                                <img data-aos="fade-up-left" data-aos-delay={0} className="rounded-4 position-absolute bottom-0 end-0 z-1" src="assets/imgs/pages/coworking-space/page-about/img-2.png" alt="AstraX" />
                                <div className="position-md-absolute top-50 end-50 m-md-9 z-0" data-aos="zoom-in" data-aos-delay={1200}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={220} height={220} viewBox="0 0 220 220" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M110 29.3333C65.449 29.3333 29.3333 65.449 29.3333 110C29.3333 154.551 65.449 190.667 110 190.667C154.551 190.667 190.667 154.551 190.667 110C190.667 65.449 154.551 29.3333 110 29.3333ZM0 110C0 49.2487 49.2487 0 110 0C170.751 0 220 49.2487 220 110C220 170.751 170.751 220 110 220C49.2487 220 0 170.751 0 110Z" fill="#1AAA59" fillOpacity="0.2" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M110 80.7812C93.8629 80.7812 80.7812 93.8629 80.7812 110C80.7812 126.137 93.8629 139.219 110 139.219C126.137 139.219 139.219 126.137 139.219 110C139.219 93.8629 126.137 80.7812 110 80.7812ZM51.5625 110C51.5625 77.7259 77.7259 51.5625 110 51.5625C142.274 51.5625 168.437 77.7259 168.437 110C168.437 142.274 142.274 168.437 110 168.437C77.7259 168.437 51.5625 142.274 51.5625 110Z" fill="#1AAA59" fillOpacity="0.6" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 ps-lg-8 order-lg-2 order-1">
                            <h2 className="stroke text-white text-start pb-2 mb-0 text-anime-style-2">Specifically designed</h2>
                            <h2 className="text-anime-style-2">to meet your needs.</h2>
                            <p className="mt-4 mb-6 text-anime-style-1">We offer a wide range of digital market services that cater to business of all sizes a forward-think and clever approach. Hands down one of the best shirts I’ve ever owned.</p>
                            <div className="d-flex flex-wrap gap-4">
                                <div className="text-center border-end-md pe-8 me-8">
                                    <h2 className="count mb-0 position-relative z-1">
                                        <span className="odometer text-nowrap" data-count={876} />+
                                    </h2>
                                    <p className="fw-semibold fs-18 mb-0 text-dark text-opacity-75">Offices Worldwide</p>
                                </div>
                                <div className="text-center">
                                    <h2 className="count mb-0 position-relative z-1">
                                        <span className="odometer text-nowrap" data-count={456} />+
                                    </h2>
                                    <p className="fw-semibold fs-18 mb-0 text-dark text-opacity-75">Seats freelancers</p>
                                </div>
                            </div>
                            <Link href="/contact" className="btn btn-primary mt-6" data-aos="zoom-in" data-aos-delay={400}>
                                <span>get in touch</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                    <g clipPath="url(#clip0_1104_920)">
                                        <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="white" />
                                    </g>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
