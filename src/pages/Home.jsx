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

				<div className="home-hero-visual">
                    <img
                        className="home-hero-image"
                        src="https://images.unsplash.com/photo-1564078516393-cf04bd966897?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                        alt="Elegant living room with beige sofas and minimalist furnishings"
                    />
                </div>
			</section>
		</main>
	);
}