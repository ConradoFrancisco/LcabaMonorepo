import Link from "next/link";

export default function Section1() {
    return (
        <>
            {/*charity-home home section 1*/}
            <section className="charity-home-section-1 position-relative overflow-hidden">
                <div className="position-relative overflow-hidden">
                    <div className="container pt-250 pb-250">
                        <div className="position-relative">
                            <div className="position-relative z-1">
                                <div className="number-step d-flex align-items-center gap-3">
                                    <i className="fa-solid fa-heart text-primary" />
                                    <span className="btn-text">We are Creating a brighter tomorrow</span>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 mb-4 mt-3">
                                        <h1 className="ds-1 text-anime-style-2">
                                            Assistance <br />
                                            for the <span className="bg-white border rounded-5 px-2">hopeless</span>
                                        </h1>
                                    </div>
                                </div>
                                <Link href="/become-a-volunteer" className="btn btn-dark">
                                    <span>explore causes</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                        <g clipPath="url(#clip0_1121_817)">
                                            <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="#ECAB23" />
                                        </g>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="h-100 position-lg-absolute position-relative start-lg-50 bottom-lg-0 d-none d-lg-block">
                        <img className="w-100 h-100" src="assets/imgs/pages/charity/page-home/home-section-1/img-1.png" alt="AstraX" />
                    </div>
                    <div className="h-100 position-absolute end-50 bottom-lg-0 top-0 start-0 w-lg-50 w-100">
                        <img className="w-100 h-100" src="assets/imgs/pages/charity/page-home/home-section-1/overley.png" alt="AstraX" />
                    </div>
                </div>
            </section>
        </>
    );
}
