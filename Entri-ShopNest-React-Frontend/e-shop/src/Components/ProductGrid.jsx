import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <div className="empty-results">
        <span>Nothing on this shelf just yet.</span>
        <p>Try another category or search term.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}

export default ProductGrid;
