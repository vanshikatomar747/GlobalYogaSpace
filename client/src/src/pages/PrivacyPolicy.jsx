import React, { useEffect, useState } from "react";
import HomeButton from "../components/HomeButton";

const PrivacyPolicy = () => {
  const policyData = {
    title: "Privacy Policy",
    lastUpdated: "2025-01-01",
    content: [
      {
        heading: "Your Privacy Matters",
        text: "GlobalYogaSpace respects your personal information and protects it with care, in alignment with global data regulations."
      },
      {
        heading: "Data We Collect",
        text: "We collect basic details such as name, email, phone number, and your selected yoga goals solely to offer a personalized learning experience."
      },
      {
        heading: "How We Use Your Data",
        text: "Your information is used only for booking sessions, personalizing class plans, and improving your journey with us."
      },
      {
        heading: "Sharing Your Information",
        text: "We do not share your information with third parties except for essential services like secure payments or session delivery."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-cream-main py-20 px-4">
      <HomeButton />
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-sm">
        <h1 className="text-4xl font-bold text-green-main mb-2 text-center">{policyData.title}</h1>
        <p className="text-center text-gray-500 mb-12">Last Updated: {policyData.lastUpdated}</p>

        <div className="space-y-8">
          {policyData.content.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-bold text-orange-main mb-3">{section.heading}</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
