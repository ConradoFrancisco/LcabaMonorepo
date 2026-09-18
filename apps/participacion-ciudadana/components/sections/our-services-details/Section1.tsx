import Link from "next/link";

export default function Section1() {
    return (
        <>
            {/*coworking-space-services-details-section-1*/}
            <section className="coworking-space-services-details-section-1 position-relative overflow-hidden py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 pe-lg-5 mb-lg-lg-0 mb-5">
                            <div className="block-search p-4 bg-secondary-2 rounded-3 border-primary-2 mb-4">
                                <h6>Search</h6>
                                <form className="input-group mt-3" data-aos="zoom-in">
                                    <input type="text" className="form-control border-0" placeholder="Enter Your Keywords" aria-label="Enter Your Keywords" aria-describedby="button-addon2" />
                                    <button aria-label="search" className="btn btn-primary bg-white border-0 rounded-end-2" id="button-addon2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                            <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" fill="#292929" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                            <div className="box-blog rounded-3 p-4 bg-secondary-2 overflow-hidden">
                                <h6 className="mb-3 pb-3 text-anime-style-2">News category</h6>
                                <div data-aos="fade-up" data-aos-delay={0}>
                                    <Link href="#" className="blog-item d-flex justify-content-between align-items-center mb-3 bg-white px-4 py-3 rounded-3">
                                        <span className="fw-semibold fs-18">Customized Desks</span>
                                        <i className="fa-solid fa-arrow-right-long" />
                                    </Link>
                                </div>
                                <div data-aos="fade-up" data-aos-delay={200}>
                                    <Link href="#" className="blog-item d-flex justify-content-between align-items-center mb-3 bg-white px-4 py-3 rounded-3">
                                        <span className="fw-semibold fs-18">Private Spaces</span>
                                        <i className="fa-solid fa-arrow-right-long" />
                                    </Link>
                                </div>
                                <div data-aos="fade-up" data-aos-delay={400}>
                                    <Link href="#" className="blog-item d-flex justify-content-between align-items-center mb-3 bg-white px-4 py-3 rounded-3">
                                        <span className="fw-semibold fs-18">Modern desk design</span>
                                        <i className="fa-solid fa-arrow-right-long" />
                                    </Link>
                                </div>
                                <div data-aos="fade-up" data-aos-delay={600}>
                                    <Link href="#" className="blog-item d-flex justify-content-between align-items-center mb-3 bg-white px-4 py-3 rounded-3">
                                        <span className="fw-semibold fs-18">24/7 support option</span>
                                        <i className="fa-solid fa-arrow-right-long" />
                                    </Link>
                                </div>
                                <div data-aos="fade-up" data-aos-delay={800}>
                                    <Link href="#" className="blog-item d-flex justify-content-between align-items-center mb-3 bg-white px-4 py-3 rounded-3">
                                        <span className="fw-semibold fs-18">Co-growth option</span>
                                        <i className="fa-solid fa-arrow-right-long" />
                                    </Link>
                                </div>
                                <div data-aos="fade-up" data-aos-delay={1000}>
                                    <Link href="#" className="blog-item d-flex justify-content-between align-items-center mb-3 bg-white px-4 py-3 rounded-3">
                                        <span className="fw-semibold fs-18">Event management</span>
                                        <i className="fa-solid fa-arrow-right-long" />
                                    </Link>
                                </div>
                            </div>
                            <div className="sidebar__widget p-4 rounded-3 mt-5 bg-secondary-2 overflow-hidden">
                                <h6 className="sidebar__widget-title mb-4">Company Profile</h6>
                                <div className="sidebar__tag-list">
                                    <div data-aos="fade-up" data-aos-delay={0}>
                                        <Link href="#" className="blog-item d-flex justify-content-between align-items-center mb-3 bg-white px-4 py-3 rounded-3">
                                            <span className="d-flex gap-2">
                                                <img src="assets/imgs/pages/coworking-space/page-services-details/icon-1.png" alt="AstraX" />
                                                <span className="fw-semibold fs-18">Download Pdf File</span>
                                            </span>
                                            <i className="fa-solid fa-arrow-right-long" />
                                        </Link>
                                    </div>
                                    <div data-aos="fade-up" data-aos-delay={200}>
                                        <Link href="#" className="blog-item d-flex justify-content-between align-items-center mb-3 bg-white px-4 py-3 rounded-3">
                                            <span className="d-flex gap-2">
                                                <img src="assets/imgs/pages/coworking-space/page-services-details/icon-2.png" alt="AstraX" />
                                                <span className="fw-semibold fs-18">Download Word File</span>
                                            </span>
                                            <i className="fa-solid fa-arrow-right-long" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <img data-aos="zoom-in" className="rounded-4 mb-5" src="assets/imgs/pages/coworking-space/page-services-details/img-1.png" alt="AstraX" />
                            <h2 className="mb-3 text-anime-style-2">Customized Desks</h2>
                            <p className="wow img-custom-anim-top">We’re proud to provide workspaces that go beyond just desks and chairs. Our spaces are designed to inspire productivity, foster collaboration, and help businesses grow. Here’s what our members on have to say about how we’ve helped them achieve their goals Discover their stories below.</p>
                            <p className="wow img-custom-anim-top">Our members have accomplished amazing things, we’re proud to have played a part in their journey. From increased productivity to the meaningful networking opportunities, here’s what they’re saying.</p>
                            <ul className="list-unstyled d-flex flex-wrap gap-4 mt-5">
                                <li data-aos="fade-left" data-aos-delay={0}>
                                    <div className="d-flex align-items-center mb-3 gap-2">
                                        <div className="position-relative">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 14 14" fill="none">
                                                <circle className="fill-primary" cx={7} cy={7} r={7} fill="#794AFF" />
                                                <path
                                                    d="M10.5308 4.36671C10.4785 4.31395 10.4162 4.27207 10.3476 4.24349C10.279 4.21491 10.2055 4.2002 10.1312 4.2002C10.0568 4.2002 9.98327 4.21491 9.91467 4.24349C9.84607 4.27207 9.78381 4.31395 9.73148 4.36671L5.53768 8.56613L3.77573 6.79855C3.72139 6.74606 3.65725 6.70479 3.58697 6.67709C3.51668 6.64939 3.44163 6.63581 3.3661 6.63712C3.29056 6.63842 3.21603 6.6546 3.14674 6.68471C3.07746 6.71482 3.01478 6.75829 2.9623 6.81262C2.90981 6.86696 2.86854 6.9311 2.84084 7.00138C2.81314 7.07166 2.79956 7.14672 2.80087 7.22225C2.80217 7.29778 2.81835 7.37232 2.84846 7.4416C2.87857 7.51089 2.92204 7.57356 2.97637 7.62605L5.13801 9.78768C5.19034 9.84045 5.2526 9.88232 5.32119 9.9109C5.38979 9.93948 5.46337 9.9542 5.53768 9.9542C5.612 9.9542 5.68557 9.93948 5.75417 9.9109C5.82277 9.88232 5.88503 9.84045 5.93736 9.78768L10.5308 5.19421C10.588 5.1415 10.6336 5.07752 10.6648 5.00631C10.696 4.9351 10.7121 4.8582 10.7121 4.78046C10.7121 4.70272 10.696 4.62582 10.6648 4.55461C10.6336 4.4834 10.588 4.41942 10.5308 4.36671Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                        <p className="mb-0 text-dark fw-semibold">Flexible Membership Plans</p>
                                    </div>
                                    <div className="d-flex align-items-center mb-3 gap-2">
                                        <div className="position-relative">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 14 14" fill="none">
                                                <circle className="fill-primary" cx={7} cy={7} r={7} fill="#794AFF" />
                                                <path
                                                    d="M10.5308 4.36671C10.4785 4.31395 10.4162 4.27207 10.3476 4.24349C10.279 4.21491 10.2055 4.2002 10.1312 4.2002C10.0568 4.2002 9.98327 4.21491 9.91467 4.24349C9.84607 4.27207 9.78381 4.31395 9.73148 4.36671L5.53768 8.56613L3.77573 6.79855C3.72139 6.74606 3.65725 6.70479 3.58697 6.67709C3.51668 6.64939 3.44163 6.63581 3.3661 6.63712C3.29056 6.63842 3.21603 6.6546 3.14674 6.68471C3.07746 6.71482 3.01478 6.75829 2.9623 6.81262C2.90981 6.86696 2.86854 6.9311 2.84084 7.00138C2.81314 7.07166 2.79956 7.14672 2.80087 7.22225C2.80217 7.29778 2.81835 7.37232 2.84846 7.4416C2.87857 7.51089 2.92204 7.57356 2.97637 7.62605L5.13801 9.78768C5.19034 9.84045 5.2526 9.88232 5.32119 9.9109C5.38979 9.93948 5.46337 9.9542 5.53768 9.9542C5.612 9.9542 5.68557 9.93948 5.75417 9.9109C5.82277 9.88232 5.88503 9.84045 5.93736 9.78768L10.5308 5.19421C10.588 5.1415 10.6336 5.07752 10.6648 5.00631C10.696 4.9351 10.7121 4.8582 10.7121 4.78046C10.7121 4.70272 10.696 4.62582 10.6648 4.55461C10.6336 4.4834 10.588 4.41942 10.5308 4.36671Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                        <p className="mb-0 text-dark fw-semibold">Inspire Work Environment</p>
                                    </div>
                                </li>
                                <li data-aos="fade-left" data-aos-delay={200}>
                                    <div className="d-flex align-items-center mb-3 gap-2">
                                        <div className="position-relative">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 14 14" fill="none">
                                                <circle className="fill-primary" cx={7} cy={7} r={7} fill="#794AFF" />
                                                <path
                                                    d="M10.5308 4.36671C10.4785 4.31395 10.4162 4.27207 10.3476 4.24349C10.279 4.21491 10.2055 4.2002 10.1312 4.2002C10.0568 4.2002 9.98327 4.21491 9.91467 4.24349C9.84607 4.27207 9.78381 4.31395 9.73148 4.36671L5.53768 8.56613L3.77573 6.79855C3.72139 6.74606 3.65725 6.70479 3.58697 6.67709C3.51668 6.64939 3.44163 6.63581 3.3661 6.63712C3.29056 6.63842 3.21603 6.6546 3.14674 6.68471C3.07746 6.71482 3.01478 6.75829 2.9623 6.81262C2.90981 6.86696 2.86854 6.9311 2.84084 7.00138C2.81314 7.07166 2.79956 7.14672 2.80087 7.22225C2.80217 7.29778 2.81835 7.37232 2.84846 7.4416C2.87857 7.51089 2.92204 7.57356 2.97637 7.62605L5.13801 9.78768C5.19034 9.84045 5.2526 9.88232 5.32119 9.9109C5.38979 9.93948 5.46337 9.9542 5.53768 9.9542C5.612 9.9542 5.68557 9.93948 5.75417 9.9109C5.82277 9.88232 5.88503 9.84045 5.93736 9.78768L10.5308 5.19421C10.588 5.1415 10.6336 5.07752 10.6648 5.00631C10.696 4.9351 10.7121 4.8582 10.7121 4.78046C10.7121 4.70272 10.696 4.62582 10.6648 4.55461C10.6336 4.4834 10.588 4.41942 10.5308 4.36671Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                        <p className="mb-0 text-dark fw-semibold">Amenities And Services</p>
                                    </div>
                                    <div className="d-flex align-items-center mb-3 gap-2">
                                        <div className="position-relative">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 14 14" fill="none">
                                                <circle className="fill-primary" cx={7} cy={7} r={7} fill="#794AFF" />
                                                <path
                                                    d="M10.5308 4.36671C10.4785 4.31395 10.4162 4.27207 10.3476 4.24349C10.279 4.21491 10.2055 4.2002 10.1312 4.2002C10.0568 4.2002 9.98327 4.21491 9.91467 4.24349C9.84607 4.27207 9.78381 4.31395 9.73148 4.36671L5.53768 8.56613L3.77573 6.79855C3.72139 6.74606 3.65725 6.70479 3.58697 6.67709C3.51668 6.64939 3.44163 6.63581 3.3661 6.63712C3.29056 6.63842 3.21603 6.6546 3.14674 6.68471C3.07746 6.71482 3.01478 6.75829 2.9623 6.81262C2.90981 6.86696 2.86854 6.9311 2.84084 7.00138C2.81314 7.07166 2.79956 7.14672 2.80087 7.22225C2.80217 7.29778 2.81835 7.37232 2.84846 7.4416C2.87857 7.51089 2.92204 7.57356 2.97637 7.62605L5.13801 9.78768C5.19034 9.84045 5.2526 9.88232 5.32119 9.9109C5.38979 9.93948 5.46337 9.9542 5.53768 9.9542C5.612 9.9542 5.68557 9.93948 5.75417 9.9109C5.82277 9.88232 5.88503 9.84045 5.93736 9.78768L10.5308 5.19421C10.588 5.1415 10.6336 5.07752 10.6648 5.00631C10.696 4.9351 10.7121 4.8582 10.7121 4.78046C10.7121 4.70272 10.696 4.62582 10.6648 4.55461C10.6336 4.4834 10.588 4.41942 10.5308 4.36671Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                        <p className="mb-0 text-dark fw-semibold">Fully Equipped Spaces</p>
                                    </div>
                                </li>
                                <li data-aos="fade-left" data-aos-delay={400}>
                                    <div className="d-flex align-items-center mb-3 gap-2">
                                        <div className="position-relative">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 14 14" fill="none">
                                                <circle className="fill-primary" cx={7} cy={7} r={7} fill="#794AFF" />
                                                <path
                                                    d="M10.5308 4.36671C10.4785 4.31395 10.4162 4.27207 10.3476 4.24349C10.279 4.21491 10.2055 4.2002 10.1312 4.2002C10.0568 4.2002 9.98327 4.21491 9.91467 4.24349C9.84607 4.27207 9.78381 4.31395 9.73148 4.36671L5.53768 8.56613L3.77573 6.79855C3.72139 6.74606 3.65725 6.70479 3.58697 6.67709C3.51668 6.64939 3.44163 6.63581 3.3661 6.63712C3.29056 6.63842 3.21603 6.6546 3.14674 6.68471C3.07746 6.71482 3.01478 6.75829 2.9623 6.81262C2.90981 6.86696 2.86854 6.9311 2.84084 7.00138C2.81314 7.07166 2.79956 7.14672 2.80087 7.22225C2.80217 7.29778 2.81835 7.37232 2.84846 7.4416C2.87857 7.51089 2.92204 7.57356 2.97637 7.62605L5.13801 9.78768C5.19034 9.84045 5.2526 9.88232 5.32119 9.9109C5.38979 9.93948 5.46337 9.9542 5.53768 9.9542C5.612 9.9542 5.68557 9.93948 5.75417 9.9109C5.82277 9.88232 5.88503 9.84045 5.93736 9.78768L10.5308 5.19421C10.588 5.1415 10.6336 5.07752 10.6648 5.00631C10.696 4.9351 10.7121 4.8582 10.7121 4.78046C10.7121 4.70272 10.696 4.62582 10.6648 4.55461C10.6336 4.4834 10.588 4.41942 10.5308 4.36671Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                        <p className="mb-0 text-dark fw-semibold">Collaboration Community</p>
                                    </div>
                                    <div className="d-flex align-items-center mb-3 gap-2">
                                        <div className="position-relative">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 14 14" fill="none">
                                                <circle className="fill-primary" cx={7} cy={7} r={7} fill="#794AFF" />
                                                <path
                                                    d="M10.5308 4.36671C10.4785 4.31395 10.4162 4.27207 10.3476 4.24349C10.279 4.21491 10.2055 4.2002 10.1312 4.2002C10.0568 4.2002 9.98327 4.21491 9.91467 4.24349C9.84607 4.27207 9.78381 4.31395 9.73148 4.36671L5.53768 8.56613L3.77573 6.79855C3.72139 6.74606 3.65725 6.70479 3.58697 6.67709C3.51668 6.64939 3.44163 6.63581 3.3661 6.63712C3.29056 6.63842 3.21603 6.6546 3.14674 6.68471C3.07746 6.71482 3.01478 6.75829 2.9623 6.81262C2.90981 6.86696 2.86854 6.9311 2.84084 7.00138C2.81314 7.07166 2.79956 7.14672 2.80087 7.22225C2.80217 7.29778 2.81835 7.37232 2.84846 7.4416C2.87857 7.51089 2.92204 7.57356 2.97637 7.62605L5.13801 9.78768C5.19034 9.84045 5.2526 9.88232 5.32119 9.9109C5.38979 9.93948 5.46337 9.9542 5.53768 9.9542C5.612 9.9542 5.68557 9.93948 5.75417 9.9109C5.82277 9.88232 5.88503 9.84045 5.93736 9.78768L10.5308 5.19421C10.588 5.1415 10.6336 5.07752 10.6648 5.00631C10.696 4.9351 10.7121 4.8582 10.7121 4.78046C10.7121 4.70272 10.696 4.62582 10.6648 4.55461C10.6336 4.4834 10.588 4.41942 10.5308 4.36671Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                        <p className="mb-0 text-dark fw-semibold">Support An Convenience</p>
                                    </div>
                                </li>
                            </ul>
                            <div className="d-flex flex-lg-nowrap flex-wrap gap-4 mb-4 mt-6">
                                <img data-aos="flip-right" src="assets/imgs/pages/coworking-space/page-services-details/img-2.png" alt="AstraX" />
                                <img data-aos="flip-right" src="assets/imgs/pages/coworking-space/page-services-details/img-3.png" alt="AstraX" />
                            </div>
                            <h5 className="text-anime-style-2">High Quality Amenities And Services</h5>
                            <p className="wow img-custom-anim-top">Everything you need to succeed is right here. Enjoy high-speed internet, fully equipped workspaces, an access to premium facilities like meeting rooms, kitchen areas, and lounges. Plus, compliment of coffee supportive environment ensure you’re always fueled for success Collaboration Community</p>
                            <h5 className="mt-8 mb-4 text-anime-style-2">Got Questions? We’ve Got Answers!</h5>
                            <div className="accordion">
                                <div className="px-0 card collapse-custom mb-3 border-dark" data-aos="fade-up">
                                    <div className="p-0 card-header border-0">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapse1">
                                            <h6 className="mb-0 fs-5">
                                                <span>Can I try the coworking space before committing to a membership?</span>
                                            </h6>
                                            <span className="arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapse1" className="collapse" data-bs-parent=".accordion">
                                        <p className="pe-3 fs-18 fw-regular ps-4">Explains how coworking environments provide structure, reduce distractions, and create a balance between focused work and networking opportunities.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom mb-3 border-dark" data-aos="fade-up">
                                    <div className="p-0 card-header border-0">
                                        <Link className="p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapse2">
                                            <h6 className="mb-0 fs-5">
                                                <span>Do you offer discounts for long-term memberships or teams?</span>
                                            </h6>
                                            <span className="arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapse2" className="collapse show" data-bs-parent=".accordion">
                                        <p className="pe-3 fs-18 fw-regular ps-4">Explains how coworking environments provide structure, reduce distractions, and create a balance between focused work and networking opportunities.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom mb-3 border-dark" data-aos="fade-up">
                                    <div className="p-0 card-header border-0">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapse3">
                                            <h6 className="mb-0 fs-5">
                                                <span>Can I use multiple coworking locations with one membership?</span>
                                            </h6>
                                            <span className="arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapse3" className="collapse" data-bs-parent=".accordion">
                                        <p className="pe-3 fs-18 fw-regular ps-4">Explains how coworking environments provide structure, reduce distractions, and create a balance between focused work and networking opportunities.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom mb-3 border-dark" data-aos="fade-up">
                                    <div className="p-0 card-header border-0">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapse4">
                                            <h6 className="mb-0 fs-5">
                                                <span>What makes your coworking space different from others?</span>
                                            </h6>
                                            <span className="arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapse4" className="collapse" data-bs-parent=".accordion">
                                        <p className="pe-3 fs-18 fw-regular ps-4">Explains how coworking environments provide structure, reduce distractions, and create a balance between focused work and networking opportunities.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom mb-3 border-dark" data-aos="fade-up">
                                    <div className="p-0 card-header border-0">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center justify-content-between" data-bs-toggle="collapse" href="#collapse5">
                                            <h6 className="mb-0 fs-5">
                                                <span>What makes coworking spaces different from traditional offices?</span>
                                            </h6>
                                            <span className="arrow" />
                                        </Link>
                                    </div>
                                    <div id="collapse5" className="collapse" data-bs-parent=".accordion">
                                        <p className="pe-3 fs-18 fw-regular ps-4">Explains how coworking environments provide structure, reduce distractions, and create a balance between focused work and networking opportunities.</p>
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
