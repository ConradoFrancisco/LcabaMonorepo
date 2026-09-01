"use client";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const data = [
    {
        delay: "0",
        link: "#",
        img: "/assets/imgs/pages/data-analysis/page-child/card-blog-1.png",
        date: "February 19, 2025",
        title: "The Role of Business Intelligence in Enterprises",
        description: "Business intelligence (BI) tools are empowering organizations to make smarter, data-driven decisions. This blog explores the significance of BI.",
    },
    {
        delay: "200",
        link: "#",
        img: "/assets/imgs/pages/data-analysis/page-child/card-blog-2.png",
        date: "February 19, 2025",
        title: "The Power of Predictive Analytics in Business",
        description: "Artificial intelligence is at the forefront of data analysis, offering unprecedented opportunities for businesses to",
    },
    {
        delay: "400",
        link: "#",
        img: "/assets/imgs/pages/data-analysis/page-child/card-blog-3.png",
        date: "February 19, 2025",
        title: "Top 5 Data Visualization Tools for 2025",
        description: "Artificial intelligence is at the forefront of data analysis, offering unprecedented opportunities for businesses to",
    },
    {
        delay: "0",
        link: "#",
        img: "/assets/imgs/pages/data-analysis/page-child/card-blog-4.png",
        date: "February 19, 2025",
        title: "How Data Integration Drives Operational Efficiency",
        description: "Artificial intelligence is at the forefront of data analysis, offering unprecedented opportunities for businesses to",
    },
    {
        delay: "200",
        link: "#",
        img: "/assets/imgs/pages/data-analysis/page-child/card-blog-5.png",
        date: "February 19, 2025",
        title: "Leveraging Data for Smarter Marketing Campaigns",
        description: "This blog outlines how businesses can use data to design smarter, more effective marketing campaigns that drive results.",
    },
    {
        delay: "400",
        link: "#",
        img: "/assets/imgs/pages/data-analysis/page-child/card-blog-6.png",
        date: "February 19, 2025",
        title: "Exploring the Future of Data Security in Analytics",
        description: "As data analytics grows, so does the need for robust data security practices. In this post, we delve into the challenges and best practices.",
    },
    {
        delay: "0",
        link: "#",
        img: "/assets/imgs/pages/data-analysis/page-child/card-blog-7.png",
        date: "February 19, 2025",
        title: "The Impact of Real-time Analytics on Business",
        description: "Real-time analytics enables businesses to respond to challenges and opportunities as they happen.",
    },
    {
        delay: "200",
        link: "#",
        img: "/assets/imgs/pages/data-analysis/page-child/card-blog-8.png",
        date: "February 19, 2025",
        title: "Why Data-Driven Decisions Matter",
        description: "Learn how real-time data can enhance decision-making, improve customer experiences, and optimize operations.",
    },
    {
        delay: "400",
        link: "#",
        img: "/assets/imgs/pages/data-analysis/page-child/card-blog-9.png",
        date: "February 19, 2025",
        title: "Turning Big Data into Innovation",
        description: "Artificial intelligence is at the forefront of data analysis, offering unprecedented opportunities for businesses to",
    },
];
export default function Section2() {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <>
            {/*data-analysis blog section 2*/}
            <section className="data-analysis-blog-section-2 position-relative overflow-hidden bg-secondary-2 pt-100 pb-5">
                <div className="container">
                    <div className="text-center mb-6">
                        <h2>Latest News</h2>
                    </div>
                    <div className="row g-4">
                        {data.map((item, index) => (
                            <div key={index} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={item.delay}>
                                <div className="card rounded-4 overflow-hidden border-0 hover-up h-100">
                                    <Link href={item.link} className="card-img-top zoom-img overflow-hidden">
                                        <img className="w-100" src={item.img} alt={item.title} />
                                    </Link>
                                    <div className="card-body p-4">
                                        <p className="fs-7 mb-2">{item.date}</p>
                                        <Link href={item.link}>
                                            <h6>{item.title}</h6>
                                        </Link>
                                        <p className="fs-7 mb-0">{item.description}</p>
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
