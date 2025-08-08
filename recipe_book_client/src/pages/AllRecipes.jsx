import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("");

  useEffect(() => {
    fetch("https://recipe-book-server-black.vercel.app/all-recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data);
      })
      .catch((err) => console.error("Failed to load recipes", err));
  }, []);

  const uniqueCuisines = [...new Set(recipes.map((recipe) => recipe.cuisine))];

  const handleFilterChange = (event) => {
    const cuisine = event.target.value;
    setSelectedCuisine(cuisine);
    if (cuisine === "") {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(
        recipes.filter((recipe) => recipe.cuisine === cuisine)
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-6 text-center">All Recipes</h2>
      <div className="mb-6 text-center">
        <select
          onChange={handleFilterChange}
          value={selectedCuisine}
          className="border px-4 py-2 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md"
        >
          <option value="">All Cuisines</option>
          {uniqueCuisines.map((cuisine) => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={
                recipe.image ||
                "https://via.placeholder.com/300x200?text=No+Image"
              }
              alt={recipe.title || "No Title"}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-2">
                {recipe.title || "Untitled"}
              </h3>
              <p className="text-sm mb-1">
                <strong>Cuisine:</strong> {recipe.cuisine || "N/A"}
              </p>
              <p className="text-sm mb-1">
                <strong>Time:</strong> {recipe.prepTime || "N/A"} min
              </p>
              <p className="text-sm mb-3">
                <strong>Likes:</strong> ❤️ {recipe.likeCount || 0}
              </p>
              <Link
                to={`/recipes/${recipe._id}`}
                className="mt-auto inline-block bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-center"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipes;
