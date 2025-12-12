import React from "react";

const YogaCard = ({ image, title, description }) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer">
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4">
        <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>
        <p className="text-white text-sm">{description}</p>
      </div>
    </div>
  );
};

export default YogaCard;
