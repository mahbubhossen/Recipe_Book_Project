import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-toastify";

const MyRecipes = () => {
  const [user] = useAuthState(auth);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://recipe-book-server-black.vercel.app/my-recipes?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setRecipes(data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to load recipes");
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      const res = await fetch(
        `https://recipe-book-server-black.vercel.app/recipes/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
        toast.success("Recipe deleted");
      } else {
        toast.error("Failed to delete");
      }
    } catch {
      toast.error("Error deleting recipe");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedRecipe) return;
    const form = e.target;
    const updatedRecipe = {
      title: form.title.value,
      image: form.image.value,
      ingredients: form.ingredients.value,
      instructions: form.instructions.value,
      cuisine: form.cuisine.value,
      prepTime: form.prepTime.value,
      categories: form.categories.value.split(",").map((c) => c.trim()),
    };
    try {
      const res = await fetch(
        `https://recipe-book-server-black.vercel.app/recipes/${selectedRecipe._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedRecipe),
        }
      );
      if (res.ok) {
        const updated = await res.json();
        setRecipes((prev) =>
          prev.map((r) => (r._id === selectedRecipe._id ? updated : r))
        );
        setSelectedRecipe(null);
        toast.success("Recipe updated");
      } else {
        toast.error("Failed to update");
      }
    } catch {
      toast.error("Error updating recipe");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedRecipe(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12">
      <h2 className="text-3xl font-bold mb-6 text-center">My Recipes</h2>

      {loading ? (
        <p className="text-center">Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p className="text-center text-gray-500">No recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <img
                src={
                  recipe.image ||
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={recipe.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 space-y-1 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold">{recipe.title}</h3>
                <p>
                  <strong>Ingredients:</strong> {recipe.ingredients}
                </p>
                <p>
                  <strong>Instructions:</strong> {recipe.instructions}
                </p>
                <p>
                  <strong>Cuisine:</strong> {recipe.cuisine}
                </p>
                <p>
                  <strong>Time:</strong> {recipe.prepTime} min
                </p>
                <p>
                  <strong>Category:</strong> {recipe.categories?.join(", ")}
                </p>
                <p>
                  <strong>Likes:</strong> ❤️ {recipe.likeCount || 0}
                </p>
                <div className="flex gap-2 mt-auto pt-3">
                  <button
                    onClick={() => setSelectedRecipe(recipe)}
                    className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedRecipe && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedRecipe(null);
            }
          }}
        >
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-lg w-full max-w-lg max-h-full overflow-auto space-y-4"
          >
            <h3 className="text-2xl font-bold mb-2">Update Recipe</h3>
            <input
              type="text"
              name="title"
              defaultValue={selectedRecipe.title}
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="image"
              defaultValue={selectedRecipe.image}
              className="input input-bordered w-full"
              required
            />
            <textarea
              name="ingredients"
              defaultValue={selectedRecipe.ingredients}
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
            <textarea
              name="instructions"
              defaultValue={selectedRecipe.instructions}
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
            <input
              type="text"
              name="cuisine"
              defaultValue={selectedRecipe.cuisine}
              className="input input-bordered w-full"
              required
            />
            <input
              type="number"
              name="prepTime"
              defaultValue={selectedRecipe.prepTime}
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="categories"
              defaultValue={selectedRecipe.categories?.join(", ")}
              className="input input-bordered w-full"
              placeholder="e.g. vegan, lunch"
              required
            />
            <div className="flex justify-end gap-4 mt-2 flex-wrap">
              <button
                type="button"
                onClick={() => setSelectedRecipe(null)}
                className="btn"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
