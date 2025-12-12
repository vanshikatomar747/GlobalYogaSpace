import React from "react";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi";

/**
 * HomeButton component - appears on pages without navbar
 * Provides easy navigation back to home page
 */
const HomeButton = () => {
    return (
        <Link
            to="/"
            className="fixed top-4 left-4 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-sm hover:bg-white px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-main/20 hover:border-orange-main/40 group"
        >
            <img
                src="/Logo3_cropped.png"
                alt="Home"
                className="h-8 w-auto"
            />
            <div className="flex items-center gap-2">
                <span className="text-green-main font-semibold text-sm group-hover:text-orange-main transition-colors">
                    Home
                </span>
                <HiHome className="text-orange-main group-hover:scale-110 transition-transform" />
            </div>
        </Link>
    );
};

export default HomeButton;
