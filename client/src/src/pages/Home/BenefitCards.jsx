import React from "react";

const BenefitCards = () => {
  const cards = [
    { text: "Recover from Injury", img: "/images/cards/card1.jpeg" },
    { text: "Reduce Stress & Anxiety", img: "/images/cards/card2.jpeg" },
    { text: "Burn Fat & Lose Weight", img: "/images/cards/card3.jpeg" },
    { text: "Manage Chronic Pain", img: "/images/cards/card4.jpeg" },
    { text: "Improve Flexibility", img: "/images/cards/card5.jpeg" },
    { text: "Master Advanced Asanas", img: "/images/cards/card6.jpeg" },
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-cream-main">
      <div className="max-w-7xl mx-auto text-center mb-8 md:mb-16">
        <h2 className="text-2xl md:text-5xl font-bold text-green-main mb-4">
          For Your Unique Needs
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="group relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition hover:-translate-y-1"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${card.img})` }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-green-main/60 group-hover:bg-green-main/80 transition-opacity duration-300" />

            {/* Text */}
            <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
              <h3 className="text-white text-xl md:text-2xl font-semibold leading-relaxed drop-shadow-md opacity-90 group-hover:opacity-100 transition-opacity">
                {card.text}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BenefitCards;
