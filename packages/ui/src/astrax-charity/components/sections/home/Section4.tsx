"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ProjectCard from "../../../components/elements/ProjectCard";
import Link from "next/link";
const projectsData = [
    {
        link: "/our-causes-details",
        description: "Since the beginning of war operations we have visited all the most dangerous places...",
        type: "food water",
        img: "img-1.png",
        categorie: "Food",
        title: "Education for children",
    },
    {
        link: "/our-causes-details",
        description: "20Since the beginning of war operations we have visited all the most dangerous places...",
        type: "medical water",
        img: "img-2.png",
        categorie: "Medical",
        title: "Education for children",
    },
    {
        link: "/our-causes-details",
        description: "40Since the beginning of war operations we have visited all the most dangerous places...",
        type: "donation water",
        img: "img-3.png",
        categorie: "Donation",
        title: "Education for children",
    },
    {
        link: "/our-causes-details",
        description: "Since the beginning of war operations we have visited all the most dangerous places...",
        type: "fundraise warter",
        img: "img-4.png",
        categorie: "Fundraise",
        title: "Education for children",
    },
    {
        link: "/our-causes-details",
        description: "20Since the beginning of war operations we have visited all the most dangerous places...",
        type: "fundraise",
        img: "img-5.png",
        categorie: "Fundraise",
        title: "Education for children",
    },
    {
        link: "/our-causes-details",
        description: "40Since the beginning of war operations we have visited all the most dangerous places...",
        type: "donation water",
        img: "img-6.png",
        categorie: "Donation",
        title: "Education for children",
    },
];
const filters = [
    { label: "All", value: "all" },
    { label: "Water", value: "water" },
    { label: "Food", value: "food" },
    { label: "Medical", value: "medical" },
    { label: "Blood donation", value: "donation" },
    { label: "Fundraise", value: "fundraise" },
];

export default function Section4() {
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        AOS.init({ once: true });
    }, []);
    const filteredProjects = filter === "all" ? projectsData : projectsData.filter((project) => project.type.includes(filter));

    return (
        <>
            {/*charity-home home section 4*/}
            <section className="charity-home-section-4 position-relative pt-200 pb-120 overflow-hidden">
                <div className="container position-relative">
                    <div className="row text-center">
                        <div className="number-step d-flex align-items-center justify-content-center gap-3">
                            <i className="fa-solid fa-heart text-primary" />
                            <span className="btn-text">popular causes</span>
                        </div>
                        <h2 className="text-dark my-3 text-anime-style-3">
                            Build a secure
                            <span className="bg-white border border-dark rounded-5 px-2">happy</span>
                            life
                        </h2>
                    </div>
                </div>
                <div className="wow img-custom-anim-top">
                    <div className="container">
                        <div className="text-center mt-80">
                            <div className="button-group filter-button-group filter-menu-active">
                                {filters.map(({ label, value }, index) => (
                                    <button key={value} className={`btn btn-md btn-filter mb-2 me-2 ${filter === value ? "active" : ""}`} onClick={() => setFilter(value)}>
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="container mt-4">
                            <div className="masonary-active justify-content-between row">
                                {filteredProjects.map((project, index) => (
                                    <ProjectCard key={index} {...project} />
                                ))}
                            </div>
                            <div className="pt-5">
                                <div className="text-center">
                                    <Link href="/our-causes" className="btn btn-dark hover-up">
                                        <span>more listing</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                                            <g clipPath="url(#clip0_1136_654)">
                                                <path d="M15.8167 7.55759C15.8165 7.5574 15.8163 7.55719 15.8161 7.557L12.5504 4.307C12.3057 4.06353 11.91 4.06444 11.6665 4.30912C11.423 4.55378 11.4239 4.9495 11.6686 5.193L13.8612 7.375H0.625C0.279813 7.375 0 7.65481 0 8C0 8.34519 0.279813 8.625 0.625 8.625H13.8612L11.6686 10.807C11.4239 11.0505 11.423 11.4462 11.6665 11.6909C11.91 11.9356 12.3058 11.9364 12.5504 11.693L15.8162 8.443C15.8163 8.44281 15.8165 8.44259 15.8167 8.4424C16.0615 8.19809 16.0607 7.80109 15.8167 7.55759Z" fill="#ECAB23" />
                                            </g>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
