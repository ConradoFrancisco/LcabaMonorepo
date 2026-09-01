import Link from "next/link";

export default function Breadcrumb({ page }: any) {
    return (
        <div className="d-flex align-items-center gap-2 flex-wrap d-inline-flex wow img-custom-anim-left">
            <Link href="/">
                <span className="text-capitalize fs-24 fw-regular">home</span>
            </Link>
            <i className="fa-solid fa-angle-right fs-7"></i>
            <span>
                <span className="text-capitalize fs-24 fw-medium">{page}</span>
            </span>
        </div>
    );
}
