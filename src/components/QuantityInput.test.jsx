import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuantityInput from "./QuantityInput";

describe("QuantityInput", () => {
	it("displays the current quantity", () => {
		render(<QuantityInput quantity={3} onChange={() => {}} />);

		expect(screen.getByRole("spinbutton")).toHaveValue(3);
	});

	it("increases the quantity", async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();

		render(<QuantityInput quantity={2} onChange={handleChange} />);

		await user.click(
			screen.getByRole("button", { name: "Increase quantity" })
		);

		expect(handleChange).toHaveBeenCalledWith(3);
	});

	it("decreases the quantity", async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();

		render(<QuantityInput quantity={3} onChange={handleChange} />);

		await user.click(
			screen.getByRole("button", { name: "Decrease quantity" })
		);

		expect(handleChange).toHaveBeenCalledWith(2);
	});

	it("prevents decreasing below one", () => {
		render(<QuantityInput quantity={1} onChange={() => {}} />);

		expect(
			screen.getByRole("button", { name: "Decrease quantity" })
		).toBeDisabled();
	});

	it("allows manually entering a quantity", async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();

		render(<QuantityInput quantity={1} onChange={handleChange} />);

		const input = screen.getByRole("spinbutton");

		await user.clear(input);

		expect(handleChange).toHaveBeenCalledWith("");
	});
});