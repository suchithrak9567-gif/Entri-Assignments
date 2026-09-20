import { useState, useEffect } from "react";
import axios from "axios";

function useRecipes(query) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setData([]);
      return;
    }

    async function fetchRecipes() {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );

        setData(response.data.meals || []);
      } catch (err) {
        setError("Unable to find recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, [query]);

  return {
    data,
    loading,
    error,
  };
}

export default useRecipes;