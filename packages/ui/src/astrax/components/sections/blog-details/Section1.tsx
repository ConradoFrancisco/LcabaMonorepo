import Link from "next/link";

export default function Section1() {
    return (
        <>
            {/*business-blog-details section 1*/}
            <section className="business-blog-details-section-1 position-relative overflow-hidden pt-250-keep pb-100">
                <div className="container position-relative z-1">
                    <div className="row">
                        <div className="text-center">
                            <span className="d-flex align-items-center justify-content-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={2} viewBox="0 0 18 2" fill="none">
                                    <circle opacity="0.2" cx={1} cy={1} r={1} fill="#0D6EFD" />
                                    <circle opacity="0.5" cx={9} cy={1} r={1} fill="#0D6EFD" />
                                    <circle cx={17} cy={1} r={1} fill="#0D6EFD" />
                                </svg>
                                <span className="text-primary btn-text">Industry Insights</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={2} viewBox="0 0 18 2" fill="none">
                                    <circle cx={1} cy={1} r={1} fill="#0D6EFD" />
                                    <circle opacity="0.5" cx={9} cy={1} r={1} fill="#0D6EFD" />
                                    <circle opacity="0.2" cx={17} cy={1} r={1} fill="#0D6EFD" />
                                </svg>
                            </span>
                            <h2 className="text-dark my-3 text-anime-style-3">
                                Case Study Spotlight: Transforming <br />
                                Brands with Strategic Solutions
                            </h2>
                            <p className="wow img-custom-anim-left">
                                Dive into real-world examples of how our agency has helped businesses <br />
                                overcome challenges and achieve remarkable results.
                            </p>
                        </div>
                        <div className="col-lg-10 mx-auto">
                            <div className="mt-4 mb-8">
                                <img data-aos="fade-up" className="rounded-4 overflow-hidden" src="/assets/imgs/pages/business/page-blog-details/img-1.png" alt="AstraX" />
                            </div>
                            <h6 className="text-anime-style-2">Understanding the Client’s Needs</h6>
                            <p className="wow img-custom-anim-top">In a world where standing out is essential for success, businesses often find themselves grappling with brand identity, market presence, and strategic direction. In this spotlight, we’ll share how our agency has transformed brands by crafting tailored strategies and delivering measurable results.</p>
                            <p className="wow img-custom-anim-top">Every business comes with its unique challenges. Whether it's repositioning a dated brand, penetrating new markets, or building an identity from scratch, the journey begins with understanding the client’s goals, industry, and target audience. Our approach involves:</p>
                            <h6 className="mt-5 text-anime-style-2">Strategic Solutions in Action</h6>
                            <p className="my-3">Here are a few examples of how we’ve helped businesses overcome their challenges:</p>
                            <p className="wow img-custom-anim-top">
                                <span className="text-dark fw-semibold">Revitalizing a Legacy Brand:</span> Controlled settings to test hypotheses and establish cause-and-effect relationships. Gathering self-reported data from large groups of people. Observing and recording behavior in natural settings.
                            </p>
                            <p className="wow img-custom-anim-top">
                                <span className="text-dark fw-semibold">Case Studies:</span> sychology helps in understanding not only individual behavior but also social structures, health outcomes, and societal trends. Preferably those who taught you in relevant subjects like psychology, biology, or social sciences.
                            </p>
                            <p className="wow img-custom-anim-top">
                                <span className="text-dark fw-semibold">Challenge:</span> A 30-year-old company struggled to resonate with younger audiences.
                            </p>
                            <p className="wow img-custom-anim-top">
                                <span className="text-dark fw-semibold">Solution:</span> We revamped their branding with a fresh logo, updated color palettes, and a modernized tone of voice. We also implemented a digital-first marketing strategy to connect with millennials and Gen Z.
                            </p>
                            <p className="wow img-custom-anim-top">
                                <span className="text-dark fw-semibold">Outcome:</span> The brand saw a 40% increase in customer engagement and a 25% boost in sales within six months.
                            </p>
                            <div className="d-flex align-items-center justify-content-center gap-4 justify-content-between pb-7 pt-4">
                                <img data-aos="flip-left" className="rounded-4 d-none d-lg-block" src="/assets/imgs/pages/business/page-blog-details/img-2.png" alt="AstraX" />
                                <img data-aos="flip-left" data-aos-delay={200} className="rounded-4" src="/assets/imgs/pages/business/page-blog-details/img-3.png" alt="AstraX" />
                                <img data-aos="flip-left" data-aos-delay={400} className="rounded-4 d-none d-lg-block" src="/assets/imgs/pages/business/page-blog-details/img-4.png" alt="AstraX" />
                            </div>
                            <h6 className="mb- text-anime-style-2">Our Approach: The Key to Success</h6>
                            <p className="wow img-custom-anim-top">What sets us apart is our focus on customized solutions and data-driven strategies. For each client, we combine creativity, innovation, and analytics to ensure success.</p>
                            <p className="wow img-custom-anim-top">At our agency, we believe every business has the potential to shine. With the right strategies and execution, we help brands transform and thrive in competitive markets.</p>
                            <p className="text-dark fw-semibold mt-4 text-anime-style-2">If you’re ready to take your business to the next level, let’s talk!</p>
                            <div className="socials py-4 mt-7 border-top border-bottom d-flex align-items-center justify-content-center" data-aos="zoom-in">
                                <p className="text-dark mb-0">Share this post:</p>
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
                            <h4 className="mt-8 pb-4 fs-20 wow img-custom-anim-left">User Feedbacks (06)</h4>
                            <div className="d-flex flex-md-nowrap flex-wrap gap-3 align-items-start border-top pt-6 wow img-custom-anim-top">
                                <div className="">
                                    <div className="icon-80">
                                        <Link href="#">
                                            <img className="rounded-4" src="assets/imgs/pages/business/page-blog-details/avatar-1.png" alt="AstraX" />
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <div className="d-flex align-items-center">
                                        <Link href="#">
                                            <h6 className="mb-0 fs-7">Tromas H. Hendson</h6>
                                        </Link>
                                        <p className="fs-7 mb-0 ms-2">June 9, 2025</p>
                                    </div>
                                    <p className="fs-7 py-3">Variations in the floor plan, window location, and interstitial outdoor spaces enhance this material homogeneity. The goal was to produce a unified whole using a modern design language, where attention to materiality and detail is evident. All flats have two sides and are in close proximity to the outside world.</p>
                                    <Link href="#" className="d-flex align-items-center d-inline-flex mb-8">
                                        <span className="icon-shape icon-sm bg-white border rounded-circle me-2 p-3">
                                            <i className="bi bi-reply text-dark" />
                                        </span>
                                        <span className="fs-7"> Reply </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="d-flex flex-md-nowrap flex-wrap gap-3 align-items-start border-top pt-6 ms-md-10 ms-8 wow img-custom-anim-top">
                                <div className="">
                                    <div className="icon-80">
                                        <Link href="#">
                                            <img className="rounded-4" src="assets/imgs/pages/business/page-blog-details/avatar-2.png" alt="AstraX" />
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <div className="d-flex align-items-center">
                                        <Link href="#">
                                            <h6 className="mb-0 fs-7">Rosalina D.</h6>
                                        </Link>
                                        <p className="fs-7 mb-0 ms-2">June 10, 2025</p>
                                    </div>
                                    <p className="fs-7 py-3">Variations in the floor plan, window location, and interstitial outdoor spaces enhance this material homogeneity. The goal was to produce a unified whole using a modern design language, where attention to materiality and detail is evident. All flats have two sides and are in close proximity to the outside world.</p>
                                    <Link href="#" className="d-flex align-items-center d-inline-flex mb-8">
                                        <span className="icon-shape icon-sm bg-white border rounded-circle me-2 p-3">
                                            <i className="bi bi-reply text-dark" />
                                        </span>
                                        <span className="fs-7"> Reply </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="d-flex flex-md-nowrap flex-wrap gap-3 align-items-start border-top pt-6 wow img-custom-anim-top">
                                <div className="">
                                    <div className="icon-80">
                                        <Link href="#">
                                            <img className="rounded-4" src="assets/imgs/pages/business/page-blog-details/avatar-3.png" alt="AstraX" />
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <div className="d-flex align-items-center">
                                        <Link href="#">
                                            <h6 className="mb-0 fs-7">Miranda H. Halim</h6>
                                        </Link>
                                        <p className="fs-7 mb-0 ms-2">June 9, 2025</p>
                                    </div>
                                    <p className="fs-7 py-3">Variations in the floor plan, window location, and interstitial outdoor spaces enhance this material homogeneity. The goal was to produce a unified whole using a modern design language, where attention to materiality and detail is evident. All flats have two sides and are in close proximity to the outside world.</p>
                                    <Link href="#" className="d-flex align-items-center d-inline-flex mb-8">
                                        <span className="icon-shape icon-sm bg-white border rounded-circle me-2 p-3">
                                            <i className="bi bi-reply text-dark" />
                                        </span>
                                        <span className="fs-7"> Reply </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between border-bottom pb-4 wow img-custom-anim-left">
                                <h6 className="fs-20">Add Feedback &amp; Reviews</h6>
                                <div className="group-start">
                                    <i className="bi bi-star-fill me-1 fs-7 opacity-25" />
                                    <i className="bi bi-star-fill me-1 fs-7 opacity-25" />
                                    <i className="bi bi-star-fill me-1 fs-7 opacity-25" />
                                    <i className="bi bi-star-fill me-1 fs-7 opacity-25" />
                                    <i className="bi bi-star-fill me-1 fs-7 opacity-25" />
                                </div>
                            </div>
                            <form action="#">
                                <div className="row mt-5 wow img-custom-anim-left">
                                    <div className="col-md-4">
                                        <div className="input-group">
                                            <input type="text" className="form-control p-3 rounded-4 bg-secondary-3" placeholder="Your name" aria-label="username" />
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3 mt-md-0">
                                        <div className="input-group">
                                            <input type="text" className="form-control p-3 rounded-4 bg-secondary-3" placeholder="info@webmail.com" aria-label="email" />
                                        </div>
                                    </div>
                                    <div className="col-md-4 mt-3 mt-md-0">
                                        <div className="input-group">
                                            <input type="text" className="form-control p-3 rounded-4 bg-secondary-3" placeholder="Website" aria-label="website" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="input-group mt-3">
                                            <textarea className="form-control border rounded-4 p-3 bg-secondary-3 pb-10" placeholder="Message" aria-label="With textarea" defaultValue={""} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" aria-label="submit" className="btn btn-outline-secondary border-dark mt-3 button--calypso">
                                            <span>Submit</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                                <g clipPath="url(#clip0_1337_1709)">
                                                    <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="#292929" />
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
