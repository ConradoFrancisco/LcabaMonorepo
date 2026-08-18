import Link from "next/link";

export default function Section1() {
    return (
        <>
            {/*charity-causes-details section 1*/}
            <section className="charity-causes-details-section-1 py-120 overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 pe-lg-5 mb-lg-lg-0 mb-5">
                            <div className="block-search p-4 bg-light rounded-4 mb-4">
                                <h6 className="text-anime-style-3">Search</h6>
                                <form className="input-group mt-3" data-aos="zoom-in" data-aos-delay={0}>
                                    <input type="text" className="form-control border-0" placeholder="Enter Your Keywords" aria-label="Enter Your Keywords" aria-describedby="button-addon2" />
                                    <button className="btn btn-primary bg-primary rounded-3 px-4 border-0 rounded-end-2" type="button" aria-label="search" id="button-addon2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                            <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" fill="#292929" />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                            <div className="box-blog rounded-3 p-4 bg-light overflow-hidden">
                                <h6 className="mb-3 pb-3 border-bottom text-anime-style-3">Categories</h6>
                                <Link href="#" className="blog-item d-flex justify-content-between align-items-center mb-3 bg-white px-4 py-3 rounded-3" data-aos="fade-up" data-aos-delay={0}>
                                    <span className="fw-medium">Charity</span>
                                    <i className="fa-solid fa-angle-right" />
                                </Link>
                                <Link href="#" className="blog-item d-flex justify-content-between align-items-center mb-3 bg-white px-4 py-3 rounded-3" data-aos="fade-up" data-aos-delay={200}>
                                    <span className="fw-medium">Donation</span>
                                    <i className="fa-solid fa-angle-right" />
                                </Link>
                                <Link href="#" className="blog-item d-flex justify-content-between align-items-center mb-3 bg-white px-4 py-3 rounded-3" data-aos="fade-up" data-aos-delay={400}>
                                    <span className="fw-medium">Education &amp; Food</span>
                                    <i className="fa-solid fa-angle-right" />
                                </Link>
                                <Link href="#" className="blog-item d-flex justify-content-between align-items-center mb-3 bg-white px-4 py-3 rounded-3" data-aos="fade-up" data-aos-delay={600}>
                                    <span className="fw-medium">Health &amp; Medicine </span>
                                    <i className="fa-solid fa-angle-right" />
                                </Link>
                                <Link href="#" className="blog-item d-flex justify-content-between align-items-center mb-3 bg-white px-4 py-3 rounded-3" data-aos="fade-up" data-aos-delay={800}>
                                    <span className="fw-medium">Medicine &amp; Water </span>
                                    <i className="fa-solid fa-angle-right" />
                                </Link>
                            </div>
                            <div className="mt-4 px-5 py-6 bg-light rounded-4">
                                <h6 className="mb-5 text-anime-style-3">If You Need Any Help Contact With Us</h6>
                                <Link href="tel" className="p-3 bg-primary rounded-pill">
                                    <span className="rounded-circle bg-dark p-2 icon-shape bg-opacity-10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                            <path
                                                d="M4.64362 6.57184C4.40487 4.99934 5.51362 3.58684 7.20737 3.06934C7.50794 2.97744 7.83224 3.0036 8.11419 3.14249C8.39614 3.28138 8.61453 3.52254 8.72487 3.81684L9.26862 5.26684C9.35615 5.50011 9.37198 5.75421 9.31407 5.99653C9.25616 6.23886 9.12716 6.45835 8.94362 6.62684L7.32612 8.10809C7.24639 8.18126 7.18698 8.27383 7.15368 8.3768C7.12038 8.47976 7.11433 8.58959 7.13612 8.69559L7.15112 8.76059L7.18987 8.92309C7.39103 9.71265 7.69753 10.4715 8.10112 11.1793C8.54076 11.9315 9.08635 12.6164 9.72112 13.2131L9.77112 13.2581C9.85187 13.3298 9.94981 13.3793 10.0554 13.4019C10.161 13.4244 10.2706 13.4193 10.3736 13.3868L12.4649 12.7281C12.7025 12.6535 12.9571 12.6516 13.1958 12.7226C13.4346 12.7937 13.6467 12.9344 13.8049 13.1268L14.7949 14.3281C15.2074 14.8281 15.1574 15.5631 14.6836 16.0043C13.3874 17.2131 11.6049 17.4606 10.3649 16.4643C8.8449 15.2383 7.56356 13.743 6.58487 12.0531C5.59823 10.3645 4.94044 8.50488 4.64362 6.57184ZM8.44737 8.77809L9.78737 7.54809C10.1547 7.21126 10.4129 6.77234 10.529 6.28768C10.645 5.80302 10.6135 5.29474 10.4386 4.82809L9.89612 3.37809C9.67405 2.7859 9.23453 2.30067 8.66714 2.02126C8.09974 1.74186 7.44716 1.68932 6.84237 1.87434C4.73862 2.51809 3.04987 4.40434 3.40737 6.76059C3.65737 8.40559 4.23362 10.4981 5.50487 12.6831C6.56076 14.5052 7.94294 16.1175 9.58237 17.4393C11.4424 18.9331 13.9249 18.4231 15.5374 16.9206C15.9988 16.491 16.2788 15.9015 16.3204 15.2725C16.362 14.6434 16.1619 14.0222 15.7611 13.5356L14.7711 12.3331C14.4544 11.9487 14.0301 11.6677 13.5526 11.526C13.0751 11.3844 12.5662 11.3886 12.0911 11.5381L10.3549 12.0843C9.90658 11.6221 9.51391 11.1091 9.18487 10.5556C8.86702 9.99604 8.61932 9.39946 8.44737 8.77934V8.77809Z"
                                                fill="#2C2E3C"
                                            />
                                        </svg>
                                    </span>
                                    <span className="text-dark ms-2 fs-20 fw-semibold">+123 456 7890</span>
                                </Link>
                            </div>
                            <div className="mt-4 px-5 py-6 bg-light rounded-4">
                                <h6 className="mb-5 text-anime-style-3">Follow Us</h6>
                                <div className="socials rounded-pill d-inline-flex d-flex align-items-center justify-content-center">
                                    <ul className="list-unstyled d-flex mb-0">
                                        <li>
                                            <Link href="#">
                                                <span className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                        <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                                                    </svg>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="ms-2">
                                            <Link href="#">
                                                <span className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                                                    </svg>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="ms-2">
                                            <Link href="#">
                                                <span className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                        <path d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2 .6-8.7 .6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z" />
                                                    </svg>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className="ms-2">
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
                        </div>
                        <div className="col-lg-7 ms-lg-auto">
                            <img className="rounded-4 mb-5" data-aos="zoom-in" src="assets/imgs/pages/charity/page-causes-details/img-1.png" alt="AstraX" />
                            <h5 className="mb-3 mt-4 text-anime-style-3">Education for children</h5>
                            <p className="wow img-custom-anim-top">Our causes reflect the diverse and pressing needs of communities worldwide. From supporting education and healthcare to providing disaster relief and environmental protection, each cause we champion is a step a more just &amp; compassionate world.</p>
                            <p className="wow img-custom-anim-top">We work closely with local partners to identify areas where our support can make the greatest impact, ensuring that every donation and effort goes directly toward creating.</p>
                            <h5 className="mb-3 mt-4 text-anime-style-3">Creating Lasting Impact Together</h5>
                            <p className="wow img-custom-anim-top">Our causes represent the heart of our mission, each one addressing critical need within our communities. From providing access to clean water &amp; nutritious food to supporting education, healthcare, and disaster relief, we work tirelessly to uplift and empower.</p>
                            <h5 className="mb-3 mt-4 text-anime-style-3">Transforming Lives and Communities</h5>
                            <p className="wow img-custom-anim-top">Every cause we champion is chosen for its potential to create meaningful, sustainable change and to build a foundation for a brighter, more equitable future. By focusing our efforts on these key areas, we’re able to drive long-term impact and support.</p>
                            <p className="wow img-custom-anim-top">Each cause we support reflects our commitment to addressing urgent needs &amp; creating sustainable change. Our focus include providing access to clean water, supporting.</p>
                            <h5 className="mb-3 mt-4 text-anime-style-3">Causes That Matter</h5>
                            <p className="wow img-custom-anim-top">By focusing our efforts on these key areas, we’re able to drive long-term impact and support the resilience of individuals and families worldwide. Join us as we continue to make a difference where it’s needed most, turning hope into action, one cause at a time.</p>
                            <p className="wow img-custom-anim-top">We’re able to drive long-term impact and support the resilience of individuals families worldwide. Join us as we continue to make a difference where it’s needed most, turning.</p>
                            <h5 className="mt-8 pb-4 wow img-custom-anim-left">Comments (2)</h5>
                            <div className="bg-light p-4 mb-5 rounded-4 wow img-custom-anim-top">
                                <div className="d-flex flex-wrap align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="pe-4">
                                            <div className="icon-70">
                                                <Link href="#">
                                                    <img className="rounded-circle" src="assets/imgs/pages/charity/page-causes-details/avatar-1.png" alt="AstraX" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div>
                                            <Link href="#">
                                                <h6 className="mb-0">Matthew Larson</h6>
                                            </Link>
                                            <p className="fs-7 mb-0">June 9, 2025</p>
                                        </div>
                                    </div>
                                    <Link href="#" className="d-flex align-items-center d-inline-flex gap-2">
                                        <i className="fa-solid fa-reply" />
                                        <span className="fs-18 fw-semibold"> Reply </span>
                                    </Link>
                                </div>
                                <p className="mt-3">We value your thoughts and feedback! The Comments section is a place where we can all connect, share ideas, and discuss how we can make a greater impact. Whether you have a question, a personal story to share, or simply want.</p>
                            </div>
                            <div className="bg-light p-4 mb-5 rounded-4 wow img-custom-anim-top ms-5">
                                <div className="d-flex flex-wrap align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="pe-4">
                                            <div className="icon-70">
                                                <Link href="#">
                                                    <img className="rounded-circle" src="assets/imgs/pages/charity/page-causes-details/avatar-2.png" alt="AstraX" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div>
                                            <Link href="#">
                                                <h6 className="mb-0">Sergio Daugherty</h6>
                                            </Link>
                                            <p className="fs-7 mb-0">June 9, 2025</p>
                                        </div>
                                    </div>
                                    <Link href="#" className="d-flex align-items-center d-inline-flex gap-2">
                                        <i className="fa-solid fa-reply" />
                                        <span className="fs-18 fw-semibold"> Reply </span>
                                    </Link>
                                </div>
                                <p className="mt-3">We value your thoughts and feedback! The Comments section is a place where we can all connect, share ideas, and discuss how we can make a greater impact. Whether you have a question, a personal story to share, or simply want.</p>
                            </div>
                            <div className="card-contact-2 bg-light rounded-4 p-4 mt-6 border-top border-white border-opacity-10 wow img-custom-anim-left">
                                <h6 className=" text-anime-style-2">Leave A Reply</h6>
                                <p className=" wow img-custom-anim-top text-opacity-50 mb-4">Provide clear contact information, including phone number, email, and address.</p>
                                <form action="#" className="d-flex flex-column gap-3">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <input type="text" className="form-control p-3 rounded-4 border-0" placeholder="First Name*" aria-label="first-name" />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" className="form-control p-3 rounded-4 border-0" placeholder="Last Name*" aria-label="last-name" />
                                        </div>
                                    </div>
                                    <input type="email" className="form-control p-3 rounded-4 border-0 bg-secondary-3" placeholder="Enter your email address" aria-label="email" />
                                    <textarea className="form-control p-3 rounded-4 border-0" placeholder="Your Message*" aria-label="Message" defaultValue={""} />
                                    <div className="d-inline-block ms-auto" data-aos="fade-up" data-aos-delay={200}>
                                        <button className="btn btn-primary mt-4 hover-up" type="submit" aria-label="Post">
                                            <span className="text-dark">Post Comment</span>
                                            <img src="assets/imgs/pages/charity/icons/arrow-right.svg" alt="AstraX" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
