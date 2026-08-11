import Link from "next/link";

export default function Section3() {
    return (
        <>
            {/*business-services section 3*/}
            <section className="business-services-section-3 position-relative overflow-hidden py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <span className="d-flex align-items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={2} viewBox="0 0 18 2" fill="none">
                                    <circle opacity="0.2" cx={1} cy={1} r={1} fill="#0D6EFD" />
                                    <circle opacity="0.5" cx={9} cy={1} r={1} fill="#0D6EFD" />
                                    <circle cx={17} cy={1} r={1} fill="#0D6EFD" />
                                </svg>
                                <span className="text-primary btn-text">OUR SKILLS</span>
                            </span>
                            <h2 className="text-dark mt-4 mb-4 text-anime-style-3">Our Expertise Position of Provide Business Solutions</h2>
                            <p className="pb-4 ">Empowering Your Business Growth with Tailored Strategies, Innovative Solutions, and Expert Insights to Drive Success, Enhance Efficiency, and Achieve Long-Term Sustainability in a Competitive Market.</p>
                            <div className="pe-lg-10 rounded-4">
                                <div className="position-relative py-5">
                                    <div className="progress position-relative overflow-visible" role="progressbar" aria-label="Basic example" aria-valuenow={95} aria-valuemin={0} aria-valuemax={95}>
                                        <div className="progress-bar rounded-pill wow img-custom-anim-left" style={{ width: "95%" }} />
                                    </div>
                                    <span className="position-absolute top-0 start-0 mb-2 fs-7">Strategic Planning &amp; Analysis</span>
                                    <span className="text-opacity-50 position-absolute top-0 end-0 mt-2 fs-7">95%</span>
                                </div>
                                <div className="position-relative py-5">
                                    <div className="progress position-relative overflow-visible" role="progressbar" aria-label="Basic example" aria-valuenow={78} aria-valuemin={0} aria-valuemax={78}>
                                        <div className="progress-bar rounded-pill wow img-custom-anim-left" style={{ width: "78%" }} />
                                    </div>
                                    <span className="position-absolute top-0 start-0 mb-2 fs-7">Market Research &amp; Insights</span>
                                    <span className="text-opacity-50 position-absolute top-0 end-0 mt-2 fs-7">78%</span>
                                </div>
                                <div className="position-relative py-5">
                                    <div className="progress position-relative overflow-visible" role="progressbar" aria-label="Basic example" aria-valuenow={92} aria-valuemin={0} aria-valuemax={92}>
                                        <div className="progress-bar rounded-pill wow img-custom-anim-left" style={{ width: "92%" }} />
                                    </div>
                                    <span className="position-absolute top-0 start-0 mb-2 fs-7">Operational Efficiency Optimization</span>
                                    <span className="text-opacity-50 position-absolute top-0 end-0 mt-2 fs-7">92%</span>
                                </div>
                                <div className="position-relative py-5">
                                    <div className="progress position-relative overflow-visible" role="progressbar" aria-label="Basic example" aria-valuenow={85} aria-valuemin={0} aria-valuemax={85}>
                                        <div className="progress-bar rounded-pill wow img-custom-anim-left" style={{ width: "85%" }} />
                                    </div>
                                    <span className="position-absolute top-0 start-0 mb-2 fs-7">Financial Management &amp; Forecasting</span>
                                    <span className="text-opacity-50 position-absolute top-0 end-0 mt-2 fs-7">85%</span>
                                </div>
                                <div className="position-relative py-5">
                                    <div className="progress position-relative overflow-visible" role="progressbar" aria-label="Basic example" aria-valuenow={97} aria-valuemin={0} aria-valuemax={97}>
                                        <div className="progress-bar rounded-pill wow img-custom-anim-left" style={{ width: "97%" }} />
                                    </div>
                                    <span className="position-absolute top-0 start-0 mb-2 fs-7">Change Management &amp; Transformation</span>
                                    <span className="text-opacity-50 position-absolute top-0 end-0 mt-2 fs-7">97%</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-none d-md-block mt-lg-0 mt-8">
                            <div className="position-relative">
                                <svg data-aos="zoom-in" data-aos-delay={500} xmlns="http://www.w3.org/2000/svg" width={592} height={609} viewBox="0 0 592 609" fill="none">
                                    <path d="M45.658 443.47L104.844 140.139L344.126 59.2107L535.487 224.166L487.68 469.18L248.34 550.121L147.07 462.792L194.704 218.666L321.373 175.821L422.69 263.151L397.814 390.644L271.098 433.487L259.867 423.807L284.569 297.21L355.369 273.247L309.995 234.137L239.633 257.957L203.471 443.288L259.719 491.804L442.75 429.897L479.086 243.67L332.747 117.527L149.775 179.415L90.6816 482.275L236.961 608.437L532.604 508.454L591.876 204.683L355.505 0.894134L59.9076 100.886L0.636016 404.657L45.658 443.47Z" fill="#0867F3" />
                                </svg>
                                <img className="position-absolute top-50 start-50 translate-middle" src="assets/imgs/pages/business/page-services/author-1.png" alt="AstraX" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
