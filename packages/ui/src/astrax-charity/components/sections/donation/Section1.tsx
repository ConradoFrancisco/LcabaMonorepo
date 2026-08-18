import DonationCard from "./DonationCard";
const donations = [
    {
        categories: "Food",
        delay: "0",
        img: "img-1.png",
        link: "/donation-details",
        linkcategories: "#",
        title: "Make a Difference Today - Your Support Matters",
        description: "Since the beginning of war operations we have visited all the most dangerous places...",
    },
    {
        categories: "Donation",
        delay: "200",
        img: "img-2.png",
        link: "/donation-details",
        linkcategories: "#",
        title: "Your Generosity Can Create Lasting Change",
        description: "Since the beginning of war operations we have visited all the most dangerous places...",
    },
    {
        categories: "Medical",
        delay: "400",
        img: "img-3.png",
        link: "/donation-details",
        linkcategories: "#",
        title: "Open Your Heart - Make A Difference Today",
        description: "Since the beginning of war operations we have visited all the most dangerous places...",
    },
    {
        categories: "Donation",
        delay: "0",
        img: "img-4.png",
        link: "/donation-details",
        linkcategories: "#",
        title: "Help Us Reach Our Goal - Every Donation Matters",
        description: "Since the beginning of war operations we have visited all the most dangerous places...",
    },
    {
        categories: "Food",
        delay: "200",
        img: "img-5.png",
        link: "/donation-details",
        linkcategories: "#",
        title: "A Small Act of Kindness Can Spark a Big Change",
        description: "Since the beginning of war operations we have visited all the most dangerous places...",
    },
    {
        categories: "Medical",
        delay: "400",
        img: "img-6.png",
        link: "/donation-details",
        linkcategories: "#",
        title: "Building a Better World, One Donation at a Time",
        description: "Since the beginning of war operations we have visited all the most dangerous places...",
    },
    {
        categories: "Food",
        delay: "0",
        img: "img-7.png",
        link: "/donation-details",
        linkcategories: "#",
        title: "Together, We Can Change the World for Good",
        description: "Since the beginning of war operations we have visited all the most dangerous places...",
    },
    {
        categories: "Donation",
        delay: "200",
        img: "img-8.png",
        link: "/donation-details",
        linkcategories: "#",
        title: "Make an Impact with Your Donation Today",
        description: "Since the beginning of war operations we have visited all the most dangerous places...",
    },
    {
        categories: "Donation",
        delay: "400",
        img: "img-9.png",
        link: "/donation-details",
        linkcategories: "#",
        title: "Join the Movement - Give to Those in Need",
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
                        {donations.map((donation, index) => (
                            <DonationCard key={index} {...donation} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
