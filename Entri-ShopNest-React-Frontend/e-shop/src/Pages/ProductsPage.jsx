import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import CategoryFilter from "../Components/CategoryFilter";
import Loading from "../Components/Loading";
import ProductGrid from "../Components/ProductGrid";
import StatusMessage from "../Components/StatusMessage";
import { useProducts } from "../context/useProducts";

function ProductsPage() {
  const { products, loading, error, reloadProducts } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All items");
  const [search, setSearch] = useState("");
  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products],
  );
  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesCategory =
          activeCategory === "All items" || product.category === activeCategory;
        const matchesSearch = `${product.name} ${product.category}`
          .toLowerCase()
          .includes(search.toLowerCase().trim());
        return matchesCategory && matchesSearch;
      }),
    [products, activeCategory, search],
  );

  return (
    <section className="collection-page container">
      <div className="collection-heading">
        <span className="eyebrow">The ShopNest edit</span>
        <h1>Good things, <em>right this way.</em></h1>
        <p>Take a look around. Your next everyday favorite might be closer than you think.</p>
      </div>
      <div className="collection-toolbar">
        <CategoryFilter
          activeCategory={activeCategory}
          categories={categories}
          onChange={setActiveCategory}
        />
        <label className="search-field">
          <Search size={17} />
          <input
            aria-label="Search products"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Find a good thing..."
            type="search"
            value={search}
          />
          <SlidersHorizontal aria-hidden="true" className="search-filter-icon" size={17} />
        </label>
      </div>
      {!loading && !error && <p className="results-count">{filteredProducts.length} lovely {filteredProducts.length === 1 ? "find" : "finds"}</p>}
      {loading ? <Loading /> : null}
      {!loading && error ? <StatusMessage message={error} onRetry={reloadProducts} /> : null}
      {!loading && !error ? <ProductGrid products={filteredProducts} /> : null}
    </section>
  );
}

export default ProductsPage;
