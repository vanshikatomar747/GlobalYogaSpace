import React, { useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import OurMission from "./OurMission";
import OurTeam from "./OurTeam";
import AboutFAQ from "./AboutFAQ";
import Contact from "../Contact";

const AboutHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { name: "Our Mission", path: "/about/mission" },
    { name: "Our Team", path: "/about/team" },
    { name: "FAQ", path: "/about/faq" },
    { name: "Contact Us", path: "/about/contact" },
  ];

  return (
    <div className="min-h-screen bg-cream-main pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-green-main mb-8 text-center">About GlobalYogaSpace</h1>

        {/* Navigation / Dropdown Simulation */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`px-6 py-3 rounded-full font-semibold transition-all border border-green-main/30 ${location.pathname === tab.path || (tab.path === "/about/mission" && location.pathname === "/about")
                  ? "bg-green-main text-white shadow-lg scale-105"
                  : "bg-white text-green-main hover:bg-green-50"
                }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm min-h-[400px]">
          <Routes>
            <Route index element={<OurMission />} />
            <Route path="mission" element={<OurMission />} />
            <Route path="team" element={<OurTeam />} />
            <Route path="faq" element={<AboutFAQ />} />
            <Route path="contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AboutHome;
