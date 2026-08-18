import Link from "next/link";

export default function Section1() {
    return (
        <>
            {/*charity-become-a-volunteer section 1*/}
            <section className="charity-become-a-volunteer-section-1 pt-120 overflow-hidden">
                <div className="container position-relative z-1">
                    <div className="row align-items-center">
                        <div className="col-lg-6 pe-lg-8 col-md-12">
                            <div className="number-step d-flex align-items-center gap-3">
                                <i className="fa-solid fa-heart text-primary" />
                                <span className="btn-text">Volunteer Requirements</span>
                            </div>
                            <h2 className="text-dark my-3 text-anime-style-3">
                                Empower Others Through Your Best Of
                                <span className="bg-white border border-dark rounded-5 px-2">Volunteering</span>
                            </h2>
                            <p className="text-anime-style-1">Volunteering with us is an incredible way the give back to community and make a real impact in lives of those who need it most. Whether to you helpy events, working directly those need, spreading awareness.</p>
                            <div className="my-5">
                                <div className="position-relative pt-5 pb-3 overflow-hidden">
                                    <div className="progress position-relative" role="progressbar" aria-label="Basic example" aria-valuenow={94} aria-valuemin={0} aria-valuemax={94}>
                                        <div className="progress-bar rounded-pill wow img-custom-anim-left" style={{ width: "94%" }} />
                                    </div>
                                    <span className="position-absolute top-0 start-0 mb-2 fs-18 fw-medium">Donation Collect</span>
                                    <span className="text-opacity-50 position-absolute top-0 end-0 mt-2 fs-7 fw-medium">94%</span>
                                </div>
                                <div className="position-relative pt-5 overflow-hidden">
                                    <div className="progress position-relative" role="progressbar" aria-label="Basic example" aria-valuenow={98} aria-valuemin={0} aria-valuemax={98}>
                                        <div className="progress-bar rounded-pill wow img-custom-anim-left" style={{ width: "98%" }} />
                                    </div>
                                    <span className="position-absolute top-0 start-0 mb-2 fs-18 fw-medium">Successful Event</span>
                                    <span className="text-opacity-50 position-absolute top-0 end-0 mt-2 fs-7 fw-medium">98%</span>
                                </div>
                            </div>
                            <Link href="/donation-details" className="btn btn-primary hover-up">
                                <span className="text-dark">donate now</span>
                                <img src="assets/imgs/pages/charity/icons/arrow-right.svg" alt="AstraX" />
                            </Link>
                        </div>
                        <div className="col-lg-6">
                            <div className="card-contact-2 bg-light rounded-4 p-4 mt-6 mt-lg-0 border-top border-white border-opacity-10 overflow-hidden">
                                <h6 className="fs-28 text-anime-style-2 mb-4">Send Us A Message</h6>
                                <form action="#" className="d-flex flex-column gap-3 wow img-custom-anim-left">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <input type="text" className="form-control p-3 rounded-4 border-0" placeholder="First Name" aria-label="first-name" />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" className="form-control p-3 rounded-4 border-0" placeholder="Last Name" aria-label="last-name" />
                                        </div>
                                    </div>
                                    <input type="email" className="form-control p-3 rounded-4 border-0 bg-secondary-3" placeholder="Enter your email address" aria-label="email" />
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <input type="text" className="form-control p-3 rounded-4 border-0" placeholder="Phone Number" aria-label="phone" />
                                        </div>
                                        <div className="col-md-6">
                                            <input type="text" className="form-control p-3 rounded-4 border-0" placeholder="Occupation" aria-label="Occupation" />
                                        </div>
                                    </div>
                                    <textarea className="form-control p-3 rounded-4 border-0" placeholder="Occupation" aria-label="Occupation" defaultValue={""} />
                                    <div className="d-inline-block ms-auto" data-aos="fade-up" data-aos-delay={200}>
                                        <button className="btn btn-primary mt-4 hover-up" type="submit" aria-label="submit">
                                            <span className="text-dark">Submit Now</span>
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
