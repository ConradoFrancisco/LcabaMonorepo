import Link from "next/link";

export default function Section8() {
    return (
        <>
            {/*data-analysis home section 8*/}
            <section className="data-analysis-home-section-8 position-relative overflow-hidden py-120 bg-secondary-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="text-center hover-up">
                                <span className="btn-text text-primary">process</span>
                                <h2 className="text-anime-style-2">How it works anyway</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-6 g-4">
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay={200}>
                            <div className="text-center hover-up">
                                <Link href="#">
                                    <img src="assets/imgs/pages/data-analysis/page-home/home-section-8/img-1.png" alt="AstraX" />
                                </Link>
                                <Link href="#">
                                    <h6 className="mt-5">Discovery &amp; Analysis</h6>
                                </Link>
                                <p className="mt-3">
                                    Through AI-powered chatbots and <br />
                                    recommendation engines.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay={400}>
                            <div className="text-center hover-up">
                                <Link href="#">
                                    <img src="assets/imgs/pages/data-analysis/page-home/home-section-8/img-2.png" alt="AstraX" />
                                </Link>
                                <Link href="#">
                                    <h6 className="mt-5">Strategy Development</h6>
                                </Link>
                                <p className="mt-3">
                                    Through AI-powered chatbots and <br />
                                    recommendation engines.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-up" data-aos-delay={600}>
                            <div className="text-center hover-up">
                                <Link href="#">
                                    <img src="assets/imgs/pages/data-analysis/page-home/home-section-8/img-3.png" alt="AstraX" />
                                </Link>
                                <Link href="#">
                                    <h6 className="mt-5">Launch &amp; Execution</h6>
                                </Link>
                                <p className="mt-3">
                                    Through AI-powered chatbots and <br />
                                    recommendation engines.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
