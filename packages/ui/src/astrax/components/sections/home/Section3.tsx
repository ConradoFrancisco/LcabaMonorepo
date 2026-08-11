import Link from "next/link";

export default function Section3() {
    return (
        <>
            {/*business section 3*/}
            <section className="business-section-3 position-relative overflow-hidden pt-120 pb-300 bg-light-2">
                <div className="container position-relative z-1">
                    <div className="row align-items-center">
                        <div className="col-lg-6 order-3 order-lg-1 mt-lg-0 mt-8">
                            <div className="position-relative d-inline-block">
                                <img data-aos="fade-right" className="rounded-4" src="assets/imgs/pages/business/page-home/home-section-3/img-1.png" alt="AstraX" />
                                <div className="position-absolute top-0 start-100 mt-6 translate-middle-x bg-primary shadow-1 icon-shape icon-160 rounded-circle d-none d-md-block">
                                    <img className="position-relative" src="assets/imgs/pages/business/page-home/home-section-3/icon.svg" alt="AstraX" />
                                    <div className="position-absolute top-50 start-50 translate-middle w-100">
                                        <h6 className="circle-text rotateme text-white">our digital business approach - 2000 -</h6>
                                    </div>
                                </div>
                                <div data-aos="fade-up">
                                    <img className="rounded-4 position-absolute top-100 start-100 translate-middle d-none d-md-block" src="assets/imgs/pages/business/page-home/home-section-3/img-2.png" alt="AstraX" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 order-2 ">
                            <span className="d-flex align-items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={2} viewBox="0 0 18 2" fill="none">
                                    <circle opacity="0.2" cx={1} cy={1} r={1} fill="#0D6EFD" />
                                    <circle opacity="0.5" cx={9} cy={1} r={1} fill="#0D6EFD" />
                                    <circle cx={17} cy={1} r={1} fill="#0D6EFD" />
                                </svg>
                                <span className="text-primary btn-text">since from 2000</span>
                            </span>
                            <h2 className="text-dark my-3 text-anime-style-3">
                                Our digital business approach <span className="text-primary">focuses.</span>
                            </h2>
                            <p className="border-bottom pb-4 wow img-custom-anim-top">We offer a wide range of digital marketing services that cater to businesses of all sizes. A forward-thinking and clever approach to maintaining sales tax compliance amidst the digital era.</p>
                            <Link href="/contact" className="btn btn-dark mt-4 button--calypso">
                                <span>get in touch</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                    <g clipPath="url(#clip0_828_193)">
                                        <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="white" />
                                    </g>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="position-absolute top-0 end-0 z-0">
                    <img src="assets/imgs/pages/business/page-home/home-section-3/decor-bg.png" alt="AstraX" />
                </div>
            </section>
        </>
    );
}
