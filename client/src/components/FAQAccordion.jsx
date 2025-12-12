import React, { useState } from "react";

const FAQAccordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="border border-green-main/20 rounded-xl shadow-sm bg-white overflow-hidden transition-all duration-300 hover:shadow-md">
          <button
            onClick={() => toggle(idx)}
            className="w-full text-left px-6 py-5 font-bold text-green-main flex justify-between items-center focus:outline-none text-lg"
          >
            {item.question || item.q}
            <span className={`text-orange-main text-2xl font-light transform transition-transform duration-300 ${activeIndex === idx ? "rotate-45" : ""}`}>
              +
            </span>
          </button>
          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeIndex === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="px-6 pb-6 text-green-main/80 leading-relaxed">
              {item.answer || item.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
