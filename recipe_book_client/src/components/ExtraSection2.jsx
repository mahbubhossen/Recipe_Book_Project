import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

const ExtraSection2 = () => {
  const ingredients = [
    { name: "Tomato 🍅", description: "Fresh red tomatoes" },
    { name: "Garlic 🧄", description: "Aromatic garlic cloves" },
    { name: "Chicken 🍗", description: "Tender chicken meat" },
    { name: "Basil 🌿", description: "Fragrant basil leaves" },
    { name: "Cheese 🧀", description: "Creamy cheese" },
    { name: "Rice 🍚", description: "Steamed white rice" },
  ];

  return (
    <section className="bg-white py-6 px-3 sm:py-8 sm:px-6 md:py-10 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Popular Ingredients</h2>
        <p className="mb-4 sm:mb-6 text-gray-600 text-sm sm:text-base">
          These ingredients are the stars of our most loved recipes:
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {ingredients.map((item, idx) => (
            <span
              key={idx}
              className="badge badge-lg bg-primary text-white cursor-pointer text-xs sm:text-sm"
              data-tooltip-id={`ingredient-tooltip-${idx}`}
              data-tooltip-content={item.description}
            >
              {item.name}
              <ReactTooltip
                id={`ingredient-tooltip-${idx}`}
                place="top"
                effect="solid"
                delayShow={200}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtraSection2;
