import React from "react";
import yogaAsana from "../../data/yogaAsana.json";

const YogaAsana = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-main via-cream-main to-orange-main/10 py-16 md:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-green-main mb-4 tracking-tight">
            Yoga Asana Library
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive collection of yoga poses, each designed to enhance your practice and well-being
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {yogaAsana.map((asana, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-500 flex flex-col border border-stone-100"
            >
              {/* Image Container - Premium Aspect Ratio */}
              <div className="relative h-72 md:h-80 overflow-hidden">
                <img
                  src={asana.image}
                  alt={asana.name}
                  className="w-full h-full object-cover"
                />
                {/* Subtle inner border for definition */}
                <div className="absolute inset-0 border-b border-stone-100/50"></div>
              </div>

              {/* Content Container */}
              <div className="p-5 flex-1 flex flex-col bg-white">
                {/* Pose Name - Serif & Elegant */}
                <h3 className="text-xl md:text-2xl font-serif font-medium text-green-900 mb-2 leading-tight tracking-wide">
                  {asana.name}
                </h3>

                {/* Purpose - Clean & Readable */}
                <p className="text-stone-500 text-xs md:text-sm mb-5 leading-relaxed font-light">
                  {asana.purpose}
                </p>

                {/* Benefits Section - Modern Pill Tags */}
                <div className="mt-auto">
                  <p className="text-[10px] font-bold text-orange-main/80 uppercase tracking-widest mb-3">
                    Benefits
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {asana.benefits.map((benefit, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2.5 py-1 rounded-full bg-orange-50 text-orange-800/80 text-[10px] md:text-xs font-medium border border-orange-100/50"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YogaAsana;
