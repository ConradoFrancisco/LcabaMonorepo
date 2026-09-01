"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

export default function Section1() {
    useEffect(() => {
        AOS.init();
    }, []);
    const projects = [
        {
            delay: "0",
            img: "/assets/imgs/pages/data-analysis/page-child/card-project-1.png",
            category: "Market behavior research",
            title: "Quantum Finance Data Integration",
            description: "The integration of multiple data sources into a single, streamlined platform enabled Quantum Finance to access real-time analytics on their investments, risk levels, and market trends.",
            client: "Quantum Finance",
            date: "January 2024 - March 2024",
            budget: "$150,000",
        },
        {
            delay: "200",
            img: "/assets/imgs/pages/data-analysis/page-child/card-project-2.png",
            category: "Industries & manufacture data",
            title: "Visionary Media Marketing Optimization",
            description: "AstraX implemented predictive analytics to segment the customer base more accurately, identifying high-value audiences and optimizing marketing campaigns.",
            client: "Visionary Media",
            date: "March 2024 - June 2024",
            budget: "$120,000",
        },
        {
            delay: "400",
            img: "/assets/imgs/pages/data-analysis/page-child/card-project-3.png",
            category: "Big Data Analytics",
            title: "Synergy Enterprises Business AI",
            description: "The custom BI dashboards we developed provided Synergy Enterprises with a comprehensive, real-time view of their key performance indicators (KPIs) across various departments.",
            client: "Synergy Enterprises",
            date: "June 2024 - September 2024",
            budget: "$180,000",
        },
        {
            delay: "600",
            img: "/assets/imgs/pages/data-analysis/page-child/card-project-4.png",
            category: "AI & Machine Learning Solutions",
            title: "InnovateX Systems AI-driven Automation",
            description: "By integrating machine learning models, we were able to automate routine tasks, enabling staff to focus on higher-value activities.",
            client: "InnovateX Systems",
            date: "September 2024 - December 2024",
            budget: "$250,000",
        },
    ];
    return (
        <>
            {/*data-analysis projects section 1*/}
            <section className="data-analysis-projects-section-1 position-relative overflow-hidden pb-120 pt-120">
                <div className="container position-relative z-1">
                    <div className="row align-items-end mb-80">
                        <div className="col-lg-7">
                            <h5 className="text-anime-style-1">
                                Our Proven Track Record of Delivering Exceptional <span className="text-primary">Data Solutions</span> and Transformative Results for Clients Across <span className="text-primary">Diverse Industries</span>
                            </h5>
                        </div>
                        <div className="col-lg-5">
                            <div className="px-lg-5">
                                <p className="mb-0">From integrating complex data systems to implementing advanced AI and machine learning solutions, our team of experts has consistently delivered impactful results.</p>
                            </div>
                        </div>
                    </div>
                    {projects.map((project, index) => (
                        <div key={index} className="card-projects border rounded-3 mt-5 p-md-4 p-3 mb-5" data-aos="fade-up" data-aos-delay={project.delay}>
                            <div className="row align-items-center g-md-5 g-4">
                                <div className="col-lg-5">
                                    <div className="card-projects-img bg-secondary-2 rounded-3 text-center h-100 pt-4">
                                        <Link href="#">
                                            <img src={project.img} alt={project.title} className="img-fluid" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="pe-lg-8 px-md-5 px-3 ps-lg-0">
                                        <span className="btn-text text-primary">{project.category}</span>
                                        <Link href="#">
                                            <h5 className="pt-2 mb-3">{project.title}</h5>
                                        </Link>
                                        <p className="mb-5">{project.description}</p>
                                        <div className="d-flex flex-md-nowrap flex-wrap align-items-center justify-content-between gap-3">
                                            <div>
                                                <div className="d-flex align-items-center gap-1">
                                                    <svg className="fill-primary" xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21" fill="none">
                                                        <path d="M7.38184 6.39673C7.38184 8.27401 8.90911 9.76946 10.7546 9.76946C11.4546 9.76946 12.0909 9.57855 12.6 9.19673C12.6318 9.19673 12.6318 9.16491 12.6637 9.16491C13.5546 8.56037 14.1273 7.54219 14.1273 6.36491C14.1273 4.48764 12.6 2.99219 10.7546 2.99219C8.90911 2.99219 7.38184 4.51946 7.38184 6.39673Z" fill="#794AFF" />
                                                        <path d="M16.9274 15.6229C16.9274 13.0138 15.3047 10.6911 12.8547 9.83203C11.582 10.5957 9.99104 10.6275 8.6865 9.83203C6.2365 10.7229 4.61377 13.0138 4.61377 15.6229C4.61377 17.1502 7.79559 17.9775 10.7865 17.9775C13.7774 17.9775 16.9274 17.1502 16.9274 15.6229Z" fill="#794AFF" />
                                                        <path d="M2.73633 11.1356C2.73633 12.1856 3.65906 12.9174 4.58178 12.8219C4.93178 12.0265 5.44087 11.3265 6.07724 10.7219C5.88633 9.99013 5.21815 9.44922 4.45451 9.44922C3.49996 9.44922 2.73633 10.2129 2.73633 11.1356Z" fill="#794AFF" />
                                                        <path d="M0.699951 15.6862C0.699951 15.8453 0.795406 16.0044 0.954497 16.1317C1.55904 16.6408 2.99086 16.8953 4.42268 16.7999C3.65904 16.2271 3.46813 15.6226 3.46813 15.1453C3.46813 14.3817 3.59541 13.6817 3.81813 12.9817C3.46813 12.9499 3.11813 12.8544 2.79995 12.6953C1.49541 13.1726 0.699951 14.3499 0.699951 15.6862Z" fill="#794AFF" />
                                                        <path d="M20.3 16.1628C20.3 14.8264 19.4728 13.6491 18.2319 13.1719C17.9137 13.3628 17.5637 13.4582 17.2137 13.4582C17.4364 14.1264 17.5637 14.8582 17.5637 15.6219C17.5637 16.2901 17.2137 16.831 16.6091 17.2764C17.7864 17.3401 20.3 17.0855 20.3 16.1628Z" fill="#794AFF" />
                                                        <path d="M17.1181 9.44922C16.3226 9.44922 15.6863 9.95831 15.4954 10.7219C16.1317 11.3265 16.6408 12.0265 16.9908 12.8538C17.9454 12.9492 18.8045 12.1856 18.8045 11.1674C18.8045 10.2129 18.0408 9.44922 17.1181 9.44922Z" fill="#794AFF" />
                                                    </svg>
                                                    <p className="text-dark mb-0">Client</p>
                                                </div>
                                                <p className="fs-6 fw-medium text-dark mb-0">{project.client}</p>
                                            </div>
                                            <div className="px-md-6 border-start-md border-end-md">
                                                <div className="d-flex align-items-center gap-1">
                                                    <svg className="fill-primary" xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21" fill="none">
                                                        <path d="M7.38184 6.39673C7.38184 8.27401 8.90911 9.76946 10.7546 9.76946C11.4546 9.76946 12.0909 9.57855 12.6 9.19673C12.6318 9.19673 12.6318 9.16491 12.6637 9.16491C13.5546 8.56037 14.1273 7.54219 14.1273 6.36491C14.1273 4.48764 12.6 2.99219 10.7546 2.99219C8.90911 2.99219 7.38184 4.51946 7.38184 6.39673Z" fill="#794AFF" />
                                                        <path d="M16.9274 15.6229C16.9274 13.0138 15.3047 10.6911 12.8547 9.83203C11.582 10.5957 9.99104 10.6275 8.6865 9.83203C6.2365 10.7229 4.61377 13.0138 4.61377 15.6229C4.61377 17.1502 7.79559 17.9775 10.7865 17.9775C13.7774 17.9775 16.9274 17.1502 16.9274 15.6229Z" fill="#794AFF" />
                                                        <path d="M2.73633 11.1356C2.73633 12.1856 3.65906 12.9174 4.58178 12.8219C4.93178 12.0265 5.44087 11.3265 6.07724 10.7219C5.88633 9.99013 5.21815 9.44922 4.45451 9.44922C3.49996 9.44922 2.73633 10.2129 2.73633 11.1356Z" fill="#794AFF" />
                                                        <path d="M0.699951 15.6862C0.699951 15.8453 0.795406 16.0044 0.954497 16.1317C1.55904 16.6408 2.99086 16.8953 4.42268 16.7999C3.65904 16.2271 3.46813 15.6226 3.46813 15.1453C3.46813 14.3817 3.59541 13.6817 3.81813 12.9817C3.46813 12.9499 3.11813 12.8544 2.79995 12.6953C1.49541 13.1726 0.699951 14.3499 0.699951 15.6862Z" fill="#794AFF" />
                                                        <path d="M20.3 16.1628C20.3 14.8264 19.4728 13.6491 18.2319 13.1719C17.9137 13.3628 17.5637 13.4582 17.2137 13.4582C17.4364 14.1264 17.5637 14.8582 17.5637 15.6219C17.5637 16.2901 17.2137 16.831 16.6091 17.2764C17.7864 17.3401 20.3 17.0855 20.3 16.1628Z" fill="#794AFF" />
                                                        <path d="M17.1181 9.44922C16.3226 9.44922 15.6863 9.95831 15.4954 10.7219C16.1317 11.3265 16.6408 12.0265 16.9908 12.8538C17.9454 12.9492 18.8045 12.1856 18.8045 11.1674C18.8045 10.2129 18.0408 9.44922 17.1181 9.44922Z" fill="#794AFF" />
                                                    </svg>
                                                    <p className="text-dark mb-0">Date</p>
                                                </div>
                                                <p className="fs-6 fw-medium text-dark mb-0">{project.date}</p>
                                            </div>
                                            <div>
                                                <div className="d-flex align-items-center gap-1">
                                                    <svg className="fill-primary" xmlns="http://www.w3.org/2000/svg" width={21} height={21} viewBox="0 0 21 21" fill="none">
                                                        <path d="M7.38184 6.39673C7.38184 8.27401 8.90911 9.76946 10.7546 9.76946C11.4546 9.76946 12.0909 9.57855 12.6 9.19673C12.6318 9.19673 12.6318 9.16491 12.6637 9.16491C13.5546 8.56037 14.1273 7.54219 14.1273 6.36491C14.1273 4.48764 12.6 2.99219 10.7546 2.99219C8.90911 2.99219 7.38184 4.51946 7.38184 6.39673Z" fill="#794AFF" />
                                                        <path d="M16.9274 15.6229C16.9274 13.0138 15.3047 10.6911 12.8547 9.83203C11.582 10.5957 9.99104 10.6275 8.6865 9.83203C6.2365 10.7229 4.61377 13.0138 4.61377 15.6229C4.61377 17.1502 7.79559 17.9775 10.7865 17.9775C13.7774 17.9775 16.9274 17.1502 16.9274 15.6229Z" fill="#794AFF" />
                                                        <path d="M2.73633 11.1356C2.73633 12.1856 3.65906 12.9174 4.58178 12.8219C4.93178 12.0265 5.44087 11.3265 6.07724 10.7219C5.88633 9.99013 5.21815 9.44922 4.45451 9.44922C3.49996 9.44922 2.73633 10.2129 2.73633 11.1356Z" fill="#794AFF" />
                                                        <path d="M0.699951 15.6862C0.699951 15.8453 0.795406 16.0044 0.954497 16.1317C1.55904 16.6408 2.99086 16.8953 4.42268 16.7999C3.65904 16.2271 3.46813 15.6226 3.46813 15.1453C3.46813 14.3817 3.59541 13.6817 3.81813 12.9817C3.46813 12.9499 3.11813 12.8544 2.79995 12.6953C1.49541 13.1726 0.699951 14.3499 0.699951 15.6862Z" fill="#794AFF" />
                                                        <path d="M20.3 16.1628C20.3 14.8264 19.4728 13.6491 18.2319 13.1719C17.9137 13.3628 17.5637 13.4582 17.2137 13.4582C17.4364 14.1264 17.5637 14.8582 17.5637 15.6219C17.5637 16.2901 17.2137 16.831 16.6091 17.2764C17.7864 17.3401 20.3 17.0855 20.3 16.1628Z" fill="#794AFF" />
                                                        <path d="M17.1181 9.44922C16.3226 9.44922 15.6863 9.95831 15.4954 10.7219C16.1317 11.3265 16.6408 12.0265 16.9908 12.8538C17.9454 12.9492 18.8045 12.1856 18.8045 11.1674C18.8045 10.2129 18.0408 9.44922 17.1181 9.44922Z" fill="#794AFF" />
                                                    </svg>
                                                    <p className="text-dark mb-0">Budget</p>
                                                </div>
                                                <p className="fs-6 fw-medium text-dark mb-0">{project.budget}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="text-center pt-5">
                        <Link href="#" className="btn btn-primary hover-up">
                            View more projects
                            <svg xmlns="http://www.w3.org/2000/svg" width={17} height={16} viewBox="0 0 17 16" fill="none">
                                <path d="M16.3167 7.55759C16.3165 7.5574 16.3163 7.55719 16.3161 7.557L13.0504 4.307C12.8057 4.06353 12.41 4.06444 12.1665 4.30912C11.923 4.55378 11.9239 4.9495 12.1686 5.193L14.3612 7.375H1.125C0.779813 7.375 0.5 7.65481 0.5 8C0.5 8.34519 0.779813 8.625 1.125 8.625H14.3612L12.1686 10.807C11.9239 11.0505 11.923 11.4462 12.1665 11.6909C12.41 11.9356 12.8058 11.9364 13.0504 11.693L16.3162 8.443C16.3163 8.44281 16.3165 8.44259 16.3167 8.4424C16.5615 8.19809 16.5607 7.80109 16.3167 7.55759Z" fill="white" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
