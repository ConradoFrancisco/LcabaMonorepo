import Link from "next/link";

export default function Section3() {
    return (
        <>
            {/*charity-home-section-3*/}
            <section className="charity-home-section-3 pt-120 pb-120 position-relative z-0 bg-light overflow-hidden">
                <div className="container position-relative">
                    <div className="row">
                        <div className="number-step d-flex align-items-center gap-3">
                            <i className="fa-solid fa-heart text-primary" />
                            <span className="btn-text">our expertise</span>
                        </div>
                        <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
                            <h2 className="text-dark my-3 text-anime-style-3">
                                Dedicated to making a positive <br />
                                impact on
                                <span className="bg-white border border-dark rounded-5 px-2">people's lives.</span>
                            </h2>
                            <div>
                                <Link href="#" className="btn btn-outline-secondary ">
                                    <span>our service</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                        <g clipPath="url(#clip0_1121_24)">
                                            <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="#2C2E3C" />
                                        </g>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-80">
                        <div className="col-lg-3 col-md-6 card-feature mb-lg-0 mb-5" data-aos="fade-up" data-aos-delay={0}>
                            <div className="bg-white rounded-4 p-4 hover-up border border-white">
                                <div className="mb-10 pb-6">
                                    <img src="assets/imgs/pages/charity/page-home/home-section-3/icon-1.png" alt="AstraX" />
                                </div>
                                <div className="line mb-5" />
                                <Link href="#">
                                    <h5 className="text-anime-style-2">Healthy foods</h5>
                                </Link>
                                <p className="fs-7">Offer a wide range of digital market services that cater to business.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 card-feature mb-lg-0 mb-5" data-aos="fade-up" data-aos-delay={200}>
                            <div className="bg-white rounded-4 p-4 hover-up border border-white">
                                <div className="mb-10 pb-6">
                                    <img src="assets/imgs/pages/charity/page-home/home-section-3/icon-2.png" alt="AstraX" />
                                </div>
                                <div className="line mb-5" />
                                <Link href="#">
                                    <h5 className="text-anime-style-2">Clean water</h5>
                                </Link>
                                <p className="fs-7">Offer a wide range of digital market services that cater to business.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 card-feature mb-lg-0 mb-5" data-aos="fade-up" data-aos-delay={400}>
                            <div className="bg-white rounded-4 p-4 hover-up border border-white">
                                <div className="mb-10 pb-6">
                                    <img src="assets/imgs/pages/charity/page-home/home-section-3/icon-3.png" alt="AstraX" />
                                </div>
                                <div className="line mb-5" />
                                <Link href="#">
                                    <h5 className="text-anime-style-2">Medical help</h5>
                                </Link>
                                <p className="fs-7">Offer a wide range of digital market services that cater to business.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 card-feature mb-lg-0 mb-5" data-aos="fade-up" data-aos-delay={600}>
                            <div className="bg-white rounded-4 p-4 hover-up border border-white">
                                <div className="mb-10 pb-6">
                                    <img src="assets/imgs/pages/charity/page-home/home-section-3/icon-4.png" alt="AstraX" />
                                </div>
                                <div className="line mb-5" />
                                <Link href="#">
                                    <h5 className="text-anime-style-2">Blood donation</h5>
                                </Link>
                                <p className="fs-7">Offer a wide range of digital market services that cater to business.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
