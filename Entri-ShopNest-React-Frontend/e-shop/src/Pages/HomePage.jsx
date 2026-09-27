import { ArrowDown, ArrowRight, ArrowUpRight, Heart, PackageCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ProductGrid from "../Components/ProductGrid";
import Loading from "../Components/Loading";
import StatusMessage from "../Components/StatusMessage";
import { useProducts } from "../context/useProducts";

function HomePage() {
  const { products, loading, error, reloadProducts } = useProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <section className="hero-section container">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={14} /> A little more joy, every day</span>
          <h1>Find your kind<br />of <em>everyday.</em></h1>
          <p>Considered essentials, lovely little upgrades, and the pieces you’ll wonder how you lived without.</p>
          <div className="hero-actions">
            <Link className="button button-dark" to="/products">Explore the collection <ArrowRight size={16} /></Link>
            <a className="quiet-link" href="#featured">A peek inside <ArrowDown size={14} /></a>
          </div>
          <div className="hero-note"><span className="avatar-stack"><i>J</i><i>M</i><i>A</i></span><span>Loved by 2,000+ happy nesters</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrap">
            <img
              alt="A warm, sunlit home with carefully chosen everyday pieces"
              className="hero-image"
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90"
            />
          </div>
          <div className="hero-sticker"><span>made for</span><strong>your<br />everyday</strong><Heart size={17} fill="currentColor" /></div>
          <div className="hero-image-caption"><span>01 / 04</span><span>Home, made softer</span></div>
        </div>
        <div className="hero-side-note">A FEW GOOD THINGS, ALL IN ONE PLACE</div>
      </section>

      <section className="promise-strip">
        <div className="container promise-inner">
          <div><PackageCheck size={19} /><span>Thoughtfully picked, never overwhelming</span></div>
          <span className="promise-dot">✳</span>
          <div><Heart size={18} /><span>A little extra care in every order</span></div>
          <span className="promise-dot">✳</span>
          <div><Sparkles size={18} /><span>Small joys, every single day</span></div>
        </div>
      </section>

      <section className="featured-section container" id="featured">
        <div className="section-heading">
          <div><span className="eyebrow">A few good things</span><h2>Meet your new <em>favorites.</em></h2></div>
          <Link className="text-link" to="/products">Shop everything <ArrowUpRight size={16} /></Link>
        </div>
        {loading ? <Loading label="Curating the good stuff..." /> : null}
        {!loading && error ? <StatusMessage message={error} onRetry={reloadProducts} /> : null}
        {!loading && !error ? <ProductGrid products={featuredProducts} /> : null}
      </section>

      <section className="newsletter-section">
        <div className="newsletter-inner container">
          <span className="eyebrow">A note from the nest</span>
          <h2>Good things, <em>in your inbox.</em></h2>
          <p>New finds, thoughtful tips, and 10% off your first order. The nice kind of email.</p>
          <Link className="button button-light" to="/contact">Come say hello <ArrowRight size={16} /></Link>
        </div>
      </section>
    </>
  );
}

export default HomePage;
