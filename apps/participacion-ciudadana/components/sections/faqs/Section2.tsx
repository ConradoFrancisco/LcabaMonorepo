import Link from "next/link";

export default function Section2() {
    return (
        <>
            {/*seo-agency faqs section 2*/}
            <section className="seo-agency-faqs-section-2 position-relative overflow-hidden pb-80">
                <div className="container position-relative z-1">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="accordion3">
                                <div className="px-0 card collapse-custom rounded-0 mb-3" data-aos="fade-up" data-aos-delay={0}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapses1">
                                            <h6 className="mb-0 fs-20">
                                                <span>What industries do you specialize in for Digital Marketing?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapses1" className="collapse" data-bs-parent=".accordion3">
                                        <p className="pe-3 fs-6 fw-regular ps-3">We use advanced tools for audience segmentation and analytics to identify and target the most relevant demographics based on your goals, ensuring high engagement and conversions.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom rounded-0 mb-3" data-aos="fade-up" data-aos-delay={200}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapses2">
                                            <h6 className="mb-0 fs-20">
                                                <span> How do you ensure my campaigns are targeting the right audience?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapses2" className="collapse show" data-bs-parent=".accordion3">
                                        <p className="pe-3 fs-6 fw-regular ps-3">We use advanced tools for audience segmentation and analytics to identify and target the most relevant demographics based on your goals, ensuring high engagement and conversions.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom rounded-0 mb-3" data-aos="fade-up" data-aos-delay={400}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapses3">
                                            <h6 className="mb-0 fs-20">
                                                <span>Do you offer social media management as part of your services?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapses3" className="collapse" data-bs-parent=".accordion3">
                                        <p className="pe-3 fs-6 fw-regular ps-3">We use advanced tools for audience segmentation and analytics to identify and target the most relevant demographics based on your goals, ensuring high engagement and conversions.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom rounded-0 mb-3" data-aos="fade-up" data-aos-delay={600}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapses4">
                                            <h6 className="mb-0 fs-20">
                                                <span>Can you help with branding and design for digital campaigns?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapses4" className="collapse" data-bs-parent=".accordion3">
                                        <p className="pe-3 fs-6 fw-regular ps-3">We use advanced tools for audience segmentation and analytics to identify and target the most relevant demographics based on your goals, ensuring high engagement and conversions.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom rounded-0 mb-3" data-aos="fade-up" data-aos-delay={800}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapses5">
                                            <h6 className="mb-0 fs-20">
                                                <span>How much does Digital Marketing cost?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapses5" className="collapse" data-bs-parent=".accordion3">
                                        <p className="pe-3 fs-6 fw-regular ps-3">We use advanced tools for audience segmentation and analytics to identify and target the most relevant demographics based on your goals, ensuring high engagement and conversions.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mt-5">
                            <div className="position-relative text-center">
                                <img data-aos="zoom-in" src="assets/imgs/pages/seo-agency/page-faqs/img-3.png" alt="AstraX" />
                                <Link href="/contact" className="btn btn-primary mt-4" data-aos="zoom-in">
                                    let’s talk
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                        <g clipPath="url(#clip0_1555_538)">
                                            <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="white" />
                                        </g>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
