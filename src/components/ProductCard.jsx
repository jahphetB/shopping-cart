import { useState } from "react";
import QuantityInput from "./QuantityInput";

export default function ProductCard({ product, onAddToCart }) {
	const [quantity, setQuantity] = useState(1);

	function handleAddToCart() {
		const amount = Number(quantity);

		if (!Number.isInteger(amount) || amount < 1) {
			return;
		}

		onAddToCart(product, amount);
		setQuantity(1);
	}

	return (
		<article className="product-card">
			<img
				className="product-image"
				src={product.image}
				alt={product.title}
			/>

			<h2 className="product-title">{product.title}</h2>

			<p className="product-price">
				${product.price.toFixed(2)}
			</p>

			<div className="product-actions">
				<QuantityInput
					quantity={quantity}
					onChange={setQuantity}
				/>

				<button
					className="product-add-button"
					type="button"
					onClick={handleAddToCart}
					disabled={!Number.isInteger(Number(quantity)) || Number(quantity) < 1}
				>
					Add to Cart
				</button>
			</div>
		</article>
	);
}