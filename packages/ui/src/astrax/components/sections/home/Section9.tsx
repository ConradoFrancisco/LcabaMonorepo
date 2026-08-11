import Link from "next/link";

export default function Section9() {
    return (
        <>
            {/*business section 9*/}
            <section className="business-section-9 position-relative overflow-hidden">
                <div className="container position-relative z-1 text-center bg-primary rounded-4 py-120 ">
                    <div className="position-relative z-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 60 60" fill="none">
                            <path d="M24.7266 31.7578H35.2734V35.2734H24.7266V31.7578Z" fill="white" />
                            <path d="M48.6772 35.2742H38.7891V37.032C38.7891 38.0034 38.0026 38.7898 37.0312 38.7898H22.9688C21.9974 38.7898 21.2109 38.0034 21.2109 37.032V35.2742H11.3228C9.04999 35.2742 7.03995 33.8254 6.32034 31.6693L0 12.7051V51.0945C0 54.0022 2.36572 56.368 5.27344 56.368H54.7266C57.6343 56.368 60 54.0022 60 51.0945V12.7065L53.6792 31.6693C52.9601 33.8254 50.95 35.2742 48.6772 35.2742Z" fill="white" />
                            <path opacity="0.4" d="M37.0312 3.63281H22.9687C20.061 3.63281 17.6953 5.99854 17.6953 8.90625V10.6641H3.02441L9.65421 30.5562C9.89453 31.2753 10.5656 31.7578 11.3228 31.7578H21.2109V30C21.2109 29.0286 21.9973 28.2422 22.9687 28.2422H37.0312C38.0026 28.2422 38.789 29.0286 38.789 30V31.7578H48.6772C49.4343 31.7578 50.1054 31.2753 50.3457 30.5562L56.976 10.6641H42.3047V8.90625C42.3047 5.99854 39.9389 3.63281 37.0312 3.63281ZM21.2109 10.6641V8.90625C21.2109 7.93625 21.9987 7.14844 22.9687 7.14844H37.0312C38.0012 7.14844 38.789 7.93625 38.789 8.90625V10.6641H21.2109Z" fill="white" />
                        </svg>
                        <h2 className="text-white pt-4 text-anime-style-3">
                            Astrax on a journey of <br />
                            learning and skill-building today
                        </h2>
                        <p className="text-white py-3">Build your next landing page fast &amp; easy</p>
                        <div className="d-flex align-items-center flex-wrap gap-4 justify-content-center">
                            <div className="hover-up">
                                <Link data-aos="fade-up" data-aos-delay={200} href="https://www.youtube.com/watch?v=gXFATcwrO-U" className="btn btn-white popup-video ">
                                    Watch free tutorial
                                </Link>
                            </div>
                            <div className="hover-up">
                                <Link data-aos="fade-up" data-aos-delay={400} href="/contact" className="btn btn-dark">
                                    get started now
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="position-absolute bottom-0 end-0 me-lg-10 z-0">
                        <img src="assets/imgs/pages/business/page-home/home-section-9/img-bg.png" alt="AstraX" />
                    </div>
                </div>
                <div className="bg-light-2 position-absolute bottom-0 start-0 w-100 h-50 z-0" />
            </section>
        </>
    );
}
