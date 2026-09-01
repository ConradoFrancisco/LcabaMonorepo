import Link from "next/link";

export default function Section2() {
    return (
        <>
            {/*data-analysis about section 2*/}
            <section className="data-analysis-about-section-2 position-relative overflow-hidden pt-120 pb-120">
                <div className="container">
                    <div className="row wow img-custom-anim-left">
                        <div className="col-12">
                            <nav>
                                <div className="nav nav-tabs flex-lg-nowrap border-bottom-0 mb-7" id="nav-tab" role="tablist">
                                    <button className="nav-link pb-2 active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-mission" aria-label="mission" type="button" role="tab" aria-controls="nav-mission" aria-selected="true">
                                        <span className="d-flex gap-2">
                                            <h2 className="lh-1">01</h2>
                                            <span className="text-start pe-lg-6">
                                                <h4>History</h4>
                                                <p>Founded in 1998 by 3 engineers passionate about technology</p>
                                            </span>
                                        </span>
                                    </button>
                                    <button className="nav-link pb-2" id="nav-vision-tab" data-bs-toggle="tab" data-bs-target="#nav-vision" aria-label="vision" type="button" role="tab" aria-controls="nav-vision" aria-selected="false">
                                        <span className="d-flex gap-2">
                                            <h2 className="lh-1">02</h2>
                                            <span className="text-start pe-lg-6">
                                                <h4>Mission</h4>
                                                <p>Creating world-leading data analytics solutions.</p>
                                            </span>
                                        </span>
                                    </button>
                                    <button className="nav-link pb-2" id="nav-expertise-tab" data-bs-toggle="tab" data-bs-target="#nav-expertise" aria-label="expertise" type="button" role="tab" aria-controls="nav-expertise" aria-selected="false">
                                        <span className="d-flex gap-2">
                                            <h2 className="lh-1">03</h2>
                                            <span className="text-start pe-lg-6">
                                                <h4>Vision</h4>
                                                <p>Covering all industries. Improving data transparency environment.</p>
                                            </span>
                                        </span>
                                    </button>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-mission" role="tabpanel" aria-labelledby="nav-mission-tab" tabIndex={0}>
                                    <div className="container">
                                        <div className="row align-items-center">
                                            <div className="col-lg-6">
                                                <div className="position-relative rounded-4 zoom-img overflow-hidden d-inline-flex">
                                                    <img src="assets/imgs/pages/data-analysis/page-child/img-4.png" alt="AstraX" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <span className="text-primary fs-6 fw-regular">WHO WE ARE</span>
                                                <h3 className="text-anime-style-2 pt-3">Let’s harness the power of data together!</h3>
                                                <p className="py-3">With a strong foundation in data science, big data analytics, and AI-driven solutions, we help businesses make informed decisions, optimize processes, and unlock new opportunities.</p>
                                                <Link href="#" className="btn btn-primary hover-up">
                                                    <span>info@astrax.com</span>
                                                </Link>
                                                <div className="d-flex flex-md-nowrap flex-wrap gap-5 align-items-center mt-5">
                                                    <div className="col-lg-3 d-flex flex-column">
                                                        <h2 className="count mt-4 mb-1">
                                                            &gt;
                                                            <span className="odometer text-nowrap" data-count={98} />%
                                                        </h2>
                                                        <p className="wow img-custom-anim-left">Complete Demos</p>
                                                    </div>
                                                    <div className="col-lg-3 d-flex flex-column">
                                                        <h2 className="count mt-4 mb-1 text-nowrap">
                                                            <span className="odometer text-nowrap" data-count={1250} />+
                                                        </h2>
                                                        <p className="wow img-custom-anim-left">Creative Artboards</p>
                                                    </div>
                                                    <div className="col-lg-3 d-flex flex-column">
                                                        <h2 className="count mt-4 mb-1">
                                                            <span className="odometer text-nowrap" data-count={15} />+
                                                        </h2>
                                                        <p className="wow img-custom-anim-left">Unique Sections</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="nav-vision" role="tabpanel" aria-labelledby="nav-vision-tab" tabIndex={0}>
                                    <div className="container">
                                        <div className="row align-items-center">
                                            <div className="col-lg-6">
                                                <div className="position-relative rounded-4 zoom-img overflow-hidden d-inline-flex">
                                                    <img src="assets/imgs/pages/data-analysis/page-child/img-4.png" alt="AstraX" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <span className="text-primary fs-6 fw-regular">WHO WE ARE</span>
                                                <h3 className="text-anime-style-2 pt-3">Let’s harness the power of data together!</h3>
                                                <p className="py-3">With a strong foundation in data science, big data analytics, and AI-driven solutions, we help businesses make informed decisions, optimize processes, and unlock new opportunities.</p>
                                                <Link href="#" className="btn btn-primary hover-up">
                                                    <span>info@astrax.com</span>
                                                </Link>
                                                <div className="d-flex flex-md-nowrap flex-wrap gap-5 align-items-center mt-5">
                                                    <div className="col-lg-3 d-flex flex-column">
                                                        <h2 className="count mt-4 mb-1">
                                                            &gt;
                                                            <span className="odometer text-nowrap" data-count={98} />%
                                                        </h2>
                                                        <p className="wow img-custom-anim-left">Complete Demos</p>
                                                    </div>
                                                    <div className="col-lg-3 d-flex flex-column">
                                                        <h2 className="count mt-4 mb-1 text-nowrap">
                                                            <span className="odometer text-nowrap" data-count={1250} />+
                                                        </h2>
                                                        <p className="wow img-custom-anim-left">Creative Artboards</p>
                                                    </div>
                                                    <div className="col-lg-3 d-flex flex-column">
                                                        <h2 className="count mt-4 mb-1">
                                                            <span className="odometer text-nowrap" data-count={15} />+
                                                        </h2>
                                                        <p className="wow img-custom-anim-left">Unique Sections</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="nav-expertise" role="tabpanel" aria-labelledby="nav-expertise-tab" tabIndex={0}>
                                    <div className="container">
                                        <div className="row align-items-center">
                                            <div className="col-lg-6">
                                                <div className="position-relative rounded-4 zoom-img overflow-hidden d-inline-flex">
                                                    <img src="assets/imgs/pages/data-analysis/page-child/img-4.png" alt="AstraX" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <span className="text-primary fs-6 fw-regular">WHO WE ARE</span>
                                                <h3 className="text-anime-style-2 pt-3">Let’s harness the power of data together!</h3>
                                                <p className="py-3">With a strong foundation in data science, big data analytics, and AI-driven solutions, we help businesses make informed decisions, optimize processes, and unlock new opportunities.</p>
                                                <Link href="#" className="btn btn-primary hover-up">
                                                    <span>info@astrax.com</span>
                                                </Link>
                                                <div className="d-flex flex-md-nowrap flex-wrap gap-5 align-items-center mt-5">
                                                    <div className="col-lg-3 d-flex flex-column">
                                                        <h2 className="count mt-4 mb-1">
                                                            &gt;
                                                            <span className="odometer text-nowrap" data-count={98} />%
                                                        </h2>
                                                        <p className="wow img-custom-anim-left">Complete Demos</p>
                                                    </div>
                                                    <div className="col-lg-3 d-flex flex-column">
                                                        <h2 className="count mt-4 mb-1 text-nowrap">
                                                            <span className="odometer text-nowrap" data-count={1250} />+
                                                        </h2>
                                                        <p className="wow img-custom-anim-left">Creative Artboards</p>
                                                    </div>
                                                    <div className="col-lg-3 d-flex flex-column">
                                                        <h2 className="count mt-4 mb-1">
                                                            <span className="odometer text-nowrap" data-count={15} />+
                                                        </h2>
                                                        <p className="wow img-custom-anim-left">Unique Sections</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
