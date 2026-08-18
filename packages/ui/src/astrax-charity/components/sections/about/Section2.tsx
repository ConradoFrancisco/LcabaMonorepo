import Link from "next/link";

export default function Section2() {
    return (
        <>
            {/*charity-about section 2*/}
            <section className="charity-about-section-2 position-relative bg-light overflow-hidden py-120">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-5">
                            <div className="number-step d-flex align-items-center gap-3">
                                <i className="fa-solid fa-heart text-primary" />
                                <span className="btn-text">our expertise</span>
                            </div>
                            <h2 className="text-dark my-3 text-anime-style-3 mb-5">
                                People Any
                                <span className="bg-white border border-dark rounded-5 px-2">Question</span>
                                Let Me answer?
                            </h2>
                            <Link href="#" className="btn btn-primary hover-up">
                                <span className="text-dark">Got Questions?</span>
                                <img src="assets/imgs/pages/charity/icons/arrow-right.svg" alt="AstraX" />
                            </Link>
                            <div className="rate-stars d-flex gap-5 mt-5">
                                <div className="border-end pe-5 ">
                                    <h1 className="mb-0 ">4.9</h1>
                                    <div className="stars">
                                        <i className="ri-star-fill text-yellow fs-10" />
                                        <i className="ri-star-fill text-yellow fs-10" />
                                        <i className="ri-star-fill text-yellow fs-10" />
                                        <i className="ri-star-fill text-yellow fs-10" />
                                        <i className="ri-star-fill text-yellow fs-10" />
                                    </div>
                                    <span className="fw-regular fs-7 ">2999 Ratings</span>
                                </div>
                                <div>
                                    <h1 className="mb-0 ">5k+</h1>
                                    <p className="fw-regular fs-7">
                                        Amazing team to care <br className="d-block" />
                                        for projects
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 ms-lg-auto">
                            <div className="accordion">
                                <div className="px-0 card collapse-custom bg-light border-0 mb-4" data-aos="fade-up" data-aos-delay={200}>
                                    <div className="p-0 card-header border-0">
                                        <Link className="justify-content-between collapsed py-4 fw-bold d-flex align-items-center" data-bs-toggle="collapse" href="#collapse1">
                                            <h6 className="mb-0 fs-20 ps-4">
                                                <span>How can I donate to your charity?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapse1" className="rounded-bottom-3 collapse" data-bs-parent=".accordion">
                                        <p className="px-3 fs-6 fw-regular opacity-50 ps-4">After defining a clear strategy, we craft a comprehensive roadmap that outlines project timelines, critical milestones, and the most effective approach to achieving measurable results.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom bg-light border-0 mb-4 active" data-aos="fade-up" data-aos-delay={400}>
                                    <div className="p-0 card-header border-0">
                                        <Link className="justify-content-between py-4 fw-bold d-flex align-items-center" data-bs-toggle="collapse" href="#collapse2">
                                            <h6 className="mb-0 fs-20 ps-4">
                                                <span>Is my donation tax-deductible?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapse2" className="rounded-bottom-3 collapse show" data-bs-parent=".accordion">
                                        <p className="px-3 fs-6 fw-regular opacity-50 ps-4">Once we have a clear strategy, we create a detailed roadmap. This outlines project timelines, key the milestones, an the best approach to ensure every step drives measurable and results</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom bg-light border-0 mb-4" data-aos="fade-up" data-aos-delay={600}>
                                    <div className="p-0 card-header border-0">
                                        <Link className="justify-content-between collapsed py-4 fw-bold d-flex align-items-center" data-bs-toggle="collapse" href="#collapse3">
                                            <h6 className="mb-0 fs-20 ps-4">
                                                <span>Do you accept in-kind donations?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapse3" className="rounded-bottom-3 collapse" data-bs-parent=".accordion">
                                        <p className="px-3 fs-6 fw-regular opacity-50 ps-5">With a well-defined strategy in place, we develop a structured roadmap that details key milestones, project timelines, and optimal methods to ensure each step contributes to tangible success.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom bg-light border-0" data-aos="fade-up" data-aos-delay={800}>
                                    <div className="p-0 card-header border-0">
                                        <Link className="justify-content-between collapsed py-4 fw-bold d-flex align-items-center" data-bs-toggle="collapse" href="#collapse4">
                                            <h6 className="mb-0 fs-20 ps-4">
                                                <span>How can I stay updated on your work?</span>
                                            </h6>
                                            <span className="me-3 arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapse4" className="rounded-bottom-3 collapse" data-bs-parent=".accordion">
                                        <p className="px-3 fs-6 fw-regular opacity-50 ps-5">Once our strategy is set, we map out a detailed plan that highlights essential milestones, establishes clear timelines, and optimizes the path to measurable outcomes.</p>
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
