import Banner from "../components/Banner";
import RecipeCard from "../components/RecipeCard";
import ExtraSection1 from "../components/ExtraSection1";
import ExtraSection2 from "../components/ExtraSection2";
import { useEffect, useState } from "react";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("https://recipe-book-server-black.vercel.app/recipes/top")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Banner />

      <section className="my-10 px-4 sm:px-6 md:px-10 lg:px-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Top Recipes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
        <div className="text-center mt-6">
          <a
            href="/all-recipes"
            className="btn btn-primary px-6 py-2 text-base sm:text-lg"
          >
            See All Recipes
          </a>
        </div>
      </section>

      <ExtraSection1 />
      <ExtraSection2 />
    </div>
  );
};

export default Home;
