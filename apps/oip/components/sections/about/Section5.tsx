import Link from "next/link";

export default function Section5() {
    return (
        <>
            {/*data-analysis-home section 5*/}
            <section className="data-analysis-home-section-5 position-relative overflow-hidden py-100">
                <div className="container">
                    <div className="text-center mb-80">
                        <span className="btn-text text-primary">our Team</span>
                        <h2 className="mb-0 text-anime-style-2">
                            The team that <br />
                            makes it all possible
                        </h2>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={200}>
                            <div className="card-team hover-up">
                                <div className="card-team-img">
                                    <Link href="#" className="zoom-img w-100 rounded-4 overflow-hidden d-inline-flex">
                                        <img className="w-100" src="assets/imgs/pages/data-analysis/page-child/card-team-1.png" alt="AstraX" />
                                    </Link>
                                </div>
                                <div className="card-team-content mt-3">
                                    <Link href="#">
                                        <h6 className="mb-2">James Carter</h6>
                                    </Link>
                                    <p className="mb-0">Co Founder &amp; CEO</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={400}>
                            <div className="card-team hover-up">
                                <div className="card-team-img">
                                    <Link href="#" className="zoom-img w-100 rounded-4 overflow-hidden d-inline-flex">
                                        <img className="w-100" src="assets/imgs/pages/data-analysis/page-child/card-team-2.png" alt="AstraX" />
                                    </Link>
                                </div>
                                <div className="card-team-content mt-3">
                                    <Link href="#">
                                        <h6 className="mb-2">Daniel Hayes</h6>
                                    </Link>
                                    <p className="mb-0">Chairman</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={600}>
                            <div className="card-team hover-up">
                                <div className="card-team-img">
                                    <Link href="#" className="zoom-img w-100 rounded-4 overflow-hidden d-inline-flex">
                                        <img className="w-100" src="assets/imgs/pages/data-analysis/page-child/card-team-3.png" alt="AstraX" />
                                    </Link>
                                </div>
                                <div className="card-team-content mt-3">
                                    <Link href="#">
                                        <h6 className="mb-2">Olivia Bennett</h6>
                                    </Link>
                                    <p className="mb-0">Marketing Manager</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={800}>
                            <div className="card-team hover-up">
                                <div className="card-team-img">
                                    <Link href="#" className="zoom-img w-100 rounded-4 overflow-hidden d-inline-flex">
                                        <img className="w-100" src="assets/imgs/pages/data-analysis/page-child/card-team-4.png" alt="AstraX" />
                                    </Link>
                                </div>
                                <div className="card-team-content mt-3">
                                    <Link href="#">
                                        <h6 className="mb-2">Emily Sinclair</h6>
                                    </Link>
                                    <p className="mb-0">Tech consultant</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
