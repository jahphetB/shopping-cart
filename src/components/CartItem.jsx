import QuantityInput from "./QuantityInput";

export default function CartItem({
	item,
	onUpdateQuantity,
	onRemoveItem,
}) {
	const subtotal = item.price * item.quantity;

	return (
		<article className="cart-item">
			<img
				className="cart-item-image"
				src={item.image}
				alt={item.title}
			/>

			<div className="cart-item-details">
				<h2 className="cart-item-title">{item.title}</h2>

				<p className="cart-item-price">
					${item.price.toFixed(2)} each
				</p>

				<QuantityInput
					quantity={item.quantity}
					onChange={(quantity) => {
						if (quantity === "") return;

						onUpdateQuantity(item.id, quantity);
					}}
				/>

				<p className="cart-item-subtotal">
					Subtotal: ${subtotal.toFixed(2)}
				</p>

				<button
					className="cart-item-remove"
					type="button"
					onClick={() => onRemoveItem(item.id)}
				>
					Remove
				</button>
			</div>
		</article>
	);
}