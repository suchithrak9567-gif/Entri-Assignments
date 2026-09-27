function CategoryFilter({ categories, activeCategory, onChange }) {
  return (
    <div className="category-filter" aria-label="Filter by category">
      {["All items", ...categories].map((category) => (
        <button
          className={`filter-chip${activeCategory === category ? " active" : ""}`}
          key={category}
          onClick={() => onChange(category)}
          type="button"
          aria-pressed={activeCategory === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
