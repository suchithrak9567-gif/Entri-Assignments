import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://fakestoreapi.com",
  timeout: 10000,
});

const fallbackImage =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85";

export function normalizeProducts(payload) {
  const records = Array.isArray(payload) ? payload : payload?.products;
  if (!Array.isArray(records)) {
    throw new Error("The products API returned an unexpected response.");
  }

  return records.map((product) => {
    if (!product || product.id === undefined || product.id === null) {
      throw new Error("A product in the API response is missing its ID.");
    }
    const price = Number(product.price);
    if (!Number.isFinite(price) || price < 0) {
      throw new Error("A product in the API response has an invalid price.");
    }
    return {
      ...product,
      id: product.id,
      name: product.name || product.title || "Untitled product",
      description: product.description || "A thoughtfully selected ShopNest essential.",
      category: product.category || "Essentials",
      price,
      image: product.image || product.imageUrl || product.thumbnail || fallbackImage,
      rating: Number(product.rating?.rate ?? product.rating ?? 4.8),
      reviewCount: Number(product.rating?.count ?? product.reviewCount ?? 0),
    };
  });
}

export async function getProducts() {
  const { data } = await api.get("/products");
  return normalizeProducts(data);
}
