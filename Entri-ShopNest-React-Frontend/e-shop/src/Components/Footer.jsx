import { ArrowUpRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main container">
        <div className="footer-brand-column">
          <Link className="brand footer-brand" to="/">
            <span className="brand-mark">s</span>
            <span>shopnest<span className="brand-period">.</span></span>
          </Link>
          <p>Little things that make everyday feel a little more lovely.</p>
          <a aria-label="ShopNest on Instagram" className="social-link" href="https://instagram.com">
            <Heart size={16} />
          </a>
        </div>
        <div className="footer-links">
          <div>
            <h3>Explore</h3>
            <Link to="/products">All products</Link>
            <Link to="/contact">Our story</Link>
          </div>
          <div>
            <h3>Here to help</h3>
            <Link to="/contact">Contact us</Link>
            <Link to="/cart">Your bag</Link>
          </div>
        </div>
        <Link className="back-to-top" to="/">
          Back to the good stuff <ArrowUpRight size={15} />
        </Link>
      </div>
      <div className="footer-bottom container">
        <span>© 2026 ShopNest. Made for everyday.</span>
        <span>Good finds, good feelings.</span>
      </div>
    </footer>
  );
}

export default Footer;
