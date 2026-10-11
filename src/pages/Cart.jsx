import CartItem from "../components/CartItem";
import "../styles/Cart.css";

export default function Cart({
	cartItems,
	onUpdateQuantity,
	onRemoveItem,
}) {
	const total = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	return (
		<main className="cart-page">
			<h1 className="cart-title">Your Cart</h1>

			{cartItems.length === 0 ? (
				<p className="cart-empty">
					Your cart is empty.
				</p>
			) : (
				<>
					<div className="cart-layout">
                        <section className="cart-items" aria-label="Cart items">
                            {cartItems.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onUpdateQuantity={onUpdateQuantity}
                                    onRemoveItem={onRemoveItem}
                                />
                            ))}
                        </section>

                        <div className="cart-summary">
                            <h2 className="cart-summary-title">
                                Order Summary
                            </h2>

                            <p className="cart-total">
                                Total: ${total.toFixed(2)}
                            </p>
                        </div>
                    </div>
				</>
			)}
		</main>
	);
}