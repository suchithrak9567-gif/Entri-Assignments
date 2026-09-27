import { ArrowUpRight, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link className="product-card-image" to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} loading="lazy" />
        <span className="image-link-icon"><ArrowUpRight size={17} /></span>
      </Link>
      <div className="product-card-content">
        <div className="product-card-meta">
          <span className="product-category">{product.category}</span>
          <span className="product-rating"><Star size={13} fill="currentColor" /> {product.rating.toFixed(1)}</span>
        </div>
        <Link className="product-title-link" to={`/products/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <div className="product-card-bottom">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            aria-label={`Add ${product.name} to cart`}
            className="add-icon-button"
            onClick={() => addToCart(product)}
            type="button"
          >
            <ShoppingBag size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
