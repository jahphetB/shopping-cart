import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Navbar from "./Navbar";

describe("Navbar", () => {
	it("displays the navigation links", () => {
		render(
			<MemoryRouter>
				<Navbar cartCount={0} />
			</MemoryRouter>
		);

		expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Shop" })).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Cart" })).toBeInTheDocument();
	});

	it("displays the number of distinct cart items", () => {
		render(
			<MemoryRouter>
				<Navbar cartCount={2} />
			</MemoryRouter>
		);

		expect(screen.getByRole("link", { name: "Cart (2)" })).toBeInTheDocument();
	});

	it("updates the cart count when props change", () => {
		const { rerender } = render(
			<MemoryRouter>
				<Navbar cartCount={1} />
			</MemoryRouter>
		);

		rerender(
			<MemoryRouter>
				<Navbar cartCount={3} />
			</MemoryRouter>
		);

		expect(screen.getByRole("link", { name: "Cart (3)" })).toBeInTheDocument();
	});
});