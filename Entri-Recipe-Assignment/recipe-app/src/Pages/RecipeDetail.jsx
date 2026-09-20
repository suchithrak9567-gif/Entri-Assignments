import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useFavourites } from "../context/FavouritesContext";

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addFavourite, favourites } = useFavourites();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        setRecipe(response.data.meals?.[0]);
      } catch (err) {
        setError("Failed to load recipe. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="detail-message">
        <div className="loader"></div>
        <p>Loading delicious recipe...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-message">
        <span>⚠️</span>
        <h2>{error}</h2>
        <button onClick={() => navigate("/recipes")}>
          Back to Recipes
        </button>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="detail-message">
        <span>🍽️</span>
        <h2>Recipe not found</h2>
        <button onClick={() => navigate("/recipes")}>
          Back to Recipes
        </button>
      </div>
    );
  }

  const isFavourite = favourites.some(
    (item) => item.idMeal === recipe.idMeal
  );

  return (
    <main className="detail-page">

      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Recipes
      </button>

      <section className="detail-card">

        <div className="detail-image-section">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="detail-image"
          />

          <span className="detail-category">
            {recipe.strCategory}
          </span>
        </div>

        <div className="detail-content">

          <span className="detail-badge">
            🍴 Recipe Details
          </span>

          <h1>{recipe.strMeal}</h1>

          <div className="detail-meta">
            <span>🌎 {recipe.strArea}</span>
            <span>🍽️ {recipe.strCategory}</span>
          </div>

          <p className="detail-description">
            Discover how to prepare this delicious {recipe.strArea}{" "}
            {recipe.strCategory.toLowerCase()} recipe.
          </p>

          <button
            className={`favourite-button ${
              isFavourite ? "saved-button" : ""
            }`}
            onClick={() => addFavourite(recipe)}
            disabled={isFavourite}
          >
            {isFavourite ? "❤️ Saved to Favourites" : "🤍 Save to Favourites"}
          </button>

        </div>
      </section>

      <section className="instructions-section">

        <div className="section-title">
          <span>👨‍🍳</span>
          <div>
            <h2>How to Prepare</h2>
            <p>Follow these instructions to make this delicious meal.</p>
          </div>
        </div>

        <div className="instructions-card">
          {recipe.strInstructions
            .split("\r\n")
            .filter((step) => step.trim())
            .map((step, index) => (
              <div className="instruction-step" key={index}>
                <div className="step-number">
                  {index + 1}
                </div>

                <p>{step}</p>
              </div>
            ))}
        </div>

      </section>

      {recipe.strYoutube && (
        <section className="video-section">
          <h2>🎥 Watch Recipe Video</h2>

          <a
            href={recipe.strYoutube}
            target="_blank"
            rel="noreferrer"
            className="video-button"
          >
            Watch on YouTube →
          </a>
        </section>
      )}

    </main>
  );
}

export default RecipeDetail;