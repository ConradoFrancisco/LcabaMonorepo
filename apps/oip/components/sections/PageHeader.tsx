import Breadcrumb from "@/components/elements/Breadcrumb";
interface PageHeaderProps {
    title: string;
    current_page: string;
}

export default function PageHeader({ title, current_page }: PageHeaderProps) {
    return (
        <>
            <>
                {/*data-analysis home section 1*/}
                <section className="data-analysis-section-header position-relative overflow-hidden pt-200 pb-100 border-bottom" data-background="assets/imgs/pages/data-analysis/page-home/home-section-1/img-bg.png">
                    <div className="container position-relative z-1">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h1 className="mb-3 text-anime-style-2">{title}</h1>
                                <Breadcrumb page={current_page} />
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </>
    );
}
