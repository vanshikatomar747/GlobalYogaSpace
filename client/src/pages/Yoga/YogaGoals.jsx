import React from "react";
import yogaGoals from "../../data/yogaGoals.json";
import { Link } from "react-router-dom";
import HomeButton from "../../components/HomeButton";

const YogaGoals = () => {
  // Insert the promo card at index 4 to be in the center of a 3x3 grid (9 items total)
  const allGoals = [
    ...yogaGoals.slice(0, 4),
    {
      isPromo: true,
      goal: "New to Yoga?",
      description: "Start your transformation today with a complimentary session tailored just for you.",
    },
    ...yogaGoals.slice(4),
  ];

  return (
    <div className="min-h-screen bg-cream-main py-12 md:py-20 px-4">
      <HomeButton />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-5xl font-bold text-green-main mb-8 md:mb-12 text-center">
          Yoga For Specific Goals
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {allGoals.map((goal, idx) => {
            if (goal.isPromo) {
              return (
                <div
                  key={idx}
                  className="bg-green-main rounded-2xl overflow-hidden shadow-lg border border-green-700 hover:shadow-xl transition-all flex flex-col justify-center items-center text-center p-8 scale-100 hover:scale-105 duration-300"
                >
                  <h3 className="text-3xl font-bold text-cream-main mb-4">
                    {goal.goal}
                  </h3>
                  <p className="text-white/90 leading-relaxed mb-8">
                    {goal.description}
                  </p>
                  <Link
                    to="/tryfree"
                    className="inline-block px-8 py-3 bg-orange-main text-white font-bold rounded-full hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  >
                    Join Session
                  </Link>
                </div>
              );
            }

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-orange-main/10 hover:shadow-xl transition-shadow flex flex-col"
              >
                <div className="h-64 md:h-80 overflow-hidden">
                  <img
                    src={goal.image}
                    alt={goal.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 md:p-6 flex-1 flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold text-green-main mb-2 md:mb-3">
                    {goal.goal}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
                    {goal.description}
                  </p>

                  {/* Suggested Practices Section */}
                  <div className="mt-auto pt-4 border-t border-orange-main/10">
                    <p className="text-xs font-bold text-orange-main uppercase tracking-wider mb-2">
                      Suggested Practices
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {goal.suggested.map((practice, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-orange-50 text-orange-800 text-xs rounded-full font-medium border border-orange-100"
                        >
                          {practice}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default YogaGoals;
