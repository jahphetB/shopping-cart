import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "./ProductCard";

const product = {
	id: 1,
	title: "Test Backpack",
	price: 49.99,
	image: "https://example.com/backpack.jpg",
};

describe("ProductCard", () => {
	it("displays product information", () => {
		render(<ProductCard product={product} onAddToCart={() => {}} />);

		expect(screen.getByText("Test Backpack")).toBeInTheDocument();
		expect(screen.getByText("$49.99")).toBeInTheDocument();
		expect(screen.getByRole("img", { name: "Test Backpack" })).toBeInTheDocument();
	});

	it("adds the selected quantity to the cart", async () => {
		const user = userEvent.setup();
		const handleAddToCart = vi.fn();

		render(
			<ProductCard
				product={product}
				onAddToCart={handleAddToCart}
			/>
		);

		await user.click(
			screen.getByRole("button", { name: "Increase quantity" })
		);

		await user.click(
			screen.getByRole("button", { name: "Add to Cart" })
		);

		expect(handleAddToCart).toHaveBeenCalledWith(product, 2);
	});

	it("resets quantity after adding to cart", async () => {
		const user = userEvent.setup();

		render(
			<ProductCard
				product={product}
				onAddToCart={() => {}}
			/>
		);

		await user.click(
			screen.getByRole("button", { name: "Increase quantity" })
		);

		await user.click(
			screen.getByRole("button", { name: "Add to Cart" })
		);

		expect(screen.getByRole("spinbutton")).toHaveValue(1);
	});
});