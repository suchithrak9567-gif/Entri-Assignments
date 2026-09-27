import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";

function Navbar() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-topline">
        <span>Thoughtful finds. Delivered with care.</span>
        <span>Complimentary shipping on orders over $75</span>
      </div>
      <div className="navbar container">
        <button
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          className="mobile-menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <Link aria-label="ShopNest home" className="brand" onClick={closeMenu} to="/">
          <span className="brand-mark">s</span>
          <span>shopnest<span className="brand-period">.</span></span>
        </Link>
        <nav aria-label="Main navigation" className={`nav-links${menuOpen ? " open" : ""}`}>
          <NavLink end onClick={closeMenu} to="/">Home</NavLink>
          <NavLink onClick={closeMenu} to="/products">Shop all</NavLink>
          <NavLink onClick={closeMenu} to="/contact">Our story</NavLink>
        </nav>
        <div className="nav-actions">
          <button
            aria-label="Search products"
            className="nav-icon-button search-nav-button"
            onClick={() => navigate("/products")}
            type="button"
          >
            <Search size={19} />
          </button>
          <Link aria-label={`Shopping bag, ${itemCount} items`} className="nav-icon-button bag-button" to="/cart">
            <ShoppingBag size={19} />
            <span className="bag-count">{itemCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;