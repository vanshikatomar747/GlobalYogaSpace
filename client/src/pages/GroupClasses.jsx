import React from "react";
import { Link } from "react-router-dom";

const GroupClasses = () => {
  return (
    <div className="min-h-screen bg-cream-main py-12 md:py-20 px-4 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-orange-main/20 text-center">
        <h2 className="text-2xl md:text-5xl font-bold text-green-main mb-6 md:mb-8">Group Classes</h2>
        <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
          Join any of our <span className="font-bold text-orange-main">70+ LIVE daily group classes</span> in yoga, fitness, and meditation.
          Classes are suitable for all levels, and you can enjoy the vibrant community of students and instructors.
        </p>
        <p className="text-base md:text-lg text-gray-700 mb-8 md:mb-10 leading-relaxed">
          While group classes offer amazing community energy, if you want personalized guidance, proper form, and faster progress,
          we highly recommend checking out our <Link to="/pricing" className="text-orange-main font-bold hover:underline">1-on-1 sessions</Link>.
          But with us, you get the best of both worlds!
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/pricing" className="bg-orange-main hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition shadow-md">
            View Pricing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GroupClasses;
