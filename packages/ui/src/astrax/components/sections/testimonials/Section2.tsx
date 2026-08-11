import Link from "next/link";

export default function Section2() {
    const testimonials = [
        {
            delay: "0",
            title: "Changer for Our Business",
            description: "“Working with this team was an amazing experience. Their creativity, dedication, and attention to detail helped us launch a successful marketing.“",
            avatar: "avatar-1.png",
            name: "Sarah Mitchell",
            position: "CEO, TechInnovators",
        },
        {
            delay: "200",
            title: "True Experts in Their Field",
            description: "“Hands down one of the best shirts I’ve ever owned. Fits great, feels amazing, seems to stay cool and is somewhat water resistant anyway.“",
            avatar: "avatar-2.png",
            name: "John Lewis",
            position: "Founder, Global Enterprises",
        },
        {
            delay: "400",
            title: "Professional and Reliable",
            description: "“The team delivered a comprehensive, tailored solution that not only met but exceeded our expectations.“",
            avatar: "avatar-3.png",
            name: "Emily Rodriguez",
            position: "Marketing Director",
        },
        {
            delay: "0",
            title: "Changer for Our Business",
            description: "“Working with this team was an amazing experience. Their creativity, dedication, and attention to detail helped us launch a successful marketing.“",
            avatar: "avatar-4.png",
            name: "David Anderson",
            position: "Managing Director",
        },
        {
            delay: "200",
            title: "True Experts in Their Field",
            description: "“Hands down one of the best shirts I’ve ever owned. Fits great, feels amazing, seems to stay cool and is somewhat water resistant anyway.“",
            avatar: "avatar-5.png",
            name: "Laura Williams",
            position: "Co-Founder, StartUp Co.",
        },
        {
            delay: "400",
            title: "Professional and Reliable",
            description: "“The team delivered a comprehensive, tailored solution that not only met but exceeded our expectations.“",
            avatar: "avatar-6.png",
            name: "Emily Rodriguez",
            position: "Marketing Director",
        },
        {
            delay: "0",
            title: "Incredible Results",
            description: "“Working with this team was an amazing experience. Their creativity, dedication, and attention to detail helped us launch a successful marketing.“",
            avatar: "avatar-7.png",
            name: "Sarah Mitchell",
            position: "CEO, TechInnovators",
        },
        {
            delay: "200",
            title: "Above and Beyond",
            description: "“Hands down one of the best shirts I’ve ever owned. Fits great, feels amazing, seems to stay cool and is somewhat water resistant anyway.“",
            avatar: "avatar-8.png",
            name: "Rachel Thompson",
            position: "Founder, Global Enterprises",
        },
        {
            delay: "400",
            title: "Professional and Reliable",
            description: "“The team delivered a comprehensive, tailored solution that not only met but exceeded our expectations.“",
            avatar: "avatar-9.png",
            name: "Emily Rodriguez",
            position: "Marketing Director",
        },
    ];
    return (
        <>
            {/*business-testimonials section 2*/}
            <section className="business-testimonials-section-2 position-relative overflow-hidden py-120">
                <div className="container">
                    <div className="row align-items-end mb-80 g-4">
                        <div className="col-lg-9">
                            <h6 className="text-anime-style-2">What Our Clients Are Saying</h6>
                            <p className="mb-0 mt-3 wow img-custom-anim-top">We take pride in the lasting relationships we’ve built with our clients, and their feedback is a testament to the quality and impact of our work. Our mission is to provide exceptional solutions that drive results, and our clients' testimonials reflect our dedication to delivering on that promise.</p>
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
                    <div className="row g-lg-5 g-md-4 g-3">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={testimonial.delay}>
                                <div className="card-testimonial border p-5 rounded-4 d-flex flex-column h-100 hover-up">
                                    <div className="d-flex gap-2">
                                        {[...Array(5)].map((_, i) => (
                                            <i key={i} className="bi bi-star-fill text-primary fs-10"></i>
                                        ))}
                                    </div>
                                    <Link href="#">
                                        <h6 className="mb-3 mt-2 fw-medium">{testimonial.title}</h6>
                                    </Link>
                                    <p className="mb-auto">{testimonial.description}</p>
                                    <div className="d-flex align-items-center mt-4">
                                        <Link href="#">
                                            <img className="rounded-circle icon-shape icon-50" src={`/assets/imgs/pages/business/page-testimonials/${testimonial.avatar}`} alt={testimonial.name} />
                                        </Link>
                                        <div className="text-start ms-3">
                                            <Link href="#">
                                                <span className="btn-text">{testimonial.name}</span>
                                            </Link>
                                            <p className="mb-0 fs-7">{testimonial.position}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
