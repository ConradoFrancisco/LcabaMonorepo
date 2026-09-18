import Link from "next/link";

export default function Section2() {
    return (
        <>
            {/*seo-agency blog-details section 1*/}
            <section className="seo-agency-blog-details-section-2 position-relative overflow-hidden py-80 border-top">
                <div className="container">
                    <div className="text-center mb-5">
                        <h4>Related articles</h4>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6">
                            <div className="card-blog border rounded-4 hover-up p-3 h-100" data-aos="fade-up" data-aos-delay={0}>
                                <Link href="#">
                                    <img className="rounded-3" src="assets/imgs/pages/seo-agency/page-blog/img-10.png" alt="AstraX" />
                                </Link>
                                <div className="card-body p-2 pt-4">
                                    <Link href="#">
                                        <span className="tag-blog text-primary bg-light-2 px-3 py-2 rounded-3">Social Advertising</span>
                                    </Link>
                                    <Link href="#">
                                        <h6 className="pt-4">Mobile Marketing: Reaching Your Audience on the Go</h6>
                                    </Link>
                                    <div className="d-flex align-items-center flex-wrap mt-6">
                                        <Link href="#" className="d-flex align-items-center">
                                            <span className="icon-shape icon-md rounded-circle overflow-hidden">
                                                <img src="assets/imgs/pages/seo-agency/page-blog/avatar-8.png" alt="AstraX" />
                                            </span>
                                            <span className="ms-2">
                                                <p className="mb-0">Tracey Wilson</p>
                                                <p className="mb-0 d-lg-none d-block">August 20, 2022</p>
                                            </span>
                                        </Link>
                                        <p className="mb-0 ms-lg-4 ms-7 d-lg-block d-none">August 20, 2022</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card-blog border rounded-4 hover-up p-3 h-100" data-aos="fade-up" data-aos-delay={200}>
                                <Link href="#">
                                    <img className="rounded-3" src="assets/imgs/pages/seo-agency/page-blog/img-11.png" alt="AstraX" />
                                </Link>
                                <div className="card-body p-2 pt-4">
                                    <Link href="#">
                                        <span className="tag-blog text-primary bg-light-2 px-3 py-2 rounded-3">Digital Marketing</span>
                                    </Link>
                                    <Link href="#">
                                        <h6 className="pt-4">What Makes a Digital Marketing Campaign Successful?</h6>
                                    </Link>
                                    <div className="d-flex align-items-center flex-wrap mt-6">
                                        <Link href="#" className="d-flex align-items-center">
                                            <span className="icon-shape icon-md rounded-circle overflow-hidden">
                                                <img src="assets/imgs/pages/seo-agency/page-blog/avatar-9.png" alt="AstraX" />
                                            </span>
                                            <span className="ms-2">
                                                <p className="mb-0">Tracey Wilson</p>
                                                <p className="mb-0 d-lg-none d-block">August 20, 2022</p>
                                            </span>
                                        </Link>
                                        <p className="mb-0 ms-lg-4 ms-7 d-lg-block d-none">August 20, 2022</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card-blog border rounded-4 hover-up p-3 h-100" data-aos="fade-up" data-aos-delay={400}>
                                <Link href="#">
                                    <img className="rounded-3" src="assets/imgs/pages/seo-agency/page-blog/img-12.png" alt="AstraX" />
                                </Link>
                                <div className="card-body p-2 pt-4">
                                    <Link href="#">
                                        <span className="tag-blog text-primary bg-light-2 px-3 py-2 rounded-3">Brand Strategy</span>
                                    </Link>
                                    <Link href="#">
                                        <h6 className="pt-4">The Impact of Video Marketing on Consumer Engagement</h6>
                                    </Link>
                                    <div className="d-flex align-items-center flex-wrap mt-6">
                                        <Link href="#" className="d-flex align-items-center">
                                            <span className="icon-shape icon-md rounded-circle overflow-hidden">
                                                <img src="assets/imgs/pages/seo-agency/page-blog/avatar-10.png" alt="AstraX" />
                                            </span>
                                            <span className="ms-2">
                                                <p className="mb-0">Tracey Wilson</p>
                                                <p className="mb-0 d-lg-none d-block">August 20, 2022</p>
                                            </span>
                                        </Link>
                                        <p className="mb-0 ms-lg-4 ms-7 d-lg-block d-none">August 20, 2022</p>
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
