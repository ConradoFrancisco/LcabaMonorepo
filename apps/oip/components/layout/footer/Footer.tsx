import Link from "next/link";

export default function Footer() {
    return (
        <>
            {/* Footer */}
            <footer>
                <div className="section-footer-6 position-relative">
                    <div className="container-fluid">
                        <div className="container position-relative z-2">
                            <div className="row pb-120 pt-120">
                                <div className="col-lg-3 col-md-4 col-6 mb-5">
                                    <h6 className="text-white pb-3">Company</h6>
                                    <div className="d-flex flex-column align-items-start">
                                        <Link href="#">
                                            <p className="hover-effect-1 text-white opacity-75">About</p>
                                        </Link>
                                        <Link href="#">
                                            <p className="hover-effect-1 text-white opacity-75">Features</p>
                                        </Link>
                                        <Link href="#">
                                            <p className="hover-effect-1 text-white opacity-75">Works</p>
                                        </Link>
                                        <Link href="#">
                                            <p className="hover-effect-1 text-white opacity-75">Career</p>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-6 mt-md-0 mt-5">
                                    <h6 className="text-white pb-3">Help</h6>
                                    <div className="d-flex flex-column align-items-start">
                                        <Link href="#">
                                            <p className="hover-effect-1 text-white opacity-75">Customer Support</p>
                                        </Link>
                                        <Link href="#">
                                            <p className="hover-effect-1 text-white opacity-75">Delivery Details</p>
                                        </Link>
                                        <Link href="#">
                                            <p className="hover-effect-1 text-white opacity-75">Term &amp; Condition</p>
                                        </Link>
                                        <Link href="#">
                                            <p className="hover-effect-1 text-white opacity-75">Privacy Policy</p>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-6 mb-5">
                                    <h6 className="text-white pb-3">Resources</h6>
                                    <div className="d-flex flex-column align-items-start">
                                        <Link href="#">
                                            <p className="hover-effect-1 text-white opacity-75">Design Kit</p>
                                        </Link>
                                        <Link href="#">
                                            <p className="hover-effect-1 text-white opacity-75">Development Tutorial</p>
                                        </Link>
                                        <Link href="#">
                                            <p className="hover-effect-1 text-white opacity-75">How to - Blog</p>
                                        </Link>
                                        <Link href="#">
                                            <p className="hover-effect-1 text-white opacity-75">Youtube Playlist</p>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4 col-6 mt-md-0 mt-5">
                                    <h6 className="text-white pb-3">Get in touch</h6>
                                    <Link href="#" className="d-flex gap-2">
                                        <div className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                <g opacity="0.4">
                                                    <path className="fill-white" fillRule="evenodd" clipRule="evenodd" d="M6.0604 4.86069C9.3408 1.58029 14.6594 1.58029 17.9398 4.86069C21.2202 8.1411 21.2202 13.4597 17.9398 16.7401L12.0001 22.6798L6.0604 16.7401C2.78 13.4597 2.78 8.1411 6.0604 4.86069ZM12.0001 13.2004C13.3256 13.2004 14.4001 12.1259 14.4001 10.8004C14.4001 9.47491 13.3256 8.40039 12.0001 8.40039C10.6746 8.40039 9.6001 9.47491 9.6001 10.8004C9.6001 12.1259 10.6746 13.2004 12.0001 13.2004Z" fill="white" />
                                                </g>
                                            </svg>
                                        </div>
                                        <p className="text-white">123 Main Street, Springfield, Illinois, 62701, USA</p>
                                    </Link>
                                    <Link href="#" className="d-flex gap-2">
                                        <div className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                <g opacity="0.4">
                                                    <path className="fill-white" d="M2.4039 7.06105L11.9998 11.859L21.5959 7.06099C21.5235 5.80056 20.4785 4.80078 19.1999 4.80078H4.7999C3.52132 4.80078 2.47626 5.8006 2.4039 7.06105Z" fill="white" />
                                                    <path className="fill-white" d="M21.5999 9.74227L11.9998 14.5423L2.3999 9.74233V16.8008C2.3999 18.1263 3.47442 19.2008 4.7999 19.2008H19.1999C20.5254 19.2008 21.5999 18.1263 21.5999 16.8008V9.74227Z" fill="white" />
                                                </g>
                                            </svg>
                                        </div>
                                        <p className="text-white">support@astrax.com</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="d-flex flex-column flex-lg-row gap-3 align-items-center py-4 border-top border-bottom border-opacity-10 border-white">
                                <div className="d-flex align-items-center justify-content-center flex-wrap gap-md-5 gap-3">
                                    <Link href="#">
                                        <span className="btn-text text-white">About</span>
                                    </Link>
                                    <Link href="#">
                                        <span className="btn-text text-white">Solutions</span>
                                    </Link>
                                    <Link href="#">
                                        <span className="btn-text text-white">Pricing</span>
                                    </Link>
                                    <Link href="#">
                                        <span className="btn-text text-white">Resources</span>
                                    </Link>
                                </div>
                                <Link className="d-flex gap-2 mx-auto" href="/">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
                                        <g>
                                            <path className="fill-white" d="M24.5043 9.79724L22.7082 18.3981L35.2929 17.1948L37.1117 7.00605L24.5043 9.79724Z" />
                                            <path className="fill-white" d="M31.9171 17.6837L23.2697 20.6189L30.6333 30.3865L40.723 26.6545L31.9171 17.6837Z" />
                                            <path className="fill-white" d="M28.4204 27.86L21.4605 22.2312L16.332 33.3249L24.7296 39.7347L28.4204 27.86Z" />
                                            <path className="fill-white" d="M17.5913 29.998L19.1912 21.3633L6.63465 22.8288L5.04812 33.0511L17.5913 29.998Z" />
                                            <path className="fill-white" d="M10.2917 22.1777L18.8717 19.0632L11.2859 9.45346L1.28177 13.3945L10.2917 22.1777Z" />
                                            <path className="fill-white" d="M13.7243 12.2243L20.8121 17.7054L25.6875 6.50938L17.1442 0.277556L13.7243 12.2243Z" />
                                        </g>
                                    </svg>
                                    <h5 className="mb-0 text-white">Astrax</h5>
                                </Link>
                                <ul className="list-unstyled d-flex mb-0 justify-content-center ms-lg-auto">
                                    <li>
                                        <Link href="#">
                                            <span className="icon size-14">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                                                    <path className="fill-white" d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                                                </svg>
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="ms-3">
                                        <Link href="#">
                                            <span className="icon size-14">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path className="fill-white" d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                                                </svg>
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="ms-3">
                                        <Link href="#">
                                            <span className="icon size-14">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                    <path className="fill-white" d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2 .6-8.7 .6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z" />
                                                </svg>
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="ms-3">
                                        <Link href="#">
                                            <span className="icon size-14">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                    <path className="fill-white" d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                                                </svg>
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="text-center py-4 d-flex align-items-center justify-content-center flex-wrap">
                                <p className="text-white opacity-50 mb-0">Copyright &amp; design by</p>
                                <Link href="#" className="text-white">
                                    <span className="text-white opacity-100 fw-medium">&nbsp; ©Alithemes &nbsp;</span>
                                </Link>
                                <p className="text-white opacity-50 mb-0">2025, All Rights Reserved</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-primary position-absolute top-0 start-0 w-100 h-100" />
                </div>
            </footer>
        </>
    );
}
