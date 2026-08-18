import Link from "next/link";
import MobileMenu from "../MobileMenu";
import MainMenu from "../MainMenu";

export default function Header({ scroll, isMobileMenu, handleMobileMenu }: any) {
    return (
        <>
            <header>
                {/* TOP-BAR */}
                <div className="top-bar bg-dark-2 py-1 z-3">
                    <div className="container custom-container d-flex flex-wrap justify-content-between align-items-center">
                        <ul className="navbar-nav border-0 pe-0 flex-row gap-3">
                            <li className="nav-item dropdown">
                                <Link className="nav-link fw-semibold fs-7 d-none d-md-block" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    English
                                    <i className="bi bi-chevron-down fs-7 ms-1" />
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item text-capitalize fs-7" href="#">
                                            English
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item text-capitalize fs-7" href="#">
                                            French
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item text-capitalize fs-7" href="#">
                                            German
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item text-capitalize fs-7" href="#">
                                            Spanish
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link fw-semibold fs-7 d-none d-md-block" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    USD
                                    <i className="bi bi-chevron-down fs-7 ms-1" />
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item text-capitalize fs-7" href="#">
                                            USD
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item text-capitalize fs-7" href="#">
                                            EUR
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item text-capitalize fs-7" href="#">
                                            GBP
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <div className="d-flex justify-content-center gap-3 align-self-stretch">
                            <Link href="#" className="fs-7 d-flex align-items-center px-3">
                                <i className="ri-mail-open-line text-white" />
                                <span className="text-secondary-2"> &nbsp; info@astrax.com </span>
                            </Link>
                            <Link href="telto:(123) 456 789 00" className="fs-7 d-flex align-items-center">
                                <i className="ri-phone-line text-white" />
                                <span className="text-secondary-2"> +(123) 456 789 00 </span>
                            </Link>
                        </div>
                    </div>
                </div>
                <nav className={`navbar navbar-expand-lg z-5 p-0 ${scroll ? "navbar-stick top-0 position-fixed w-100" : ""}`}>
                    <div className="custom-container container px-0 py-lg-0 py-4">
                        <div className="bg-logo position-absolute top-0 start-50 translate-middle-x d-none d-lg-block rounded-bottom-4">
                            <Link className="navbar-brand me-0 position-absolute top-50 start-50 translate-middle z-1" href="/">
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
                                <h5 className="mb-0 fw-regular text-white">Astrax</h5>
                            </Link>
                            <div className="position-absolute bottom-0 end-0 p-3 z-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width={86} height={86} viewBox="0 0 86 86" fill="none">
                                    <g opacity="0.06" clipPath="url(#clip0_585_6582)">
                                        <path d="M61.5674 9.81733C59.2618 7.64592 56.3093 6.60303 53.3341 6.60303C49.9849 6.60303 46.605 7.92448 44.0839 10.4466L43.0006 11.5299L41.9174 10.4462C39.3963 7.92511 36.0163 6.60303 32.6672 6.60303C29.6913 6.60303 26.7403 7.64592 24.4338 9.81733C19.3616 14.5932 19.2711 22.5792 24.1623 27.4705L43.0008 46.3088L61.8391 27.4705C66.7304 22.579 66.6398 14.593 61.5674 9.81733Z" fill="white" />
                                        <path d="M36.3969 79.3969L36.3825 60.7314C36.3825 51.717 31.765 46.432 25.6491 44.4413C23.9422 43.9247 22.4129 42.5675 20.9905 41.1445C18.4063 38.4532 15.6437 34.7723 12.065 34.818L12.0617 34.8044C10.8943 34.8197 9.72708 35.2416 8.715 36.2537C6.34155 38.6271 7.30048 42.2534 9.3474 44.3003L15.9965 50.9487C16.6169 51.5691 16.9657 52.4108 16.9657 53.2883C16.9657 54.1659 16.6169 55.0074 15.9965 55.628L7.00786 46.6398C5.44569 45.0779 4.38418 42.9662 4.09486 40.8469C3.73462 38.2067 4.54403 35.7447 6.37443 33.9143C7.74531 32.5434 9.42722 31.7696 11.2618 31.574L9.9192 26.1514C9.81746 6.02806 0.000827203 8.48651 0.000827203 13.2204L0 48.548C0 50.7421 0.849952 52.8101 2.39434 54.3707C18.8317 70.9602 16.5441 65.6157 16.5441 79.3969H36.3969Z" fill="white" />
                                        <path d="M85.9996 13.2208C85.9996 8.4871 76.183 6.02844 76.0813 26.152L74.7387 31.5746C76.5732 31.7702 78.2552 32.5438 79.626 33.9149C81.4564 35.7453 82.2661 38.2073 81.9056 40.8475C81.6165 42.9668 80.555 45.0784 78.9926 46.6404L70.004 55.6286C69.3836 55.0078 69.0347 54.1665 69.0347 53.2889C69.0347 52.4116 69.3836 51.5697 70.004 50.9493L76.6531 44.3009C78.7 42.254 79.6589 38.6275 77.2855 36.2542C76.2734 35.2422 75.106 34.8203 73.9388 34.805L73.9355 34.8186C70.3568 34.7729 67.5942 38.4538 65.01 41.1451C63.5874 42.5681 62.0581 43.9251 60.3514 44.4419C54.2354 46.4324 49.618 51.7176 49.618 60.7318L49.6035 79.3973H69.4564C69.4564 65.6165 67.1688 70.9608 83.6061 54.371C85.1507 52.8103 86.0005 50.7423 86.0005 48.5484L85.9996 13.2208Z" fill="white" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <Link className="navbar-brand d-lg-none ps-4" href="/">
                            <svg className="fill-primary" xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
                                <g clipPath="url(#clip0_2279_27500)">
                                    <path d="M24.5053 9.79627L22.7092 18.3971L35.2939 17.1938L37.1127 7.00508L24.5053 9.79627Z" fill="#ECAB23" />
                                    <path d="M31.918 17.6827L23.2707 20.618L30.6343 30.3856L40.724 26.6535L31.918 17.6827Z" fill="#ECAB23" />
                                    <path d="M28.4214 27.859L21.4615 22.2303L16.3329 33.3239L24.7306 39.7337L28.4214 27.859Z" fill="#ECAB23" />
                                    <path d="M17.5922 29.997L19.1922 21.3623L6.63563 22.8278L5.0491 33.0501L17.5922 29.997Z" fill="#ECAB23" />
                                    <path d="M10.2927 22.1767L18.8727 19.0623L11.2868 9.45248L1.28274 13.3935L10.2927 22.1767Z" fill="#ECAB23" />
                                    <path d="M13.7252 12.2233L20.813 17.7044L25.6885 6.50841L17.1452 0.276579L13.7252 12.2233Z" fill="#ECAB23" />
                                </g>
                            </svg>
                            <h5 className="mb-0 fw-semibold">Astrax</h5>
                        </Link>
                        <div className="d-none d-lg-flex me-auto align-self-stretch">
                            <MainMenu />
                        </div>
                        <div className="d-flex align-items-center gap-4 align-self-stretch pe-4 pe-lg-0">
                            <Link href="/donation-details" className="btn btn-outline-secondary d-none d-md-flex">
                                <span>donate now</span>
                                <svg className="fill-primary" xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                    <g clipPath="url(#clip0_948_1486)">
                                        <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="#005153" />
                                    </g>
                                </svg>
                            </Link>
                            <Link href="#" className="menu-tigger d-none d-lg-flex py-5 px-6 border-start border-end align-self-stretch align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width={19} height={19} viewBox="0 0 19 19" fill="none">
                                    <rect width={3} height={3} fill="#2C2E3C" />
                                    <rect y={8} width={3} height={3} fill="#2C2E3C" />
                                    <rect y={16} width={3} height={3} fill="#2C2E3C" />
                                    <rect x={8} width={3} height={3} fill="#2C2E3C" />
                                    <rect x={8} y={8} width={3} height={3} fill="#2C2E3C" />
                                    <rect x={16} y={16} width={3} height={3} fill="#2C2E3C" />
                                    <rect x={16} width={3} height={3} fill="#2C2E3C" />
                                    <rect x={16} y={8} width={3} height={3} fill="#2C2E3C" />
                                </svg>
                            </Link>

                            <div className="burger-icon burger-icon-white border rounded-3 top-0 end-0" onClick={handleMobileMenu}>
                                <span className="burger-icon-top" />
                                <span className="burger-icon-mid" />
                                <span className="burger-icon-bottom" />
                            </div>
                        </div>
                    </div>
                </nav>
                {/* offCanvas-menu */}
                <div className="offCanvas__info">
                    <div className="offCanvas__close-icon menu-close">
                        <button className="btn-close" aria-label="Close">
                            <i className="ri-close-line" />
                        </button>
                    </div>
                    <div className="offCanvas__logo mb-30">
                        <Link className="d-flex align-items-center gap-2" href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
                                <g>
                                    <path className="fill-green-3" d="M24.5043 9.79724L22.7082 18.3981L35.2929 17.1948L37.1117 7.00605L24.5043 9.79724Z"></path>
                                    <path className="fill-green-3" d="M31.9171 17.6837L23.2697 20.6189L30.6333 30.3865L40.723 26.6545L31.9171 17.6837Z"></path>
                                    <path className="fill-green-3" d="M28.4204 27.86L21.4605 22.2312L16.332 33.3249L24.7296 39.7347L28.4204 27.86Z"></path>
                                    <path className="fill-green-3" d="M17.5913 29.998L19.1912 21.3633L6.63465 22.8288L5.04812 33.0511L17.5913 29.998Z"></path>
                                    <path className="fill-green-3" d="M10.2917 22.1777L18.8717 19.0632L11.2859 9.45346L1.28177 13.3945L10.2917 22.1777Z"></path>
                                    <path className="fill-green-3" d="M13.7243 12.2243L20.8121 17.7054L25.6875 6.50938L17.1442 0.277556L13.7243 12.2243Z"></path>
                                </g>
                            </svg>
                            <h5 className="mb-0 text-dark">Astrax</h5>
                        </Link>
                    </div>
                    <div className="offCanvas__side-info mb-30">
                        <div className="contact-list mb-30">
                            <h4>Office Address</h4>
                            <p>
                                123/A, Miranda City Likaoli <br />
                                Prikano, Dope
                            </p>
                        </div>
                        <div className="contact-list mb-30">
                            <h4>Phone Number</h4>
                            <p>+0989 7876 9865 9</p>
                            <p>+(090) 8765 86543 85</p>
                        </div>
                        <div className="contact-list mb-30">
                            <h4>Email Address</h4>
                            <p>info@example.com</p>
                            <p>example.mail@hum.com</p>
                        </div>
                    </div>
                    <div className="offCanvas__social-icon mt-30">
                        <Link href="#)">
                            <i className="bi bi-facebook" />
                        </Link>
                        <Link href="#)">
                            <i className="bi bi-twitter-x" />
                        </Link>
                        <Link href="#)">
                            <i className="bi bi-linkedin" />
                        </Link>
                        <Link href="#)">
                            <i className="bi bi-behance" />
                        </Link>
                    </div>
                </div>
                <div className="offCanvas__overly" />
                {/* Offcanvas search */}
                <div className="offcanvas offcanvas-top" tabIndex={-1} id="offcanvasTop">
                    <div className="offcanvas-header">
                        <button className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                    </div>
                    <div className="offcanvas-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-8 mx-auto">
                                    <h3 className="mb-4">What are you looking for?</h3>
                                    <form className="input-group mb-3" data-aos="zoom-in">
                                        <input type="text" className="form-control" placeholder="Enter Your Keywords" aria-label="Enter Your Keywords" aria-describedby="button-addon2" />
                                        <button className="btn btn-primary rounded-end-2" type="submit" aria-label="search" id="button-addon2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                <path d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Offcanvas search */}
                <MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
            </header>
        </>
    );
}
