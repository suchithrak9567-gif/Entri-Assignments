import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Recipes from "./Pages/Recipes";
import RecipeDetail from "./Pages/RecipeDetail";
import Favourites from "./Pages/Favourites";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/recipes" element={<Recipes />} />

        <Route
          path="/recipes/:id"
          element={<RecipeDetail />}
        />

        <Route
          path="/favourites"
          element={<Favourites />}
        />
      </Routes>
    </>
  );
}

export default App;