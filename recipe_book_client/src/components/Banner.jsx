import React from "react";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  return (
    <div
      className="hero h-[40vh] sm:h-[50vh] md:h-[60vh] bg-cover bg-center relative mt-2"
      style={{ backgroundImage: "url('https://i.ibb.co/4g7X5QT5/images.jpg')" }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content px-4 sm:px-8 md:px-16">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Welcome to Recipe Book</h1>
          <p className="mt-2 sm:mt-3 md:mt-4 text-base sm:text-lg md:text-xl">
            Discover{" "}
            <span className="text-yellow-300 font-semibold">
              <Typewriter
                words={[
                  "delicious recipes",
                  "easy cooking tips",
                  "healthy meals",
                  "foodie favorites",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>{" "}
            loved by foodies worldwide!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
