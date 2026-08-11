import BusinessCard from "../../components/elements/BusinessCard";

const BusinessCardList = () => {
    const teamMembers = [
        {
            img: "/assets/imgs/pages/business/page-about/author-1.png",
            delay: "200",
            name: "Ava Wilson",
            description: "Sales Manager",
        },
        {
            img: "/assets/imgs/pages/business/page-about/author-2.png",
            delay: "400",
            name: "Michael Anderson",
            description: "Chief Financial Officer (CFO)",
        },
        {
            img: "/assets/imgs/pages/business/page-about/author-3.png",
            delay: "600",
            name: "Sophia Martinez",
            description: "Chief Operating Officer (COO)",
        },
        {
            img: "/assets/imgs/pages/business/page-about/author-4.png",
            delay: "800",
            name: "James Parker",
            description: "Sales Manager",
        },
        {
            img: "/assets/imgs/pages/business/page-about/author-5.png",
            delay: "200",
            name: "David Thompson",
            description: "Marketing Manager",
        },
        {
            img: "/assets/imgs/pages/business/page-about/author-6.png",
            delay: "400",
            name: "William Clark",
            description: "Human Resources Manager",
        },
        {
            img: "/assets/imgs/pages/business/page-about/author-7.png",
            delay: "600",
            name: "Benjamin Carter",
            description: "Product Manager",
        },
        {
            img: "/assets/imgs/pages/business/page-about/author-8.png",
            delay: "800",
            name: "Emily Johnson",
            description: "Customer Service Manager",
        },
    ];

    return (
        <div className="row mb-5">
            {teamMembers.map((member, index) => (
                <BusinessCard key={index} {...member} />
            ))}
        </div>
    );
};

export default BusinessCardList;
