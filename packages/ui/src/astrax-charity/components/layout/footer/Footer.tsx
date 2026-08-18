import Link from "next/link";

export default function Footer() {
    return (
        <>
            {/* Footer */}
            <footer>
                <div className="section-footer-19 position-relative bg-light">
                    <div className="container-fluid">
                        <div className="container position-relative z-2">
                            <div className="row pt-120 position-relative">
                                <div className="col-lg-3 pe-lg-8 col-12">
                                    <Link href="/" className="d-flex align-items-center gap-2 d-inline-flex">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
                                                <g>
                                                    <path fill="#2C2E3C" d="M24.5043 9.79724L22.7082 18.3981L35.2929 17.1948L37.1117 7.00605L24.5043 9.79724Z" />
                                                    <path fill="#2C2E3C" d="M31.9171 17.6837L23.2697 20.6189L30.6333 30.3865L40.723 26.6545L31.9171 17.6837Z" />
                                                    <path fill="#2C2E3C" d="M28.4204 27.86L21.4605 22.2312L16.332 33.3249L24.7296 39.7347L28.4204 27.86Z" />
                                                    <path fill="#2C2E3C" d="M17.5913 29.998L19.1912 21.3633L6.63465 22.8288L5.04812 33.0511L17.5913 29.998Z" />
                                                    <path fill="#2C2E3C" d="M10.2917 22.1777L18.8717 19.0632L11.2859 9.45346L1.28177 13.3945L10.2917 22.1777Z" />
                                                    <path fill="#2C2E3C" d="M13.7243 12.2243L20.8121 17.7054L25.6875 6.50938L17.1442 0.277556L13.7243 12.2243Z" />
                                                </g>
                                            </svg>
                                        </div>
                                        <h5 className="mb-0">Astrax</h5>
                                    </Link>
                                    <p className="fw-regular pt-4 pb-4 mb-4 border-bottom">Astrax embarks on a journey of learning &amp; skills.</p>
                                    <Link href="#" className="d-flex gap-2">
                                        <p className="text-dark fw-bold">123 Main Street, Springfield, Illinois, 62701, USA</p>
                                    </Link>
                                    <Link href="#" className="d-flex gap-2">
                                        <p className="text-dark fw-bold">support@astrax.com</p>
                                    </Link>
                                </div>
                                <div className="col-lg-5 mt-lg-0 mt-8">
                                    <div className="row">
                                        <div className="col-lg-6 offset-lg-1 col-md-5 col-6">
                                            <h6 className="pb-3  border-bottom pb-4 mb-4 border-white border-opacity-25">Company</h6>
                                            <div className="row">
                                                <div className="col-6 d-flex flex-column align-items-start">
                                                    <Link href="#">
                                                        <p className="fw-medium text-capitalize text-nowrap">About</p>
                                                    </Link>
                                                    <Link href="#">
                                                        <p className="fw-medium text-capitalize text-nowrap">Services</p>
                                                    </Link>
                                                    <Link href="#">
                                                        <p className="fw-medium text-capitalize text-nowrap">Works</p>
                                                    </Link>
                                                    <Link href="#">
                                                        <p className="fw-medium text-capitalize text-nowrap">Career</p>
                                                    </Link>
                                                    <Link href="#">
                                                        <p className="fw-medium text-capitalize text-nowrap">Pricing</p>
                                                    </Link>
                                                </div>
                                                <div className="col-lg-6 col-md-5 d-flex flex-column align-items-start">
                                                    <Link href="#">
                                                        <p className="fw-medium text-capitalize text-nowrap">Refund Policy</p>
                                                    </Link>
                                                    <Link href="#">
                                                        <p className="fw-medium text-capitalize text-nowrap">Get In Touch</p>
                                                    </Link>
                                                    <Link href="#">
                                                        <p className="fw-medium text-capitalize text-nowrap">Our Services</p>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 offset-md-1 col-md-5">
                                            <h6 className="pb-3  border-bottom pb-4 mb-4 border-white border-opacity-25">Causes</h6>
                                            <div className="d-flex flex-column align-items-start">
                                                <Link href="#">
                                                    <p className="fw-medium text-capitalize text-nowrap">Water</p>
                                                </Link>
                                                <Link href="#">
                                                    <p className="fw-medium text-capitalize text-nowrap">Blood Donation</p>
                                                </Link>
                                                <Link href="#">
                                                    <p className="fw-medium text-capitalize text-nowrap">Foods</p>
                                                </Link>
                                                <Link href="#">
                                                    <p className="fw-medium text-capitalize text-nowrap">Medicine</p>
                                                </Link>
                                                <Link href="#">
                                                    <p className="fw-medium text-capitalize text-nowrap">Shelter</p>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <form className="bg-dark-2 rounded-4 p-5 position-lg-absolute bottom-0 z-1 mt-5 wow img-custom-anim-top">
                                        <h6 className="text-white mb-4">Donation form</h6>
                                        <div className="d-flex flex-wrap align-items-center gap-2 pb-8 mt-2">
                                            <div className="form-element">
                                                <input type="radio" className={"05"} name="options-outlined" id={"05"} />
                                                <label className="05 icon-shape icon-lg rounded-4 bg-white bg-opacity-10" htmlFor={"05"}>
                                                    <span className="text-white fw-bold fs-7">05</span>
                                                </label>
                                            </div>
                                            <div className="form-element">
                                                <input type="radio" className={"10"} name="options-outlined" id={"10"} defaultChecked={true} />
                                                <label className="10 icon-shape icon-lg rounded-4 bg-white bg-opacity-10" htmlFor={"10"}>
                                                    <span className="text-white fw-bold fs-7">10</span>
                                                </label>
                                            </div>
                                            <div className="form-element">
                                                <input type="radio" className={"20"} name="options-outlined" id={"20"} />
                                                <label className="20 icon-shape icon-lg rounded-4 bg-white bg-opacity-10" htmlFor={"20"}>
                                                    <span className="text-white fw-bold fs-7">20</span>
                                                </label>
                                            </div>
                                            <div className="form-element">
                                                <input type="radio" className={"50"} name="options-outlined" id={"50"} />
                                                <label className="50 icon-shape icon-lg rounded-4 bg-white bg-opacity-10" htmlFor={"50"}>
                                                    <span className="text-white fw-bold fs-7">50</span>
                                                </label>
                                            </div>
                                            <Link href="#" className="px-3 py-2 align-self-stretch d-flex align-items-center rounded-4 bg-white bg-opacity-10 text-secondary fw-bold">
                                                Custom
                                            </Link>
                                        </div>
                                        <h6 className="text-white fs-6 mb-4">Your detail</h6>
                                        <input type="text" className="form-control username-2 bg-white bg-opacity-10 border-0 mb-3" name="username" placeholder="Your name" />
                                        <input type="text" className="form-control email-2 bg-white bg-opacity-10 border-0 mb-3" name="email" placeholder="Business email" />
                                        <button aria-label="donate" type="submit" className="btn btn-primary mt-4 hover-up">
                                            <span className="text-dark">donate</span>
                                            <img src="assets/imgs/pages/charity/icons/arrow-right.svg" alt="AstraX" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="pt-120">
                                <div className="d-flex flex-column flex-lg-row gap-3 align-items-center py-4 border-top justify-content-between">
                                    <p className="m-0 text-center">
                                        Copyright &amp; design by
                                        <Link href="#" className="text-dark fw-medium">
                                            <span className="text-dark">©Alithemes</span>
                                        </Link>
                                        2025, All Rights Reserved
                                    </p>
                                    <ul className="list-unstyled d-flex mb-0 justify-content-center ms-lg-auto">
                                        <li>
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
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
