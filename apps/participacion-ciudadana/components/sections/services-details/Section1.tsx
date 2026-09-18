"use client";

import CarouselTicker from "@/components/elements/CarouselTicker";

const slidesContent = [<img src="assets/imgs/pages/seo-agency/page-services-details/img-1.png" alt="AstraX" />, <img src="assets/imgs/pages/seo-agency/page-services-details/img-3.png" alt="AstraX" />, <img src="assets/imgs/pages/seo-agency/page-services-details/img-4.png" alt="AstraX" />, <img src="assets/imgs/pages/seo-agency/page-services-details/img-1.png" alt="AstraX" />, <img src="assets/imgs/pages/seo-agency/page-services-details/img-3.png" alt="AstraX" />, <img src="assets/imgs/pages/seo-agency/page-services-details/img-4.png" alt="AstraX" />];

export default function Section1() {
    return (
        <>
            {/*seo-agency services-details section 1*/}
            <section className="seo-agency-services-details-section-1 position-relative overflow-hidden py-80 d-none d-lg-block">
                <div className="container-fluid">
                    <CarouselTicker slides={slidesContent} />
                </div>
            </section>
        </>
    );
}
