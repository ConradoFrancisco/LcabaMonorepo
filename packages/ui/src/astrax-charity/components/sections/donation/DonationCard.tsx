"use client";

import Link from "next/link";
import React from "react";

const DonationCard = ({ categories, link, img, title, description, linkcategories }: any) => {
    return (
        <div className="col-12 col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="delay">
            <div className="card-listing bg-white rounded-4 hover-up border overflow-hidden">
                <div className="position-relative">
                    <Link href={`${link}`}>
                        <img className="w-100" src={`assets/imgs/pages/charity/page-donation/${img}`} alt="AstraX" />
                    </Link>
                    <Link href={`${linkcategories}`}>
                        <h6 className="badge bg-primary border border-dark fs-7 position-absolute top-0 start-0 m-3 text-dark">{categories}</h6>
                    </Link>
                </div>
                <div className="card-content p-4 bg-white">
                    <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar rounded-pill wow img-custom-anim-left" style={{ width: "75%" }} />
                    </div>
                    <div className="d-flex justify-content-between mt-3 mb-3">
                        <div className="d-flex gap-2">
                            <p className="fs-7 mb-0">Goal</p>
                            <p className="fs-7 mb-0 fw-bold text-dark">$34,000</p>
                        </div>
                        <div className="d-flex gap-2">
                            <p className="fs-7 mb-0">Raised</p>
                            <p className="fs-7 mb-0 fw-bold text-dark">$12,490</p>
                        </div>
                    </div>
                    <Link href={`${link}`}>
                        <h6 className="mb-3 text-anime-style-3">{title}</h6>
                    </Link>
                    <p className="fs-7 mb-0">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default DonationCard;
