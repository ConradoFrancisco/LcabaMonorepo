'use client'
import Isotope from "isotope-layout"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"

// Define interfaces
interface Course {
	id: number
	title: string
	categories: string[]
	img: string
	authorImg: string
}

interface Filter {
	key: string
	label: string
	delay: number
	ariaLabel: string
}

export default function Section2() {
	const isotope = useRef<Isotope | null>(null)
	const [filterKey, setFilterKey] = useState<string>("*")

	// Course data
	const courses: Course[] = [
		{ id: 1, title: "The IBM Data Science Professional Certificate", categories: ["development", "consultancy"], img: "img-1.png", authorImg: "author-1.png" },
		{ id: 2, title: "The Coursera Full-Stack Development Specialization", categories: ["technology", "consultancy"], img: "img-2.png", authorImg: "author-2.png" },
		{ id: 3, title: "The Adobe Creative Cloud Mastery Certification", categories: ["technology", "consultancy"], img: "img-3.png", authorImg: "author-3.png" },
		{ id: 4, title: "The Google Data Analytics Professional Certificate", categories: ["technology", "development"], img: "img-4.png", authorImg: "author-4.png" },
		{ id: 5, title: "The SANS Cybersecurity Leadership Professional Certificate", categories: ["technology", "uiux"], img: "img-5.png", authorImg: "author-5.png" },
		{ id: 6, title: "The PMI Agile Certified Practitioner (PMI-ACP) Certification", categories: ["technology", "consultancy"], img: "img-6.png", authorImg: "author-6.png" },
		{ id: 7, title: "The IBM Data Science Professional Certificate", categories: ["uiux", "consultancy"], img: "img-7.png", authorImg: "author-7.png" },
		{ id: 8, title: "The Coursera Full-Stack Development Specialization", categories: ["technology", "development"], img: "img-8.png", authorImg: "author-8.png" },
		{ id: 9, title: "The Adobe Creative Cloud Mastery Certification", categories: ["consultancy"], img: "img-9.png", authorImg: "author-9.png" },
		{ id: 10, title: "The Google Data Analytics Professional Certificate", categories: ["uiux", "consultancy"], img: "img-10.png", authorImg: "author-10.png" },
		{ id: 11, title: "The SANS Cybersecurity Leadership Professional Certificate", categories: ["consultancy", "development"], img: "img-11.png", authorImg: "author-11.png" },
		{ id: 12, title: "The PMI Agile Certified Practitioner (PMI-ACP) Certification", categories: ["consultancy"], img: "img-12.png", authorImg: "author-12.png" },
		{ id: 13, title: "The IBM Data Science Professional Certificate", categories: ["technology", "consultancy"], img: "img-13.png", authorImg: "author-13.png" },
		{ id: 14, title: "The Coursera Full-Stack Development Specialization", categories: ["technology", "uiux"], img: "img-14.png", authorImg: "author-14.png" },
		{ id: 15, title: "The Adobe Creative Cloud Mastery Certification", categories: ["technology", "consultancy"], img: "img-15.png", authorImg: "author-15.png" },
		{ id: 16, title: "The Google Data Analytics Professional Certificate", categories: ["technology", "consultancy"], img: "img-16.png", authorImg: "author-16.png" },
		{ id: 17, title: "The SANS Cybersecurity Leadership Professional Certificate", categories: ["technology"], img: "img-17.png", authorImg: "author-17.png" },
		{ id: 18, title: "The PMI Agile Certified Practitioner (PMI-ACP) Certification", categories: ["technology", "uiux"], img: "img-18.png", authorImg: "author-18.png" },
	]

	// Filter buttons data
	const filters: Filter[] = [
		{ key: "*", label: "all course", delay: 0, ariaLabel: "All" },
		{ key: "technology", label: "technology", delay: 200, ariaLabel: "Technology" },
		{ key: "uiux", label: "ui/ux", delay: 400, ariaLabel: "uiux" },
		{ key: "consultancy", label: "consultancy", delay: 600, ariaLabel: "consultancy" },
		{ key: "development", label: "development", delay: 800, ariaLabel: "development" },
	]

	useEffect(() => {
		const timer = setTimeout(() => {
			isotope.current = new Isotope(".masonary-active", {
				itemSelector: ".filter-item",
				percentPosition: true,
				masonry: {
					columnWidth: ".filter-item",
				},
				// animationOptions: {
				// 	duration: 750,
				// 	easing: "linear",
				// 	queue: false,
				// },
			})
		}, 1000)
		return () => {
			clearTimeout(timer)
			if (isotope.current) {
				isotope.current.destroy()
			}
		}
	}, [])

	useEffect(() => {
		if (isotope.current) {
			filterKey === "*"
				? isotope.current.arrange({ filter: "*" })
				: isotope.current.arrange({ filter: `.${filterKey}` })
		}
	}, [filterKey])

	const handleFilterKeyChange = useCallback((key: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setFilterKey(key)
	}, [])

	return (
		<section className="elearning-courses-section-2 position-relative pt-120 pb-120 rounded-bottom-4 overflow-hidden bg-secondary-2 z-20">
			<div className="container">
				<div className="text-center">
					<div className="button-group filter-button-group filter-menu-active">
						{filters.map((filter) => (
							<button
								key={filter.key}
								data-aos="fade-left"
								data-aos-delay={filter.delay}
								aria-label={filter.ariaLabel}
								className={`btn btn-md btn-filter mb-2 me-2 aos-init aos-animate ${filterKey === filter.key ? 'active' : ''}`}
								onClick={handleFilterKeyChange(filter.key)}
							>
								{filter.label}
							</button>
						))}
					</div>
				</div>
			</div>
			<div className="container mt-6">
				<div className="masonary-active justify-content-between row">
					<div className="grid-sizer" />
					{courses.map((course) => (
						<div
							key={course.id}
							className={`filter-item col-12 col-lg-4 col-md-6 ${course.categories.join(' ')}`}
							data-aos="zoom-in"
						>
							<div className="card-news position-relative hover-up">
								<Link href="/single-courses" className="card-news-img position-relative d-block">
									<img
										className="w-100 rounded-top-3"
										src={`/assets/imgs/pages/learning/page-home/home-section-3/${course.img}`}
										alt="AstraX"
									/>
									<span className="text-uppercase text-dark bg-green-3 rounded-2 px-2 py-1 position-absolute top-100 end-0 translate-middle-y me-5 fs-8 fw-bold">
										price: $39
									</span>
								</Link>
								<div className="card-news-body p-5 pb-4 bg-white rounded-bottom-3">
									<div className="d-flex gap-2">
										{Array(5).fill(0).map((_, i) => (
											<i key={i} className="bi bi-star-fill text-yellow fs-7" />
										))}
									</div>
									<div className="card-news-title mt-3">
										<h6 className="fs-6">
											<Link href="/single-courses">{course.title}</Link>
										</h6>
									</div>
									<div className="d-flex card-news-information mt-4 gap-4 border-bottom pb-3">
										<div className="d-flex align-items-center gap-1">
											<i className="ri-book-marked-fill text-primary" />
											<p className="fs-7 text-uppercase mb-0">30 Lessons</p>
										</div>
										<div className="d-flex align-items-center gap-1">
											<i className="ri-group-fill text-primary" />
											<p className="fs-7 text-uppercase mb-0">110+ students</p>
										</div>
									</div>
									<div className="d-flex align-items-center mt-4">
										<div className="d-flex align-items-center gap-2">
											<img
												className="icon-shape icon-40 rounded-circle"
												src={`/assets/imgs/pages/learning/page-home/home-section-3/${course.authorImg}`}
												alt="AstraX"
											/>
											<p className="fs-7 mb-0 text-uppercase fw-medium">
												<Link href="/#" className="text-primary">ronald d.</Link>
											</p>
										</div>
										<div className="d-flex align-items-center gap-1 ms-auto">
											<p className="fs-7 mb-0 text-uppercase fw-bold">
												<Link href="/#" className="text-primary">technology</Link>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}