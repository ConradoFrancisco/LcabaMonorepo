import Link from "next/link";

export default function Section2() {
    return (
        <>
            {/*charity-causes-details section 4*/}
            <section className="charity-causes-details-section-4 position-relative pb-120 overflow-hidden">
                <div className="container position-relative">
                    <div className="row text-center">
                        <div className="number-step d-flex align-items-center justify-content-center gap-3">
                            <i className="fa-solid fa-heart text-primary" />
                            <span className="btn-text">Your Gift Can Change the World</span>
                        </div>
                        <h2 className="text-dark my-3 text-anime-style-3">
                            We Can Make
                            <span className="bg-white border border-dark rounded-5 px-2">Difference</span>
                        </h2>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="container mt-80">
                        <div className="row g-4">
                            <div className="col-12 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="@@delay">
                                <div className="card-listing bg-white rounded-4 hover-up border overflow-hidden">
                                    <div className="position-relative">
                                        <Link href="/donation-details">
                                            <img className="w-100" src="assets/imgs/pages/charity/page-donation/img-4.png" alt="AstraX" />
                                        </Link>
                                        <Link href="#">
                                            <h6 className="badge bg-primary border border-dark fs-7 position-absolute top-0 start-0 m-3 text-dark">Donation</h6>
                                        </Link>
                                    </div>
                                    <div className="card-content p-4 bg-white">
                                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                                            <div className="progress-bar rounded-pill wow img-custom-anim-left" style={{ width: "75%" }} />
                                        </div>
                                        <div className="d-flex justify-content-between mt-3 mb-3">
                                            <div className="d-flex gap-2">
                                                <p className="fs-7 mb-0">Goal</p>
                                                <p className="fs-7 mb-0 fw-bold text-dark">$34,000</p>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <p className="fs-7 mb-0">Raised</p>
                                                <p className="fs-7 mb-0 fw-bold text-dark">$12,490</p>
                                            </div>
                                        </div>
                                        <Link href="/donation-details">
                                            <h6 className="mb-3 text-anime-style-3">Help Us Reach Our Goal - Every Donation Matters</h6>
                                        </Link>
                                        <p className="fs-7 mb-0">Since the beginning of war operations we have visited all the most dangerous places...</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="@@delay">
                                <div className="card-listing bg-white rounded-4 hover-up border overflow-hidden">
                                    <div className="position-relative">
                                        <Link href="/donation-details">
                                            <img className="w-100" src="assets/imgs/pages/charity/page-donation/img-5.png" alt="AstraX" />
                                        </Link>
                                        <Link href="#">
                                            <h6 className="badge bg-primary border border-dark fs-7 position-absolute top-0 start-0 m-3 text-dark">Food</h6>
                                        </Link>
                                    </div>
                                    <div className="card-content p-4 bg-white">
                                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                                            <div className="progress-bar rounded-pill wow img-custom-anim-left" style={{ width: "75%" }} />
                                        </div>
                                        <div className="d-flex justify-content-between mt-3 mb-3">
                                            <div className="d-flex gap-2">
                                                <p className="fs-7 mb-0">Goal</p>
                                                <p className="fs-7 mb-0 fw-bold text-dark">$34,000</p>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <p className="fs-7 mb-0">Raised</p>
                                                <p className="fs-7 mb-0 fw-bold text-dark">$12,490</p>
                                            </div>
                                        </div>
                                        <Link href="/donation-details">
                                            <h6 className="mb-3 text-anime-style-3">A Small Act of Kindness Can Spark a Big Change</h6>
                                        </Link>
                                        <p className="fs-7 mb-0">Since the beginning of war operations we have visited all the most dangerous places...</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="@@delay">
                                <div className="card-listing bg-white rounded-4 hover-up border overflow-hidden">
                                    <div className="position-relative">
                                        <Link href="/donation-details">
                                            <img className="w-100" src="assets/imgs/pages/charity/page-donation/img-6.png" alt="AstraX" />
                                        </Link>
                                        <Link href="#">
                                            <h6 className="badge bg-primary border border-dark fs-7 position-absolute top-0 start-0 m-3 text-dark">Medical</h6>
                                        </Link>
                                    </div>
                                    <div className="card-content p-4 bg-white">
                                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                                            <div className="progress-bar rounded-pill wow img-custom-anim-left" style={{ width: "75%" }} />
                                        </div>
                                        <div className="d-flex justify-content-between mt-3 mb-3">
                                            <div className="d-flex gap-2">
                                                <p className="fs-7 mb-0">Goal</p>
                                                <p className="fs-7 mb-0 fw-bold text-dark">$34,000</p>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <p className="fs-7 mb-0">Raised</p>
                                                <p className="fs-7 mb-0 fw-bold text-dark">$12,490</p>
                                            </div>
                                        </div>
                                        <Link href="/donation-details">
                                            <h6 className="mb-3 text-anime-style-3">Building a Better World, One Donation at a Time</h6>
                                        </Link>
                                        <p className="fs-7 mb-0">Since the beginning of war operations we have visited all the most dangerous places...</p>
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
