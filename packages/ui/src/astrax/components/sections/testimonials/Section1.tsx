import Link from "next/link";

export default function Section1() {
    return (
        <>
            {/*business-testimonials section 1*/}
            <section className="business-testimonials-section-1 bg-banner position-relative overflow-hidden pt-250-keep pb-100" data-background="assets/imgs/pages/business/template/bg-banner.png">
                <div className="container">
                    <div className="text-center">
                        <h2 className="text-white mb-4 text-anime-style-2">Our Client Reviews</h2>
                        <div className="d-flex align-items-center justify-content-center gap-2">
                            <Link href="#" className="text-white">
                                Home
                            </Link>
                            <span className="text-white">/</span>
                            <Link href="#" className="text-white">
                                Testimonials
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
