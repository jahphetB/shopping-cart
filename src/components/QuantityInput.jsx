export default function QuantityInput({ quantity, onChange }) {
	function handleChange(event) {
		const value = event.target.value;

		if (value === "") {
			onChange("");
			return;
		}

		const number = Number(value);

		if (Number.isInteger(number) && number >= 0) {
			onChange(number);
		}
	}

	function decrease() {
		onChange(Math.max(1, Number(quantity) - 1));
	}

	function increase() {
		onChange(Number(quantity || 0) + 1);
	}

	return (
		<div className="quantity-control">
			<button
				className="quantity-button quantity-decrease"
				type="button"
				onClick={decrease}
				disabled={Number(quantity) <= 1}
				aria-label="Decrease quantity"
			>
				−
			</button>

			<input
				className="quantity-input"
				type="number"
				min="1"
				value={quantity}
				onChange={handleChange}
				aria-label="Product quantity"
			/>

			<button
				className="quantity-button quantity-increase"
				type="button"
				onClick={increase}
				aria-label="Increase quantity"
			>
				+
			</button>
		</div>
	);
}