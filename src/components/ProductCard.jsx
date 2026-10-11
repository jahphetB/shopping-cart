export default function ProductCard({ product }) {
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
		</article>
	);
}