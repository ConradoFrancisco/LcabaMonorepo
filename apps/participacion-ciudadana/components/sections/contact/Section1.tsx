import Link from "next/link";

export default function Section1() {
    return (
        <>
            {/*coworking-space contact section 1*/}
            <section className="coworking-space-contact-section-1 position-relative overflow-hidden">
                <div className="container-fluid wow img-custom-anim-top">
                    <div className="contact-map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25279991725!2d-74.1444877707482!3d40.697631233381586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2zVGjDoG5oIHBo4buRIE5ldyBZb3JrLCBUaeG7g3UgYmFuZyBOZXcgWW9yaywgSG9hIEvhu7M!5e0!3m2!1svi!2s!4v1729152035449!5m2!1svi!2s" width={600} height={450} style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                    </div>
                </div>
                <div className="py-120">
                    <div className="container">
                        <div className="d-flex justify-content-center mb-80">
                            <div className="text-center">
                                <h2 className="stroke text-white text-center pb-2 mb-0 text-anime-style-2">OUR BRANCES</h2>
                                <h2 className="mb-0 text-anime-style-2">Visit another Branch ofice’s</h2>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-lg-4">
                                <div className="card-news position-relative" data-aos="fade-up" data-aos-delay={0}>
                                    <Link href="#" className="card-news-img position-relative d-block">
                                        <img className="w-100" src="assets/imgs/pages/coworking-space/page-contact/img-1.png" alt="AstraX" />
                                        <div className="icon-shape icon-100 rounded-circle bg-primary position-absolute top-100 end-0 translate-middle-y me-5">
                                            <div>
                                                <h6 className="text-white mb-0">380</h6>
                                                <p className="fs-8 fw-regular text-white mb-0">
                                                    space <br className="d-block" />
                                                    available
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="card-news-body border p-4 rounded-top-0 border-top-0">
                                        <div className="card-news-title mt-2 mb-4">
                                            <Link href="#">
                                                <h6 className="fw-bold">New York, USA</h6>
                                            </Link>
                                        </div>
                                        <div className="d-flex gap-2 mb-2">
                                            <i className="fa-solid fa-building text-primary mt-2" />
                                            <p className="fs-7 mb-0 text-dark">
                                                <span className="text-dark fw-semibold">Address:</span> 30 St Mary Axe, London <br />
                                                EC3A 8BF, United Kingdom
                                            </p>
                                        </div>
                                        <div className="d-flex gap-2 mb-2">
                                            <i className="fa-solid fa-phone-volume text-primary" />
                                            <p className="fs-7 mb-0 text-dark">
                                                <span className="text-dark fw-semibold">Phone:</span> +44 (20) 7946 0123
                                            </p>
                                        </div>
                                        <div className="d-flex gap-2 mb-2">
                                            <i className="fa-solid fa-envelope text-primary" />
                                            <p className="fs-7 mb-0 text-dark">
                                                <span className="text-dark fw-semibold">Email:</span> london@astrax-ai.com
                                            </p>
                                        </div>
                                        <div className="d-flex gap-2 mb-2">
                                            <i className="fa-solid fa-envelope text-primary" />
                                            <p className="fs-7 mb-0 text-dark">
                                                <span className="text-dark fw-semibold">Business Hours:</span> <br />
                                                Monday - Friday, 8:00 AM - 5:30 PM (GMT)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card-news position-relative" data-aos="fade-up" data-aos-delay={200}>
                                    <Link href="#" className="card-news-img position-relative d-block">
                                        <img className="w-100" src="assets/imgs/pages/coworking-space/page-contact/img-2.png" alt="AstraX" />
                                        <div className="icon-shape icon-100 rounded-circle bg-primary position-absolute top-100 end-0 translate-middle-y me-5">
                                            <div>
                                                <h6 className="text-white mb-0">170</h6>
                                                <p className="fs-8 fw-regular text-white mb-0">
                                                    space <br className="d-block" />
                                                    available
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="card-news-body border p-4 rounded-top-0 border-top-0">
                                        <div className="card-news-title mt-2 mb-4">
                                            <Link href="#">
                                                <h6 className="fw-bold">London, UK</h6>
                                            </Link>
                                        </div>
                                        <div className="d-flex gap-2 mb-2">
                                            <i className="fa-solid fa-building text-primary mt-2" />
                                            <p className="fs-7 mb-0 text-dark">
                                                <span className="text-dark fw-semibold">Address:</span> 350 5th Avenue, 59th Floor, <br />
                                                New York, NY 10118, USA
                                            </p>
                                        </div>
                                        <div className="d-flex gap-2 mb-2">
                                            <i className="fa-solid fa-phone-volume text-primary" />
                                            <p className="fs-7 mb-0 text-dark">
                                                <span className="text-dark fw-semibold">Phone:</span> +1 (212) 555-7890
                                            </p>
                                        </div>
                                        <div className="d-flex gap-2 mb-2">
                                            <i className="fa-solid fa-envelope text-primary" />
                                            <p className="fs-7 mb-0 text-dark">
                                                <span className="text-dark fw-semibold">Email:</span> nyc@astrax-ai.com
                                            </p>
                                        </div>
                                        <div className="d-flex gap-2 mb-2">
                                            <i className="fa-solid fa-envelope text-primary" />
                                            <p className="fs-7 mb-0 text-dark">
                                                <span className="text-dark fw-semibold">Business Hours:</span> <br />
                                                Monday - Friday, 9:00 AM - 6:00 PM (EST)
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card-news position-relative" data-aos="fade-up" data-aos-delay={400}>
                                    <Link href="#" className="card-news-img position-relative d-block">
                                        <img className="w-100" src="assets/imgs/pages/coworking-space/page-contact/img-3.png" alt="AstraX" />
                                        <div className="icon-shape icon-100 rounded-circle bg-primary position-absolute top-100 end-0 translate-middle-y me-5">
                                            <div>
                                                <h6 className="text-white mb-0">260</h6>
                                                <p className="fs-8 fw-regular text-white mb-0">
                                                    space <br className="d-block" />
                                                    available
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="card-news-body border p-4 rounded-top-0 border-top-0">
                                        <div className="card-news-title mt-2 mb-4">
                                            <Link href="#">
                                                <h6 className="fw-bold">Tokyo, Japan</h6>
                                            </Link>
                                        </div>
                                        <div className="d-flex gap-2 mb-2">
                                            <i className="fa-solid fa-building text-primary mt-2" />
                                            <p className="fs-7 mb-0 text-dark">
                                                <span className="text-dark fw-semibold">Address:</span> 1-1-1 Marunouchi, Chiyoda City, <br />
                                                Tokyo 100-0005, Japan
                                            </p>
                                        </div>
                                        <div className="d-flex gap-2 mb-2">
                                            <i className="fa-solid fa-phone-volume text-primary" />
                                            <p className="fs-7 mb-0 text-dark">
                                                <span className="text-dark fw-semibold">Phone:</span> +81 (3) 5550-6789
                                            </p>
                                        </div>
                                        <div className="d-flex gap-2 mb-2">
                                            <i className="fa-solid fa-envelope text-primary" />
                                            <p className="fs-7 mb-0 text-dark">
                                                <span className="text-dark fw-semibold">Email:</span> tokyo@astrax-ai.com
                                            </p>
                                        </div>
                                        <div className="d-flex gap-2 mb-2">
                                            <i className="fa-solid fa-envelope text-primary" />
                                            <p className="fs-7 mb-0 text-dark">
                                                <span className="text-dark fw-semibold">Business Hours:</span> <br />
                                                Monday - Friday, 9:00 AM - 5:00 PM (JST)
                                            </p>
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
