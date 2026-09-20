import { useNavigate } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";

function Favourites() {
  const navigate = useNavigate();
  const { favourites, removeFavourite } = useFavourites();

  return (
    <main className="favourites-page">
      <section className="favourites-header">
        <span className="favourites-badge">❤️ Your Collection</span>

        <h1>My Favourites</h1>

        <p>
          Your saved recipes are all in one place. Pick a favourite and
          start cooking!
        </p>
      </section>

      {favourites.length === 0 ? (
        <section className="empty-favourites">
          <div className="empty-icon">🍽️</div>

          <h2>No favourites yet</h2>

          <p>
            You haven't saved any recipes yet. Explore recipes and save
            the ones you love.
          </p>

          <button
            className="browse-button"
            onClick={() => navigate("/recipes")}
          >
            🔍 Explore Recipes
          </button>
        </section>
      ) : (
        <section className="favourites-content">
          <div className="favourites-title-row">
            <div>
              <h2>Saved Recipes</h2>
              <p>
                You have saved {favourites.length}{" "}
                {favourites.length === 1 ? "recipe" : "recipes"}.
              </p>
            </div>

            <span className="saved-count">
              ❤️ {favourites.length} Saved
            </span>
          </div>

          <div className="favourites-grid">
            {favourites.map((recipe) => (
              <article className="favourite-card" key={recipe.idMeal}>
                <div className="favourite-image-wrapper">
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="favourite-image"
                  />

                  <span className="saved-badge">❤️ Saved</span>
                </div>

                <div className="favourite-card-content">
                  <h3>{recipe.strMeal}</h3>

                  <div className="favourite-meta">
                    <span>🍽️ {recipe.strCategory}</span>
                    <span>🌎 {recipe.strArea}</span>
                  </div>

                  <div className="favourite-actions">
                    <button
                      className="view-favourite-button"
                      onClick={() =>
                        navigate(`/recipes/${recipe.idMeal}`)
                      }
                    >
                      View Recipe →
                    </button>

                    <button
                      className="remove-button"
                      onClick={() => removeFavourite(recipe.idMeal)}
                      title="Remove from favourites"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default Favourites;