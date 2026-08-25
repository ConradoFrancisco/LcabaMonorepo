
export default function Breadcrumb({ breadcrumbTitle, breadcrumbCategory }: { breadcrumbTitle: string; breadcrumbCategory?: string }) {
    return (
        <section
            className="position-relative overflow-hidden py-5 text-center text-white"
            style={{
                marginTop: "150px",
                backgroundColor: "#c9003d",
                backgroundImage: "url('/assets/imgs/1xzq7lz80k_1569858169.2772.jpg')",
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
        >
            <div className="container position-relative z-1">
                <h1
                    className="mb-1 fs-2 fw-bold text-shadow"
                    style={{
                        color: "#fff",
                        WebkitTextStroke: "1px rgba(0, 0, 0, 0.72)",
                        textShadow: "0 2px 3px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    {breadcrumbTitle}
                </h1>
                {breadcrumbCategory && (
                    <p
                        className="mb-0 fs-5"
                        style={{
                            color: "#fff",
                            WebkitTextStroke: "1px rgba(0, 0, 0, 0.72)",
                            textShadow: "0 2px 3px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        {breadcrumbCategory}
                    </p>
                )}
            </div>
        </section>
    )
}
