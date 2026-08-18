import Link from "next/link";

export default function Section1() {
    return (
        <>
            {/*charity-donation-details section 1*/}
            <section className="charity-donation-details-section-1 py-120 overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 mx-lg-auto">
                            <div className="mb-5">
                                <img className="rounded-5" data-aos="zoom-in" src="assets/imgs/pages/charity/page-causes-details/img-2.png" alt="AstraX" />
                                <form className="form-donation bg-light rounded-4 p-lg-5 p-md-4 p-3 z-1 wow img-custom-anim-top">
                                    <div className="position-relative progressbar mt-5">
                                        <div className="progress bg-white" role="progressbar" aria-label="Basic example" aria-valuenow={28} aria-valuemin={0} aria-valuemax={100}>
                                            <div className="progress-bar rounded-pill wow img-custom-anim-left" style={{ width: "28%" }} />
                                        </div>
                                        <span className="progress-bar-info position-absolute bottom-100 fs-7 fw-medium">28%</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-3 mb-3">
                                        <div className="d-flex gap-2">
                                            <p className="fs-7 mb$-0">Goal</p>
                                            <p className="fs-7 mb-0 fw-bold text-dark">$90,000</p>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <p className="fs-7 mb-0 fw-bold text-dark">Raised</p>
                                            <p className="fs-7 mb-0 fw-bold text-dark">$26,000</p>
                                        </div>
                                    </div>
                                    <div className="position-relative bg-white p-2 pe-6 rounded-pill d-flex align-items-center gap-3 d-inline-flex mb-3">
                                        <span className="icon-shape mb-0 icon-lg bg-primary rounded-circle">
                                            <h4 className="mb-0">$</h4>
                                        </span>
                                        <h4 className="mb-0">10</h4>
                                    </div>
                                    <div className="form-element-select d-flex flex-wrap align-items-center gap-2 pb-4 mt-2">
                                        <div className="form-element">
                                            <input type="radio" className={"10"} name="options-outlined" id={`$10`} defaultChecked={true} />
                                            <label className="10 px-3 py-1 rounded-pill bg-white" htmlFor={"$10"}>
                                                <span className="fw-bold fs-7">$10</span>
                                            </label>
                                        </div>
                                        <div className="form-element">
                                            <input type="radio" className={"20"} name="options-outlined" id={`$20`} />
                                            <label className="20 px-3 py-1 rounded-pill bg-white" htmlFor={"$20"}>
                                                <span className="fw-bold fs-7">$20</span>
                                            </label>
                                        </div>
                                        <div className="form-element">
                                            <input type="radio" className={"30"} name="options-outlined" id={`$30`} />
                                            <label className="30 px-3 py-1 rounded-pill bg-white" htmlFor={"$30"}>
                                                <span className="fw-bold fs-7">$30</span>
                                            </label>
                                        </div>
                                        <div className="form-element">
                                            <input type="radio" className={"40"} name="options-outlined" id={`$40`} />
                                            <label className="40 px-3 py-1 rounded-pill bg-white" htmlFor={"$40"}>
                                                <span className="fw-bold fs-7">$40</span>
                                            </label>
                                        </div>
                                        <div className="form-element">
                                            <input type="radio" className={"50"} name="options-outlined" id={`$50`} />
                                            <label className="50 px-3 py-1 rounded-pill bg-white" htmlFor={"$50"}>
                                                <span className="fw-bold fs-7">$50</span>
                                            </label>
                                        </div>
                                        <Link href="#" className="btn btn-primary ms-4">
                                            <span className="text-dark">Custom Amount</span>
                                            <img src="assets/imgs/pages/charity/icons/arrow-right.svg" alt="AstraX" />
                                        </Link>
                                    </div>
                                    <div className="py-4 border-top border-bottom">
                                        <h4 className="mb-4">Select Payment Method</h4>
                                        <div className="d-flex gap-3">
                                            <div className="form-check custom-radio">
                                                <input className="form-check-input" name="flexRadioDefault" type="radio" id="Test" defaultChecked={true} />
                                                <label className="form-check-label" htmlFor={"Test"}>
                                                    Test Donation
                                                </label>
                                            </div>
                                            <div className="form-check custom-radio">
                                                <input className="form-check-input" name="flexRadioDefault" type="radio" id="Offline" />
                                                <label className="form-check-label" htmlFor={"Offline"}>
                                                    Offline Donation
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-md-nowrap flex-wrap gap-3 mt-5">
                                        <input type="text" className="form-control text-dark ps-4 border-0" name="first-name" placeholder="First Name" />
                                        <input type="text" className="form-control text-dark ps-4 border-0" name="last-name" placeholder="Last Name" />
                                        <input type="text" className="form-control text-dark ps-4 border-0" name="email" placeholder="Email Address" />
                                    </div>
                                    <div className="d-flex flex-wrap gap-3 align-items-center justify-content-between mt-5">
                                        <button className="btn btn-primary hover-up" type="submit" aria-label="donate now">
                                            <span className="text-dark">donate now</span>
                                            <img src="assets/imgs/pages/charity/icons/arrow-right.svg" alt="AstraX" />
                                        </button>
                                        <h4 className="mb-0">Donation Total: $10</h4>
                                    </div>
                                </form>
                            </div>
                            <h5 className="mb-3 mt-3 text-anime-style-3">Transforming Lives and Communities</h5>
                            <p className="wow img-custom-anim-top">Every cause we champion is chosen for its potential to create meaningful, sustainable change and to build a foundation for a brighter, more equitable future. By focusing our efforts on these key areas, we’re able to drive long-term impact and support.</p>
                            <p className="wow img-custom-anim-top">Each cause we support reflects our commitment to addressing urgent needs &amp; creating sustainable change. Our focus include providing access to clean water, supporting.</p>
                            <h5 className="mb-3 mt-3 text-anime-style-3">Causes That Matter</h5>
                            <p className="wow img-custom-anim-top">By focusing our efforts on these key areas, we’re able to drive long-term impact and support the resilience of individuals and families worldwide. Join us as we continue to make a difference where it’s needed most, turning hope into action, one cause at a time.</p>
                            <p className="wow img-custom-anim-top">We’re able to drive long-term impact and support the resilience of individuals families worldwide. Join us as we continue to make a difference where it’s needed most, turning.</p>
                            <h5 className="mt-7 pb-4 wow img-custom-anim-left">Comments (2)</h5>
                            <div className="bg-light p-4 mb-5 rounded-4 wow img-custom-anim-top">
                                <div className="d-flex flex-wrap align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="pe-4">
                                            <div className="icon-$70">
                                                <Link href="#">
                                                    <img className="rounded-circle" src="assets/imgs/pages/charity/page-causes-details/avatar-1.png" alt="AstraX" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div>
                                            <Link href="#">
                                                <h6 className="mb$-0">Matthew Larson</h6>
                                            </Link>
                                            <p className="fs-7 mb$-0">June 9, 2025</p>
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
                                            <div className="icon-$70">
                                                <Link href="#">
                                                    <img className="rounded-circle" src="assets/imgs/pages/charity/page-causes-details/avatar-2.png" alt="AstraX" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div>
                                            <Link href="#">
                                                <h6 className="mb$-0">Sergio Daugherty</h6>
                                            </Link>
                                            <p className="fs-7 mb$-0">June 9, 2025</p>
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
