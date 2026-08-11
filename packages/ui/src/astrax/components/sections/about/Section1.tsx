import Link from "next/link";

export default function Section1() {
    return (
        <>
            {/*business-about section 1*/}
            <section className="business-about-section-1 position-relative overflow-hidden pt-250-keep pb-100">
                <div className="container position-relative z-1">
                    <div className="row">
                        <div className="text-center mb-5">
                            <span className="d-flex align-items-center justify-content-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={2} viewBox="0 0 18 2" fill="none">
                                    <circle opacity="0.2" cx={1} cy={1} r={1} fill="#0D6EFD" />
                                    <circle opacity="0.5" cx={9} cy={1} r={1} fill="#0D6EFD" />
                                    <circle cx={17} cy={1} r={1} fill="#0D6EFD" />
                                </svg>
                                <span className="text-primary btn-text">About Us</span>
                            </span>
                            <h2 className="text-dark my-3 text-anime-style-3">Our Story</h2>
                            <p className="wow img-custom-anim-left">
                                We take into account every factor of change, providing you with the essential building blocks and components needed <br />
                                to craft a truly professional website—allowing you to save time and stay focused on your goals.
                            </p>
                        </div>
                        <img data-aos="fade-up" src="assets/imgs/pages/business/page-about/img-1.png" alt="AstraX" />
                    </div>
                    <div className="row g-4 position-relative align-items-center justify-content-around pt-100">
                        <div className="col-lg-3 col-md-6 d-flex align-items-center justify-content-center">
                            <div className="counter-item-cover counter-item">
                                <div className="content text-center mx-auto">
                                    <h2 className="stroke-blue text-nowrap">
                                        <span className="odometer text-nowrap" data-count={5} />
                                        k+
                                    </h2>
                                </div>
                            </div>
                            <p className="ms-3 text-dark">
                                Realized
                                <br className="d-block" />
                                Projects
                            </p>
                        </div>
                        <div className="col-lg-3 col-md-6 d-flex align-items-center justify-content-center">
                            <span className="line-verticarl h-50 ms-4 position-absolute top-50 start-50 translate-middle d-none d-md-block" />
                            <div className="counter-item-cover counter-item">
                                <div className="content ">
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
                        <div className="col-lg-3 col-md-6 d-flex align-items-center justify-content-center">
                            <span className="line-verticarl h-50 ms-4 position-absolute top-50 start-50 translate-middle d-none d-md-block" />
                            <div className="counter-item-cover counter-item">
                                <div className="content ">
                                    <h2 className="stroke-blue text-nowrap">
                                        <span className="odometer text-nowrap" data-count={28} />
                                        k+
                                    </h2>
                                </div>
                            </div>
                            <p className="ms-3 text-dark">
                                Awesome <br className="d-block" />
                                Clients
                            </p>
                        </div>
                        <div className="col-lg-3 col-md-6 d-flex align-items-center justify-content-center">
                            <span className="line-verticarl h-50 ms-4 position-absolute top-50 start-50 translate-middle d-none d-md-block" />
                            <div className="counter-item-cover counter-item">
                                <div className="content ">
                                    <h2 className="stroke-blue text-nowrap">
                                        <span className="odometer text-nowrap" data-count={17} />
                                        k+
                                    </h2>
                                </div>
                            </div>
                            <p className="ms-3 text-dark">
                                Trusted <br className="d-block" />
                                Partners
                            </p>
                        </div>
                    </div>
                </div>
                <div className="position-absolute top-0 end-0 z-0">
                    <img src="assets/imgs/pages/business/page-home/home-section-1/bg_stroke.png" alt="AstraX" />
                </div>
                <div className="socials-group position-absolute top-50 start-0 translate-middle-y d-none d-md-block z-2">
                    <div className="socials rotate-90 bg-white px-3 py-2 rounded-pill d-inline-flex d-flex align-items-center justify-content-center">
                        <p className="text-dark mb-0">Follow us:</p>
                        <ul className="list-unstyled d-flex mb-0">
                            <li className="ms-3">
                                <Link href="#">
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                            <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                                        </svg>
                                    </span>
                                </Link>
                            </li>
                            <li className="ms-3">
                                <Link href="#">
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                                        </svg>
                                    </span>
                                </Link>
                            </li>
                            <li className="ms-3">
                                <Link href="#">
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2 .6-8.7 .6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z" />
                                        </svg>
                                    </span>
                                </Link>
                            </li>
                            <li className="ms-3">
                                <Link href="#">
                                    <span className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                                        </svg>
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}
