import Link from "next/link";

export default function Section8() {
    return (
        <>
            {/*business section 8*/}
            <section className="business-section-8 position-relative overflow-hidden py-120">
                <div className="container position-relative z-1">
                    <div className="row">
                        <span className="d-flex align-items-center justify-content-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={2} viewBox="0 0 18 2" fill="none">
                                <circle opacity="0.2" cx={1} cy={1} r={1} fill="#0D6EFD" />
                                <circle opacity="0.5" cx={9} cy={1} r={1} fill="#0D6EFD" />
                                <circle cx={17} cy={1} r={1} fill="#0D6EFD" />
                            </svg>
                            <span className="text-primary btn-text">our insights</span>
                        </span>
                        <div className="d-flex flex-wrap align-items-center">
                            <h2 className="text-dark my-3 text-anime-style-1">
                                Explore our blogs
                                <span className="text-primary">
                                    for deeper <br />
                                </span>
                                insights security
                            </h2>
                            <Link href="/blog" className="btn btn-outline-secondary ms-lg-auto button--calypso">
                                <span>more news</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                    <g clipPath="url(#clip0_816_117)">
                                        <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="#292929" />
                                    </g>
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div className="row mt-8">
                        <div className="col-lg-4" data-aos="fade-up" data-aos-delay={0}>
                            <div className="card-news position-relative mb-lg-0 mb-8 hover-up">
                                <Link href="/blog-details" className="card-news-img position-relative d-block">
                                    <img className="w-100 rounded-4" src="assets/imgs/pages/business/page-home/home-section-8/img-1.png" alt="AstraX" />
                                    <span className="text-uppercase text-white bg-primary rounded-2 px-2 py-1 position-absolute top-100 end-0 translate-middle-y me-5">business</span>
                                </Link>
                                <div className="card-news-body">
                                    <div className="d-flex card-news-information mt-5 gap-4">
                                        <div className="d-flex align-items-center gap-1">
                                            <img src="assets/imgs/pages/business/page-home/home-section-8/icon-1.svg" alt="AstraX" />
                                            <p className="mb-0">December 21, 2025</p>
                                        </div>
                                        <div className="d-flex align-items-center gap-1">
                                            <img src="assets/imgs/pages/business/page-home/home-section-8/icon-2.svg" alt="AstraX" />
                                            <span className="opacity-50">By</span>
                                            <Link href="#" className="mb-0">
                                                Admin
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="card-news-title mt-2">
                                        <Link href="/blog-details">
                                            <h6>Beyond Ransomware: Why 2025 Might See the Worst Cyber Attack</h6>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4" data-aos="fade-up" data-aos-delay={200}>
                            <div className="card-news position-relative mb-lg-0 mb-8 hover-up">
                                <Link href="/blog-details" className="card-news-img position-relative d-block">
                                    <img className="w-100 rounded-4" src="assets/imgs/pages/business/page-home/home-section-8/img-2.png" alt="AstraX" />
                                    <span className="text-uppercase text-white bg-primary rounded-2 px-2 py-1 position-absolute top-100 end-0 translate-middle-y me-5">consultancy</span>
                                </Link>
                                <div className="card-news-body">
                                    <div className="d-flex card-news-information mt-5 gap-4">
                                        <div className="d-flex align-items-center gap-1">
                                            <img src="assets/imgs/pages/business/page-home/home-section-8/icon-1.svg" alt="AstraX" />
                                            <p className="mb-0">December 21, 2025</p>
                                        </div>
                                        <div className="d-flex align-items-center gap-1">
                                            <img src="assets/imgs/pages/business/page-home/home-section-8/icon-2.svg" alt="AstraX" />
                                            <span className="opacity-50">By</span>
                                            <Link href="#" className="mb-0">
                                                Admin
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="card-news-title mt-2">
                                        <Link href="/blog-details">
                                            <h6>The Looming Cyber Apocalypse: Is 2025 the Year of the 'Big One'?</h6>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4" data-aos="fade-up" data-aos-delay={400}>
                            <div className="card-news position-relative mb-lg-0 mb-8 hover-up">
                                <Link href="/blog-details" className="card-news-img position-relative d-block">
                                    <img className="w-100 rounded-4" src="assets/imgs/pages/business/page-home/home-section-8/img-3.png" alt="AstraX" />
                                    <span className="text-uppercase text-white bg-primary rounded-2 px-2 py-1 position-absolute top-100 end-0 translate-middle-y me-5">finance</span>
                                </Link>
                                <div className="card-news-body">
                                    <div className="d-flex card-news-information mt-5 gap-4">
                                        <div className="d-flex align-items-center gap-1">
                                            <img src="assets/imgs/pages/business/page-home/home-section-8/icon-1.svg" alt="AstraX" />
                                            <p className="mb-0">December 21, 2025</p>
                                        </div>
                                        <div className="d-flex align-items-center gap-1">
                                            <img src="assets/imgs/pages/business/page-home/home-section-8/icon-2.svg" alt="AstraX" />
                                            <span className="opacity-50">By</span>
                                            <Link href="#" className="mb-0">
                                                Admin
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="card-news-title mt-2">
                                        <Link href="/blog-details">
                                            <h6>Digital Doomsday? Experts Warn of a 2025 Cyber Mega Attack</h6>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
