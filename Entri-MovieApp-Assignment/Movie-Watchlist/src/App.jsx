import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";
import Watchlist from "./components/Watchlist";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    axios
      .get("/movies.json")
      .then((response) => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, []);

  const addToWatchlist = (movie) => {
    const alreadyAdded = watchlist.some(
      (item) => item.id === movie.id
    );

    if (!alreadyAdded) {
      setWatchlist((prevWatchlist) => [
        ...prevWatchlist,
        movie,
      ]);
    }
  };

  const removeFromWatchlist = (id) => {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((movie) => movie.id !== id)
    );
  };

  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter(
          (movie) => movie.genre === selectedGenre
        );

  const genres = [
    "All",
    ...new Set(movies.map((movie) => movie.genre)),
  ];

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div>
          <h1>
            <span>🎬</span> Movie Watchlist
          </h1>

          <p>
            Discover great movies and build your personal collection.
          </p>
        </div>

        <div className="watchlist-count">
          <span>My List</span>
          <strong>{watchlist.length}</strong>
        </div>
      </header>

      {/* FILTER */}
      <section className="filter-section">
        <h2></h2>

        <div className="filters">
          {genres.map((genre) => (
            <button
              key={genre}
              className={
                selectedGenre === genre
                  ? "active-filter"
                  : ""
              }
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <div className="main-layout">

        {/* MOVIES */}
        <main className="movies-section">
          <div className="section-header">
            <div>
              <h2>
                {selectedGenre === "All"
                  ? "Popular Movies"
                  : `${selectedGenre} Movies`}
              </h2>

              <p>
                {filteredMovies.length} movies available
              </p>
            </div>

            <span className="scroll-text">
              Scroll →
            </span>
          </div>

          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
              <p>Loading movies...</p>
            </div>
          ) : filteredMovies.length === 0 ? (
            <div className="no-movies">
              <span>🎥</span>
              <h3>No movies found</h3>
              <p>Try selecting another genre.</p>
            </div>
          ) : (
            <div className="movie-row">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  genre={movie.genre}
                  year={movie.year}
                  rating={movie.rating}
                  image={movie.image}
                  movie={movie}
                  onAdd={addToWatchlist}
                  isAdded={watchlist.some(
                    (item) => item.id === movie.id
                  )}
                />
              ))}
            </div>
          )}
        </main>

        {/* WATCHLIST */}
        <aside className="sidebar">
          <Watchlist
            watchlist={watchlist}
            onRemove={removeFromWatchlist}
          />
        </aside>

      </div>
    </div>
  );
}

export default App;