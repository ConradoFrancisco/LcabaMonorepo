import ProjectCard from "../../../components/elements/ProjectCard";
const projectsData = [
    {
        categorie: "Food",
        delay: "0",
        img: "img-1.png",
        link: "/our-causes-details",
        title: "Every Child Deserves to Learn: Bridging the Education Gap",
        description: "Since the beginning of war operations we have visited all the most dangerous places...",
    },
    {
        categorie: "Medical",
        delay: "200",
        img: "img-2.png",
        link: "/our-causes-details",
        title: "Education Without Borders: Modern Learning Trends",
        description: "Since the beginning of war operations we have visited all the most dangerous places...",
    },
    {
        categorie: "Donation",
        delay: "400",
        img: "img-3.png",
        link: "/our-causes-details",
        title: "The Role of Family in a Child’s Learning Journey",
        description: "Since the beginning of war operations we have visited all the most dangerous places...",
    },
    {
        categorie: "Medical",
        delay: "0",
        img: "img-4.png",
        link: "/our-causes-details",
        title: "Effective Learning Strategies for 21st Century Kids",
        description: "Since the beginning of war operations we have visited all the most dangerous places...",
    },
    {
        categorie: "Food",
        delay: "200",
        img: "img-5.png",
        link: "/our-causes-details",
        title: "Building Positive Study Habits from a Young Age",
        description: "Since the beginning of war operations we have visited all the most dangerous places...",
    },
    {
        categorie: "Donation",
        delay: "400",
        img: "img-6.png",
        link: "/our-causes-details",
        title: "The Role of Technology in Children's Education",
        description: "Since the beginning of war operations we have visited all the most dangerous places...",
    },
    {
        categorie: "Donation",
        delay: "0",
        img: "img-7.png",
        link: "/our-causes-details",
        title: "Developing Life Skills Through Extracurricular Education",
        description: "Since the beginning of war operations we have visited all the most dangerous places...",
    },
    {
        categorie: "Medical",
        delay: "200",
        img: "img-8.png",
        link: "/our-causes-details",
        title: "Holistic Education: Blending Knowledge, Skills, and Values",
        description: "Since the beginning of war operations we have visited all the most dangerous places...",
    },
    {
        categorie: "Food",
        delay: "400",
        img: "img-9.png",
        link: "/our-causes-details",
        title: "Secrets to Encouraging a Love for Learning in Kids",
        description: "Since the beginning of war operations we have visited all the most dangerous places...",
    },
];

export default function Section1() {
    return (
        <>
            {/*charity-courses section 1*/}
            <section className="charity-courses-section-1 pt-120 pb-6">
                <div className="container">
                    <div className="row g-4">
                        {projectsData.map((project, index) => (
                            <ProjectCard key={index} {...project} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
