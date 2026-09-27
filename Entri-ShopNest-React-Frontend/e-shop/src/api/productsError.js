export function getProductsError(requestError) {
  const responseMessage = requestError.response?.data?.message;
  return (
    responseMessage ||
    (requestError.request
      ? "We couldn’t reach the shop. Check that your backend is running and VITE_API_URL is set correctly, then try again."
      : requestError.message || "We couldn’t load the collection. Please try again.")
  );
}
