import Link from "next/link";

export default function Section1() {
    return (
        <>
            {/*seo-agency services section 1*/}
            <section className="seo-agency-services-section-1 position-relative overflow-hidden py-120 border-bottom">
                <div className="container position-relative z-1">
                    <div className="text-center">
                        <span className="text-dark btn-text rounded-3 border border-primary px-2 py-1 bg-white">Start your new project here</span>
                        <h2 className="text-dark my-3 text-anime-style-3">Generating New Business Ideas</h2>
                    </div>
                    <div className="row mt-5">
                        <div className="col-lg-10 mx-lg-auto">
                            <img data-aos="zoom-in" src="assets/imgs/pages/seo-agency/page-services/img-1.png" alt="AstraX" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
