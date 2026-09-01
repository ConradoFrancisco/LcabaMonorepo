import Link from "next/link";

export default function Section1() {
    return (
        <>
            {/*data-analysis contact section 1*/}
            <section className="data-analysis-contact-section-1 position-relative overflow-hidden py-120">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 ms-lg-auto mt-lg-0 mt-5 d-none d-lg-block">
                            <div data-aos="fade-right">
                                <img className="rounded-4" src="assets/imgs/pages/data-analysis/page-child/img-7.png" alt="AstraX" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-12 wow img-custom-anim-top">
                            <span className="btn-text fs-7 text-primary">let’s talk</span>
                            <h2 className="mb-6 mt-3 text-anime-style-2">Tell us about your project</h2>
                            <form action="#" className="input-group mb-3 mt-4 position-relative">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="username" className="fs-7 fw-bold mb-3">
                                            Full name
                                        </label>
                                        <input type="text" className="py-3 form-control username border-dark rounded-4" name="name" placeholder="Enter here" id="username" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="fs-7 fw-bold mb-3">
                                            Email address
                                        </label>
                                        <input type="text" className="py-3 form-control email border-dark rounded-4" name="name" placeholder="Enter here" id="email" />
                                    </div>
                                    <div className="col-12 mt-5">
                                        <label htmlFor="message" className="fs-7 fw-bold mb-3">
                                            Message
                                        </label>
                                        <textarea name="message" id="message" cols={30} rows={8} className="py-3 form-control website border-dark rounded-4" placeholder="Enter here" defaultValue={""} />
                                    </div>
                                    <div className="col-12 mt-5">
                                        <button className="btn btn-primary hover-up" type="submit" aria-label="submit">
                                            <span>get a quote</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                                <g clipPath="url(#clip0_886_362)">
                                                    <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="white" />
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row g-5 pt-120">
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={0}>
                            <div className=" pe-md-10">
                                <h6 className="pb-2 mb-4 border-bottom border-2">Head office</h6>
                                <Link href="#">
                                    <p className="mb-0">350 5th Avenue, 59th Floor, New York, NY 10118, USA</p>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={200}>
                            <div className=" pe-md-10">
                                <h6 className="pb-2 mb-4 border-bottom border-2">Send a message</h6>
                                <Link href="#">
                                    <p className="mb-0">sales@astrax-studio.com</p>
                                </Link>
                                <Link href="#">
                                    <p className="mb-0">contact@astrax-studio.com</p>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={400}>
                            <div className=" pe-md-10">
                                <h6 className="pb-2 mb-4 border-bottom border-2">Booking on call</h6>
                                <Link href="#">
                                    <p className="mb-0">Phone: +1 (212) 555-7890</p>
                                </Link>
                                <Link href="#">
                                    <p className="mb-0">Fax: +1 (20) 7946 0123</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
