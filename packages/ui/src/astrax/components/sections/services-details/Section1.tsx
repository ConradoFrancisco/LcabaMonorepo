import Link from "next/link";

export default function Section1() {
    return (
        <>
            {/*business-services-details section 1*/}
            <section className="business-services-details-section-1 bg-banner position-relative overflow-hidden pt-250-keep pb-100" data-background="assets/imgs/pages/business/template/bg-banner.png">
                <div className="container">
                    <div className="text-center">
                        <h2 className="text-white mb-4 text-anime-style-3">Service Details</h2>
                        <div className="d-flex flex-wrap align-items-center justify-content-center gap-2">
                            <Link href="#" className="text-white">
                                Home
                            </Link>
                            <span className="text-white">/</span>
                            <Link href="#" className="text-white">
                                Services
                            </Link>
                            <span className="text-white">/</span>
                            <Link href="#" className="text-white">
                                Strategic Brand Development
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
