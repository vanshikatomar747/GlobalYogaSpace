import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeButton from "../components/HomeButton";

const PrePostnatal = () => {
    const [currency, setCurrency] = useState("USD");

    // Pricing data for all currencies
    const pricingData = {
        prenatal: {
            USD: 79,
            GBP: 59,
            AED: 289,
            INR: 4999,
        },
        postnatal: {
            USD: 79,
            GBP: 59,
            AED: 289,
            INR: 4999,
        },
        both: {
            USD: 139,
            GBP: 109,
            AED: 509,
            INR: 8999,
        },
    };

    // Helper function to get currency symbol
    const getCurrencySymbol = (curr) => {
        const symbols = {
            USD: "$",
            GBP: "£",
            AED: "د.إ",
            INR: "₹"
        };
        return symbols[curr] || curr;
    };

    const currencySymbol = getCurrencySymbol(currency);

    const pricingCards = [
        {
            title: "Prenatal Classes",
            description: "Specialized yoga sessions designed for expecting mothers",
            price: pricingData.prenatal[currency],
            features: [
                "Safe poses for each trimester",
                "Breathing techniques for labor",
                "Pelvic floor strengthening",
                "Stress relief and relaxation",
                "Community support group",
                "Access to recorded sessions"
            ],
            color: "orange"
        },
        {
            title: "Postnatal Classes",
            description: "Recovery-focused sessions for new mothers",
            price: pricingData.postnatal[currency],
            features: [
                "Gentle postpartum recovery",
                "Core and pelvic floor repair",
                "Stress and anxiety relief",
                "Energy restoration",
                "Baby-friendly sessions",
                "Access to recorded sessions"
            ],
            color: "green",
            popular: true
        },
        {
            title: "Both Programs",
            description: "Complete prenatal and postnatal journey",
            price: pricingData.both[currency],
            features: [
                "Full prenatal program",
                "Full postnatal program",
                "Continuous support throughout",
                "Priority booking",
                "Exclusive workshops",
                "Lifetime access to recordings"
            ],
            color: "orange",
            savings: true
        }
    ];

    return (
        <div className="min-h-screen bg-cream-main py-12 md:py-20 px-4 font-sans">
            <HomeButton />
            {/* Header Section */}
            <div className="max-w-6xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold text-green-main mb-6">
                    Prenatal & Postnatal Yoga
                </h1>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                    Supporting you through the beautiful journey of motherhood with specialized yoga
                    programs designed for expecting and new mothers.
                </p>

                {/* Currency Toggle */}
                <div className="inline-flex bg-white rounded-full p-1 border border-orange-main/20 shadow-sm flex-wrap justify-center">
                    <button
                        onClick={() => setCurrency("USD")}
                        className={`px-4 md:px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${currency === "USD"
                            ? "bg-orange-main text-white shadow-md"
                            : "text-green-main hover:bg-orange-50"
                            }`}
                    >
                        USD ($)
                    </button>
                    <button
                        onClick={() => setCurrency("GBP")}
                        className={`px-4 md:px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${currency === "GBP"
                            ? "bg-orange-main text-white shadow-md"
                            : "text-green-main hover:bg-orange-50"
                            }`}
                    >
                        GBP (£)
                    </button>
                    <button
                        onClick={() => setCurrency("AED")}
                        className={`px-4 md:px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${currency === "AED"
                            ? "bg-orange-main text-white shadow-md"
                            : "text-green-main hover:bg-orange-50"
                            }`}
                    >
                        AED (د.إ)
                    </button>
                    <button
                        onClick={() => setCurrency("INR")}
                        className={`px-4 md:px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${currency === "INR"
                            ? "bg-orange-main text-white shadow-md"
                            : "text-green-main hover:bg-orange-50"
                            }`}
                    >
                        INR (₹)
                    </button>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {pricingCards.map((card, idx) => (
                    <div
                        key={idx}
                        className={`bg-white rounded-3xl shadow-xl overflow-hidden border-2 ${card.popular ? "border-orange-main" : "border-orange-main/20"
                            } flex flex-col hover:shadow-2xl transition-shadow duration-300 relative`}
                    >
                        {card.popular && (
                            <div className="absolute top-0 right-0 bg-orange-main text-white text-xs font-bold px-4 py-2 rounded-bl-xl">
                                POPULAR
                            </div>
                        )}
                        {card.savings && (
                            <div className="absolute top-0 right-0 bg-green-main text-white text-xs font-bold px-4 py-2 rounded-bl-xl">
                                BEST VALUE
                            </div>
                        )}

                        <div className="p-8 md:p-10 flex-1">
                            <h3 className="text-3xl font-bold text-green-main mb-2">{card.title}</h3>
                            <p className="text-gray-600 mb-6">{card.description}</p>

                            <div className="text-5xl font-bold text-orange-main mb-8">
                                {currencySymbol}{card.price}
                                <span className="text-base font-normal text-gray-500">/mo</span>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {card.features.map((feature, featureIdx) => (
                                    <li key={featureIdx} className="flex items-start gap-3 text-gray-700">
                                        <span className="text-orange-main mt-1">✓</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-8 md:p-10 bg-green-50/50 border-t border-green-100">
                            <Link
                                to="/tryfree"
                                className="block w-full bg-orange-main hover:bg-orange-600 text-white text-center font-bold py-4 rounded-full transition transform hover:scale-105 shadow-md"
                            >
                                Book Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Additional Info */}
            <div className="max-w-4xl mx-auto mt-16 text-center">
                <p className="text-gray-600 mb-4">
                    All programs include personalized guidance from certified prenatal/postnatal yoga instructors
                </p>
                <p className="text-sm text-gray-500">
                    Have questions? <Link to="/contact" className="text-orange-main hover:underline font-semibold">Contact us</Link> for more information
                </p>
            </div>
        </div>
    );
};

export default PrePostnatal;
