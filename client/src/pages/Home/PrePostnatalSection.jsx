import React from "react";
import { Link } from "react-router-dom";

const PrePostnatalSection = () => {
    return (
        <section className="py-12 md:py-16 lg:py-24 px-4 bg-gradient-to-br from-orange-50/30 to-green-50/30">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left Side - Image */}
                    <div className="order-2 lg:order-1">
                        <div className="rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="/images/prenatal-yoga.png"
                                alt="Prenatal Yoga"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="order-1 lg:order-2 space-y-4 md:space-y-6">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-main leading-tight">
                            Prenatal / Postnatal Sessions
                        </h2>

                        <div className="space-y-3 md:space-y-4 text-base md:text-lg text-gray-700">
                            <p>
                                Experience the transformative power of yoga during and after pregnancy.
                                Our specialized prenatal and postnatal classes are designed to support you
                                through every stage of motherhood.
                            </p>

                            <p>
                                <strong className="text-green-main">Prenatal Yoga</strong> helps prepare your
                                body and mind for childbirth with gentle stretches, breathing techniques, and
                                relaxation practices that are safe for you and your baby.
                            </p>

                            <p>
                                <strong className="text-green-main">Postnatal Yoga</strong> supports your recovery
                                after birth, helping you regain strength, reduce stress, and reconnect with your
                                body while bonding with your little one.
                            </p>
                        </div>

                        <div className="pt-2 md:pt-4">
                            <Link
                                to="/prenatal-postnatal"
                                className="inline-block bg-white hover:bg-green-50 text-green-main border-2 border-green-main px-5 md:px-7 py-2.5 md:py-3.5 rounded-full font-bold text-sm md:text-base shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                            >
                                View Pricing
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PrePostnatalSection;
