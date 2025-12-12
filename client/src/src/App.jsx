import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Home from "./pages/Home/Home";
import Pricing from "./pages/Pricing";
import AboutHome from "./pages/About/AboutHome";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import SocialAuthHandler from "./pages/Auth/SocialAuthHandler";
import UserProfile from "./pages/UserProfile";
import TryFree from "./pages/TryFree";
import Contact from "./pages/Contact";
import TypesOfYoga from "./pages/Yoga/TypesOfYoga";
import YogaAsana from "./pages/Yoga/YogaAsana";
import YogaGoals from "./pages/Yoga/YogaGoals";
import GroupClasses from "./pages/GroupClasses";
import PrePostnatal from "./pages/PrePostnatal";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import FAQPage from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop"; // Imported

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop /> {/* Added */}
      <Loader />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about/*" element={<AboutHome />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/auth/social" element={<SocialAuthHandler />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tryfree" element={<TryFree />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/yoga/types" element={<TypesOfYoga />} />
          <Route path="/yoga/asana" element={<YogaAsana />} />
          <Route path="/yoga/goals" element={<YogaGoals />} />
          <Route path="/group-classes" element={<GroupClasses />} />
          <Route path="/prenatal-postnatal" element={<PrePostnatal />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {/* copyright bottom-right */}
      <div className="fixed bottom-2 right-4 text-xs text-greenExtra/80">
        © {new Date().getFullYear()} GlobalYogaSpace
      </div>
    </div>
  );
}

export default App;
