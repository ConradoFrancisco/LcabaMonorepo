import BlogCard from "./BlogCard";

const blogPosts = [
    { delay: 0, img: "img-1.png", tag: "Digital Marketing", title: "The Evolution of Digital: What You Need to Know", avatar: "avatar-1.png", name: "Tracey Wilson", date: "August 20, 2022" },
    { delay: 200, img: "img-2.png", tag: "Content Marketing", title: "The Importance of SEO in Your Digital Marketing Toolkit", avatar: "avatar-1.png", name: "Tracey Wilson", date: "August 20, 2022" },
    { delay: 400, img: "img-3.png", tag: "Social Advertising", title: "Maximizing ROI: Tips for Successful PPC Campaigns", avatar: "avatar-1.png", name: "Tracey Wilson", date: "August 20, 2022" },
    { delay: 0, img: "img-4.png", tag: "Social Advertising", title: "How to Build a Strong Brand Presence on Social Media", avatar: "avatar-2.png", name: "Tracey Wilson", date: "August 20, 2022" },
    { delay: 200, img: "img-5.png", tag: "Brand Strategy", title: "Content Marketing 101: Crafting Stories That Sell", avatar: "avatar-3.png", name: "Tracey Wilson", date: "August 20, 2022" },
    { delay: 400, img: "img-6.png", tag: "Content Marketing", title: "Email Marketing Best Practices for Higher Engagement Rates", avatar: "avatar-4.png", name: "Tracey Wilson", date: "August 20, 2022" },
    { delay: 0, img: "img-7.png", tag: "Content Marketing", title: "How Influencer Marketing Boosts Your Brand’s Visibility", avatar: "avatar-5.png", name: "Tracey Wilson", date: "August 20, 2022" },
    { delay: 200, img: "img-8.png", tag: "Brand Strategy", title: "The Role of Analytics in Shaping Your Digital Marketing Strategy", avatar: "avatar-6.png", name: "Tracey Wilson", date: "August 20, 2022" },
    { delay: 400, img: "img-9.png", tag: "Social Advertising", title: "How to Effectively Target Your Audience with Digital Ads", avatar: "avatar-7.png", name: "Tracey Wilson", date: "August 20, 2022" },
    { delay: 0, img: "img-10.png", tag: "Digital Marketing", title: "Mobile Marketing: Reaching Your Audience on the Go", avatar: "avatar-8.png", name: "Tracey Wilson", date: "August 20, 2022" },
    { delay: 200, img: "img-11.png", tag: "Digital Marketing", title: "What Makes a Digital Marketing Campaign Successful?", avatar: "avatar-9.png", name: "Tracey Wilson", date: "August 20, 2022" },
    { delay: 400, img: "img-12.png", tag: "Brand Strategy", title: "The Impact of Video Marketing on Consumer Engagement", avatar: "avatar-10.png", name: "Tracey Wilson", date: "August 20, 2022" },
];

const BlogList: React.FC = () => {
    return (
        <div className="row g-4">
            {blogPosts.map((post, index) => (
                <BlogCard key={index} {...post} />
            ))}
        </div>
    );
};

export default BlogList;
