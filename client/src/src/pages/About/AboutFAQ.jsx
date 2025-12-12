import React from "react";
import FAQAccordion from "../../components/FAQAccordion";
import faqData from "../../data/faq.json"; // Using full FAQ data

const AboutFAQ = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center text-orange-main">All of our Frequently Asked Questions</h2>
      <FAQAccordion items={faqData} />
    </div>
  );
};

export default AboutFAQ;
