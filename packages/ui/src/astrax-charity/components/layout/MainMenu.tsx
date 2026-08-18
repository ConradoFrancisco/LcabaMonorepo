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
                    Causes
                </Link>
                <ul className="dropdown-menu">
                    <li>
                        <Link className="dropdown-item text-capitalize" href="/our-causes">
                            Causes
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item text-capitalize" href="/our-causes-details">
                            Causes Details
                        </Link>
                    </li>
                </ul>
            </li>
            <li className="nav-item dropdown menu-item-has-children">
                <Link className="nav-link text-uppercase" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Donation
                </Link>
                <ul className="dropdown-menu">
                    <li>
                        <Link className="dropdown-item text-capitalize" href="/donation">
                            Donation
                        </Link>
                    </li>
                    <li>
                        <Link className="dropdown-item text-capitalize" href="/donation-details">
                            Donation Details
                        </Link>
                    </li>
                </ul>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-uppercase" href="/become-a-volunteer">
                    Become a Volunteer
                </Link>
            </li>
        </ul>
    );
}
