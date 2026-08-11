import Link from "next/link";

export default function Footer() {
    return (
        <>
            {/* Footer */}
            <footer>
                <div className="section-footer position-relative overflow-hidden">
                    <div className="container-fluid">
                        <div className="container position-relative z-2">
                            <div className="row py-90">
                                <div className="col-lg-5 pe-3">
                                    <h2 className="text-anime-style-3">Astrax embarks on a journey of learning and skill-building today.</h2>
                                </div>
                                <div className="col-lg-7">
                                    <div className="row mt-lg-0 mt-8">
                                        <div className="col-lg-3 offset-lg-1 col-md-4 col-6">
                                            <h6 className="text-dark pb-5 btn-text">COMPANY</h6>
                                            <div className="d-flex flex-column align-items-start">
                                                <Link href="#">
                                                    <p className="hover-effect-1">About</p>
                                                </Link>
                                                <Link href="#">
                                                    <p className="hover-effect-1">Features</p>
                                                </Link>
                                                <Link href="#">
                                                    <p className="hover-effect-1">Works</p>
                                                </Link>
                                                <Link href="#">
                                                    <p className="hover-effect-1">Career</p>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-4 col-6">
                                            <h6 className="text-dark pb-5 btn-text">Help</h6>
                                            <div className="d-flex flex-column align-items-start">
                                                <Link href="#">
                                                    <p className="hover-effect-1">Customer Support</p>
                                                </Link>
                                                <Link href="#">
                                                    <p className="hover-effect-1">Delivery Details</p>
                                                </Link>
                                                <Link href="#">
                                                    <p className="hover-effect-1">Terms &amp; Conditions</p>
                                                </Link>
                                                <Link href="#">
                                                    <p className="hover-effect-1">Privacy Policy</p>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 offset-lg-1 col-md-4 col-6 mt-md-0 mt-5">
                                            <h6 className="text-dark pb-5 btn-text">services</h6>
                                            <div className="d-flex flex-column align-items-start">
                                                <Link href="#">
                                                    <p className="hover-effect-1">Website Design</p>
                                                </Link>
                                                <Link href="#">
                                                    <p className="hover-effect-1">Business Consultancy</p>
                                                </Link>
                                                <Link href="#">
                                                    <p className="hover-effect-1">Tax &amp; Finance</p>
                                                </Link>
                                                <Link href="#">
                                                    <p className="hover-effect-1">ROI Business Growth</p>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-column flex-lg-row gap-3 align-items-center py-4 border-top justify-content-between">
                                <div className="d-flex align-items-center justify-content-center flex-wrap gap-md-5 gap-3">
                                    <Link href="#">
                                        <span className="btn-text">About</span>
                                    </Link>
                                    <Link href="#">
                                        <span className="btn-text">Solutions</span>
                                    </Link>
                                    <Link href="#">
                                        <span className="btn-text">Pricing</span>
                                    </Link>
                                    <Link href="#">
                                        <span className="btn-text">Resources</span>
                                    </Link>
                                </div>
                                <p className="m-0 text-center">
                                    Copyright &amp; design by
                                    <Link href="#" className="text-dark fw-medium">
                                        <span>©Alithemes</span>
                                    </Link>
                                    2025, All Rights Reserved
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-light-2 position-absolute top-0 start-0 w-100 h-100" />
                </div>
            </footer>
        </>
    );
}
