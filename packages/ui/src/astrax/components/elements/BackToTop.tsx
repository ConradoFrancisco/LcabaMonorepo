'use client';

import { useEffect, useState } from 'react';

const BASE_OFFSET_PX = 24; // 1.5rem, matches .btn-scroll-top's default bottom offset
const GAP_ABOVE_FOOTER_PX = 16;

export default function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);
	const [progress, setProgress] = useState(0);
	const [bottomOffset, setBottomOffset] = useState(BASE_OFFSET_PX);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			const progress = (scrollTop / scrollHeight) * 139.988; // Tính toán progress cho stroke-dashoffset
			setProgress(progress);
			setIsVisible(scrollTop > 100);

			const footer = document.querySelector('footer');
			if (footer) {
				const footerTop = footer.getBoundingClientRect().top;
				const overlap = window.innerHeight - footerTop;
				setBottomOffset(overlap > 0 ? BASE_OFFSET_PX + overlap + GAP_ABOVE_FOOTER_PX : BASE_OFFSET_PX);
			}
		};

		window.addEventListener('scroll', handleScroll);
		window.addEventListener('resize', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleScroll);
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<div
			className={`btn-scroll-top ${isVisible ? 'active-progress' : ''}`}
			onClick={scrollToTop}
			style={{ display: isVisible ? 'flex' : 'none', bottom: `${bottomOffset}px` }}
		>
			<svg className="progress-square svg-content" width="100%" height="100%" viewBox="0 0 40 40">
				<path
					d="M8 1H32C35.866 1 39 4.13401 39 8V32C39 35.866 35.866 39 32 39H8C4.13401 39 1 35.866 1 32V8C1 4.13401 4.13401 1 8 1Z"
					style={{ transition: 'stroke-dashoffset 10ms linear', strokeDasharray: '139.988px', strokeDashoffset: `${139.988 - progress}px` }}
				/>
			</svg>
		</div>
	);
}
