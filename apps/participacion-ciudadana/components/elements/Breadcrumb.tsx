import Link from "next/link";

export default function Breadcrumb({ page }: any) {
    return (
        <div className="d-flex justify-content-center flex-wrap align-items-center gap-2 d-inline-flex">
            <Link href="/">
                <span className="text-capitalize text-white fs-24 fw-regular">home</span>
            </Link>
            <i className="fa-solid fa-angle-right text-white fs-7"></i>
            <span>
                <span className="text-capitalize text-white fs-24 fw-regular">{page}</span>
            </span>
        </div>
    );
}
