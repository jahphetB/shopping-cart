import { useState } from "react";
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";

export default function App() {
	const [cartItems, setCartItems] = useState([]);

	function addToCart(product, quantity) {
		setCartItems((currentItems) => {
			const existingItem = currentItems.find(
				(item) => item.id === product.id
			);

			if (existingItem) {
				return currentItems.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + quantity }
						: item
				);
			}

			return [...currentItems, { ...product, quantity }];
		});
	}

  function updateCartQuantity(productId, quantity) {
    if (!Number.isInteger(quantity) || quantity < 0) {
      return;
    }

    setCartItems((currentItems) => {
      if (quantity === 0) {
        return currentItems.filter(
          (item) => item.id !== productId
        );
      }

      return currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity }
          : item
      );
    });
  }

  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  }

	const cartCount = cartItems.length;

	return (
		<div className="app">
			<Navbar cartCount={cartCount} />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/shop"
					element={<Shop onAddToCart={addToCart} />}
				/>
				<Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onUpdateQuantity={updateCartQuantity}
              onRemoveItem={removeFromCart}
            />
          }
        />
			</Routes>
		</div>
	);
}