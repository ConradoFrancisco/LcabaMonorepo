import Link from "next/link";

export default function Section2() {
    return (
        <>
            {/*business-about section 2*/}
            <section className="business-about-section-2 position-relative overflow-hidden pb-150">
                <div className="container position-relative z-1">
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-md-12">
                            <span className="d-flex align-items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={2} viewBox="0 0 18 2" fill="none">
                                    <circle opacity="0.2" cx={1} cy={1} r={1} fill="#0D6EFD" />
                                    <circle opacity="0.5" cx={9} cy={1} r={1} fill="#0D6EFD" />
                                    <circle cx={17} cy={1} r={1} fill="#0D6EFD" />
                                </svg>
                                <span className="text-primary btn-text">since from 2000</span>
                            </span>
                            <h2 className="text-dark mt-3 text-anime-style-2">
                                Our digital business approach <span className="text-primary">focuses.</span>
                            </h2>
                            <p className="py-3 wow img-custom-anim-top">We offer a wide range of digital marketing services that cater to businesses of all sizes. A forward-thinking and clever approach to maintaining sales tax compliance amidst the digital era.</p>
                            <div className="border-bottom pb-3">
                                <div className="d-flex align-items-center mb-3" data-aos="fade-left" data-aos-delay={200}>
                                    <svg className="fill-primary" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" fill="none">
                                        <g clipPath="url(#clip0_349_1177)">
                                            <path d="M14.5562 5.26195L11.5845 4.83012L10.2555 2.13734C9.74239 1.09749 8.25807 1.0971 7.74471 2.1373L6.41571 4.83012L3.44399 5.26195C2.29649 5.42866 1.83753 6.84014 2.66813 7.64986L4.81849 9.74594L4.31087 12.7056C4.11484 13.8484 5.31528 14.7211 6.34216 14.1815L9.00011 12.784L11.6581 14.1815C12.6862 14.7218 13.885 13.8458 13.6893 12.7056L13.1817 9.74594L15.3321 7.64986C16.1624 6.84042 15.7042 5.42876 14.5562 5.26195Z" fill="#0D6EFD" />
                                            <path d="M4.73657 1.65681L4.01899 0.669203C3.82419 0.401172 3.44897 0.341723 3.18094 0.536524C2.91287 0.731289 2.85346 1.10651 3.04823 1.37458L3.7658 2.36218C3.9607 2.63036 4.33596 2.68959 4.60385 2.49486C4.87192 2.30013 4.93133 1.92488 4.73657 1.65681Z" fill="#0D6EFD" />
                                            <path d="M2.35535 10.5085C2.25294 10.1934 1.91452 10.0207 1.59931 10.1233L0.414726 10.5082C0.0995857 10.6105 -0.0728554 10.949 0.0295194 11.2642C0.132105 11.58 0.471222 11.7517 0.785553 11.6494L1.97018 11.2645C2.28532 11.1622 2.45776 10.8236 2.35535 10.5085Z" fill="#0D6EFD" />
                                            <path d="M14.8187 0.536534C14.5507 0.341733 14.1755 0.401147 13.9807 0.669213L13.2631 1.65682C13.0683 1.92489 13.1277 2.30014 13.3958 2.49487C13.664 2.68971 14.0391 2.63015 14.2339 2.36219L14.9514 1.37459C15.1462 1.10652 15.0868 0.731299 14.8187 0.536534Z" fill="#0D6EFD" />
                                            <path d="M17.5854 10.5082L16.4008 10.1232C16.0857 10.0206 15.7472 10.1933 15.6448 10.5084C15.5424 10.8236 15.7148 11.1621 16.03 11.2645L17.2146 11.6494C17.5291 11.7517 17.8681 11.5797 17.9706 11.2642C18.073 10.949 17.9006 10.6106 17.5854 10.5082Z" fill="#0D6EFD" />
                                            <path d="M9.00037 15.1602C8.66902 15.1602 8.40039 15.4288 8.40039 15.7601V16.9779C8.40039 17.3092 8.66902 17.5778 9.00037 17.5778C9.33171 17.5778 9.60034 17.3092 9.60034 16.9779V15.7601C9.60038 15.4288 9.33175 15.1602 9.00037 15.1602Z" fill="#0D6EFD" />
                                        </g>
                                    </svg>
                                    <p className="text-dark mb-1 ms-2">Run loyalty program to reward customers</p>
                                </div>
                                <div className="d-flex align-items-center pb-4" data-aos="fade-left" data-aos-delay={400}>
                                    <svg className="fill-primary" xmlns="http://www.w3.org/2000/svg" width={19} height={19} viewBox="0 0 19 19" fill="none">
                                        <g clipPath="url(#clip0_349_1198)">
                                            <path d="M9.72754 0.558594C7.11054 0.558594 4.98145 2.68769 4.98145 5.30469C4.98145 7.92168 7.11054 10.0508 9.72754 10.0508C12.3445 10.0508 14.4736 7.92168 14.4736 5.30469C14.4736 2.68769 12.3445 0.558594 9.72754 0.558594Z" fill="#0D6EFD" />
                                            <path d="M15.6326 13.1514C14.3332 11.832 12.6107 11.1055 10.7822 11.1055H8.67285C6.84445 11.1055 5.12186 11.832 3.82248 13.1514C2.52947 14.4643 1.81738 16.1973 1.81738 18.0312C1.81738 18.3225 2.05349 18.5586 2.34473 18.5586H17.1104C17.4016 18.5586 17.6377 18.3225 17.6377 18.0312C17.6377 16.1973 16.9256 14.4643 15.6326 13.1514Z" fill="#0D6EFD" />
                                        </g>
                                    </svg>
                                    <p className="text-dark mb-1 ms-2">Keep notes on valuable customer preferences</p>
                                </div>
                            </div>
                            <Link href="/contact" className="btn btn-dark mt-4 button--calypso">
                                <span>get in touch</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                    <g clipPath="url(#clip0_828_193)">
                                        <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="white" />
                                    </g>
                                </svg>
                            </Link>
                        </div>
                        <div className="col-lg-6 offset-lg-1 mt-lg-0 mt-8 text-end">
                            <div className="position-relative d-inline-block">
                                <img data-aos="fade-up-right" data-aos-delay={400} src="assets/imgs/pages/business/page-about/img-2.png" alt="AstraX" />
                                <div className="position-absolute top-50 start-0 translate-middle-x mt-3 pe-4 d-none d-md-block">
                                    <img data-aos="fade-up-right" data-aos-delay={500} src="assets/imgs/pages/business/page-about/img-3.png" alt="AstraX" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
