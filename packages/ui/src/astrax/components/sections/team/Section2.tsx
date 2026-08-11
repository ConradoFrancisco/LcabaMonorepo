import BusinessCardList from "../../../components/elements/BusinessCardList";
import Link from "next/link";

export default function Section2() {
    return (
        <>
            {/*business-team section 2*/}
            <section className="business-team-section-2 position-relative overflow-hidden py-120">
                <div className="container">
                    <div className="row align-items-end mb-80 g-4">
                        <div className="col-lg-9">
                            <h6 className="text-anime-style-3">
                                Get to know our team and how we <br />
                                can help your business thrive!
                            </h6>
                            <p className="mb-0 mt-3 wow img-custom-anim-top">At the heart of every great business are the talented individuals who bring their expertise, passion, and innovation to the table. Our team is made up of experienced professionals who are committed to delivering exceptional results for our clients. Together, we combine diverse skills and perspectives to provide tailored solutions that drive business success.</p>
                        </div>
                        <div className="col-lg-2 text-lg-end ms-lg-auto">
                            <Link href="/contact" className="btn btn-dark button--calypso">
                                <span>Contact Us</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                    <g clipPath="url(#clip0_1396_577)">
                                        <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="white" />
                                    </g>
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <BusinessCardList />
                    <div className="text-center" data-aos="fade-up" data-aos-delay={200}>
                        <Link href="#" className="btn btn-dark button--calypso">
                            <span>View ALl Members</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                <g clipPath="url(#clip0_1253_767)">
                                    <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="white" />
                                </g>
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
