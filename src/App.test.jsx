import { beforeEach, describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import App from "./App";
import { getProducts } from "./services/productApi";

vi.mock("./services/productApi", () => ({
	getProducts: vi.fn(),
}));

const mockProducts = [
	{
		id: 1,
		title: "Backpack",
		price: 40,
		image: "https://example.com/backpack.jpg",
	},
	{
		id: 2,
		title: "T-Shirt",
		price: 20,
		image: "https://example.com/shirt.jpg",
	},
];

function renderApp() {
	return render(
		<MemoryRouter initialEntries={["/shop"]}>
			<App />
		</MemoryRouter>
	);
}

describe("Shopping Cart Integration", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		getProducts.mockResolvedValue(mockProducts);
	});

	it("adds products and counts distinct items", async () => {
		const user = userEvent.setup();
		renderApp();

		const backpack = (await screen.findByText("Backpack")).closest(
			".product-card"
		);

		// Add two backpacks
		await user.click(
			within(backpack).getByRole("button", {
				name: "Increase quantity",
			})
		);

		await user.click(
			within(backpack).getByRole("button", {
				name: "Add to Cart",
			})
		);

		expect(
			screen.getByRole("link", { name: "Cart (1)" })
		).toBeInTheDocument();

		// Add one more backpack
		await user.click(
			within(backpack).getByRole("button", {
				name: "Add to Cart",
			})
		);

		// Still one distinct product
		expect(
			screen.getByRole("link", { name: "Cart (1)" })
		).toBeInTheDocument();

		// Add a different product
		const shirt = screen.getByText("T-Shirt").closest(".product-card");

		await user.click(
			within(shirt).getByRole("button", {
				name: "Add to Cart",
			})
		);

		expect(
			screen.getByRole("link", { name: "Cart (2)" })
		).toBeInTheDocument();

		// Open the cart
		await user.click(
			screen.getByRole("link", { name: "Cart (2)" })
		);

		expect(screen.getByText("Backpack")).toBeInTheDocument();
		expect(screen.getByText("T-Shirt")).toBeInTheDocument();

		// Three backpacks ($120) + one shirt ($20)
		expect(screen.getByText("Total: $140.00")).toBeInTheDocument();
	});

	it("updates quantities and removes products", async () => {
		const user = userEvent.setup();
		renderApp();

		const backpack = (await screen.findByText("Backpack")).closest(
			".product-card"
		);

		await user.click(
			within(backpack).getByRole("button", {
				name: "Add to Cart",
			})
		);

		await user.click(
			screen.getByRole("link", { name: "Cart (1)" })
		);

		const cartItem = screen.getByText("Backpack").closest(".cart-item");

		// Increase quantity to two
		await user.click(
			within(cartItem).getByRole("button", {
				name: "Increase quantity",
			})
		);

		expect(screen.getByText("Total: $80.00")).toBeInTheDocument();

		// Decrease quantity to one
		await user.click(
			within(cartItem).getByRole("button", {
				name: "Decrease quantity",
			})
		);

		expect(screen.getByText("Total: $40.00")).toBeInTheDocument();

		// Remove the product
		await user.click(
			within(cartItem).getByRole("button", {
				name: "Remove",
			})
		);

		expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();

		expect(
			screen.getByRole("link", { name: "Cart" })
		).toBeInTheDocument();
	});

	it("displays an error when fetching products fails", async () => {
		getProducts.mockRejectedValue(new Error("Unable to load products"));

		renderApp();

		expect(
			await screen.findByRole("alert")
		).toHaveTextContent("Unable to load products");
	});
});