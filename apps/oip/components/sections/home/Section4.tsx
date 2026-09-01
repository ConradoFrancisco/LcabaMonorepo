import Link from "next/link";

export default function Section4() {
    return (
        <>
            {/*data-analysis-home section 4*/}
            <section className="data-analysis-home-section-4 position-relative overflow-hidden pb-120">
                <div className="position-relative">
                    <div className="bg-secondary-2 position-absolute bottom-50 start-0 end-0 w-100 h-50 z-0" />
                    <div className="container position-relative z-1">
                        <div className="card-project bg-white rounded-4">
                            <div className="row align-items-end">
                                <div className="col-lg-6 py-8 ps-8">
                                    <h2 className="text-anime-style-1">Hire us for your next-gen data analysis project.</h2>
                                    <p className="py-4">Let’s talk today &amp; asap</p>
                                    <Link href="#" className="btn btn-primary hover-up">
                                        info@astrax.com
                                    </Link>
                                    <Link href="telto:(123) 456 789 00" className="btn btn-outline-dark ms-md-3 mt-md-0 mt-3 hover-up">
                                        +(123) 456 789 00
                                    </Link>
                                </div>
                                <div className="col-lg-6">
                                    <div className="position-relative text-center text-lg-start" data-aos="zoom-in-up">
                                        <img className="position-relative z-1" src="assets/imgs/pages/data-analysis/page-home/home-section-4/img-1.png" alt="AstraX" />
                                        <div className="position-absolute bottom-0 end-0 me-lg-5 z-0 d-none d-md-block">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={679} height={384} viewBox="0 0 679 384" fill="none">
                                                <path d="M64.6699 618.947V231.51L339.471 74.4863L614.34 231.51V544.461L339.471 701.514L194 618.375V306.559L339.471 223.43L485 306.559V469.402L339.471 552.541L323.34 543.326V381.627L404.645 335.145L339.471 297.916L258.67 344.117V580.836L339.471 627.027L549.67 506.912V269.049L339.471 148.973L129.34 269.049V655.885L339.471 776L679 582V194L339.471 0L0 194V582L64.6699 618.947Z" fill="#EDF1FC" />
                                            </svg>
                                        </div>
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
