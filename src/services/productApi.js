const PRODUCTS_URL = "https://fakestoreapi.com/products";

export async function getProducts(signal) {
	const response = await fetch(PRODUCTS_URL, { signal });

	if (!response.ok) {
		throw new Error(`Failed to fetch products: ${response.status}`);
	}

	return response.json();
}