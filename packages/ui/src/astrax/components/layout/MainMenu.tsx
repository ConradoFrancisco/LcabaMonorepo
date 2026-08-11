"use client";
import Link from "next/link";

export default function MainMenu() {
    return (
        <ul className="navbar-nav mx-auto gap-4 align-items-lg-center">
            <li className="nav-item">
                <Link className="nav-link text-uppercase" href="/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-uppercase" href="/about">
                    About
                </Link>
            </li>
            <li className="nav-item dropdown menu-item-has-children">
                <Link className="nav-link text-uppercase" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Services
                </Link>
                <ul className="dropdown-menu px-5">
                    <li>
                        <Link className="dropdown-item text-capitalize gap-5 py-3 px-0 border-bottom justify-content-between" href="/services">
                            All Services
                            <i className="fa-solid fa-arrow-right" />
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item text-capitalize gap-5 py-3 px-0 border-bottom justify-content-between" href="/services-details">
                            Online Business
                            <i className="fa-solid fa-arrow-right" />
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item text-capitalize gap-5 py-3 px-0 border-bottom justify-content-between" href="/services-details">
                            Tax &amp; Declaration
                            <i className="fa-solid fa-arrow-right" />
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item text-capitalize gap-5 py-3 px-0 border-bottom justify-content-between" href="/services-details">
                            Customer Strategy
                            <i className="fa-solid fa-arrow-right" />
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item text-capitalize gap-5 py-3 px-0 border-bottom justify-content-between" href="/services-details">
                            Private Equality
                            <i className="fa-solid fa-arrow-right" />
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item text-capitalize gap-5 py-3 px-0 justify-content-between" href="/services-details">
                            Corporate Solution
                            <i className="fa-solid fa-arrow-right" />
                        </Link>
                    </li>
                </ul>
            </li>
            <li className="nav-item dropdown menu-item-has-children">
                <Link className="nav-link text-uppercase" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Blog
                </Link>
                <ul className="dropdown-menu">
                    <li>
                        <Link className="dropdown-item text-capitalize" href="/blog">
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item text-capitalize" href="/blog-details">
                            Blog Details
                        </Link>
                    </li>
                </ul>
            </li>
            <li className="nav-item dropdown menu-item-has-children">
                <Link className="nav-link text-uppercase" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Pages
                </Link>
                <ul className="dropdown-menu">
                    <li>
                        <Link className="dropdown-item text-capitalize" href="/team">
                            Team
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item text-capitalize" href="/testimonials">
                            Testimonials
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item text-capitalize" href="/pricing">
                            Pricing
                        </Link>
                    </li>
                </ul>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-uppercase" href="/contact">
                    Contact
                </Link>
            </li>
        </ul>
    );
}
