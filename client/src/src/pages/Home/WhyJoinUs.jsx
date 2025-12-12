import React from "react";

const WhyJoinUs = () => {
    const cards = [
        {
            id: 1,
            title: "1. Be Calm",
            points: [
                "Reduce stress & anxiety",
                "Improve sleep",
                "Master powerful breathing techniques",
            ],
            bgColor: "bg-cream-main", // Cream background
            textColor: "text-green-main",
        },
        {
            id: 2,
            title: "2. Be Flexible",
            points: [
                "Increase muscle & joint flexibility",
                "Heal stiffness & tension",
                "Improve posture & mobility",
            ],
            bgColor: "bg-green-main", // Green background
            textColor: "text-white", // White text for contrast on green
        },
        {
            id: 3,
            title: "3. Get Strong & Fit",
            points: [
                "Burn calories & maintain healthy weight",
                "Build strength & core stability",
                "Boost energy & endurance",
            ],
            bgColor: "bg-orange-main", // Orange background
            textColor: "text-white", // White text for contrast on orange
        },
    ];

    return (
        <section className="py-12 md:py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto opacity-85">
                <h2 className="text-2xl md:text-5xl font-bold text-center text-green-main mb-8 md:mb-12">
                    Why Join Us
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className={`${card.bgColor} ${card.textColor} p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-xl transition-transform hover:-translate-y-2 duration-300 flex flex-col items-center text-center`}
                        >
                            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{card.title}</h3>
                            <ul className="space-y-3 md:space-y-4">
                                {card.points.map((point, index) => (
                                    <li key={index} className="text-base md:text-lg font-medium opacity-90">
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <p className="text-green-main text-lg md:text-2xl font-serif italic max-w-2xl mx-auto leading-relaxed">
                        "Yoga for a balanced body, mind, and life."
                    </p>
                    <div className="w-24 h-1 bg-orange-main mx-auto mt-6 rounded-full"></div>
                </div>
            </div>
        </section>
    );
};

export default WhyJoinUs;
