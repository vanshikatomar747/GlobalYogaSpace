import React from "react";
import yogaTypes from "../../data/yogaTypes.json";

const TypesOfYoga = () => {
  return (
    <div className="min-h-screen bg-cream-main py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-5xl font-bold text-green-main mb-8 md:mb-12 text-center">Types of Yoga</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {yogaTypes.map((type, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-orange-main/10 hover:shadow-xl transition-shadow flex flex-col">
              <div className="h-48 md:h-64 overflow-hidden">
                <img src={type.image} alt={type.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-4 md:p-6 flex-1 flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold text-green-main mb-2 md:mb-3">{type.name}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">{type.description}</p>

                {/* Benefits Section */}
                <div className="mt-auto pt-4 border-t border-orange-main/10">
                  <p className="text-xs font-bold text-orange-main uppercase tracking-wider mb-2">Key Benefits</p>
                  <div className="flex flex-wrap gap-2">
                    {type.benefits.map((benefit, i) => (
                      <span key={i} className="px-2 py-1 bg-orange-50 text-orange-800 text-xs rounded-full font-medium border border-orange-100">
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

export default TypesOfYoga;
