import Link from 'next/link'
import MobileMenu from '../MobileMenu'

export default function Header({ scroll, isMobileMenu, handleMobileMenu, menuItems = [] }: any) {
	return (
		<>
			<header>
				<div className="position-absolute top-0 start-0 w-100 header-11 ">
					{/* TOP-BAR 5 */}
					{/* <div className="top-bar bg-primary @@display position-relative z-2">
						<div className="container d-flex flex-wrap gap-2 justify-content-md-between justify-content-center align-items-center">
							<div className="d-flex justify-content-center gap-3 align-self-stretch">
								<Link href="/#" className="fs-7 d-flex align-items-center border-start border-end border-opacity-10 border-white px-3">
									<i className="ri-mail-open-line text-white" />
									<span className="text-secondary-2 border-opacity-10"> &nbsp; info@astrax.com </span>
								</Link>
								<Link href="/telto:(123) 456 789 00" className="fs-7 d-flex align-items-center border-end border-opacity-10 border-white pe-3">
									<i className="ri-phone-line text-white" />
									<span className="text-secondary-2 border-opacity-10"> +(123) 456 789 00 </span>
								</Link>
							</div>
							<div className="social-icons d-none d-md-flex">
								<Link href="/#" className="border border-top-0 text-white border-bottom-0 border-end-0 border-opacity-10 border-white icon-shape icon-md">
									<span className="text-white">
										<i className="bi bi-facebook" />
									</span>
								</Link>
								<Link href="/#" className="border border-top-0 text-white border-bottom-0 border-end-0 border-opacity-10 border-white icon-shape icon-md">
									<span className="text-white">
										<i className="bi bi-twitter-x" />
									</span>
								</Link>
								<Link href="/#" className="border border-top-0 text-white border-bottom-0 border-opacity-10 border-white icon-shape icon-md">
									<span className="text-white">
										<i className="bi bi-linkedin" />
									</span>
								</Link>
								<Link href="/#" className="border border-top-0 text-white border-bottom-0 border-start-0 border-opacity-10 border-white icon-shape icon-md">
									<span className="text-white">
										<i className="bi bi-behance" />
									</span>
								</Link>
							</div>
						</div>
					</div> */}
					<nav className={`navbar navbar-expand-lg navbar-transparent border-bottom border-top border-white border-opacity-10 p-0 shadow-none ${scroll ? 'navbar-stick top-0 position-fixed' : ''}`}>
						<div className="container" style={{ borderBottom: '1px solid red' }}>
							<Link className="navbar-brand py-5" href="/">
								<img height={100} src="http://web.lcaba.test/_pagedata/page/images/jl58gsopll_1595522903.3196.png" alt="" />
							</Link>
							<div className="d-none d-lg-flex me-auto ms-5 align-self-stretch z-35 position-relative">
								<ul className="navbar-nav mx-auto gap-4 align-items-lg-center">
									{menuItems.map((item: any) => {
										const hasSubItems = item.subItems && item.subItems.length > 0;
										const formatUrl = (url: string | null) => {
											if (!url || url === "#") return "#";
											if (url.startsWith("http")) return url;
											return url.startsWith("/") ? url : `/${url}`;
										};
										const itemUrl = formatUrl(item.url);
										if (hasSubItems) {
											return (
												<li className="nav-item dropdown menu-item-has-children" key={item.id}>
													<Link className="nav-link text-uppercase" href={itemUrl} role="button" data-bs-toggle="dropdown" aria-expanded="false"> {item.title} </Link>
													<ul className="dropdown-menu">
														{item.subItems.map((subItem: any) => {
															const subItemUrl = formatUrl(subItem.url);
															return (
																<li key={subItem.id}>
																	<Link className="dropdown-item text-capitalize" href={subItemUrl}>{subItem.title}</Link>
																</li>
															);
														})}
													</ul>
												</li>
											);
										} else {
											return (
												<li className="nav-item" key={item.id}>
													<Link className="nav-link text-uppercase" href={itemUrl}> {item.title} </Link>
												</li>
											);
										}
									})}
								</ul>
							</div>
							<div className="d-flex align-items-center gap-4 align-self-stretch">
								<form className="input-group position-relative d-none d-md-flex w-auto">
									<input type="text" className="form-control rounded-start-4 text-white bg-white bg-opacity-25 border-0" name="search" placeholder="Search here..." />
									<div className="border-0 rounded-end-4 bg-white bg-opacity-25 ms-0">
										<button className="btn btn-yellow px-4 bg-transparent h-100 rounded-4 aos-init aos-animate" type="submit" id="button-search" aria-label="search">
											<i className="ri-search-line text-green-3" />
										</button>
									</div>
								</form>
								<a className="menu-tigger d-none d-lg-block py-5 align-self-stretch align-items-center">
									<svg xmlns="http://www.w3.org/2000/svg" width={19} height={19} viewBox="0 0 19 19" fill="none">
										<rect width={3} height={3} fill="#D5D52B" />
										<rect y={8} width={3} height={3} fill="#D5D52B" />
										<rect y={16} width={3} height={3} fill="#D5D52B" />
										<rect x={8} width={3} height={3} fill="#D5D52B" />
										<rect x={8} y={8} width={3} height={3} fill="#D5D52B" />
										<rect x={16} y={16} width={3} height={3} fill="#D5D52B" />
										<rect x={16} width={3} height={3} fill="#D5D52B" />
										<rect x={16} y={8} width={3} height={3} fill="#D5D52B" />
									</svg>
								</a>
								<div className="burger-icon burger-icon-white border rounded-3 top-0 end-0" onClick={handleMobileMenu}>
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
							<button className="btn-close" aria-label="Close"><i className="ri-close-line" /></button>
						</div>
						<div className="offCanvas__logo mb-30">
							<Link className="d-flex align-items-center gap-2" href="/">

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
							<Link href="/javascript:void(0)"><i className="bi bi-facebook" /></Link>
							<Link href="/javascript:void(0)"><i className="bi bi-twitter-x" /></Link>
							<Link href="/javascript:void(0)"><i className="bi bi-linkedin" /></Link>
							<Link href="/javascript:void(0)"><i className="bi bi-behance" /></Link>
						</div>
					</div>
					<div className="offCanvas__overly" />
					{/* Offcanvas search */}
					<div className="offcanvas offcanvas-top" tabIndex={-1} id="offcanvasTop">
						<div className="offcanvas-header">
							<button className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
						</div>
						<div className="offcanvas-body">
							<div className="container">
								<div className="row">
									<div className="col-8 mx-auto">
										<h3 className="mb-4">What are you looking for?</h3>
										<form className="input-group mb-3" data-aos="zoom-in">
											<input type="text" className="form-control" placeholder="Enter Your Keywords" aria-label="Enter Your Keywords" aria-describedby="button-addon2" />
											<button className="btn btn-primary rounded-end-2" type="submit" aria-label="search" id="button-addon2">
												<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
													<path d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Offcanvas search */}
					<MobileMenu isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} menuItems={menuItems} />
				</div>
			</header>

		</>
	)
}
