export default function Section6() {
    return (
        <>
            {/*data-analysis about section 6*/}
            <section className="data-analysis-about-section-6 position-relative overflow-hidden py-100 ">
                <div className="container position-relative z-3">
                    <div className="row align-items-center">
                        <div className="col-md-5">
                            <span className="btn-text text-white">SIGN UP FOR TRIAL</span>
                            <h2 className="text-white my-3 text-anime-style-2">Start your free trial</h2>
                            <ul className="text-white">
                                <li>
                                    <p className="text-white opacity-75">No credit card required. No app installation.</p>
                                </li>
                                <li>
                                    <p className="text-white opacity-75">Cancel subscription anytime.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-7" data-aos="zoom-in-up" data-aos-delay={100}>
                            <div className="bg-primary rounded-4 px-5 py-6 border border-white border-opacity-10 bg-opacity-75">
                                <p className="text-white opacity-75">Just leave your Business Email</p>
                                <form className="input-group mt-4 position-relative">
                                    <input type="text" className="form-control email rounded-4" name="email" placeholder="Enter here" />
                                    <div className="ms-3">
                                        <button className="btn btn-dark fs-7 fw-bold" type="button" aria-label="request a demo" data-aos="fade-zoom-in" data-aos-delay={100}>
                                            REGISTER
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                                <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="white" />
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="img-bg position-absolute top-50 start-50 translate-middle w-100 h-100" data-background="assets/imgs/pages/data-analysis/page-home/home-section-9/img-bg.png" />
                <div className="linearGradient position-absolute top-50 start-50 translate-middle w-100 h-100" />
            </section>
        </>
    );
}
