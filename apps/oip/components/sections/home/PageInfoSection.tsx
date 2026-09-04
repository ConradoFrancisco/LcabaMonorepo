import Link from "next/link";

export default function PageInfoSection({ pageVw, logo }: { pageVw: any, logo: any }) {
    if (!pageVw) return null;

    return (
        <>
            <section className="data-analysis-home-section-2 position-relative overflow-hidden pt-120 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div data-aos="zoom-in" data-aos-delay={100}>
                                <Link className="navbar-brand" href="/">
                                    <img src={`${process.env.NEXT_PUBLIC_IMAGES}/${logo?.location}/${logo?.filename}?key=${process.env.NEXT_PUBLIC_FILESERVER_KEY}`} alt={logo?.alt} width={150} height={95} />
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-9 ps-lg-5 mt-lg-0 mt-md-8 mt-5">
                            {pageVw.textos?.title && (
                                <h2 className="text-anime-style-1">
                                    {pageVw.textos?.title}
                                </h2>
                            )}

                            {pageVw.textos?.shipping_info && (
                                <div className="mt-md-5 mt-4 pe-md-10" data-aos="fade-up" data-aos-delay={200}>
                                    <div
                                        className="fs-5 text-muted"
                                        dangerouslySetInnerHTML={{ __html: pageVw.textos?.shipping_info }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
