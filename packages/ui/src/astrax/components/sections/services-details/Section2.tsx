import Link from "next/link";

export default function Section2() {
    return (
        <>
            {/*about-business-services-details section 2*/}
            <section className="about-business-services-details-section-2 position-relative overflow-hidden py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 pe-lg-5 order-2 order-lg-1 mt-lg-0 mt-8">
                            <div className="border p-5 overflow-hidden">
                                <h6 className="mb-3 pb-3 border-bottom text-anime-style-2">Our Services</h6>
                                <Link href="#" className="d-flex justify-content-between align-items-center mb-3" data-aos="fade-up" data-aos-delay={0}>
                                    <span className="fw-medium">Investments</span>
                                    <img src="assets/imgs/template/icons/long-arrow-right.svg" alt="AstraX" />
                                </Link>
                                <Link href="#" className="d-flex justify-content-between align-items-center mb-3" data-aos="fade-up" data-aos-delay={200}>
                                    <span className="fw-medium">Online Business</span>
                                    <img src="assets/imgs/template/icons/long-arrow-right.svg" alt="AstraX" />
                                </Link>
                                <Link href="#" className="d-flex justify-content-between align-items-center mb-3" data-aos="fade-up" data-aos-delay={400}>
                                    <span className="fw-medium">Tax &amp; Declaration</span>
                                    <img src="assets/imgs/template/icons/long-arrow-right.svg" alt="AstraX" />
                                </Link>
                                <Link href="#" className="d-flex justify-content-between align-items-center mb-3" data-aos="fade-up" data-aos-delay={600}>
                                    <span className="fw-medium">Customer Strategy</span>
                                    <img src="assets/imgs/template/icons/long-arrow-right.svg" alt="AstraX" />
                                </Link>
                                <Link href="#" className="d-flex justify-content-between align-items-center mb-3" data-aos="fade-up" data-aos-delay={800}>
                                    <span className="fw-medium">Private Equality</span>
                                    <img src="assets/imgs/template/icons/long-arrow-right.svg" alt="AstraX" />
                                </Link>
                                <Link href="#" className="d-flex justify-content-between align-items-center mb-3" data-aos="fade-up" data-aos-delay={1000}>
                                    <span className="fw-medium">Corporate Solution</span>
                                    <img src="assets/imgs/template/icons/long-arrow-right.svg" alt="AstraX" />
                                </Link>
                            </div>
                            <div className="banner position-relative mt-4">
                                <img data-aos="flip-left" className="w-100" src="assets/imgs/pages/business/page-services-details/bg-banner.png" alt="AstraX" />
                                <img className="position-absolute bottom-0 end-0" src="assets/imgs/pages/business/page-services-details/img-banner.png" alt="AstraX" />
                                <div className="position-absolute top-0 start-0 m-7">
                                    <h6 className="text-anime-style-2">
                                        We provide <br />
                                        Great Ideas to <br />
                                        Grow Your
                                    </h6>
                                    <Link href="/contact">
                                        <h5 className="text-primary border-bottom border-yellow border-2 text-anime-style-1">Business!</h5>
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-4 px-5 py-6 bg-light-2">
                                <div className="position-relative">
                                    <h6 className="mb-5 text-anime-style-2">Send Us Message</h6>
                                    <span className="position-absolute top-100 start-0 px-3 py-1 bg-primary rounded-pill" />
                                </div>
                                <form action="#" className="input-group">
                                    <div className="position-relative mb-3 w-100" data-aos="fade-up" data-aos-delay={0}>
                                        <input type="text" className="py-3 ps-4 form-control rounded-0 bg-white" name="name" placeholder="Your Name" />
                                        <div className="position-absolute top-50 end-0 translate-middle-y px-4 border-start border-white border-opacity-25">
                                            <img src="assets/imgs/template/icons/user-w.svg" alt="AstraX" />
                                        </div>
                                    </div>
                                    <div className="position-relative mb-3 w-100" data-aos="fade-up" data-aos-delay={200}>
                                        <input type="text" className="py-3 ps-4 form-control rounded-0 bg-white" name="name" placeholder="E-mail Address" />
                                        <div className="position-absolute top-50 end-0 translate-middle-y px-4 border-start border-white border-opacity-25">
                                            <img src="assets/imgs/template/icons/email-white.svg" alt="AstraX" />
                                        </div>
                                    </div>
                                    <div className="position-relative w-100" data-aos="fade-up" data-aos-delay={400}>
                                        <textarea name="message" id="message" cols={30} rows={8} className="py-3 ps-4 form-control message rounded-0 bg-white" placeholder="Type Your Message" defaultValue={""} />
                                        <div className="position-absolute top-0 end-0 px-4 py-3 border-start border-bottom border-white border-opacity-25">
                                            <img src="assets/imgs/template/icons/pen-w.svg" alt="AstraX" />
                                        </div>
                                    </div>
                                    <button className="btn btn-dark mt-4 w-100 rounded-0 button--calypso" type="submit" aria-label="submit" data-aos="zoom-in" data-aos-delay={600}>
                                        <span>Send Message</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={17} height={16} viewBox="0 0 17 16" fill="none">
                                            <g clipPath="url(#clip0_1396_1760)">
                                                <path d="M15.8443 7.55759C15.8441 7.5574 15.8439 7.55719 15.8437 7.557L12.578 4.307C12.3333 4.06353 11.9376 4.06444 11.6941 4.30912C11.4506 4.55378 11.4515 4.9495 11.6962 5.193L13.8888 7.375H0.652588C0.3074 7.375 0.0275879 7.65481 0.0275879 8C0.0275879 8.34519 0.3074 8.625 0.652588 8.625H13.8887L11.6962 10.807C11.4515 11.0505 11.4506 11.4462 11.6941 11.6909C11.9376 11.9356 12.3334 11.9364 12.578 11.693L15.8437 8.443C15.8439 8.44281 15.8441 8.44259 15.8443 8.4424C16.0891 8.19809 16.0883 7.80109 15.8443 7.55759Z" fill="white" />
                                            </g>
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-8 ps-lg-5 order-1 order-lg-2">
                            <img className="w-100" data-aos="flip-right" src="assets/imgs/pages/business/page-services-details/img-1.png" alt="AstraX" />
                            <h6 className="mb-3 mt-5 text-anime-style-2">Service Overview</h6>
                            <p className="wow img-custom-anim-top">At the core of every successful business is a strong and well-defined brand. Our Strategic Brand Development service focuses on building a distinctive identity that resonates with your target audience and sets you apart in a competitive market. We combine deep market insights, creative vision, and strategic planning to shape your brand’s presence across all touchpoints.</p>
                            <h6 className="mb-3 mt-5 text-anime-style-2">What We Offer</h6>
                            <ul className="mb-0 ps-4 overflow-hidden">
                                <li className="mb-3" data-aos="fade-up" data-aos-delay={0}>
                                    <p className="mb-0">
                                        <span className="text-dark fw-medium">Brand Discovery &amp; Positioning</span> - We start by understanding your business, values, and goals. Through detailed research, we identify your unique value proposition and market positioning to ensure your brand stands out in a crowded space.
                                    </p>
                                </li>
                                <li className="mb-3" data-aos="fade-up" data-aos-delay={200}>
                                    <p className="mb-0">
                                        <span className="text-dark fw-medium">Brand Identity Creation</span> - We design a visual identity, including logos, color palettes, typography, and other brand elements, that reflects your brand’s essence and connects with your audience.
                                    </p>
                                </li>
                                <li className="mb-3" data-aos="fade-up" data-aos-delay={400}>
                                    <p className="mb-0">
                                        <span className="text-dark fw-medium">Messaging &amp; Tone of Voice</span> - We develop a consistent messaging framework that aligns with your brand’s personality. From website content to social media posts, your brand’s voice will be clear, engaging, and authentic.
                                    </p>
                                </li>
                                <li className="mb-3" data-aos="fade-up" data-aos-delay={600}>
                                    <p className="mb-0">
                                        <span className="text-dark fw-medium">Brand Guidelines</span> - We create comprehensive brand guidelines to ensure consistency across all platforms and marketing materials. This ensures that every touchpoint reflects your brand’s values and mission.
                                    </p>
                                </li>
                                <li className="mb-3" data-aos="fade-up" data-aos-delay={800}>
                                    <p className="mb-0">
                                        <span className="text-dark fw-medium">Brand Activation &amp; Campaigns</span> - We help bring your brand to life with targeted marketing campaigns that effectively communicate your message and build brand awareness.
                                    </p>
                                </li>
                                <li data-aos="fade-up" data-aos-delay={800}>
                                    <p className="mb-0">
                                        <span className="text-dark fw-medium">Ongoing Brand Monitoring &amp; Growth</span> - Brand development doesn’t stop after launch. We continuously monitor brand performance, gather customer feedback, and adapt strategies to drive long-term growth.
                                    </p>
                                </li>
                            </ul>
                            <div className="row py-4 g-3">
                                <div className="col-md-6">
                                    <img className="h-100" data-aos="flip-left" src="assets/imgs/pages/business/page-services-details/img-2.png" alt="AstraX" />
                                </div>
                                <div className="col-md-6">
                                    <img className="h-100" data-aos="flip-left" data-aos-delay={200} src="assets/imgs/pages/business/page-services-details/img-3.png" alt="AstraX" />
                                </div>
                            </div>
                            <p className="wow img-custom-anim-top">Our Strategic Brand Development service ensures that your brand is not just recognized, but also remembered. By creating a cohesive and compelling brand story, we help you foster customer loyalty and stand out in an ever-evolving marketplace.</p>
                            <h6 className="mt-5 text-anime-style-2">Frequently Asked Question</h6>
                            <p className="wow img-custom-anim-top">Lorem ipsum is simply free text used by copytyping refreshing. Neque porro est qui dolorem ipsum quia quaed inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                            <div className="accordion mt-6">
                                <div className="px-0 card collapse-custom mb-3" data-aos="fade-up" data-aos-delay={0}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center" data-bs-toggle="collapse" href="#collapse1">
                                            <span className="me-3 arrow" />
                                            <h6 className="mb-0 fs-20">
                                                <span>Why is university education important?</span>
                                            </h6>
                                        </Link>
                                    </div>
                                    <div id="collapse1" className="collapse" data-bs-parent=".accordion">
                                        <p className="pe-3 fs-6 fw-regular ps-7">We regularly release updates to enhance the functionality and performance of our app. Rest assured, you'll always have access to the latest features and improvements.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom mb-3" data-aos="fade-up" data-aos-delay={200}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="p-3 fw-bold d-flex align-items-center" data-bs-toggle="collapse" href="#collapse2">
                                            <span className="me-3 arrow" />
                                            <h6 className="mb-0 fs-20">
                                                <span>What challenges do university students face?</span>
                                            </h6>
                                        </Link>
                                    </div>
                                    <div id="collapse2" className="collapse show" data-bs-parent=".accordion">
                                        <p className="pe-3 fs-6 fw-regular ps-7">We regularly release updates to enhance the functionality and performance of our app. Rest assured, you'll always have access to the latest features and improvements.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom mb-3" data-aos="fade-up" data-aos-delay={400}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center" data-bs-toggle="collapse" href="#collapse3">
                                            <span className="me-3 arrow" />
                                            <h6 className="mb-0 fs-20">
                                                <span>How can universities support students' well-being?</span>
                                            </h6>
                                        </Link>
                                    </div>
                                    <div id="collapse3" className="collapse" data-bs-parent=".accordion">
                                        <p className="pe-3 fs-6 fw-regular ps-7">We regularly release updates to enhance the functionality and performance of our app. Rest assured, you'll always have access to the latest features and improvements.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom mb-3" data-aos="fade-up" data-aos-delay={600}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center" data-bs-toggle="collapse" href="#collapse4">
                                            <span className="me-3 arrow" />
                                            <h6 className="mb-0 fs-20">
                                                <span>What role do internships play?</span>
                                            </h6>
                                        </Link>
                                    </div>
                                    <div id="collapse4" className="collapse" data-bs-parent=".accordion">
                                        <p className="pe-3 fs-6 fw-regular ps-7">We regularly release updates to enhance the functionality and performance of our app. Rest assured, you'll always have access to the latest features and improvements.</p>
                                    </div>
                                </div>
                                <div className="px-0 card collapse-custom mb-3" data-aos="fade-up" data-aos-delay={800}>
                                    <div className="p-0 card-header border-0 bg-transparent">
                                        <Link className="collapsed p-3 fw-bold d-flex align-items-center" data-bs-toggle="collapse" href="#collapse5">
                                            <span className="me-3 arrow" />
                                            <h6 className="mb-0 fs-20">
                                                <span>How valuable is studying abroad?</span>
                                            </h6>
                                        </Link>
                                    </div>
                                    <div id="collapse5" className="collapse" data-bs-parent=".accordion">
                                        <p className="pe-3 fs-6 fw-regular ps-7">We regularly release updates to enhance the functionality and performance of our app. Rest assured, you'll always have access to the latest features and improvements.</p>
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
