import Link from "next/link";
import MobileMenu from "../MobileMenu";
import MainMenu from "../MainMenu";

export default function Header({ scroll, isMobileMenu, handleMobileMenu, menuItems, logo }: any) {
    const renderLogo = () => {
        if (logo) {
            return (
                <img
                    src={`${process.env.NEXT_PUBLIC_IMAGES}/${logo.location}/${logo.filename}?key=${process.env.NEXT_PUBLIC_FILESERVER_KEY}`}
                    alt={logo?.alt || "Logo"}
                    style={{ maxHeight: "60px", width: "auto" }}
                />
            );
        }
        return (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
                    <g>
                        <path className="fill-primary" d="M24.5043 9.79724L22.7082 18.3981L35.2929 17.1948L37.1117 7.00605L24.5043 9.79724Z" />
                        <path className="fill-primary" d="M31.9171 17.6837L23.2697 20.6189L30.6333 30.3865L40.723 26.6545L31.9171 17.6837Z" />
                        <path className="fill-primary" d="M28.4204 27.86L21.4605 22.2312L16.332 33.3249L24.7296 39.7347L28.4204 27.86Z" />
                        <path className="fill-primary" d="M17.5913 29.998L19.1912 21.3633L6.63465 22.8288L5.04812 33.0511L17.5913 29.998Z" />
                        <path className="fill-primary" d="M10.2917 22.1777L18.8717 19.0632L11.2859 9.45346L1.28177 13.3945L10.2917 22.1777Z" />
                        <path className="fill-primary" d="M13.7243 12.2243L20.8121 17.7054L25.6875 6.50938L17.1442 0.277556L13.7243 12.2243Z" />
                    </g>
                </svg>
                <h5 className="mb-0 fw-semibold">Astrax</h5>
            </>
        );
    };

    return (
        <>
            <header className="w-100">
                <nav className={`navbar navbar-expand-lg w-100 z-3 ${scroll ? "navbar-stick top-0 position-fixed" : ""}`}>
                    <div className="container custom-container w-100 mt-3 mb-3 px-3 px-lg-0 d-flex align-items-center justify-content-between">
                        <Link className="navbar-brand d-flex align-items-center gap-2" href="/">
                            {renderLogo()}
                        </Link>

                        <div className="d-none d-lg-flex align-items-center">
                            <MainMenu menuItems={menuItems || []} />
                        </div>

                        <div className="burger-icon burger-icon-white border rounded-3 d-lg-none" onClick={handleMobileMenu}>
                            <span className="burger-icon-top" />
                            <span className="burger-icon-mid" />
                            <span className="burger-icon-bottom" />
                        </div>
                    </div>
                </nav>
                <MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />
            </header>
        </>
    );
}
