import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "./Cart";

const cartItems = [
	{
		id: 1,
		title: "Backpack",
		price: 40,
		image: "https://example.com/backpack.jpg",
		quantity: 2,
	},
	{
		id: 2,
		title: "T-Shirt",
		price: 20,
		image: "https://example.com/shirt.jpg",
		quantity: 3,
	},
];

function renderCart(items = cartItems) {
	const onUpdateQuantity = vi.fn();
	const onRemoveItem = vi.fn();

	render(
		<Cart
			cartItems={items}
			onUpdateQuantity={onUpdateQuantity}
			onRemoveItem={onRemoveItem}
		/>
	);

	return { onUpdateQuantity, onRemoveItem };
}

describe("Cart", () => {
	it("displays a message when the cart is empty", () => {
		renderCart([]);

		expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
	});

	it("displays all products and their quantities", () => {
		renderCart();

		expect(screen.getByText("Backpack")).toBeInTheDocument();
		expect(screen.getByText("T-Shirt")).toBeInTheDocument();

		const inputs = screen.getAllByRole("spinbutton");

		expect(inputs[0]).toHaveValue(2);
		expect(inputs[1]).toHaveValue(3);
	});

	it("calculates the correct total price", () => {
		renderCart();

		// (40 × 2) + (20 × 3) = 140
		expect(screen.getByText("Total: $140.00")).toBeInTheDocument();
	});

	it("requests a quantity increase", async () => {
		const user = userEvent.setup();
		const { onUpdateQuantity } = renderCart();

		const increaseButtons = screen.getAllByRole("button", {
			name: "Increase quantity",
		});

		await user.click(increaseButtons[0]);

		expect(onUpdateQuantity).toHaveBeenCalledWith(1, 3);
	});

	it("requests a quantity decrease", async () => {
		const user = userEvent.setup();
		const { onUpdateQuantity } = renderCart();

		const decreaseButtons = screen.getAllByRole("button", {
			name: "Decrease quantity",
		});

		await user.click(decreaseButtons[0]);

		expect(onUpdateQuantity).toHaveBeenCalledWith(1, 1);
	});

	it("removes the selected product", async () => {
		const user = userEvent.setup();
		const { onRemoveItem } = renderCart();

		const removeButtons = screen.getAllByRole("button", {
			name: "Remove",
		});

		await user.click(removeButtons[0]);

		expect(onRemoveItem).toHaveBeenCalledWith(1);
	});
});