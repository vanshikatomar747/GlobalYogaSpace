import React from "react";

const PricingCard = ({ title, price, features, onClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 flex flex-col items-center hover:shadow-xl transition">
      <h3 className="text-2xl font-bold text-green-900 mb-4">{title}</h3>
      <div className="text-4xl font-bold text-orange-500 mb-6">{price}<span className="text-base text-gray-500 font-normal">/mo</span></div>

      <ul className="space-y-3 mb-8 w-full pl-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center text-gray-700">
            <span className="mr-2 text-green-500">✓</span> {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={onClick}
        className="bg-green-900 text-white px-8 py-3 rounded hover:bg-green-800 transition w-full"
      >
        Choose Plan
      </button>
    </div>
  );
};

export default PricingCard;
