import Link from "next/link";

export default function Section4() {
    return (
        <>
            {/*business-services section 4*/}
            <section className="business-services-section-4 position-relative overflow-hidden py-120 bg-secondary-2">
                <div className="container position-relative z-1">
                    <div className="row">
                        <div className="text-center mb-5">
                            <span className="d-flex align-items-center justify-content-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={2} viewBox="0 0 18 2" fill="none">
                                    <circle opacity="0.2" cx={1} cy={1} r={1} fill="#0D6EFD" />
                                    <circle opacity="0.5" cx={9} cy={1} r={1} fill="#0D6EFD" />
                                    <circle cx={17} cy={1} r={1} fill="#0D6EFD" />
                                </svg>
                                <span className="text-primary btn-text">TESTIMONIAL</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={2} viewBox="0 0 18 2" fill="none">
                                    <circle cx={1} cy={1} r={1} fill="#0D6EFD" />
                                    <circle opacity="0.5" cx={9} cy={1} r={1} fill="#0D6EFD" />
                                    <circle opacity="0.2" cx={17} cy={1} r={1} fill="#0D6EFD" />
                                </svg>
                            </span>
                            <h2 className="text-dark my-3 text-anime-style-3">Happy Our Client</h2>
                            <p className="wow img-custom-anim-left">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. it enim ad minim veniam,</p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row g-lg-5 g-md-4 g-3">
                        <div className="col-lg-4" data-aos="fade-up" data-aos-delay={0}>
                            <div className="card-testimonial bg-white p-5 rounded-4 border hover-up">
                                <div className="d-flex gap-2">
                                    <i className="bi bi-star-fill text-primary fs-10" />
                                    <i className="bi bi-star-fill text-primary fs-10" />
                                    <i className="bi bi-star-fill text-primary  fs-10" />
                                    <i className="bi bi-star-fill text-primary fs-10" />
                                    <i className="bi bi-star-fill text-primary fs-10" />
                                </div>
                                <Link href="#">
                                    <h6 className="mt-2 fs-20">Creative learning</h6>
                                </Link>
                                <p className="mb-0 mt-4">" Unrivaled brilliance surpassing all others. Highly recommended for novices and experts alike. We will hire them for sure. "</p>
                                <div className="d-flex align-items-center mt-5 position-relative z-1">
                                    <Link href="#">
                                        <img className="rounded-circle icon-shape icon-50" src="assets/imgs/pages/business/page-about/author-9.png" alt="AstraX" />
                                    </Link>
                                    <div className="text-start ms-3">
                                        <Link href="#">
                                            <span className="btn-text">Gabriella S. Adams</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4" data-aos="fade-up" data-aos-delay={200}>
                            <div className="card-testimonial bg-white p-5 rounded-4 border hover-up">
                                <div className="d-flex gap-2">
                                    <i className="bi bi-star-fill text-primary fs-10" />
                                    <i className="bi bi-star-fill text-primary fs-10" />
                                    <i className="bi bi-star-fill text-primary  fs-10" />
                                    <i className="bi bi-star-fill text-primary fs-10" />
                                    <i className="bi bi-star-fill text-primary fs-10" />
                                </div>
                                <Link href="#">
                                    <h6 className="mt-2 fs-20">ROI business growth</h6>
                                </Link>
                                <p className="mb-0 mt-4">" Unrivaled brilliance surpassing all others. Highly recommended for novices and experts alike. We will hire them for sure. "</p>
                                <div className="d-flex align-items-center mt-5 position-relative z-1">
                                    <Link href="#">
                                        <img className="rounded-circle icon-shape icon-50" src="assets/imgs/pages/business/page-about/author-10.png" alt="AstraX" />
                                    </Link>
                                    <div className="text-start ms-3">
                                        <Link href="#">
                                            <span className="btn-text">Isabella F. Monroe</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4" data-aos="fade-up" data-aos-delay={400}>
                            <div className="card-testimonial bg-white p-5 rounded-4 border hover-up">
                                <div className="d-flex gap-2">
                                    <i className="bi bi-star-fill text-primary fs-10" />
                                    <i className="bi bi-star-fill text-primary fs-10" />
                                    <i className="bi bi-star-fill text-primary fs-10" />
                                    <i className="bi bi-star-fill text-primary fs-10" />
                                    <i className="bi bi-star-fill text-primary fs-10" />
                                </div>
                                <Link href="#">
                                    <h6 className="mt-2 fs-20">Growing process</h6>
                                </Link>
                                <p className="mb-0 mt-4">" Unrivaled brilliance surpassing all others. Highly recommended for novices and experts alike. We will hire them for sure. "</p>
                                <div className="d-flex align-items-center mt-5 position-relative z-1">
                                    <Link href="#">
                                        <img className="rounded-circle icon-shape icon-50" src="assets/imgs/pages/business/page-about/author-11.png" alt="AstraX" />
                                    </Link>
                                    <div className="text-start ms-3">
                                        <Link href="#">
                                            <span className="btn-text">Victoria L. Davis</span>
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
