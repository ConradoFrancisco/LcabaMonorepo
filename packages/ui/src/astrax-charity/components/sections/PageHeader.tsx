import Breadcrumb from "../../components/elements/Breadcrumb";
interface PageHeaderProps {
    title: string;
    current_page: string;
}

export default function PageHeader({ title, current_page }: PageHeaderProps) {
    return (
        <>
            {/*charity-section-header*/}
            <section className="charity-section-header position-relative overflow-hidden">
                <div className="position-relative text-center bg-img-coworking" data-background="assets/imgs/pages/charity/page-header/img-bg.png">
                    <div className="container py-140 position-relative z-1">
                        <div className="col-12 text-center">
                            <h1 className="mb-3 text-anime-style-2">{title}</h1>
                            <Breadcrumb page={current_page} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
