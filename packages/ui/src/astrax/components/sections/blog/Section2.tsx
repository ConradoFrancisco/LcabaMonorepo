import Link from "next/link";

export default function Section2() {
    return (
        <>
            {/*business-blog section 2*/}
            <section className="business-blog-section-2 position-relative overflow-hidden pt-120">
                <div className="container">
                    <div className="bg-light-2 p-lg-4 p-4 border rounded-4">
                        <div className="row align-items-center">
                            <div className="col-lg-6 px-lg-6">
                                <span className="d-flex align-items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={2} viewBox="0 0 18 2" fill="none">
                                        <circle opacity="0.2" cx={1} cy={1} r={1} fill="#0D6EFD" />
                                        <circle opacity="0.5" cx={9} cy={1} r={1} fill="#0D6EFD" />
                                        <circle cx={17} cy={1} r={1} fill="#0D6EFD" />
                                    </svg>
                                    <span className="text-primary btn-text">Business Strategy</span>
                                </span>
                                <Link href="/blog-details">
                                    <h2 className="text-dark my-3 text-anime-style-3">Top 5 Trends Shaping the Future of Business Consulting</h2>
                                </Link>
                                <p className="wow img-custom-anim-top">Stay ahead of the curve with insights into the latest trends in business consulting, including digital transformation, AI, and sustainability strategies.</p>
                                <Link href="/blog-details" className="btn btn-dark mt-3 button--calypso">
                                    <span>Read more</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                        <g clipPath="url(#clip0_828_193)">
                                            <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="white" />
                                        </g>
                                    </svg>
                                </Link>
                            </div>
                            <div className="col-lg-6 mt-lg-0 mt-5 text-center">
                                <Link href="/blog-details">
                                    <img className="wow img-custom-anim-left rounded-4 w-100" src="assets/imgs/pages/business/page-blog/img-1.png" alt="AstraX" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <form className="col-md-6 mx-auto mt-5">
                            <input data-aos="zoom-in" type="text" className="form-control search-2 py-3 bg-white rounded-pill bg-secondary-2" placeholder="Search article" aria-label="username" />
                        </form>
                    </div>
                    <div className="row mt-8 g-4">
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={200}>
                            <div className="card rounded-0 mb-5 border-0 h-100 hover-up">
                                <Link href="/blog-details" className="position-relative">
                                    <img className="rounded-4" src="assets/imgs/pages/business/page-blog/img-2.png" alt="AstraX" />
                                    <span className="text-dark position-absolute top-0 end-0 bg-white rounded-4 px-2 py-1 m-4">Marketing</span>
                                </Link>
                                <div className="card-body px-0 d-flex flex-column gap-2">
                                    <Link href="/blog-details">
                                        <h6 className="card-title mb-0">Maximizing ROI: The Role of Strategy in Business Success</h6>
                                    </Link>
                                    <p className="card-text mb-0">SEO constantly evolves in response to updates in algorithms and technological advancements.</p>
                                    <div className="button mt-auto">
                                        <Link href="/blog-details" className="btn btn-primary bg-light-2 text-dark button--calypso">
                                            <span>Read more</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                                <g clipPath="url(#clip0_2141_5787)">
                                                    <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="#292929" />
                                                </g>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={400}>
                            <div className="card rounded-0 mb-5 border-0 h-100 hover-up">
                                <Link href="/blog-details" className="position-relative">
                                    <img className="rounded-4" src="assets/imgs/pages/business/page-blog/img-3.png" alt="AstraX" />
                                    <span className="text-dark position-absolute top-0 end-0 bg-white rounded-4 px-2 py-1 m-4">Branding</span>
                                </Link>
                                <div className="card-body px-0 d-flex flex-column gap-2">
                                    <Link href="/blog-details">
                                        <h6 className="card-title mb-0">Why Every Startup Needs a Business Agency</h6>
                                    </Link>
                                    <p className="card-text mb-0">Find out how a business agency can provide startups with the tools and guidance needed to scale.</p>
                                    <div className="button mt-auto">
                                        <Link href="/blog-details" className="btn btn-primary bg-light-2 text-dark button--calypso">
                                            <span>Read more</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                                <g clipPath="url(#clip0_2141_5787)">
                                                    <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="#292929" />
                                                </g>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={600}>
                            <div className="card rounded-0 mb-5 border-0 h-100 hover-up">
                                <Link href="/blog-details" className="position-relative">
                                    <img className="rounded-4" src="assets/imgs/pages/business/page-blog/img-4.png" alt="AstraX" />
                                    <span className="text-dark position-absolute top-0 end-0 bg-white rounded-4 px-2 py-1 m-4">Digital</span>
                                </Link>
                                <div className="card-body px-0 d-flex flex-column gap-2">
                                    <Link href="/blog-details">
                                        <h6 className="card- mb-0title">Digital Marketing Strategies That Drive Results</h6>
                                    </Link>
                                    <p className="card-text mb-0">Explore actionable digital marketing strategies that business agencies use to boost brand awareness.</p>
                                    <div className="button mt-auto">
                                        <Link href="/blog-details" className="btn btn-primary bg-light-2 text-dark button--calypso">
                                            <span>Read more</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                                <g clipPath="url(#clip0_2141_5787)">
                                                    <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="#292929" />
                                                </g>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={200}>
                            <div className="card rounded-0 mb-5 border-0 h-100 hover-up">
                                <Link href="/blog-details" className="position-relative">
                                    <img className="rounded-4" src="assets/imgs/pages/business/page-blog/img-5.png" alt="AstraX" />
                                    <span className="text-dark position-absolute top-0 end-0 bg-white rounded-4 px-2 py-1 m-4">Startup</span>
                                </Link>
                                <div className="card-body px-0 d-flex flex-column gap-2">
                                    <Link href="/blog-details">
                                        <h6 className="card-title mb-0">Scaling Up: How Business Agencies Support Growing Companies</h6>
                                    </Link>
                                    <p className="card-text mb-0">Discover the various ways business agencies help mid-sized companies transition to larger markets</p>
                                    <div className="button mt-auto">
                                        <Link href="/blog-details" className="btn btn-primary bg-light-2 text-dark button--calypso">
                                            <span>Read more</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                                <g clipPath="url(#clip0_2141_5787)">
                                                    <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="#292929" />
                                                </g>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={400}>
                            <div className="card rounded-0 mb-5 border-0 h-100 hover-up">
                                <Link href="/blog-details" className="position-relative">
                                    <img className="rounded-4" src="assets/imgs/pages/business/page-blog/img-6.png" alt="AstraX" />
                                    <span className="text-dark position-absolute top-0 end-0 bg-white rounded-4 px-2 py-1 m-4">Solutions</span>
                                </Link>
                                <div className="card-body px-0 d-flex flex-column gap-2">
                                    <Link href="/blog-details">
                                        <h6 className="card-title mb-0">Secrets to Building Long-Lasting Client Relationships</h6>
                                    </Link>
                                    <p className="card-text mb-0">Learn how business agencies foster meaningful client partnerships and why this approach</p>
                                    <div className="button mt-auto">
                                        <Link href="/blog-details" className="btn btn-primary bg-light-2 text-dark button--calypso">
                                            <span>Read more</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                                <g clipPath="url(#clip0_2141_5787)">
                                                    <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="#292929" />
                                                </g>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={600}>
                            <div className="card rounded-0 mb-5 border-0 h-100 hover-up">
                                <Link href="/blog-details" className="position-relative">
                                    <img className="rounded-4" src="assets/imgs/pages/business/page-blog/img-7.png" alt="AstraX" />
                                    <span className="text-dark position-absolute top-0 end-0 bg-white rounded-4 px-2 py-1 m-4">Marketing</span>
                                </Link>
                                <div className="card-body px-0 d-flex flex-column gap-2">
                                    <Link href="/blog-details">
                                        <h6 className="card-title mb-0">What to Expect When Working with a Business Agency</h6>
                                    </Link>
                                    <p className="card-text mb-0">SEO constantly evolves in response to updates in algorithms and technological advancements.</p>
                                    <div className="button mt-auto">
                                        <Link href="/blog-details" className="btn btn-primary bg-light-2 text-dark button--calypso">
                                            <span>Read more</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                                <g clipPath="url(#clip0_2141_5787)">
                                                    <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="#292929" />
                                                </g>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={200}>
                            <div className="card rounded-0 mb-5 border-0 h-100 hover-up">
                                <Link href="/blog-details" className="position-relative">
                                    <img className="rounded-4" src="assets/imgs/pages/business/page-blog/img-8.png" alt="AstraX" />
                                    <span className="text-dark position-absolute top-0 end-0 bg-white rounded-4 px-2 py-1 m-4">Digital</span>
                                </Link>
                                <div className="card-body px-0 d-flex flex-column gap-2">
                                    <Link href="/blog-details">
                                        <h6 className="card- mb-0title">Transforming Brands with Strategic Solutions</h6>
                                    </Link>
                                    <p className="card-text mb-0">SEO constantly evolves in response to updates in algorithms and technological advancements.</p>
                                    <div className="button mt-auto">
                                        <Link href="/blog-details" className="btn btn-primary bg-light-2 text-dark button--calypso">
                                            <span>Read more</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                                <g clipPath="url(#clip0_2141_5787)">
                                                    <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="#292929" />
                                                </g>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={400}>
                            <div className="card rounded-0 mb-5 border-0 h-100 hover-up">
                                <Link href="/blog-details" className="position-relative">
                                    <img className="rounded-4" src="assets/imgs/pages/business/page-blog/img-9.png" alt="AstraX" />
                                    <span className="text-dark position-absolute top-0 end-0 bg-white rounded-4 px-2 py-1 m-4">Marketing</span>
                                </Link>
                                <div className="card-body px-0 d-flex flex-column gap-2">
                                    <Link href="/blog-details">
                                        <h6 className="card-title">The mb-0 Art of Crafting a Winning Business Proposal</h6>
                                    </Link>
                                    <p className="card-text mb-0">Discover how to create compelling business proposals that capture attention, build trust.</p>
                                    <div className="button mt-auto">
                                        <Link href="/blog-details" className="btn btn-primary bg-light-2 text-dark button--calypso">
                                            <span>Read more</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                                <g clipPath="url(#clip0_2141_5787)">
                                                    <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="#292929" />
                                                </g>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={600}>
                            <div className="card rounded-0 mb-5 border-0 h-100 hover-up">
                                <Link href="/blog-details" className="position-relative">
                                    <img className="rounded-4" src="assets/imgs/pages/business/page-blog/img-10.png" alt="AstraX" />
                                    <span className="text-dark position-absolute top-0 end-0 bg-white rounded-4 px-2 py-1 m-4">Branding</span>
                                </Link>
                                <div className="card-body px-0 d-flex flex-column gap-2">
                                    <Link href="/blog-details">
                                        <h6 className="card-title mb-0">How Data-Driven Decisions Boost Business Performance</h6>
                                    </Link>
                                    <p className="card-text mb-0">SEO constantly evolves in response to updates in algorithms and technological advancements.</p>
                                    <div className="button mt-auto">
                                        <Link href="/blog-details" className="btn btn-primary bg-light-2 text-dark button--calypso">
                                            <span>Read more</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                                <g clipPath="url(#clip0_2141_5787)">
                                                    <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="#292929" />
                                                </g>
                                            </svg>
                                        </Link>
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
