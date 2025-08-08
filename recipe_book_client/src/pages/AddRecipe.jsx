import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config.js";

const AddRecipe = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    ingredients: "",
    instructions: "",
    cuisine: "Italian",
    time: "",
    categories: [],
  });

  if (loading) {
    return <p>Loading user info...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!user) {
    return <p>Please login to add a recipe</p>;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        if (checked) {
          return { ...prev, categories: [...prev.categories, value] };
        } else {
          return {
            ...prev,
            categories: prev.categories.filter((c) => c !== value),
          };
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = {
      ...formData,
      authorEmail: user.email,
      likeCount: 0,
      createdAt: new Date(),
    };

    try {
      const res = await fetch(
        "https://recipe-book-server-black.vercel.app/recipes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(recipeData),
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success("Recipe added successfully!");
        navigate("/all-recipes");
      } else {
        toast.error(result.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg px-4 sm:px-6 md:px-8 lg:px-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded resize-none"
          required
          rows={4}
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          value={formData.instructions}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded resize-none"
          required
          rows={4}
        />
        <select
          name="cuisine"
          value={formData.cuisine}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
          <option value="Others">Others</option>
        </select>
        <input
          type="number"
          name="time"
          placeholder="Preparation Time (minutes)"
          value={formData.time}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <div>
          <label className="block font-semibold mb-1">Categories</label>
          <div className="flex flex-wrap gap-4">
            {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map((cat) => (
              <label key={cat} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  name="categories"
                  value={cat}
                  checked={formData.categories.includes(cat)}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
