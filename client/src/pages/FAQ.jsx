import React from "react";
import FAQAccordion from "../components/FAQAccordion";
import faqData from "../data/faq.json"; // Your 16-17 Q&A
import HomeButton from "../components/HomeButton";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-cream px-4 md:px-6 py-8 md:py-12">
      <HomeButton />
      <h1 className="text-2xl md:text-4xl font-bold text-green-900 mb-8 md:mb-12 text-center">
        All Our Frequently Asked Questions
      </h1>

      <div className="max-w-4xl mx-auto space-y-4">
        <FAQAccordion items={faqData} />
      </div>
    </div>
  );
};

export default FAQ;
