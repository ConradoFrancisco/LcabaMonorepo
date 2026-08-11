import Link from "next/link";

export default function Section5() {
    return (
        <>
            {/*business section 5*/}
            <section className="business-section-5 position-relative overflow-hidden pb-md-250 pb-8">
                <div className="container position-relative z-1">
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-md-10">
                            <span className="d-flex align-items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={2} viewBox="0 0 18 2" fill="none">
                                    <circle opacity="0.2" cx={1} cy={1} r={1} fill="#0D6EFD" />
                                    <circle opacity="0.5" cx={9} cy={1} r={1} fill="#0D6EFD" />
                                    <circle cx={17} cy={1} r={1} fill="#0D6EFD" />
                                </svg>
                                <span className="text-primary btn-text">fun fact about us</span>
                            </span>
                            <h2 className="text-dark my-3 text-anime-style-3">Your digital business starts here.</h2>
                            <p className="pb-4 wow img-custom-anim-top">We offer a wide range of digital marketing services that cater to businesses of all sizes. A forward-thinking and clever approach to maintaining sales tax compliance amidst the digital era.</p>
                            <div className="row g-2 position-relative align-items-center justify-content-between">
                                <div className="col d-flex align-items-center">
                                    <div className="counter-item-cover counter-item">
                                        <div className="content text-center mx-auto">
                                            <h2 className="stroke-blue text-nowrap">
                                                <span className="odometer text-nowrap" data-count={4} />.
                                                <span className="odometer text-nowrap" data-count={3} />
                                                k+
                                            </h2>
                                        </div>
                                    </div>
                                    <p className="ms-3 text-dark">
                                        Website’s
                                        <br className="d-block" />
                                        Powering
                                    </p>
                                </div>
                                <div className="col d-flex align-items-center pe-lg-8 ">
                                    <span className="line-verticarl h-50 ms-4 position-absolute top-50 start-50 translate-middle d-none d-md-block" />
                                    <div className="counter-item-cover counter-item ms-md-auto">
                                        <div className="content ">
                                            <h2 className="stroke-blue text-nowrap">
                                                <span className="odometer text-nowrap" data-count={7} />
                                                M+
                                            </h2>
                                        </div>
                                    </div>
                                    <p className="ms-3 text-dark">
                                        Chats in <br className="d-block" />
                                        Last 2002
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <div className="position-relative d-inline-block mt-lg-0 mt-5">
                                <img data-aos="zoom-in" data-aos-delay={500} className="rounded-4 shadow position-relative z-1" src="assets/imgs/pages/business/page-home/home-section-5/img-1.png" alt="AstraX" />
                                <Link href="https://www.youtube.com/watch?v=gXFATcwrO-U" className="play-btn popup-video z-2  position-absolute top-50 start-50 translate-middle icon-shape icon-100 rounded-circle text-dark">
                                    <svg className="fill-primary" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" fill="none">
                                        <g clipPath="url(#clip0_349_659)">
                                            <path className="fill-primary" d="M3.82909 0.396886C2.20629 -0.533976 0.890625 0.228597 0.890625 2.09878V15.8999C0.890625 17.772 2.20629 18.5335 3.82909 17.6036L15.892 10.6856C17.5153 9.75439 17.5153 8.24572 15.892 7.31475L3.82909 0.396886Z" fill="#0D6EFD" />
                                        </g>
                                    </svg>
                                </Link>
                                <span data-aos="fade-up-left">
                                    <img className="rounded-4 position-absolute top-100 start-100 translate-middle z-0 ms-5 d-none d-md-block" src="assets/imgs/pages/business/page-home/home-section-5/img-2.png" alt="AstraX" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
