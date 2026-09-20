import { useNavigate } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";

function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  const { addFavourite } = useFavourites();

  return (
    <div className="recipe-card">
      <img
        className="recipe-image"
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
      />

      <div className="recipe-content">
        <h2 className="recipe-title">
          {recipe.strMeal}
        </h2>

        <p className="recipe-info">
          Category: {recipe.strCategory}
        </p>

        <p className="recipe-info">
          Cuisine: {recipe.strArea}
        </p>

        <div className="card-buttons">
          <button
            className="primary-button"
            onClick={() =>
              navigate(`/recipes/${recipe.idMeal}`)
            }
          >
            View Details
          </button>

          <button
            className="secondary-button"
            onClick={() => addFavourite(recipe)}
          >
            ❤️ Add to Favourites
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;