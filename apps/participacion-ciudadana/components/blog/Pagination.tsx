import Link from "next/link";

export default function Pagination({ prev, currentPage, getPaginationGroup, next, pages, handleActive }: any) {
    return (
        <>
            <ul className="pagination justify-content-center">
                {getPaginationGroup.length <= 0 ? null : (
                    <li onClick={prev} className="next_link page-item">
                        {currentPage === 1 ? null : (
                            <Link href="#">
                                <i className="fa fa-arrow-left" />
                            </Link>
                        )}
                    </li>
                )}

                {getPaginationGroup.map((item: any, index: any) => {
                    return (
                        <li onClick={() => handleActive(item)} key={index} className={currentPage === item ? "page-item active" : "page-item"}>
                            <Link href="#" className="page-link">
                                {item}
                            </Link>
                        </li>
                    );
                })}

                {getPaginationGroup.length <= 0 ? null : (
                    <li onClick={next} className="next_link page-item">
                        {currentPage >= pages ? null : (
                            <Link href="#">
                                <i className="fa fa-arrow-right" />
                            </Link>
                        )}
                    </li>
                )}
            </ul>
        </>
    );
}
