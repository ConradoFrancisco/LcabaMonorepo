import Link from "next/link";

export default function Section2() {
    return (
        <>
            {/*data-analysis pricing section 2*/}
            <section className="data-analysis-pricing-section-2 position-relative overflow-hidden bg-secondary-2 py-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 mx-md-auto">
                            <div className="text-center mb-6">
                                <span className="btn-text text-primary">Frequently Asked Questions</span>
                                <h2>
                                    Get answers to <br />
                                    common questions.
                                </h2>
                            </div>
                            <div className="accordion">
                                <div className="px-0 card rounded-4 overflow-hidden mb-3 collapse-custom" data-aos="fade-up" data-aos-delay={0}>
                                    <div className="p-0 card-header border-0">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapse-1">
                                            <h6 className="fs-20 mb-0">What services does AstraX provide?</h6>
                                            <span className="arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapse-1" className="collapse" data-bs-parent=".accordion">
                                        <p className="px-3 fs-6 fw-regular">AstraX offers data solutions, analytics, and business process optimization.</p>
                                    </div>
                                </div>
                                <div className="px-0 card rounded-4 overflow-hidden mb-3 collapse-custom" data-aos="fade-up" data-aos-delay={200}>
                                    <div className="p-0 card-header border-0">
                                        <Link className="p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapse-2">
                                            <h6 className="fs-20 mb-0">How can I get started with AstraX?</h6>
                                            <span className="arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapse-2" className="collapse show" data-bs-parent=".accordion">
                                        <p className="px-3 fs-6 fw-regular">Contact us via our website or email, and our team will arrange a consultation to understand your business needs.</p>
                                    </div>
                                </div>
                                <div className="px-0 card rounded-4 overflow-hidden mb-3 collapse-custom" data-aos="fade-up" data-aos-delay={400}>
                                    <div className="p-0 card-header border-0">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapse-3">
                                            <h6 className="fs-20 mb-0">What industries do you work with?</h6>
                                            <span className="arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapse-3" className="collapse" data-bs-parent=".accordion">
                                        <p className="px-3 fs-6 fw-regular">We collaborate with various industries, including finance, retail, technology, and healthcare.</p>
                                    </div>
                                </div>
                                <div className="px-0 card rounded-4 overflow-hidden mb-3 collapse-custom" data-aos="fade-up" data-aos-delay={600}>
                                    <div className="p-0 card-header border-0">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapse-4">
                                            <h6 className="fs-20 mb-0">How long does it take to implement a data solution?</h6>
                                            <span className="arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapse-4" className="collapse" data-bs-parent=".accordion">
                                        <p className="px-3 fs-6 fw-regular">The implementation time depends on specific requirements, typically ranging from a few weeks to several months.</p>
                                    </div>
                                </div>
                                <div className="px-0 card rounded-4 overflow-hidden mb-3 collapse-custom" data-aos="fade-up" data-aos-delay={800}>
                                    <div className="p-0 card-header border-0">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapse-5">
                                            <h6 className="fs-20 mb-0">What is your pricing structure?</h6>
                                            <span className="arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapse-5" className="collapse" data-bs-parent=".accordion">
                                        <p className="px-3 fs-6 fw-regular">Pricing is flexible based on business needs. Please contact us for details.</p>
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
