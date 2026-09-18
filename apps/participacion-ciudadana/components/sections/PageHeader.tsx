import Breadcrumb from "@/components/elements/Breadcrumb";

interface PageHeaderProps {
    title: string;
    current_page: string;
}

export default function PageHeader({ title, current_page }: PageHeaderProps) {
    return (
        <>
            {/*coworking-space section header*/}
            <section className="coworking-space-section-header position-relative overflow-hidden">
                <div className="position-relative text-center bg-img-coworking" data-background="assets/imgs/pages/coworking-space/template/bg-img-header.png">
                    <div className="position-absolute bottom-0 start-50 translate-middle-x logo">
                        <svg data-aos="fade-up" data-aos-delay={800} xmlns="http://www.w3.org/2000/svg" width={866} height={396} viewBox="0 0 866 396" fill="none">
                            <path d="M83.219 802.721V300.248L433.371 96.6023L783.61 300.248V706.119L433.371 909.802L248.012 801.979V397.58L433.371 289.769L618.805 397.58V608.774L433.371 716.598L412.817 704.647V494.937L516.417 434.654L433.371 386.371L330.414 446.29V753.294L433.371 813.2L701.207 657.421V348.933L433.371 193.205L165.622 348.933V850.626L433.371 1006.4L866 754.803V251.601L433.371 0L0.816406 251.601V754.803L83.219 802.721Z" fill="white" fillOpacity="0.8" />
                        </svg>
                    </div>
                    <div className="container py-140 position-relative z-1">
                        <div className="col-12 text-center">
                            <h1 className="text-white mb-3 text-anime-style-2">{title}</h1>
                            <Breadcrumb page={current_page} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
