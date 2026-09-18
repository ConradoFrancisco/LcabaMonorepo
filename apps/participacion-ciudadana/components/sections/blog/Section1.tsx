import Link from "next/link";

export default function Section1() {
    return (
        <>
            {/*coworking-space-blog-section-1*/}
            <section className="coworking-space-blog-section-1 position-relative overflow-hidden pt-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-md-8">
                            <div className="card-blog position-relative mb-md-10 mb-5">
                                <Link href="#">
                                    <img data-aos="fade-up" className="w-100" src="assets/imgs/pages/coworking-space/page-blog/img-1.png" alt="AstraX" />
                                </Link>
                                <div data-aos="fade-up" data-aos-delay={200}>
                                    <div className="card-blog-content bg-white p-4 position-md-absolute top-md-100 start-0 end-0 mx-md-4 translate-middle-md-y shadow-1">
                                        <div className="d-flex flex-wrap align-items-center gap-2 card-information">
                                            <div className="d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                                                    <path d="M10.0885 12.8875V18.3307H11.9219V12.8875C15.5393 13.3386 18.3385 16.4244 18.3385 20.1641H3.67188C3.67188 16.4244 6.47109 13.3386 10.0885 12.8875ZM11.0052 11.9141C7.96646 11.9141 5.50521 9.45281 5.50521 6.41406C5.50521 3.37531 7.96646 0.914062 11.0052 0.914062C14.044 0.914062 16.5052 3.37531 16.5052 6.41406C16.5052 9.45281 14.044 11.9141 11.0052 11.9141Z" fill="#252728" />
                                                </svg>
                                                <Link href="@@link-author" className="mb-0 fs-20 fw-regular ms-2">
                                                    By Alex Roy
                                                </Link>
                                            </div>
                                            <div className="time d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                    <path d="M1.67188 9.16927H18.3385V16.6693C18.3385 17.1295 17.9655 17.5026 17.5052 17.5026H2.50521C2.04497 17.5026 1.67188 17.1295 1.67188 16.6693V9.16927ZM14.1719 2.5026H17.5052C17.9655 2.5026 18.3385 2.8757 18.3385 3.33594V7.5026H1.67188V3.33594C1.67188 2.8757 2.04497 2.5026 2.50521 2.5026H5.83854V0.835938H7.50521V2.5026H12.5052V0.835938H14.1719V2.5026Z" fill="#252728" />
                                                </svg>
                                                <p className="mb-0 fs-20 fw-regular ms-2 text-dark">8 December 2025</p>
                                            </div>
                                        </div>
                                        <Link href="#">
                                            <h6 className="fw-semibold my-2">2 Key Benefits Coworking Small Businesses</h6>
                                        </Link>
                                        <p>For small businesses startups, coworking spaces provide unique opportunity grow without overhead costs office.</p>
                                        <Link href="#">
                                            <span className="fw-semibold">Read More</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26" fill="none">
                                                <path d="M14.1447 13.3943L8.01644 19.5226L6.48438 17.9905L12.6126 11.8622L7.2504 6.5H19.507V18.7565L14.1447 13.3943Z" fill="#030E0F" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-md-8">
                            <div className="card-blog position-relative mb-md-10 mb-5">
                                <Link href="#">
                                    <img data-aos="fade-up" className="w-100" src="assets/imgs/pages/coworking-space/page-blog/img-2.png" alt="AstraX" />
                                </Link>
                                <div data-aos="fade-up" data-aos-delay={200}>
                                    <div className="card-blog-content bg-white p-4 position-md-absolute top-md-100 start-0 end-0 mx-md-4 translate-middle-md-y shadow-1">
                                        <div className="d-flex flex-wrap align-items-center gap-2 card-information">
                                            <div className="d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                                                    <path d="M10.0885 12.8875V18.3307H11.9219V12.8875C15.5393 13.3386 18.3385 16.4244 18.3385 20.1641H3.67188C3.67188 16.4244 6.47109 13.3386 10.0885 12.8875ZM11.0052 11.9141C7.96646 11.9141 5.50521 9.45281 5.50521 6.41406C5.50521 3.37531 7.96646 0.914062 11.0052 0.914062C14.044 0.914062 16.5052 3.37531 16.5052 6.41406C16.5052 9.45281 14.044 11.9141 11.0052 11.9141Z" fill="#252728" />
                                                </svg>
                                                <Link href="@@link-author" className="mb-0 fs-20 fw-regular ms-2">
                                                    By Alex Roy
                                                </Link>
                                            </div>
                                            <div className="time d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                    <path d="M1.67188 9.16927H18.3385V16.6693C18.3385 17.1295 17.9655 17.5026 17.5052 17.5026H2.50521C2.04497 17.5026 1.67188 17.1295 1.67188 16.6693V9.16927ZM14.1719 2.5026H17.5052C17.9655 2.5026 18.3385 2.8757 18.3385 3.33594V7.5026H1.67188V3.33594C1.67188 2.8757 2.04497 2.5026 2.50521 2.5026H5.83854V0.835938H7.50521V2.5026H12.5052V0.835938H14.1719V2.5026Z" fill="#252728" />
                                                </svg>
                                                <p className="mb-0 fs-20 fw-regular ms-2 text-dark">8 December 2025</p>
                                            </div>
                                        </div>
                                        <Link href="#">
                                            <h6 className="fw-semibold my-2">How Coworking Supports Modern Work</h6>
                                        </Link>
                                        <p>As the landscape of work continues the shift, coworking spaces are emerging as a key player in the future of work.</p>
                                        <Link href="#">
                                            <span className="fw-semibold">Read More</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26" fill="none">
                                                <path d="M14.1447 13.3943L8.01644 19.5226L6.48438 17.9905L12.6126 11.8622L7.2504 6.5H19.507V18.7565L14.1447 13.3943Z" fill="#030E0F" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-md-8">
                            <div className="card-blog position-relative mb-md-10 mb-5">
                                <Link href="#">
                                    <img data-aos="fade-up" className="w-100" src="assets/imgs/pages/coworking-space/page-blog/img-3.png" alt="AstraX" />
                                </Link>
                                <div data-aos="fade-up" data-aos-delay={200}>
                                    <div className="card-blog-content bg-white p-4 position-md-absolute top-md-100 start-0 end-0 mx-md-4 translate-middle-md-y shadow-1">
                                        <div className="d-flex flex-wrap align-items-center gap-2 card-information">
                                            <div className="d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                                                    <path d="M10.0885 12.8875V18.3307H11.9219V12.8875C15.5393 13.3386 18.3385 16.4244 18.3385 20.1641H3.67188C3.67188 16.4244 6.47109 13.3386 10.0885 12.8875ZM11.0052 11.9141C7.96646 11.9141 5.50521 9.45281 5.50521 6.41406C5.50521 3.37531 7.96646 0.914062 11.0052 0.914062C14.044 0.914062 16.5052 3.37531 16.5052 6.41406C16.5052 9.45281 14.044 11.9141 11.0052 11.9141Z" fill="#252728" />
                                                </svg>
                                                <Link href="@@link-author" className="mb-0 fs-20 fw-regular ms-2">
                                                    By Alex Roy
                                                </Link>
                                            </div>
                                            <div className="time d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                    <path d="M1.67188 9.16927H18.3385V16.6693C18.3385 17.1295 17.9655 17.5026 17.5052 17.5026H2.50521C2.04497 17.5026 1.67188 17.1295 1.67188 16.6693V9.16927ZM14.1719 2.5026H17.5052C17.9655 2.5026 18.3385 2.8757 18.3385 3.33594V7.5026H1.67188V3.33594C1.67188 2.8757 2.04497 2.5026 2.50521 2.5026H5.83854V0.835938H7.50521V2.5026H12.5052V0.835938H14.1719V2.5026Z" fill="#252728" />
                                                </svg>
                                                <p className="mb-0 fs-20 fw-regular ms-2 text-dark">8 December 2025</p>
                                            </div>
                                        </div>
                                        <Link href="#">
                                            <h6 className="fw-semibold my-2">Top Tips for Staying Productive Coworking</h6>
                                        </Link>
                                        <p>Top Tips for Staying Productive Coworking</p>
                                        <Link href="#">
                                            <span className="fw-semibold">Read More</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26" fill="none">
                                                <path d="M14.1447 13.3943L8.01644 19.5226L6.48438 17.9905L12.6126 11.8622L7.2504 6.5H19.507V18.7565L14.1447 13.3943Z" fill="#030E0F" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-md-8">
                            <div className="card-blog position-relative mb-md-10 mb-5">
                                <Link href="#">
                                    <img data-aos="fade-up" className="w-100" src="assets/imgs/pages/coworking-space/page-blog/img-4.png" alt="AstraX" />
                                </Link>
                                <div data-aos="fade-up" data-aos-delay={200}>
                                    <div className="card-blog-content bg-white p-4 position-md-absolute top-md-100 start-0 end-0 mx-md-4 translate-middle-md-y shadow-1">
                                        <div className="d-flex flex-wrap align-items-center gap-2 card-information">
                                            <div className="d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                                                    <path d="M10.0885 12.8875V18.3307H11.9219V12.8875C15.5393 13.3386 18.3385 16.4244 18.3385 20.1641H3.67188C3.67188 16.4244 6.47109 13.3386 10.0885 12.8875ZM11.0052 11.9141C7.96646 11.9141 5.50521 9.45281 5.50521 6.41406C5.50521 3.37531 7.96646 0.914062 11.0052 0.914062C14.044 0.914062 16.5052 3.37531 16.5052 6.41406C16.5052 9.45281 14.044 11.9141 11.0052 11.9141Z" fill="#252728" />
                                                </svg>
                                                <Link href="@@link-author" className="mb-0 fs-20 fw-regular ms-2">
                                                    By Alex Roy
                                                </Link>
                                            </div>
                                            <div className="time d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                    <path d="M1.67188 9.16927H18.3385V16.6693C18.3385 17.1295 17.9655 17.5026 17.5052 17.5026H2.50521C2.04497 17.5026 1.67188 17.1295 1.67188 16.6693V9.16927ZM14.1719 2.5026H17.5052C17.9655 2.5026 18.3385 2.8757 18.3385 3.33594V7.5026H1.67188V3.33594C1.67188 2.8757 2.04497 2.5026 2.50521 2.5026H5.83854V0.835938H7.50521V2.5026H12.5052V0.835938H14.1719V2.5026Z" fill="#252728" />
                                                </svg>
                                                <p className="mb-0 fs-20 fw-regular ms-2 text-dark">8 December 2025</p>
                                            </div>
                                        </div>
                                        <Link href="#">
                                            <h6 className="fw-semibold my-2">Creating Professional Image Coworking</h6>
                                        </Link>
                                        <p>With the rise of hybrid work models digital nomadism, coworking spaces are well-positioned to support the</p>
                                        <Link href="#">
                                            <span className="fw-semibold">Read More</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26" fill="none">
                                                <path d="M14.1447 13.3943L8.01644 19.5226L6.48438 17.9905L12.6126 11.8622L7.2504 6.5H19.507V18.7565L14.1447 13.3943Z" fill="#030E0F" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-md-8">
                            <div className="card-blog position-relative mb-md-10 mb-5">
                                <Link href="#">
                                    <img data-aos="fade-up" className="w-100" src="assets/imgs/pages/coworking-space/page-blog/img-5.png" alt="AstraX" />
                                </Link>
                                <div data-aos="fade-up" data-aos-delay={200}>
                                    <div className="card-blog-content bg-white p-4 position-md-absolute top-md-100 start-0 end-0 mx-md-4 translate-middle-md-y shadow-1">
                                        <div className="d-flex flex-wrap align-items-center gap-2 card-information">
                                            <div className="d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                                                    <path d="M10.0885 12.8875V18.3307H11.9219V12.8875C15.5393 13.3386 18.3385 16.4244 18.3385 20.1641H3.67188C3.67188 16.4244 6.47109 13.3386 10.0885 12.8875ZM11.0052 11.9141C7.96646 11.9141 5.50521 9.45281 5.50521 6.41406C5.50521 3.37531 7.96646 0.914062 11.0052 0.914062C14.044 0.914062 16.5052 3.37531 16.5052 6.41406C16.5052 9.45281 14.044 11.9141 11.0052 11.9141Z" fill="#252728" />
                                                </svg>
                                                <Link href="@@link-author" className="mb-0 fs-20 fw-regular ms-2">
                                                    By Alex Roy
                                                </Link>
                                            </div>
                                            <div className="time d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                    <path d="M1.67188 9.16927H18.3385V16.6693C18.3385 17.1295 17.9655 17.5026 17.5052 17.5026H2.50521C2.04497 17.5026 1.67188 17.1295 1.67188 16.6693V9.16927ZM14.1719 2.5026H17.5052C17.9655 2.5026 18.3385 2.8757 18.3385 3.33594V7.5026H1.67188V3.33594C1.67188 2.8757 2.04497 2.5026 2.50521 2.5026H5.83854V0.835938H7.50521V2.5026H12.5052V0.835938H14.1719V2.5026Z" fill="#252728" />
                                                </svg>
                                                <p className="mb-0 fs-20 fw-regular ms-2 text-dark">8 December 2025</p>
                                            </div>
                                        </div>
                                        <Link href="#">
                                            <h6 className="fw-semibold my-2">Why Coworking Spaces Perfect Working</h6>
                                        </Link>
                                        <p>For small businesses, coworking spaces ideal solution for growth without the financial strain of renting traditional</p>
                                        <Link href="#">
                                            <span className="fw-semibold">Read More</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26" fill="none">
                                                <path d="M14.1447 13.3943L8.01644 19.5226L6.48438 17.9905L12.6126 11.8622L7.2504 6.5H19.507V18.7565L14.1447 13.3943Z" fill="#030E0F" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-md-8">
                            <div className="card-blog position-relative mb-md-10 mb-5">
                                <Link href="#">
                                    <img data-aos="fade-up" className="w-100" src="assets/imgs/pages/coworking-space/page-blog/img-6.png" alt="AstraX" />
                                </Link>
                                <div data-aos="fade-up" data-aos-delay={200}>
                                    <div className="card-blog-content bg-white p-4 position-md-absolute top-md-100 start-0 end-0 mx-md-4 translate-middle-md-y shadow-1">
                                        <div className="d-flex flex-wrap align-items-center gap-2 card-information">
                                            <div className="d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                                                    <path d="M10.0885 12.8875V18.3307H11.9219V12.8875C15.5393 13.3386 18.3385 16.4244 18.3385 20.1641H3.67188C3.67188 16.4244 6.47109 13.3386 10.0885 12.8875ZM11.0052 11.9141C7.96646 11.9141 5.50521 9.45281 5.50521 6.41406C5.50521 3.37531 7.96646 0.914062 11.0052 0.914062C14.044 0.914062 16.5052 3.37531 16.5052 6.41406C16.5052 9.45281 14.044 11.9141 11.0052 11.9141Z" fill="#252728" />
                                                </svg>
                                                <Link href="@@link-author" className="mb-0 fs-20 fw-regular ms-2">
                                                    By Alex Roy
                                                </Link>
                                            </div>
                                            <div className="time d-flex align-items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                    <path d="M1.67188 9.16927H18.3385V16.6693C18.3385 17.1295 17.9655 17.5026 17.5052 17.5026H2.50521C2.04497 17.5026 1.67188 17.1295 1.67188 16.6693V9.16927ZM14.1719 2.5026H17.5052C17.9655 2.5026 18.3385 2.8757 18.3385 3.33594V7.5026H1.67188V3.33594C1.67188 2.8757 2.04497 2.5026 2.50521 2.5026H5.83854V0.835938H7.50521V2.5026H12.5052V0.835938H14.1719V2.5026Z" fill="#252728" />
                                                </svg>
                                                <p className="mb-0 fs-20 fw-regular ms-2 text-dark">8 December 2025</p>
                                            </div>
                                        </div>
                                        <Link href="#">
                                            <h6 className="fw-semibold my-2">Why Team Collaboration In Thrives Here</h6>
                                        </Link>
                                        <p>Coworking spaces create an opportunity to network and collaborate with like-minded professionals, opening the</p>
                                        <Link href="#">
                                            <span className="fw-semibold">Read More</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26" fill="none">
                                                <path d="M14.1447 13.3943L8.01644 19.5226L6.48438 17.9905L12.6126 11.8622L7.2504 6.5H19.507V18.7565L14.1447 13.3943Z" fill="#030E0F" />
                                            </svg>
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
