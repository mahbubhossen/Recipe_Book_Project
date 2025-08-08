const ExtraSection1 = () => {
  return (
    <section className="bg-base-200 py-8 px-4 sm:py-10 sm:px-6 md:py-12 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Why Choose Recipe Book?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-left">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">🍽️ Easy Recipes</h3>
            <p className="text-sm sm:text-base">Our recipes are easy to follow, even for beginners. Cook like a pro in no time!</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">🌱 Healthy Ingredients</h3>
            <p className="text-sm sm:text-base">We focus on healthy, seasonal, and natural ingredients for a better lifestyle.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">❤️ Loved by Foodies</h3>
            <p className="text-sm sm:text-base">Thousands of food lovers trust us for their daily dose of deliciousness!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtraSection1;
