import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
    delay: number;
    img: string;
    tag: string;
    title: string;
    avatar: string;
    name: string;
    date: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ delay, img, tag, title, avatar, name, date }) => {
    return (
        <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={delay}>
            <div className="card-blog border rounded-4 hover-up p-3 h-100">
                <Link href="/blog-details">
                    <Image className="rounded-3" src={`/assets/imgs/pages/seo-agency/page-blog/${img}`} alt={title} width={500} height={300} />
                </Link>
                <div className="card-body p-2 pt-4">
                    <Link href="#">
                        <span className="tag-blog text-primary bg-light-2 px-3 py-2 rounded-3">{tag}</span>
                    </Link>
                    <Link href="/blog-details">
                        <h6 className="pt-4">{title}</h6>
                    </Link>
                    <div className="d-flex align-items-center flex-wrap mt-6">
                        <Link href="#" className="d-flex align-items-center">
                            <span className="icon-shape icon-md rounded-circle overflow-hidden">
                                <Image src={`/assets/imgs/pages/seo-agency/page-blog/${avatar}`} alt={name} width={40} height={40} />
                            </span>
                            <p className="mb-0 ms-2">{name}</p>
                        </Link>
                        <p className="mb-0 ms-lg-4 ms-6">{date}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
