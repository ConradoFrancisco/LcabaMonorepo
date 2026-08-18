'use client'
import "react-modal-video/css/modal-video.css"
import Link from 'next/link'
import { useState } from 'react'
import ModalVideo from 'react-modal-video'

export default function Section2() {
	const [isOpen, setOpen] = useState(false)
	return (
		<>

			<section className="elearning-single-courses-section-2 position-relative pt-120 pb-120 rounded-bottom-4 overflow-hidden z-20">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 pe-lg-5">
							<div className="d-flex flex-wrap justify-content-start align-items-center gap-md-5 gap-4 mb-6 " data-aos="fade-right" data-aos-delay={0}>
								<div>
									<div className="star-rating d-flex gap-1">
										<i className="bi bi-star-fill text-yellow fs-7" />
										<i className="bi bi-star-fill text-yellow fs-7" />
										<i className="bi bi-star-fill text-yellow fs-7" />
										<i className="bi bi-star-fill text-yellow fs-7" />
										<i className="bi bi-star-fill text-yellow fs-7" />
									</div>
									<p className="btn-text text-primary mb-0 mt-2">4.9 (30+ reviews)</p>
								</div>
								<div>
									<p className="fs-7 mb-0 text-capitalize">Author</p>
									<p className="btn-text text-primary mb-0 mt-2">Victoria L. Davis</p>
								</div>
								<div>
									<p className="fs-7 mb-0 text-capitalize">category</p>
									<p className="btn-text text-primary mb-0 mt-2">design, ux</p>
								</div>
								<div>
									<p className="fs-7 mb-0 text-capitalize">enrolled</p>
									<p className="btn-text text-primary mb-0 mt-2">50+ students</p>
								</div>
							</div>
							<img className="rounded-4 mb-7" data-aos="zoom-in" src="/assets\imgs\pages\learning\page-signle-courses\img-1.png" alt="AstraX" />
							<h4 className="mb-4 text-anime-style-2">Intro subject</h4>
							<p className=" wow img-custom-anim-top">
								To create engaging eLearning content, it's important to ensure the material is informative, interactive, and aligned with the learning objectives. Here’s an outline and sample content structure tailored for an eLearning course. Let me know if you have a specific subject in mind, and I can refine this further. Before diving into web design, it's crucial to understand what it entails. Web design focuses on creating visually appealing, user-friendly, and functional websites. It involves elements like layout, color schemes, typography, and responsiveness. Beginners should start by learning fundamental design principles such as contrast, balance, and hierarchy. These principles ensure a website is both aesthetically pleasing and easy to navigate. Tools like Figma or Adobe XD
								can help visualize these concepts.
							</p>
							<p className="mb-7 wow img-custom-anim-top">For instance, a simple webpage might use HTML to create a text box and CSS to make it visually appealing. Hands-on practice with code editors like VS Code helps solidify these skills. Free platforms like Codecademy or W3Schools provide excellent tutorials for beginners.</p>
							<h4 className="mb-3 text-anime-style-2">Overview</h4>
							<p className="mb-7 wow img-custom-anim-top">With the proliferation of mobile devices, creating websites that work seamlessly on all screen sizes is non-negotiable. Responsive design uses techniques like flexible grids, media queries, and fluid images to adapt a site's layout to various devices. Start by practicing with CSS frameworks like Bootstrap or learning grid systems. Test your designs using tools like Chrome DevTools to ensure optimal performance across devices. Modern web designers rely on tools to streamline their workflow.</p>
							<h4 className="mb-3 text-anime-style-2">Content</h4>
							<p className="mb-7 wow img-custom-anim-top">Test your designs using tools like Chrome DevTools to ensure optimal performance across devices. Modern web designers rely on tools to streamline their workflow.</p>
							<div className="group-collapse-expand wow img-custom-anim-top">
								<button className="btn btn-collapse collapsed border-0 border-top border-primary rounded-0" type="button" aria-label="Toggle navigation" data-bs-toggle="collapse" data-bs-target="#collapseQuestion" aria-expanded="false" aria-controls="collapseQuestion">
									<h6 className="mb-0 fs-18 text-lowercase">The first steps ui &amp; ux design</h6>
									<svg width={12} height={7} viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M1 1L6 6L11 1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</button>
								<div className="collapse" id="collapseQuestion">
									<div className="card card-body">
										<div className="list-questions">
											<div className="item-question border-bottom pt-1">
												<Link href="/#" className="head-question d-flex align-items-center gap-3">
													<svg width={13} height={16} viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M11.5938 6.62891C12.4414 7.14844 12.4414 8.37891 11.5938 8.89844L1.96875 14.5859C1.09375 15.1055 0 14.4766 0 13.4375V2.0625C0 0.941406 1.17578 0.476562 1.96875 0.941406L11.5938 6.62891ZM1.3125 13.1641C1.3125 13.3008 1.44922 13.3555 1.55859 13.3008L10.6914 7.91406C10.8008 7.83203 10.8008 7.69531 10.6914 7.61328L1.55859 2.22656C1.44922 2.14453 1.3125 2.22656 1.3125 2.36328V13.1641Z" fill="#01473C" />
													</svg>
													<p className="fs-7 text-primary fw-medium mb-0">The structure of the balance sheet statement and terms used</p>
												</Link>
											</div>
											<div className="item-question border-bottom">
												<Link href="/#" className="head-question d-flex align-items-center gap-3">
													<svg width={13} height={16} viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M11.5938 6.62891C12.4414 7.14844 12.4414 8.37891 11.5938 8.89844L1.96875 14.5859C1.09375 15.1055 0 14.4766 0 13.4375V2.0625C0 0.941406 1.17578 0.476562 1.96875 0.941406L11.5938 6.62891ZM1.3125 13.1641C1.3125 13.3008 1.44922 13.3555 1.55859 13.3008L10.6914 7.91406C10.8008 7.83203 10.8008 7.69531 10.6914 7.61328L1.55859 2.22656C1.44922 2.14453 1.3125 2.22656 1.3125 2.36328V13.1641Z" fill="#01473C" />
													</svg>
													<p className="fs-7 text-primary fw-medium mb-0">Building and analyzing a balance sheet statement</p>
												</Link>
											</div>
											<div className="item-question border-bottom">
												<Link href="/#" className="head-question d-flex align-items-center gap-3">
													<svg width={13} height={16} viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M11.5938 6.62891C12.4414 7.14844 12.4414 8.37891 11.5938 8.89844L1.96875 14.5859C1.09375 15.1055 0 14.4766 0 13.4375V2.0625C0 0.941406 1.17578 0.476562 1.96875 0.941406L11.5938 6.62891ZM1.3125 13.1641C1.3125 13.3008 1.44922 13.3555 1.55859 13.3008L10.6914 7.91406C10.8008 7.83203 10.8008 7.69531 10.6914 7.61328L1.55859 2.22656C1.44922 2.14453 1.3125 2.22656 1.3125 2.36328V13.1641Z" fill="#01473C" />
													</svg>
													<p className="fs-7 text-primary fw-medium mb-0">The structure of the cash flow statement and terms used</p>
												</Link>
											</div>
											<div className="item-question">
												<Link href="/#" className="head-question d-flex align-items-center gap-3">
													<svg width={13} height={16} viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M11.5938 6.62891C12.4414 7.14844 12.4414 8.37891 11.5938 8.89844L1.96875 14.5859C1.09375 15.1055 0 14.4766 0 13.4375V2.0625C0 0.941406 1.17578 0.476562 1.96875 0.941406L11.5938 6.62891ZM1.3125 13.1641C1.3125 13.3008 1.44922 13.3555 1.55859 13.3008L10.6914 7.91406C10.8008 7.83203 10.8008 7.69531 10.6914 7.61328L1.55859 2.22656C1.44922 2.14453 1.3125 2.22656 1.3125 2.36328V13.1641Z" fill="#01473C" />
													</svg>
													<p className="fs-7 text-primary fw-medium mb-0">The structure of the balance sheet statement and terms used</p>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="group-collapse-expand wow img-custom-anim-top">
								<button className="btn btn-collapse border-0 border-top border-primary rounded-0" type="button" data-bs-toggle="collapse" aria-label="Toggle navigation" data-bs-target="#collapseQuestion-1" aria-expanded="false" aria-controls="collapseQuestion-1">
									<h6 className="mb-0 fs-18 text-lowercase">The first steps ui &amp; ux design</h6>
									<svg width={12} height={7} viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M1 1L6 6L11 1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</button>
								<div className="collapse show" id="collapseQuestion-1">
									<div className="card card-body">
										<div className="list-questions">
											<div className="item-question border-bottom pt-1">
												<Link href="/#" className="head-question d-flex align-items-center gap-3">
													<svg width={13} height={16} viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M11.5938 6.62891C12.4414 7.14844 12.4414 8.37891 11.5938 8.89844L1.96875 14.5859C1.09375 15.1055 0 14.4766 0 13.4375V2.0625C0 0.941406 1.17578 0.476562 1.96875 0.941406L11.5938 6.62891ZM1.3125 13.1641C1.3125 13.3008 1.44922 13.3555 1.55859 13.3008L10.6914 7.91406C10.8008 7.83203 10.8008 7.69531 10.6914 7.61328L1.55859 2.22656C1.44922 2.14453 1.3125 2.22656 1.3125 2.36328V13.1641Z" fill="#01473C" />
													</svg>
													<p className="fs-7 text-primary fw-medium mb-0">The structure of the balance sheet statement and terms used</p>
												</Link>
											</div>
											<div className="item-question border-bottom">
												<Link href="/#" className="head-question d-flex align-items-center gap-3">
													<svg width={13} height={16} viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M11.5938 6.62891C12.4414 7.14844 12.4414 8.37891 11.5938 8.89844L1.96875 14.5859C1.09375 15.1055 0 14.4766 0 13.4375V2.0625C0 0.941406 1.17578 0.476562 1.96875 0.941406L11.5938 6.62891ZM1.3125 13.1641C1.3125 13.3008 1.44922 13.3555 1.55859 13.3008L10.6914 7.91406C10.8008 7.83203 10.8008 7.69531 10.6914 7.61328L1.55859 2.22656C1.44922 2.14453 1.3125 2.22656 1.3125 2.36328V13.1641Z" fill="#01473C" />
													</svg>
													<p className="fs-7 text-primary fw-medium mb-0">Building and analyzing a balance sheet statement</p>
												</Link>
											</div>
											<div className="item-question border-bottom">
												<Link href="/#" className="head-question d-flex align-items-center gap-3">
													<svg width={13} height={16} viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M11.5938 6.62891C12.4414 7.14844 12.4414 8.37891 11.5938 8.89844L1.96875 14.5859C1.09375 15.1055 0 14.4766 0 13.4375V2.0625C0 0.941406 1.17578 0.476562 1.96875 0.941406L11.5938 6.62891ZM1.3125 13.1641C1.3125 13.3008 1.44922 13.3555 1.55859 13.3008L10.6914 7.91406C10.8008 7.83203 10.8008 7.69531 10.6914 7.61328L1.55859 2.22656C1.44922 2.14453 1.3125 2.22656 1.3125 2.36328V13.1641Z" fill="#01473C" />
													</svg>
													<p className="fs-7 text-primary fw-medium mb-0">The structure of the cash flow statement and terms used</p>
												</Link>
											</div>
											<div className="item-question">
												<Link href="/#" className="head-question d-flex align-items-center gap-3">
													<svg width={13} height={16} viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M11.5938 6.62891C12.4414 7.14844 12.4414 8.37891 11.5938 8.89844L1.96875 14.5859C1.09375 15.1055 0 14.4766 0 13.4375V2.0625C0 0.941406 1.17578 0.476562 1.96875 0.941406L11.5938 6.62891ZM1.3125 13.1641C1.3125 13.3008 1.44922 13.3555 1.55859 13.3008L10.6914 7.91406C10.8008 7.83203 10.8008 7.69531 10.6914 7.61328L1.55859 2.22656C1.44922 2.14453 1.3125 2.22656 1.3125 2.36328V13.1641Z" fill="#01473C" />
													</svg>
													<p className="fs-7 text-primary fw-medium mb-0">The structure of the balance sheet statement and terms used</p>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="group-collapse-expand wow img-custom-anim-top">
								<button className="btn btn-collapse collapsed border-0 border-top border-primary rounded-0" type="button" aria-label="Toggle navigation" data-bs-toggle="collapse" data-bs-target="#collapseQuestion-2" aria-expanded="false" aria-controls="collapseQuestion-2">
									<h6 className="mb-0 fs-18 text-lowercase">The first steps ui &amp; ux design</h6>
									<svg width={12} height={7} viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M1 1L6 6L11 1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</button>
								<div className="collapse" id="collapseQuestion-2">
									<div className="card card-body">
										<div className="list-questions">
											<div className="item-question border-bottom pt-1">
												<Link href="/#" className="head-question d-flex align-items-center gap-3">
													<svg width={13} height={16} viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M11.5938 6.62891C12.4414 7.14844 12.4414 8.37891 11.5938 8.89844L1.96875 14.5859C1.09375 15.1055 0 14.4766 0 13.4375V2.0625C0 0.941406 1.17578 0.476562 1.96875 0.941406L11.5938 6.62891ZM1.3125 13.1641C1.3125 13.3008 1.44922 13.3555 1.55859 13.3008L10.6914 7.91406C10.8008 7.83203 10.8008 7.69531 10.6914 7.61328L1.55859 2.22656C1.44922 2.14453 1.3125 2.22656 1.3125 2.36328V13.1641Z" fill="#01473C" />
													</svg>
													<p className="fs-7 text-primary fw-medium mb-0">The structure of the balance sheet statement and terms used</p>
												</Link>
											</div>
											<div className="item-question border-bottom">
												<Link href="/#" className="head-question d-flex align-items-center gap-3">
													<svg width={13} height={16} viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M11.5938 6.62891C12.4414 7.14844 12.4414 8.37891 11.5938 8.89844L1.96875 14.5859C1.09375 15.1055 0 14.4766 0 13.4375V2.0625C0 0.941406 1.17578 0.476562 1.96875 0.941406L11.5938 6.62891ZM1.3125 13.1641C1.3125 13.3008 1.44922 13.3555 1.55859 13.3008L10.6914 7.91406C10.8008 7.83203 10.8008 7.69531 10.6914 7.61328L1.55859 2.22656C1.44922 2.14453 1.3125 2.22656 1.3125 2.36328V13.1641Z" fill="#01473C" />
													</svg>
													<p className="fs-7 text-primary fw-medium mb-0">Building and analyzing a balance sheet statement</p>
												</Link>
											</div>
											<div className="item-question border-bottom">
												<Link href="/#" className="head-question d-flex align-items-center gap-3">
													<svg width={13} height={16} viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M11.5938 6.62891C12.4414 7.14844 12.4414 8.37891 11.5938 8.89844L1.96875 14.5859C1.09375 15.1055 0 14.4766 0 13.4375V2.0625C0 0.941406 1.17578 0.476562 1.96875 0.941406L11.5938 6.62891ZM1.3125 13.1641C1.3125 13.3008 1.44922 13.3555 1.55859 13.3008L10.6914 7.91406C10.8008 7.83203 10.8008 7.69531 10.6914 7.61328L1.55859 2.22656C1.44922 2.14453 1.3125 2.22656 1.3125 2.36328V13.1641Z" fill="#01473C" />
													</svg>
													<p className="fs-7 text-primary fw-medium mb-0">The structure of the cash flow statement and terms used</p>
												</Link>
											</div>
											<div className="item-question">
												<Link href="/#" className="head-question d-flex align-items-center gap-3">
													<svg width={13} height={16} viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M11.5938 6.62891C12.4414 7.14844 12.4414 8.37891 11.5938 8.89844L1.96875 14.5859C1.09375 15.1055 0 14.4766 0 13.4375V2.0625C0 0.941406 1.17578 0.476562 1.96875 0.941406L11.5938 6.62891ZM1.3125 13.1641C1.3125 13.3008 1.44922 13.3555 1.55859 13.3008L10.6914 7.91406C10.8008 7.83203 10.8008 7.69531 10.6914 7.61328L1.55859 2.22656C1.44922 2.14453 1.3125 2.22656 1.3125 2.36328V13.1641Z" fill="#01473C" />
													</svg>
													<p className="fs-7 text-primary fw-medium mb-0">The structure of the balance sheet statement and terms used</p>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="border-top">
								<h6 className="pt-7 text-anime-style-2">Average customer ratings</h6>
								<p>Test your designs using tools like Chrome DevTools to ensure optimal performance across devices. Modern web designers rely on tools to streamline their workflow.</p>
								<div className="d-flex flex-md-row flex-column gap-4 py-5">
									<div className="p-5 bg-primary rounded-4 text-center">
										<div className="star-rating d-flex justify-content-center gap-1">
											<i className="bi bi-star-fill text-green-3 fs-8" />
											<i className="bi bi-star-fill text-green-3 fs-8" />
											<i className="bi bi-star-fill text-green-3 fs-8" />
											<i className="bi bi-star-fill text-green-3 fs-8" />
											<i className="bi bi-star-fill text-green-3 fs-8" />
										</div>
										<h2 className="text-white mb-0">4.7</h2>
										<p className="text-uppercase">Out of 5</p>
										<div className="d-flex justify-content-center align-items-center">
											<div className="icon-shape icon-sm rounded-circle border border-primary ms--4 overflow-hidden">
												<img src="/assets/imgs/pages\learning\page-signle-courses/avatar-1.png" alt="AstraX" />
											</div>
											<div className="icon-shape icon-sm rounded-circle border border-primary ms--4 overflow-hidden">
												<img src="/assets/imgs/pages\learning\page-signle-courses/avatar-2.png" alt="AstraX" />
											</div>
											<div className="icon-shape icon-sm rounded-circle border border-primary ms--4 overflow-hidden">
												<img src="/assets/imgs/pages\learning\page-signle-courses/avatar-3.png" alt="AstraX" />
											</div>
											<div className="icon-shape icon-sm rounded-circle border border-primary ms--4 overflow-hidden">
												<img src="/assets/imgs/pages\learning\page-signle-courses/avatar-4.png" alt="AstraX" />
											</div>
										</div>
									</div>
									<div className="rounded-4 mt-5 w-100">
										<div className="position-relative py-5">
											<div className="progress position-relative overflow-visible bg-light" role="progressbar" aria-label="Basic example" aria-valuenow={58} aria-valuemin={0} aria-valuemax={58}>
												<div className="progress-bar rounded-pill wow img-custom-anim-left" style={{ width: '58%' }} />
											</div>
											<span className="position-absolute top-0 start-0 mb-2 fs-7 fw-regular text-uppercase text-primary">Quality</span>
											<span className="text-opacity-50 position-absolute top-0 end-0 mt-2 fs-7 fw-medium">58%</span>
										</div>
										<div className="position-relative py-5">
											<div className="progress position-relative overflow-visible bg-light" role="progressbar" aria-label="Basic example" aria-valuenow={37} aria-valuemin={0} aria-valuemax={37}>
												<div className="progress-bar rounded-pill wow img-custom-anim-left" style={{ width: '37%' }} />
											</div>
											<span className="position-absolute top-0 start-0 mb-2 fs-7 fw-regular text-uppercase text-primary">Core solutions</span>
											<span className="text-opacity-50 position-absolute top-0 end-0 mt-2 fs-7 fw-medium">37%</span>
										</div>
										<div className="position-relative py-5">
											<div className="progress position-relative overflow-visible bg-light" role="progressbar" aria-label="Basic example" aria-valuenow={80} aria-valuemin={0} aria-valuemax={80}>
												<div className="progress-bar rounded-pill wow img-custom-anim-left" style={{ width: '80%' }} />
											</div>
											<span className="position-absolute top-0 start-0 mb-2 fs-7 fw-regular text-uppercase text-primary">Design &amp; development</span>
											<span className="text-opacity-50 position-absolute top-0 end-0 mt-2 fs-7 fw-medium">80%</span>
										</div>
									</div>
								</div>
								<div className="d-flex flex-md-nowrap flex-wrap gap-lg-5 gap-4 align-items-start border-top pt-6 wow img-custom-anim-top">
									<div>
										<div className="icon-100">
											<Link href="/#">
												<img className="rounded-circle" src="/assets/imgs/pages/learning/page-signle-courses/avatar-5.png" alt="AstraX" />
											</Link>
										</div>
									</div>
									<div>
										<div className="mb-3 d-flex justify-content-between">
											<div>
												<p className="fs-7 mb-0 text-uppercase">June 9, 2025</p>
												<h6 className="mb-0 fs-7">Gabriella S. Adams</h6>
											</div>
											<Link href="/#" className="btn-hover d-flex align-items-center d-inline-flex px-3 py-1 rounded-pill border">
												<span className="text-primary fs-7 fw-bold"> Reply </span>
											</Link>
										</div>
										<div className="d-flex gap-lg-5 gap-4 flex-wrap">
											<div>
												<p className="mb-0">Quality</p>
												<div className="star-rating d-flex justify-content-center gap-1">
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
												</div>
											</div>
											<div>
												<p className="mb-0">location</p>
												<div className="star-rating d-flex justify-content-center gap-1">
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-light fs-8" />
												</div>
											</div>
											<div>
												<p className="mb-0">Amenities</p>
												<div className="star-rating d-flex justify-content-center gap-1">
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
												</div>
											</div>
											<div>
												<p className="mb-0">Services</p>
												<div className="star-rating d-flex justify-content-center gap-1">
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-light fs-8" />
												</div>
											</div>
											<div>
												<p className="mb-0">price</p>
												<div className="star-rating d-flex justify-content-center gap-1">
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
												</div>
											</div>
										</div>
										<p className="fs-7 py-3">“ This is the best tour on the east coast! It was amazing how many places we visited and what great memories we made! ”</p>
									</div>
								</div>
								<div className="d-flex flex-md-nowrap flex-wrap gap-lg-5 gap-4 align-items-start border-top pt-6 wow img-custom-anim-top">
									<div>
										<div className="icon-100">
											<Link href="/#">
												<img className="rounded-circle" src="/assets/imgs/pages/learning/page-signle-courses/avatar-6.png" alt="AstraX" />
											</Link>
										</div>
									</div>
									<div>
										<div className="mb-3 d-flex justify-content-between">
											<div>
												<p className="fs-7 mb-0 text-uppercase">June 9, 2025</p>
												<h6 className="mb-0 fs-7">Gabriella S. Adams</h6>
											</div>
											<Link href="/#" className="btn-hover d-flex align-items-center d-inline-flex px-3 py-1 rounded-pill border">
												<span className="text-primary fs-7 fw-bold"> Reply </span>
											</Link>
										</div>
										<div className="d-flex gap-lg-5 gap-4 flex-wrap">
											<div>
												<p className="mb-0">Quality</p>
												<div className="star-rating d-flex justify-content-center gap-1">
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
												</div>
											</div>
											<div>
												<p className="mb-0">location</p>
												<div className="star-rating d-flex justify-content-center gap-1">
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-light fs-8" />
												</div>
											</div>
											<div>
												<p className="mb-0">Amenities</p>
												<div className="star-rating d-flex justify-content-center gap-1">
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
												</div>
											</div>
											<div>
												<p className="mb-0">Services</p>
												<div className="star-rating d-flex justify-content-center gap-1">
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-light fs-8" />
												</div>
											</div>
											<div>
												<p className="mb-0">price</p>
												<div className="star-rating d-flex justify-content-center gap-1">
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
												</div>
											</div>
										</div>
										<p className="fs-7 py-3">“ This is the best tour on the east coast! It was amazing how many places we visited and what great memories we made! ”</p>
									</div>
								</div>
								<div className="d-flex flex-md-nowrap flex-wrap gap-lg-5 gap-4 align-items-start border-top pt-6 wow img-custom-anim-top">
									<div>
										<div className="icon-100">
											<Link href="/#">
												<img className="rounded-circle" src="/assets/imgs/pages/learning/page-signle-courses/avatar-7.png" alt="AstraX" />
											</Link>
										</div>
									</div>
									<div>
										<div className="mb-3 d-flex justify-content-between">
											<div>
												<p className="fs-7 mb-0 text-uppercase">June 9, 2025</p>
												<h6 className="mb-0 fs-7">Gabriella S. Adams</h6>
											</div>
											<Link href="/#" className="btn-hover d-flex align-items-center d-inline-flex px-3 py-1 rounded-pill border">
												<span className="text-primary fs-7 fw-bold"> Reply </span>
											</Link>
										</div>
										<div className="d-flex gap-lg-5 gap-4 flex-wrap">
											<div>
												<p className="mb-0">Quality</p>
												<div className="star-rating d-flex justify-content-center gap-1">
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
												</div>
											</div>
											<div>
												<p className="mb-0">location</p>
												<div className="star-rating d-flex justify-content-center gap-1">
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-light fs-8" />
												</div>
											</div>
											<div>
												<p className="mb-0">Amenities</p>
												<div className="star-rating d-flex justify-content-center gap-1">
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
												</div>
											</div>
											<div>
												<p className="mb-0">Services</p>
												<div className="star-rating d-flex justify-content-center gap-1">
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-light fs-8" />
												</div>
											</div>
											<div>
												<p className="mb-0">price</p>
												<div className="star-rating d-flex justify-content-center gap-1">
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
												</div>
											</div>
										</div>
										<p className="fs-7 py-3">“ This is the best tour on the east coast! It was amazing how many places we visited and what great memories we made! ”</p>
									</div>
								</div>
								<div className="d-flex flex-md-nowrap flex-wrap gap-lg-5 gap-4 align-items-start border-top border-bottom pt-6 wow img-custom-anim-top">
									<div>
										<div className="icon-100">
											<Link href="/#">
												<img className="rounded-circle" src="/assets/imgs/pages/learning/page-signle-courses/avatar-8.png" alt="AstraX" />
											</Link>
										</div>
									</div>
									<div>
										<div className="mb-3 d-flex justify-content-between">
											<div>
												<p className="fs-7 mb-0 text-uppercase">June 9, 2025</p>
												<h6 className="mb-0 fs-7">Gabriella S. Adams</h6>
											</div>
											<Link href="/#" className="btn-hover d-flex align-items-center d-inline-flex px-3 py-1 rounded-pill border">
												<span className="text-primary fs-7 fw-bold"> Reply </span>
											</Link>
										</div>
										<div className="d-flex gap-lg-5 gap-4 flex-wrap">
											<div>
												<p className="mb-0">Quality</p>
												<div className="star-rating d-flex justify-content-center gap-1">
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
												</div>
											</div>
											<div>
												<p className="mb-0">location</p>
												<div className="star-rating d-flex justify-content-center gap-1">
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-light fs-8" />
												</div>
											</div>
											<div>
												<p className="mb-0">Amenities</p>
												<div className="star-rating d-flex justify-content-center gap-1">
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
												</div>
											</div>
											<div>
												<p className="mb-0">Services</p>
												<div className="star-rating d-flex justify-content-center gap-1">
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-light fs-8" />
												</div>
											</div>
											<div>
												<p className="mb-0">price</p>
												<div className="star-rating d-flex justify-content-center gap-1">
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
													<i className="bi bi-star-fill text-primary fs-8" />
												</div>
											</div>
										</div>
										<p className="fs-7 py-3">“ This is the best tour on the east coast! It was amazing how many places we visited and what great memories we made! ”</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 ps-lg-5 mt-lg-0 mt-8" data-aos="fade-up">
							<div className="rounded-4 bg-secondary-2">
								<div className="bg-secondary-2 position-relative">
									<img className="rounded-4 w-100" src="/assets/imgs/pages/learning/page-signle-courses/img-2.png" alt="AstraX" />
									<div className="position-absolute top-100 end-0 me-5 translate-middle-y z-2">
										<a onClick={() => setOpen(true)} className="d-inline-flex fs-7 fw-semibold align-items-center bg-white rounded-circle popup-video play-btn  hover-up icon-shape icon-xxl shadow">
											<svg className="fill-primary" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" fill="none">
												<g clipPath="url(#clip0_349_659)">
													<path className="fill-primary" d="M3.82909 0.396886C2.20629 -0.533976 0.890625 0.228597 0.890625 2.09878V15.8999C0.890625 17.772 2.20629 18.5335 3.82909 17.6036L15.892 10.6856C17.5153 9.75439 17.5153 8.24572 15.892 7.31475L3.82909 0.396886Z" fill="#0D6EFD" />
												</g>
											</svg>
										</a>
									</div>
								</div>
								<div className="p-5">
									<h6 className="mb-3">Our Services</h6>
									<div className="d-flex justify-content-between align-items-center mb-3 border-bottom">
										<div className="d-flex align-items-center gap-2">
											<i className="fa-solid fa-clock text-primary" />
											<p className="fw-medium text-primary mb-0 fs-7">Duration</p>
										</div>
										<p className="fs-7">100+ hours</p>
									</div>
									<div className="d-flex justify-content-between align-items-center mb-3 border-bottom">
										<div className="d-flex align-items-center gap-2">
											<i className="fa-solid fa-user text-primary" />
											<p className="fw-medium text-primary mb-0 fs-7">Slot</p>
										</div>
										<p className="fs-7">500 lefts</p>
									</div>
									<div className="d-flex justify-content-between align-items-center mb-3 border-bottom">
										<div className="d-flex align-items-center gap-2">
											<i className="fa-solid fa-language text-primary" />
											<p className="fw-medium text-primary mb-0 fs-7">Language</p>
										</div>
										<p className="fs-7">English, Hindi</p>
									</div>
									<div className="d-flex justify-content-between align-items-center mb-3 border-bottom">
										<div className="d-flex align-items-center gap-2">
											<i className="fa-solid fa-clock text-primary" />
											<p className="fw-medium text-primary mb-0 fs-7">Lessons</p>
										</div>
										<p className="fs-7">100+ hours</p>
									</div>
									<div className="d-flex justify-content-between align-items-center mb-3 border-bottom">
										<div className="d-flex align-items-center gap-2">
											<i className="fa-solid fa-clock text-primary" />
											<p className="fw-medium text-primary mb-0 fs-7">Certificate</p>
										</div>
										<p className="fs-7">Yes</p>
									</div>
									<div className="d-flex justify-content-between align-items-center">
										<span className="btn btn-primary"> price: $49 </span>
										<Link href="/contact" className="btn btn-white bg-green-3 text-primary hover-up">
											<span className="text-primary">enroll now</span>
										</Link>
									</div>
									<p className="text-primary text-center fs-7 w-100 fw-medium mt-4 mb-2">Share now:</p>
									<ul className="social-icons list-unstyled d-flex mb-0 justify-content-center">
										<li>
											<Link href="/#">
												<span className="icon icon-shape icon-lg rounded-circle">
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
														<path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
													</svg>
												</span>
											</Link>
										</li>
										<li className="ms-2">
											<Link href="/#">
												<span className="icon icon-shape icon-lg rounded-circle">
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
														<path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
													</svg>
												</span>
											</Link>
										</li>
										<li className="ms-2">
											<Link href="/#">
												<span className="icon icon-shape icon-lg rounded-circle">
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
														<path d="M232 237.2c31.8-15.2 48.4-38.2 48.4-74 0-70.6-52.6-87.8-113.3-87.8H0v354.4h171.8c64.4 0 124.9-30.9 124.9-102.9 0-44.5-21.1-77.4-64.7-89.7zM77.9 135.9H151c28.1 0 53.4 7.9 53.4 40.5 0 30.1-19.7 42.2-47.5 42.2h-79v-82.7zm83.3 233.7H77.9V272h84.9c34.3 0 56 14.3 56 50.6 0 35.8-25.9 47-57.6 47zm358.5-240.7H376V94h143.7v34.9zM576 305.2c0-75.9-44.4-139.2-124.9-139.2-78.2 0-131.3 58.8-131.3 135.8 0 79.9 50.3 134.7 131.3 134.7 61.3 0 101-27.6 120.1-86.3H509c-6.7 21.9-34.3 33.5-55.7 33.5-41.3 0-63-24.2-63-65.3h185.1c.3-4.2 .6-8.7 .6-13.2zM390.4 274c2.3-33.7 24.7-54.8 58.5-54.8 35.4 0 53.2 20.8 56.2 54.8H390.4z" />
													</svg>
												</span>
											</Link>
										</li>
										<li className="ms-2">
											<Link href="/#">
												<span className="icon icon-shape icon-lg rounded-circle">
													<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
														<path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
													</svg>
												</span>
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<ModalVideo channel='youtube' isOpen={isOpen} videoId="JXMWOmuR1hU" onClose={() => setOpen(false)} />
		</>
	)
}
