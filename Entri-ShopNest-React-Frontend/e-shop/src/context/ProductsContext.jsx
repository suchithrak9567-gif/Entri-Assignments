import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { getProductsError } from "../api/productsError";
import { ProductsContext } from "./productsContextValue";

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reloadProducts = useCallback(() => {
    setLoading(true);
    setError("");
    getProducts()
      .then(setProducts)
      .catch((requestError) => setError(getProductsError(requestError)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let active = true;
    getProducts()
      .then((result) => {
        if (active) setProducts(result);
      })
      .catch((requestError) => {
        if (active) setError(getProductsError(requestError));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        reloadProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
