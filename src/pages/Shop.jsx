import { useEffect, useState } from "react";
import { getProducts } from "../services/productApi";
import ProductCard from "../components/ProductCard";
import "../styles/Shop.css";

export default function Shop() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const controller = new AbortController();

		async function loadProducts() {
			try {
				const data = await getProducts(controller.signal);
				setProducts(data);
			} catch (err) {
				if (err.name !== "AbortError") {
					setError(err.message);
				}
			} finally {
				if (!controller.signal.aborted) {
					setLoading(false);
				}
			}
		}

		loadProducts();

		return () => controller.abort();
	}, []);

	return (
		<main className="shop-page">
			<h1 className="shop-title">Shop Products</h1>

			{loading && (
				<p className="shop-loading">Loading products...</p>
			)}

			{error && (
				<p className="shop-error" role="alert">
					{error}
				</p>
			)}

			{!loading && !error && (
				<section className="product-grid" aria-label="Products">
					{products.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
                            onAddToCart={handleAddToCart}
						/>
					))}
				</section>
			)}
		</main>
	);

    function handleAddToCart(product, quantity) {
        console.log("Add to cart:", product.title, quantity);
    }
}