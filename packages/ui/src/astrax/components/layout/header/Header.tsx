import Link from "next/link";
import MobileMenu from "../MobileMenu";
import { formatNavUrl } from "../../../util/navLinks";

export default function Header({
  scroll,
  isMobileMenu,
  handleMobileMenu,
  menuItems = [],
}: any) {
  const formatUrl = formatNavUrl;
  return (
    <>
      <header>
        <div className="position-absolute top-0 start-0 w-100 header-11">
          <nav
            className={`navbar navbar-expand-lg z-5 ${scroll ? "navbar-stick top-0 position-fixed w-100" : ""}`}
          >
            <div className="container-fluid px-5 mt-2 mb-2">
              <Link className="navbar-brand" href="/">
                <img
                  src="http://web.lcaba.test/_pagedata/page/images/jl58gsopll_1595522903.3196.png"
                  height={100}
                  alt="Cultura Logo"
                />
              </Link>
              <div className="d-none d-lg-flex">
                <ul className="navbar-nav mx-auto gap-4 align-items-lg-center">
                  {menuItems.map((item: any) => {
                    const hasSubItems =
                      item.subItems && item.subItems.length > 0;
                    const itemUrl = formatUrl(item);
                    if (hasSubItems) {
                      return (
                        <li
                          className="nav-item dropdown menu-item-has-children"
                          key={item.id}
                        >
                          <Link
                            className="nav-link text-uppercase"
                            href={itemUrl}
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {item.title}
                          </Link>
                          <ul className="dropdown-menu px-5">
                            {item.subItems.map((subItem: any) => (
                              <li key={subItem.id}>
                                <Link
                                  className="dropdown-item text-capitalize gap-5 py-3 px-0 border-bottom justify-content-between"
                                  href={formatUrl(subItem, item)}
                                >
                                  {subItem.title}
                                  <i className="fa-solid fa-arrow-right" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    } else {
                      return (
                        <li className="nav-item" key={item.id}>
                          <Link
                            className="nav-link text-uppercase"
                            href={itemUrl}
                          >
                            {item.title}
                          </Link>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
              <div className="d-flex align-items-center gap-4">
                <img
                  height={50}
                  src="http://web.lcaba.test/_pagedata/page/images/6lf3r7imj7_1664903744.8227.png"
                  alt="Logo derecho"
                  className="d-none d-md-block"
                />

                <div
                  className="burger-icon burger-icon-white border rounded-3 top-0 end-0"
                  onClick={handleMobileMenu}
                >
                  <span className="burger-icon-top" />
                  <span className="burger-icon-mid" />
                  <span className="burger-icon-bottom" />
                </div>
              </div>
            </div>
          </nav>
          {/* offCanvas-menu */}
          <div className="offCanvas__info">
            <div className="offCanvas__close-icon menu-close">
              <button className="btn-close" aria-label="Close">
                <i className="ri-close-line" />
              </button>
            </div>
            <div className="offCanvas__logo mb-30">
              <Link className="d-flex align-items-center gap-2" href="/">
                <img
                  src="/logoCultura.png"
                  alt="Cultura - Legislatura CABA"
                  height={40}
                />
              </Link>
            </div>
            <div className="offCanvas__side-info mb-30">
              <div className="contact-list mb-30">
                <h4>Office Address</h4>
                <p>
                  123/A, Miranda City Likaoli <br />
                  Prikano, Dope
                </p>
              </div>
              <div className="contact-list mb-30">
                <h4>Phone Number</h4>
                <p>+0989 7876 9865 9</p>
                <p>+(090) 8765 86543 85</p>
              </div>
              <div className="contact-list mb-30">
                <h4>Email Address</h4>
                <p>info@example.com</p>
                <p>example.mail@hum.com</p>
              </div>
            </div>
            <div className="offCanvas__social-icon mt-30">
              <Link href="/javascript:void(0)">
                <i className="bi bi-facebook" />
              </Link>
              <Link href="/javascript:void(0)">
                <i className="bi bi-twitter-x" />
              </Link>
              <Link href="/javascript:void(0)">
                <i className="bi bi-linkedin" />
              </Link>
              <Link href="/javascript:void(0)">
                <i className="bi bi-behance" />
              </Link>
            </div>
          </div>
          <div className="offCanvas__overly" />
          {/* Offcanvas search */}
          <div
            className="offcanvas offcanvas-top"
            tabIndex={-1}
            id="offcanvasTop"
          >
            <div className="offcanvas-header">
              <button
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <div className="container">
                <div className="row">
                  <div className="col-8 mx-auto">
                    <h3 className="mb-4">What are you looking for?</h3>
                    <form className="input-group mb-3" data-aos="zoom-in">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Keywords"
                        aria-label="Enter Your Keywords"
                        aria-describedby="button-addon2"
                      />
                      <button
                        className="btn btn-primary rounded-end-2"
                        type="submit"
                        aria-label="search"
                        id="button-addon2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Offcanvas search */}
          <MobileMenu
            isMobileMenu={isMobileMenu}
            handleMobileMenu={handleMobileMenu}
            menuItems={menuItems}
          />
        </div>
      </header>
    </>
  );
}
