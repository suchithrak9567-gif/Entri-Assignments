import React from "react";

const products = [
	{
		id: 1,
		name: "Wireless Headphones",
		price: 79.99,
		image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
	},
	{
		id: 2,
		name: "Smart Watch",
		price: 129.99,
		image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
	},
	{
		id: 3,
		name: "Running Shoes",
		price: 94.99,
		image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
	},
	{
		id: 4,
		name: "Leather Backpack",
		price: 64.99,
		image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
	},
];

function Products() {
	return (
		<main className="products-page">
			<header className="products-header">
				<p className="products-eyebrow">Our collection</p>
				<h1>Products</h1>
				<p>Discover quality essentials selected for your everyday lifestyle.</p>
			</header>

			<section className="products-grid" aria-label="Product list">
				{products.map((product) => (
					<article className="product-card" key={product.id}>
						<img src={product.image} alt={product.name} className="product-image" />
						<div className="product-details">
							<h2>{product.name}</h2>
							<p className="product-price">${product.price.toFixed(2)}</p>
							<button type="button" className="add-to-cart">
								Add to cart
							</button>
						</div>
					</article>
				))}
			</section>
		</main>
	);
}

export default Products;
