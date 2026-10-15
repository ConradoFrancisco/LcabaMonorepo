
import Image from 'next/image';

export default function Loading() {
	return (
		<div id="preloader">
			<div id="loader" className="loader">
				<div className="loader-container">
					<div className="loader-icon">
						<Image
							src="/assets/logo.png"
							alt="Cargando OIP..."
							width={54}
							height={54}
							priority
							style={{
								objectFit: 'contain',
								display: 'block',
								margin: '0 auto',
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
