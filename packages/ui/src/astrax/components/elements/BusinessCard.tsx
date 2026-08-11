import Link from "next/link";

const BusinessCard = ({ img, name, description, delay }: { img: string; name: string; description: string; delay: string }) => {
    return (
        <div className="col-lg-3 col-md-6 d-flex justify-content-center" data-aos="fade-up" data-aos-delay={delay}>
            <div className="card business-card-1 border-0 hover-up pt-2">
                <Link href="#">
                    <img className="rounded-4" src={img} alt={name} />
                </Link>
                <div className="card-body px-0 mb-2 pt-4">
                    <div className="card-title">
                        <Link href="#">
                            <h5 className="btn-text text-primary">{name}</h5>
                        </Link>
                    </div>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default BusinessCard;
