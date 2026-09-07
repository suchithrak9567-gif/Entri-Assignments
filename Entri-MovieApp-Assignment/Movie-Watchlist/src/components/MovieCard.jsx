function MovieCard({
  title,
  genre,
  year,
  rating,
  image,
  movie,
  onAdd,
  isAdded,
}) {
  return (
    <article className="movie-card">

      <div className="poster-container">
        <img
          src={image}
          alt={title}
          className="movie-poster"
        />

        <span className="rating">
          ⭐ {rating}
        </span>
      </div>

      <div className="movie-details">
        <h3>{title}</h3>

        <div className="movie-meta">
          <span>{year}</span>
          <span className="genre">{genre}</span>
        </div>

        <button
          className={isAdded ? "added-btn" : "add-btn"}
          disabled={isAdded}
          onClick={() => onAdd(movie)}
        >
          {isAdded
            ? "✓ Added to List"
            : "+ Add to Watchlist"}
        </button>
      </div>

    </article>
  );
}

export default MovieCard;