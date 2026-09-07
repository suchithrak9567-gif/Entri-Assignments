function Watchlist({ watchlist, onRemove }) {
  return (
    <div className="watchlist">

      <div className="watchlist-header">
        <div>
          <h2>My Watchlist</h2>
          <p>
            {watchlist.length} movie
            {watchlist.length !== 1 ? "s" : ""}
          </p>
        </div>

        <span className="list-icon">
          🍿
        </span>
      </div>

      {watchlist.length === 0 ? (
        <div className="empty-watchlist">
          <div className="empty-icon">🎬</div>

          <h3>Your list is empty</h3>

          <p>
            Add movies from the collection
            to watch later.
          </p>
        </div>
      ) : (
        <div className="watchlist-items">
          {watchlist.map((movie) => (
            <div
              className="watchlist-item"
              key={movie.id}
            >
              <img
                src={movie.image}
                alt={movie.title}
              />

              <div className="watchlist-info">
                <strong>{movie.title}</strong>

                <p>
                  {movie.year} • {movie.genre}
                </p>
              </div>

              <button
                className="remove-btn"
                onClick={() =>
                  onRemove(movie.id)
                }
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default Watchlist;