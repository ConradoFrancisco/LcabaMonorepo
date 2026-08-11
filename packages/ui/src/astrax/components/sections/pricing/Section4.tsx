import Link from "next/link";

export default function Section4() {
    return (
        <>
            {/*business-pricing section 4*/}
            <section className="business-pricing-section-4 position-relative overflow-hidden py-120">
                <div className="container position-relative z-1">
                    <div className="row">
                        <div className="col-lg-4">
                            <h2 className="mb-3 text-anime-style-2">
                                Frequently <br />
                                Asked Question
                            </h2>
                            <p className="mb-5 text-anime-style-1">Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                        </div>
                        <div className="col-lg-8 position-relative">
                            <div className="accordion">
                                <div className="px-0 card collapse-custom mb-3" data-aos="fade-up" data-aos-delay={0}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center" data-bs-toggle="collapse" href="#collapse1">
                                            <span className="me-3 arrow" />
                                            <h6 className="mb-0 fs-20">
                                                <span>Why is university education important?</span>
                                            </h6>
                                        </Link>
                                    </div>
                                    <div id="collapse1" className="collapse" data-bs-parent=".accordion">
                                        <p className="pe-3 fs-6 fw-regular ps-7">We regularly release updates to enhance the functionality and performance of our app. Rest assured, you'll always have access to the latest features and improvements.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom mb-3" data-aos="fade-up" data-aos-delay={200}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="p-3 fw-bold d-flex align-items-center" data-bs-toggle="collapse" href="#collapse2">
                                            <span className="me-3 arrow" />
                                            <h6 className="mb-0 fs-20">
                                                <span>What challenges do university students face?</span>
                                            </h6>
                                        </Link>
                                    </div>
                                    <div id="collapse2" className="collapse show" data-bs-parent=".accordion">
                                        <p className="pe-3 fs-6 fw-regular ps-7">We regularly release updates to enhance the functionality and performance of our app. Rest assured, you'll always have access to the latest features and improvements.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom mb-3" data-aos="fade-up" data-aos-delay={400}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center" data-bs-toggle="collapse" href="#collapse3">
                                            <span className="me-3 arrow" />
                                            <h6 className="mb-0 fs-20">
                                                <span>How can universities support students' well-being?</span>
                                            </h6>
                                        </Link>
                                    </div>
                                    <div id="collapse3" className="collapse" data-bs-parent=".accordion">
                                        <p className="pe-3 fs-6 fw-regular ps-7">We regularly release updates to enhance the functionality and performance of our app. Rest assured, you'll always have access to the latest features and improvements.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom mb-3" data-aos="fade-up" data-aos-delay={600}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center" data-bs-toggle="collapse" href="#collapse4">
                                            <span className="me-3 arrow" />
                                            <h6 className="mb-0 fs-20">
                                                <span>What role do internships play?</span>
                                            </h6>
                                        </Link>
                                    </div>
                                    <div id="collapse4" className="collapse" data-bs-parent=".accordion">
                                        <p className="pe-3 fs-6 fw-regular ps-7">We regularly release updates to enhance the functionality and performance of our app. Rest assured, you'll always have access to the latest features and improvements.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom mb-3" data-aos="fade-up" data-aos-delay={800}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center" data-bs-toggle="collapse" href="#collapse5">
                                            <span className="me-3 arrow" />
                                            <h6 className="mb-0 fs-20">
                                                <span>How valuable is studying abroad?</span>
                                            </h6>
                                        </Link>
                                    </div>
                                    <div id="collapse5" className="collapse" data-bs-parent=".accordion">
                                        <p className="pe-3 fs-6 fw-regular ps-7">We regularly release updates to enhance the functionality and performance of our app. Rest assured, you'll always have access to the latest features and improvements.</p>
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
