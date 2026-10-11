import { Link } from "react-router";
import "../styles/Home.css";

export default function Home() {
	return (
		<main className="home-page">
			<section className="home-hero">
				<div className="home-hero-content">
					<p className="home-eyebrow">
						THOUGHTFULLY SELECTED
					</p>

					<h1 className="home-title">
						Everyday essentials,
						<br />
						exceptionally simple.
					</h1>

					<p className="home-description">
						Discover a curated collection of everyday
						products. Find what you love and make it yours.
					</p>

					<Link className="home-shop-button" to="/shop">
						Explore Collection
						<span className="home-button-arrow" aria-hidden="true">
							→
						</span>
					</Link>
				</div>

				<div className="home-hero-visual" aria-hidden="true">
					<div className="home-visual-circle home-circle-large"></div>
					<div className="home-visual-circle home-circle-small"></div>
					<div className="home-visual-shape"></div>
				</div>
			</section>
		</main>
	);
}