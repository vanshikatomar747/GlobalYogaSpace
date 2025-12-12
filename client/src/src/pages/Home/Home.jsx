import React from "react";
import Hero from "./Hero";
import BenefitCards from "./BenefitCards";
import GalleryGrid from "./GalleryGrid";
import FAQAccordion from "../../components/FAQAccordion";
import faqData from "../../data/homeFaq.json";
import WhyJoinUs from "./WhyJoinUs";
import PrePostnatalSection from "./PrePostnatalSection";

const Home = () => {
  return (
    <div className="overflow-hidden bg-cream-main">
      <Hero />
      <BenefitCards />
      <WhyJoinUs />

      {/* Prenatal/Postnatal Section */}
      <PrePostnatalSection />

      {/* Grid Section */}
      <GalleryGrid />

      {/* FAQ Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-green-main mb-12">Frequently Asked Questions</h2>
        <FAQAccordion items={faqData} />
      </section>
    </div>
  );
};

export default Home;
