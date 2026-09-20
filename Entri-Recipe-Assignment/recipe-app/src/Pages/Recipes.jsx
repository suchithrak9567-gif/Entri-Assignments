import { useState } from "react";
import useRecipes from "../hooks/useRecipes";
import RecipeCard from "./RecipeCard";

function Recipes() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data, loading, error } = useRecipes(query);

  function handleSubmit(e) {
    e.preventDefault();

    if (!search.trim()) {
      return;
    }

    setQuery(search);
    setShowSuggestions(false);
  }

  function handleSuggestion(recipe) {
    setSearch(recipe.strMeal);
    setQuery(recipe.strMeal);
    setShowSuggestions(false);
  }

  const suggestions = data.slice(0, 5);

  return (
    <main className="recipes-page">

      {/* Header */}
      <section className="recipes-header">
        <span className="recipes-badge">
          🍴 Recipe Collection
        </span>

        <h1>Find Your Perfect Recipe</h1>

        <p>
          Search delicious meals from around the world
          and discover something new to cook today.
        </p>

        {/* Search */}
        <form
          className="recipe-search"
          onSubmit={handleSubmit}
        >
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>

  <input
  type="text"
  value={search}
  onChange={(e) => {
    const value = e.target.value;

    setSearch(value);
    setQuery(value);
    setShowSuggestions(true);
  }}
  placeholder="Search chicken, pasta, pizza..."
/>

            {showSuggestions &&
              search.trim() &&
              suggestions.length > 0 && (
                <div className="suggestions">
                  {suggestions.map((recipe) => (
                    <button
                      type="button"
                      key={recipe.idMeal}
                      className="suggestion-item"
                      onClick={() =>
                        handleSuggestion(recipe)
                      }
                    >
                      <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                      />

                      <div>
                        <strong>{recipe.strMeal}</strong>

                        <span>
                          {recipe.strCategory} •{" "}
                          {recipe.strArea}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
          </div>

          <button
            className="recipe-search-button"
            type="submit"
          >
            Search
          </button>
        </form>
      </section>

      {/* Results */}
      <section className="results-section">

        {loading && (
          <div className="recipe-message">
            <div className="loader"></div>
            <p>Finding delicious recipes...</p>
          </div>
        )}

        {error && (
          <div className="recipe-message error-message">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && query && data.length === 0 && (
          <div className="recipe-message">
            <span>🍽️</span>
            <h3>No recipes found</h3>
            <p>
              Try searching for chicken, pasta, pizza or rice.
            </p>
          </div>
        )}

        {!loading && data.length > 0 && (
          <>
            <div className="results-heading">
              <div>
                <h2>Search Results</h2>
                <p>
                  Showing recipes for{" "}
                  <strong>"{query}"</strong>
                </p>
              </div>

              <span className="result-count">
                {data.length} recipes
              </span>
            </div>

            <div className="recipe-grid">
              {data.map((recipe) => (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                />
              ))}
            </div>
          </>
        )}

      </section>

    </main>
  );
}

export default Recipes;