import React, { useEffect, useState } from "react";

const TermsOfUse = () => {
  const termsData = {
    title: "Terms & Conditions",
    lastUpdated: "2025-01-01",
    content: [
      {
        heading: "Agreement",
        text: "By using GlobalYogaSpace services, you agree to participate safely and follow the instructions of your certified instructors."
      },
      {
        heading: "Health Disclaimer",
        text: "Yoga involves physical movement. Consult a medical professional if you have any health concerns before beginning your practice."
      },
      {
        heading: "Payment & Refunds",
        text: "Payments for sessions are processed securely. Refund policies depend on the plan type and local payment regulations."
      },
      {
        heading: "Class Conduct",
        text: "Respectful communication and mindful participation help maintain a harmonious environment for all practitioners."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-cream-main py-20 px-4">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-sm">
        <h1 className="text-4xl font-bold text-green-main mb-2 text-center">{termsData.title}</h1>
        <p className="text-center text-gray-500 mb-12">Last Updated: {termsData.lastUpdated}</p>

        <div className="space-y-8">
          {termsData.content.map((section, idx) => (
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

export default TermsOfUse;
