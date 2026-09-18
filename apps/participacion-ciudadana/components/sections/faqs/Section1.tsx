import Link from "next/link";

export default function Section1() {
    return (
        <>
            {/*seo-agency faqs section 1*/}
            <section className="seo-agency-faqs-section-1 position-relative overflow-hidden py-80">
                <div className="container position-relative z-1">
                    <div className="row">
                        <div className="col-lg-4 mb-5">
                            <div className="position-relative">
                                <img className="wow img-custom-anim-left" src="assets/imgs/pages/seo-agency/page-faqs/img-1.png" alt="AstraX" />
                                <div className="position-absolute top-50 end-0 mt-8 pe-5 d-none d-lg-block">
                                    <img data-aos="fade-up-left" data-aos-delay={500} src="assets/imgs/pages/seo-agency/page-faqs/img-2.png" alt="AstraX" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="accordion2">
                                <div className="px-0 card collapse-custom rounded-0 mb-3" data-aos="fade-up" data-aos-delay={0}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapses-1">
                                            <h6 className="mb-0 fs-20">
                                                <span>What does your Digital Marketing service include?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapses-1" className="collapse" data-bs-parent=".accordion2">
                                        <p className="pe-3 fs-6 fw-regular ps-3">Results can vary depending on the strategy. For example, PPC campaigns can yield immediate results, while SEO and content marketing may take several months to show significant improvements. We provide regular updates to track progress.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom rounded-0 mb-3" data-aos="fade-up" data-aos-delay={200}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapses-2">
                                            <h6 className="mb-0 fs-20">
                                                <span> How long does it take to see results from Digital Marketing?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapses-2" className="collapse show" data-bs-parent=".accordion2">
                                        <p className="pe-3 fs-6 fw-regular ps-3">Results can vary depending on the strategy. For example, PPC campaigns can yield immediate results, while SEO and content marketing may take several months to show significant improvements. We provide regular updates to track progress.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom rounded-0 mb-3" data-aos="fade-up" data-aos-delay={400}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapses-3">
                                            <h6 className="mb-0 fs-20">
                                                <span>Your goals are at the center of everything?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapses-3" className="collapse" data-bs-parent=".accordion2">
                                        <p className="pe-3 fs-6 fw-regular ps-3">Results can vary depending on the strategy. For example, PPC campaigns can yield immediate results, while SEO and content marketing may take several months to show significant improvements. We provide regular updates to track progress.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom rounded-0 mb-3" data-aos="fade-up" data-aos-delay={600}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapses-4">
                                            <h6 className="mb-0 fs-20">
                                                <span>Do you work with businesses of all sizes?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapses-4" className="collapse" data-bs-parent=".accordion2">
                                        <p className="pe-3 fs-6 fw-regular ps-3">Results can vary depending on the strategy. For example, PPC campaigns can yield immediate results, while SEO and content marketing may take several months to show significant improvements. We provide regular updates to track progress.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom rounded-0 mb-3" data-aos="fade-up" data-aos-delay={800}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapses-5">
                                            <h6 className="mb-0 fs-20">
                                                <span>How do you measure the success of a campaign?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapses-5" className="collapse" data-bs-parent=".accordion2">
                                        <p className="pe-3 fs-6 fw-regular ps-3">Results can vary depending on the strategy. For example, PPC campaigns can yield immediate results, while SEO and content marketing may take several months to show significant improvements. We provide regular updates to track progress.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom rounded-0 mb-3" data-aos="fade-up" data-aos-delay={200}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapses-6">
                                            <h6 className="mb-0 fs-20">
                                                <span>Can I choose specific services, or do I need a complete package?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapses-6" className="collapse" data-bs-parent=".accordion2">
                                        <p className="pe-3 fs-6 fw-regular ps-3">Results can vary depending on the strategy. For example, PPC campaigns can yield immediate results, while SEO and content marketing may take several months to show significant improvements. We provide regular updates to track progress.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom rounded-0 mb-3" data-aos="fade-up" data-aos-delay={200}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapses-7">
                                            <h6 className="mb-0 fs-20">
                                                <span>What industries do you specialize in for Digital Marketing?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapses-7" className="collapse" data-bs-parent=".accordion2">
                                        <p className="pe-3 fs-6 fw-regular ps-3">Results can vary depending on the strategy. For example, PPC campaigns can yield immediate results, while SEO and content marketing may take several months to show significant improvements. We provide regular updates to track progress.</p>
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
