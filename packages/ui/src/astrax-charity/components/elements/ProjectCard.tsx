// components/ProjectCard.jsx
import Link from "next/link";

export default function ProjectCard({ link, description, type, img, categorie, title }: any) {
    return (
        <div className={`filter-item col-12 col-lg-4 col-md-6 ${type}`}>
            <div className="card-listing bg-white rounded-4 hover-up border overflow-hidden">
                <div className="position-relative">
                    <Link href={`${link}`}>
                        <img className="w-100" src={`assets/imgs/pages/charity/page-home/home-section-4/${img}`} alt="AstraX" />
                    </Link>
                    <Link href={`${link}`}>
                        <span className="badge bg-primary border border-dark fs-7 position-absolute top-100 end-0 translate-middle-y me-8 text-dark">{categorie}</span>
                    </Link>
                </div>
                <div className="card-content p-4 bg-white">
                    <Link href={`${link}`}>
                        <h6 className="text-anime-style-3">{title}</h6>
                    </Link>
                    <p className="fs-7">{description}</p>
                    <div className="progress mt-5" role="progressbar" aria-label="Basic example" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar rounded-pill wow img-custom-anim-left" style={{ width: "75%" }} />
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <div className="d-flex gap-2">
                            <div className="icon">
                                <i className="fa-solid fa-bullseye" />
                            </div>
                            <div>
                                <p className="fs-7 mb-0">Goal</p>
                                <p className="fs-7 mb-0 fw-bold text-dark">$34,000</p>
                            </div>
                        </div>
                        <div className="d-flex gap-2">
                            <div className="icon">
                                <i className="fa-solid fa-chart-area" />
                            </div>
                            <div>
                                <p className="fs-7 mb-0">Raised</p>
                                <p className="fs-7 mb-0 fw-bold text-dark">$12,490</p>
                            </div>
                        </div>
                        <div className="d-flex gap-2">
                            <div className="icon">
                                <i className="fa-solid fa-users" />
                            </div>
                            <div>
                                <p className="fs-7 mb-0">Raised</p>
                                <p className="fs-7 mb-0 fw-bold text-dark">$12,490</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
