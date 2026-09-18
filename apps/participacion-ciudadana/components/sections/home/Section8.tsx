import Link from "next/link";

export default function Section8() {
    return (
        <>
            {/*coworking-space-home home section 8*/}
            <section className="coworking-space-home-section-8 pt-120 pb-120 position-relative overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 pe-lg-8">
                            <h2 className="stroke text-white text-start pb-2 mb-0">Let’s catchup us</h2>
                            <h2>here anytime</h2>
                            <div className="d-flex flex-md-row flex-column gap-5 pt-7">
                                <div className="wow fadeInUp2" data-wow-delay=".4s">
                                    <div className="icon">
                                        <svg className="stroke-primary" xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 60 60" fill="none">
                                            <g clipPath="url(#clip0_349_948)">
                                                <path d="M41.25 25C48.845 25 55 30.0375 55 36.25C55 39.7425 53.055 42.8625 50 44.925V50L45.09 47.055C43.8317 47.3522 42.543 47.5015 41.25 47.5C33.655 47.5 27.5 42.4625 27.5 36.25C27.5 30.0375 33.655 25 41.25 25Z" stroke="#0D6EFD" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M27.9925 39.245C26.2675 39.735 24.4175 40 22.5 40C20.2785 40.0048 18.0717 39.6398 15.97 38.92L10 42.5V35.4975C6.9075 32.7925 5 29.0875 5 25C5 16.715 12.835 10 22.5 10C31.955 10 39.6575 16.425 40 24.4625V25.045" stroke="#0D6EFD" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M25 20H25.025" stroke="#0D6EFD" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M17.5 20H17.525" stroke="#0D6EFD" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M37.5 35H37.525" stroke="#0D6EFD" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M45 35H45.025" stroke="#0D6EFD" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                        </svg>
                                    </div>
                                    <h6 className="mt-5 mb-3 fs-20">Phone &amp; Email</h6>
                                    <Link href="telto:(123) 456 789 00">
                                        <p className="mb-0">+(123) 456 789 00</p>
                                    </Link>
                                    <Link href="#">
                                        <p className="mb-0">info@astrax.com</p>
                                    </Link>
                                </div>
                                <div className="wow fadeInUp2" data-wow-delay=".8s">
                                    <div className="icon">
                                        <svg className="stroke-primary" xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 60 60" fill="none">
                                            <g clipPath="url(#clip0_349_2617)">
                                                <path d="M29.8325 12.5H12.5V52.5H45V32.5" stroke="#0D6EFD" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M35 42.5H22.5" stroke="#0D6EFD" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M22.5 32.5H35V22.5H22.5V32.5Z" stroke="#0D6EFD" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M37.5 12.5V7.5" stroke="#0D6EFD" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M45 15L50 10" stroke="#0D6EFD" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M47.5 22.5H52.5" stroke="#0D6EFD" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                            </g>
                                        </svg>
                                    </div>
                                    <h6 className="mt-5 mb-3 fs-20">Locations</h6>
                                    <Link href="https://maps.google.com/maps?q=1st+avenue,New+York">
                                        <p className="mb-0">
                                            12/A, New Booston Tower, <br />
                                            Tokyo, China
                                        </p>
                                    </Link>
                                </div>
                            </div>
                            <Link href="/contact" className="btn btn-primary mt-5" data-aos="fade-up">
                                Let’s Talk
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                    <g clipPath="url(#clip0_1114_435)">
                                        <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="white" />
                                    </g>
                                </svg>
                            </Link>
                            <div className="right d-flex align-items-center gap-3 pe-lg-8 pt-4 mt-6 border-top">
                                <div className="d-flex align-items-center">
                                    <div className="icon-shape icon-60 rounded-circle overflow-hidden border border-white">
                                        <img src="assets/imgs/pages/coworking-space/page-home/home-section-8/avatar-1.png" alt="AstraX" />
                                    </div>
                                    <div className="avatar-2 icon-shape icon-60 rounded-circle overflow-hidden border border-2 border-white">
                                        <img src="assets/imgs/pages/coworking-space/page-home/home-section-8/avatar-2.png" alt="AstraX" />
                                    </div>
                                </div>
                                <div>
                                    <h6 className="text-dark fs-20 mb-0">4.5 / 5</h6>
                                    <p className="mb-0 text-dark">From over 1000 reviews</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 offset-lg-1 pe-lg-8 mt-lg-0 mt-8">
                            <h2 className="stroke text-white text-start pb-2 mb-0 text-anime-style-2">Get a quote from</h2>
                            <h2 className="text-anime-style-2">anywhere.</h2>
                            <form action="#" className="input-group mb-3 mt-4 position-relative wow img-custom-anim-top">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="username" className="fs-7 fw-bold mb-3">
                                            Full name
                                        </label>
                                        <input type="text" className="py-3 form-control username border-0" name="name" placeholder="Enter here" id="username" />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="fs-7 fw-bold mb-3">
                                            Email address
                                        </label>
                                        <input type="text" className="py-3 form-control email border-0" name="name" placeholder="Enter here" id="email" />
                                    </div>
                                    <div className="col-12 mt-5">
                                        <label htmlFor="message" className="fs-7 fw-bold mb-3">
                                            Message
                                        </label>
                                        <textarea name="message" id="message" cols={30} rows={8} className="py-3 form-control website border-0" placeholder="Enter here" defaultValue={""} />
                                    </div>
                                    <div className="col-12 mt-5">
                                        <button className="btn btn-dark bg-dark-2" type="submit" aria-label="Get A Quote" data-aos="fade-zoom-in" data-aos-delay={100}>
                                            <span className="text-capitalize">Get A Quote</span>
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
                </div>
            </section>
        </>
    );
}
