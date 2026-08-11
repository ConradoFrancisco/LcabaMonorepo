import Link from "next/link";

export default function Section7() {
    return (
        <>
            {/*business section 7*/}
            <section className="business-section-7 position-relative overflow-hidden py-120 bg-light-2">
                <div className="container position-relative z-1">
                    <div className="row">
                        <div className="text-center mb-80">
                            <span className="d-flex align-items-center justify-content-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={2} viewBox="0 0 18 2" fill="none">
                                    <circle opacity="0.2" cx={1} cy={1} r={1} fill="#0D6EFD" />
                                    <circle opacity="0.5" cx={9} cy={1} r={1} fill="#0D6EFD" />
                                    <circle cx={17} cy={1} r={1} fill="#0D6EFD" />
                                </svg>
                                <span className="text-primary btn-text">faq &amp; a.</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={2} viewBox="0 0 18 2" fill="none">
                                    <circle cx={1} cy={1} r={1} fill="#0D6EFD" />
                                    <circle opacity="0.5" cx={9} cy={1} r={1} fill="#0D6EFD" />
                                    <circle opacity="0.2" cx={17} cy={1} r={1} fill="#0D6EFD" />
                                </svg>
                            </span>
                            <h2 className="text-dark my-3 text-anime-style-3">
                                Get every single
                                <span className="text-primary">
                                    answer <br />
                                </span>
                                from here
                            </h2>
                        </div>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="bg-white rounded-4 p-4 h-100" data-aos="fade-up" data-aos-delay={200}>
                                <Link href="#">
                                    <h6 className="text-primary">
                                        Q. <span className="text-dark text-anime-style-1">What support &amp; service package are available?</span>
                                    </h6>
                                </Link>
                                <p className="mb-0 mt-3">We offer a range of support and service packages tailored to meet various needs, from basic assistance to comprehensive solutions. Please cnt our sales team asap.</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="bg-white rounded-4 p-4 h-100" data-aos="fade-up" data-aos-delay={400}>
                                <Link href="#">
                                    <h6 className="text-primary">
                                        Q. <span className="text-dark text-anime-style-1">How can I make the payment?</span>
                                    </h6>
                                </Link>
                                <p className="mb-0 mt-3">We offer a range of support and service packages tailored to meet various needs, from basic assistance to comprehensive solutions. Please cnt our sales team asap.</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="bg-white rounded-4 p-4 h-100" data-aos="fade-up" data-aos-delay={200}>
                                <Link href="#">
                                    <h6 className="text-primary">
                                        Q. <span className="text-dark text-anime-style-1">How long will I have access to the service?</span>
                                    </h6>
                                </Link>
                                <p className="mb-0 mt-3">We offer a range of support and service packages tailored to meet various needs, from basic assistance to comprehensive solutions. Please cnt our sales team asap.</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="bg-white rounded-4 p-4 h-100" data-aos="fade-up" data-aos-delay={400}>
                                <Link href="#">
                                    <h6 className="text-primary">
                                        Q. <span className="text-dark text-anime-style-1">Do you provide any refund?</span>
                                    </h6>
                                </Link>
                                <p className="mb-0 mt-3">We offer a range of support and service packages tailored to meet various needs, from basic assistance to comprehensive solutions. Please cnt our sales team asap.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
