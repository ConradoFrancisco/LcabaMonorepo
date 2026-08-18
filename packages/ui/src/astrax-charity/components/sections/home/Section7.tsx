import Link from "next/link";

export default function Section7() {
    return (
        <>
            {/*charity-home section 7*/}
            <section className="charity-home-section-7 position-relative bg-white overflow-hidden pt-120 pb-120">
                <div className="container pt-120 border-top border-dark">
                    <div className="row text-center">
                        <div className="number-step d-flex align-items-center justify-content-center gap-3">
                            <i className="fa-solid fa-heart text-primary" />
                            <span className="btn-text">news &amp; insights</span>
                        </div>
                        <h2 className="text-dark my-3 text-anime-style-3">
                            Astrax charity
                            <span className="bg-white border border-dark rounded-5 px-2">updates</span>
                        </h2>
                    </div>
                    <div className="row mt-80">
                        <div className="d-flex align-items-center justify-content-center flex-wrap flex-lg-nowrap gap-lg-5 gap-4">
                            <div className="card-news zoom-img position-relative" data-aos="fade-up" data-aos-delay={0}>
                                <Link href="#" className="card-news-img position-relative d-block rounded-4 overflow-hidden">
                                    <img className="w-100" src="assets/imgs/pages/charity/page-home/home-section-7/img-1.png" alt="AstraX" />
                                </Link>
                                <div className="card-news-body">
                                    <div className="d-flex card-news-information mt-5 gap-4">
                                        <div className="d-flex align-items-center gap-1">
                                            <img src="assets/imgs/template/icons/icon-1.svg" alt="AstraX" />
                                            <p className="mb-0">December 21, 2025</p>
                                        </div>
                                        <div className="d-flex align-items-center gap-1">
                                            <img src="assets/imgs/template/icons/icon-2.svg" alt="AstraX" />
                                            <span className="opacity-50">By</span>
                                            <Link href="#" className="mb-0">
                                                Admin
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="card-news-title mt-2">
                                        <Link href="#">
                                            <h6 className="fs-20 text-anime-style-3">#01 Brace for the 'big one' cyber attack as always.</h6>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-news zoom-img position-relative" data-aos="fade-up" data-aos-delay={200}>
                                <Link href="#" className="card-news-img position-relative d-block rounded-4 overflow-hidden">
                                    <img className="w-100" src="assets/imgs/pages/charity/page-home/home-section-7/img-2.png" alt="AstraX" />
                                </Link>
                                <div className="card-news-body">
                                    <div className="d-flex card-news-information mt-5 gap-4">
                                        <div className="d-flex align-items-center gap-1">
                                            <img src="assets/imgs/template/icons/icon-1.svg" alt="AstraX" />
                                            <p className="mb-0">December 21, 2025</p>
                                        </div>
                                        <div className="d-flex align-items-center gap-1">
                                            <img src="assets/imgs/template/icons/icon-2.svg" alt="AstraX" />
                                            <span className="opacity-50">By</span>
                                            <Link href="#" className="mb-0">
                                                Admin
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="card-news-title mt-2">
                                        <Link href="#">
                                            <h6 className="fs-20 text-anime-style-3">Company updated with the latest trends &amp; business news.</h6>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-news zoom-img position-relative mb-lg-0 mb-8 align-self-start" data-aos="fade-up" data-aos-delay={400}>
                                <Link href="#" className="card-news-img position-relative d-block rounded-4 overflow-hidden">
                                    <img className="w-100" src="assets/imgs/pages/charity/page-home/home-section-7/img-3.png" alt="AstraX" />
                                </Link>
                                <div className="card-news-body">
                                    <div className="d-flex card-news-information mt-5 gap-4">
                                        <div className="d-flex align-items-center gap-1">
                                            <img src="assets/imgs/template/icons/icon-1.svg" alt="AstraX" />
                                            <p className="mb-0">December 21, 2025</p>
                                        </div>
                                        <div className="d-flex align-items-center gap-1">
                                            <img src="assets/imgs/template/icons/icon-2.svg" alt="AstraX" />
                                            <span className="opacity-50">By</span>
                                            <Link href="#" className="mb-0">
                                                Admin
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="card-news-title mt-2">
                                        <Link href="#">
                                            <h6 className="fs-20 text-anime-style-3">We make the creative solutions for&nbsp;problems!</h6>
                                        </Link>
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
