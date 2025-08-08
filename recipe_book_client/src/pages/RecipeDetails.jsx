import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetch(`https://recipe-book-server-black.vercel.app/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch(() => toast.error("Failed to fetch recipe details"));
  }, [id, user, navigate]);

  const handleLike = async () => {
    try {
      const res = await fetch(
        `https://recipe-book-server-black.vercel.app/recipes/${id}/like`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "user-email": user?.email,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        setRecipe((prev) => ({ ...prev, likeCount: data.updatedLikes }));
        toast.success("Liked!");
      } else {
        toast.error(data.message || "Failed to like");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (!recipe)
    return <p className="text-center mt-10 text-lg px-4">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6 bg-white rounded shadow mt-10">
      <img
        src={
          recipe.image || "https://via.placeholder.com/600x300?text=No+Image"
        }
        alt={recipe.title || "Recipe Image"}
        className="w-full h-48 sm:h-56 md:h-64 object-cover rounded mb-4"
      />
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 px-2">
        {recipe.title || "Untitled"}
      </h2>
      <p className="px-2">
        <strong>Ingredients:</strong> {recipe.ingredients || "N/A"}
      </p>
      <p className="px-2">
        <strong>Instructions:</strong> {recipe.instructions || "N/A"}
      </p>
      <p className="px-2">
        <strong>Cuisine:</strong> {recipe.cuisine || "N/A"}
      </p>
      <p className="px-2">
        <strong>Preparation Time:</strong> {recipe.prepTime || "N/A"} min
      </p>
      <p className="px-2">
        <strong>Categories:</strong> {recipe.categories?.join(", ") || "N/A"}
      </p>
      <p className="mt-2 px-2">
        <strong>Likes:</strong> ❤️ {recipe.likeCount || 0}
      </p>

      <button
        onClick={handleLike}
        className="mt-5 w-full sm:w-auto bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 block mx-auto sm:mx-0"
      >
        ❤️ Like
      </button>
    </div>
  );
};

export default RecipeDetails;
