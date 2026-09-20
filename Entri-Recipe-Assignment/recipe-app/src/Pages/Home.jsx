import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">
            🍽️ Discover delicious food
          </span>

          <h1>
            Find a recipe
            <span> you'll love.</span>
          </h1>

          <p>
            Explore delicious recipes from around the world,
            discover new flavours, and save your favourites
            for later.
          </p>

          <div className="hero-buttons">
            <Link to="/recipes" className="hero-primary">
              🔍 Explore Recipes
            </Link>

            <Link to="/favourites" className="hero-secondary">
              ❤️ My Favourites
            </Link>
          </div>
        </div>

        <div className="hero-food">
          <div className="food-circle">
            🍝
          </div>
          <div className="floating-card card-one">
            🍕 Pizza
          </div>
          <div className="floating-card card-two">
            🍜 Noodles
          </div>
          <div className="floating-card card-three">
            🥗 Healthy
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Everything you need to discover great food</h2>

        <p className="features-subtitle">
          Simple, fast and enjoyable recipe discovery.
        </p>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Easy Search</h3>
            <p>
              Quickly find recipes by searching for
              your favourite dishes.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌎</div>
            <h3>Explore Cuisines</h3>
            <p>
              Discover delicious meals and cuisines
              from different parts of the world.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3>Save Favourites</h3>
            <p>
              Keep your favourite recipes in one
              convenient place.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <h2>Ready to find your next favourite meal?</h2>

        <p>
          Start exploring delicious recipes today.
        </p>

        <Link to="/recipes" className="cta-button">
          Explore Recipes →
        </Link>
      </section>

    </main>
  );
}

export default Home;