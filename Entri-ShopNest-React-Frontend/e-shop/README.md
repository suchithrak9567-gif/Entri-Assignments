# ShopNest

A responsive React storefront built with Vite, React Router, Axios, and the Context API.

## Run locally

```sh
npm install
```

Copy `.env.example` to `.env`. The default API is Fake Store API, so the storefront works without a local backend. To use the Phase 4 backend instead, set `VITE_API_URL` to its base URL. The frontend requests `GET ${VITE_API_URL}/products`. For example:

```env
VITE_API_URL=http://localhost:5000/api
```

Then start the frontend:

```sh
npm run dev
```

The API should return an array of products or an object with a `products` array. Products may use `name` or `title`, and `image`, `imageUrl`, or `thumbnail`; each item should include an `id` and `price`. The backend must allow browser requests from the frontend origin (CORS). If the request fails, the storefront shows a retryable error instead of substituting sample data.

## Routes

- `/` — ShopNest home and featured products
- `/products` — searchable, category-filtered collection
- `/products/:id` — product detail and add-to-bag controls
- `/cart` — persistent cart, quantity controls, subtotal, estimated 8% tax, and total
- `/contact` — contact information and demo contact form

Cart contents persist in browser local storage. The contact form and checkout button are presentation-only and do not submit orders or contact details to a backend.

## Build and deploy

```sh
npm run build
npm run preview
```

The included `netlify.toml` configures the production build and SPA route fallback. To deploy, import this project directory in Netlify and deploy. To use a Phase 4 API, set `VITE_API_URL` to its publicly reachable base URL and allow the Netlify site origin in API CORS. Vite embeds `VITE_*` values during the build, so redeploy after changing one.
