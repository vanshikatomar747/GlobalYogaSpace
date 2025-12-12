import React, { useState } from "react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [sessionsPerWeek, setSessionsPerWeek] = useState(1);
  const [currency, setCurrency] = useState("USD");
  const [duration, setDuration] = useState(1); // 1, 3, 6, or 12 months for 1-on-1
  const [groupDuration, setGroupDuration] = useState(1); // 1, 3, 6, or 12 months for group classes

  // Pricing Data for all currencies
  const pricingData = {
    groupClasses: {
      USD: 49,
      GBP: 39,
      AED: 179,
      INR: 2999,
    },
    oneOnOne: {
      USD: {
        1: 89,
        2: 149,
        3: 199,
        4: 249,
        5: 299,
        6: 349,
        7: 399,
      },
      GBP: {
        1: 69,
        2: 119,
        3: 159,
        4: 199,
        5: 239,
        6: 279,
        7: 319,
      },
      AED: {
        1: 329,
        2: 549,
        3: 729,
        4: 919,
        5: 1099,
        6: 1279,
        7: 1469,
      },
      INR: {
        1: 5999,
        2: 9999,
        3: 12999,
        4: 16999,
        5: 19999,
        6: 23999,
        7: 26999,
      },
    }
  };

  // Duration discounts
  const durationDiscounts = {
    1: 1.0,    // No discount
    3: 0.95,   // 5% discount
    6: 0.90,   // 10% discount
    12: 0.85   // 15% discount
  };

  // Helper function to get currency symbol
  const getCurrencySymbol = (curr) => {
    const symbols = {
      USD: "$",
      GBP: "£",
      AED: "د.إ",
      INR: "₹"
    };
    return symbols[curr] || curr;
  };

  // Helper function to convert number to word
  const numberToWord = (num) => {
    const words = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven"];
    return words[num] || num;
  };

  // Calculate price based on duration for 1-on-1
  const getMonthlyPrice = () => {
    return pricingData.oneOnOne[currency][sessionsPerWeek];
  };

  const getTotalPrice = () => {
    const monthlyPrice = getMonthlyPrice();
    const discount = durationDiscounts[duration];
    return Math.round(monthlyPrice * duration * discount);
  };

  // Calculate price based on duration for Group Classes
  const getGroupMonthlyPrice = () => {
    return pricingData.groupClasses[currency];
  };

  const getGroupTotalPrice = () => {
    const monthlyPrice = getGroupMonthlyPrice();
    const discount = durationDiscounts[groupDuration];
    return Math.round(monthlyPrice * groupDuration * discount);
  };

  const currentPrice = getMonthlyPrice();
  const totalPrice = getTotalPrice();
  const groupClassPrice = getGroupMonthlyPrice();
  const groupTotalPrice = getGroupTotalPrice();
  const currencySymbol = getCurrencySymbol(currency);

  return (
    <div className="min-h-screen bg-cream-main py-12 md:py-20 px-4 font-sans">
      <div className="max-w-6xl mx-auto text-center mb-10 md:mb-16">
        <h2 className="text-2xl md:text-5xl font-bold text-green-main mb-4 md:mb-6">Pricing Plans</h2>
        <p className="text-green-main/80 text-base md:text-lg mb-6 md:mb-8">Invest in your well-being with flexible options.</p>

        {/* Currency Toggle - USD, GBP, AED, INR */}
        <div className="inline-flex bg-white rounded-full p-1 border border-orange-main/20 shadow-sm flex-wrap justify-center">
          <button
            onClick={() => setCurrency("USD")}
            className={`px-4 md:px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${currency === "USD"
              ? "bg-orange-main text-white shadow-md"
              : "text-green-main hover:bg-orange-50"
              }`}
          >
            USD ($)
          </button>
          <button
            onClick={() => setCurrency("GBP")}
            className={`px-4 md:px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${currency === "GBP"
              ? "bg-orange-main text-white shadow-md"
              : "text-green-main hover:bg-orange-50"
              }`}
          >
            GBP (£)
          </button>
          <button
            onClick={() => setCurrency("AED")}
            className={`px-4 md:px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${currency === "AED"
              ? "bg-orange-main text-white shadow-md"
              : "text-green-main hover:bg-orange-50"
              }`}
          >
            AED (د.إ)
          </button>
          <button
            onClick={() => setCurrency("INR")}
            className={`px-4 md:px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${currency === "INR"
              ? "bg-orange-main text-white shadow-md"
              : "text-green-main hover:bg-orange-50"
              }`}
          >
            INR (₹)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Card 1: Group Classes */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-main/20 flex flex-col hover:shadow-2xl transition-shadow duration-300">
          <div className="p-8 md:p-10 flex-1">
            <h3 className="text-3xl font-bold text-green-main mb-2">Group Classes</h3>
            <p className="text-orange-main font-medium mb-6">LIVE via Zoom</p>

            {/* Duration Selector */}
            <div className="mb-6">
              <label className="block text-green-main font-bold mb-3">Payment Duration</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { months: 1, label: "1 Month", discount: null },
                  { months: 3, label: "3 Months", discount: "Save 5%" },
                  { months: 6, label: "6 Months", discount: "Save 10%" },
                  { months: 12, label: "12 Months", discount: "Save 15%" }
                ].map((option) => (
                  <button
                    key={option.months}
                    onClick={() => setGroupDuration(option.months)}
                    className={`relative p-3 rounded-xl border-2 transition-all duration-300 ${groupDuration === option.months
                        ? "border-orange-main bg-orange-50 shadow-md"
                        : "border-gray-200 hover:border-orange-main/50 hover:bg-orange-50/30"
                      }`}
                  >
                    <div className="text-center">
                      <div className={`font-bold ${groupDuration === option.months ? "text-orange-main" : "text-green-main"}`}>
                        {option.label}
                      </div>
                      {option.discount && (
                        <div className="text-xs text-green-600 font-semibold mt-1">
                          {option.discount}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Display */}
            <div className="mb-8 p-6 bg-gradient-to-br from-green-50 to-orange-50/30 rounded-2xl border border-orange-main/20">
              <div className="flex items-end justify-between gap-4">
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-1">Monthly Price</div>
                  <div className="text-3xl md:text-4xl font-bold text-green-main">
                    {currencySymbol}{groupClassPrice}
                    <span className="text-base font-normal text-gray-500">/mo</span>
                  </div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-sm text-gray-600 mb-1">
                    {groupDuration > 1 ? `Total (${groupDuration} months)` : "Total"}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-orange-main">
                    {currencySymbol}{groupTotalPrice}
                  </div>
                  {groupDuration > 1 && (
                    <div className="text-xs text-green-600 font-semibold mt-1">
                      You save {currencySymbol}{Math.round(groupClassPrice * groupDuration - groupTotalPrice)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Join any of our 70+ LIVE daily classes",
                "View recordings of missed classes",
                "Access to workshops and FREE events",
                "Vibrant community of thousands of students and yoga teachers"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-green-main/90">
                  <span className="text-orange-main mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 md:p-10 bg-green-50/50 border-t border-green-100">
            <Link to="/tryfree" className="block w-full bg-orange-main hover:bg-orange-600 text-white text-center font-bold py-4 rounded-full transition transform hover:scale-105 shadow-md">
              Start your free trial
            </Link>
          </div>
        </div>

        {/* Card 2: 1-on-1 Sessions */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-orange-main/20 flex flex-col hover:shadow-2xl transition-shadow duration-300 relative">
          <div className="absolute top-0 right-0 bg-orange-main text-white text-xs font-bold px-4 py-2 rounded-bl-xl">POPULAR</div>
          <div className="p-8 md:p-10 flex-1">
            <h3 className="text-3xl font-bold text-green-main mb-2">1 on 1 Sessions</h3>
            <p className="text-orange-main font-medium mb-6">Choose sessions per week</p>

            {/* Slider Section */}
            <div className="mb-8 p-6 bg-green-50 rounded-2xl">
              <label className="block text-green-main font-bold mb-4 flex justify-between">
                <span>Sessions/Week: {sessionsPerWeek}</span>
                <span className="text-sm font-normal opacity-70">Max 7</span>
              </label>
              <input
                type="range"
                min="1"
                max="7"
                value={sessionsPerWeek}
                onChange={(e) => setSessionsPerWeek(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-main"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>One</span><span>Two</span><span>Three</span><span>Four</span><span>Five</span><span>Six</span><span>Seven</span>
              </div>
            </div>

            {/* Dynamic Details */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-green-main mb-1">
                {numberToWord(sessionsPerWeek)} 1-on-1 Session{sessionsPerWeek > 1 ? 's' : ''} every week
              </h4>
              <p className="text-gray-500">
                {sessionsPerWeek * 4} Private Sessions / 4 weeks
              </p>
            </div>

            {/* Duration Selector */}
            <div className="mb-6">
              <label className="block text-green-main font-bold mb-3">Payment Duration</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { months: 1, label: "1 Month", discount: null },
                  { months: 3, label: "3 Months", discount: "Save 5%" },
                  { months: 6, label: "6 Months", discount: "Save 10%" },
                  { months: 12, label: "12 Months", discount: "Save 15%" }
                ].map((option) => (
                  <button
                    key={option.months}
                    onClick={() => setDuration(option.months)}
                    className={`relative p-3 rounded-xl border-2 transition-all duration-300 ${duration === option.months
                      ? "border-orange-main bg-orange-50 shadow-md"
                      : "border-gray-200 hover:border-orange-main/50 hover:bg-orange-50/30"
                      }`}
                  >
                    <div className="text-center">
                      <div className={`font-bold ${duration === option.months ? "text-orange-main" : "text-green-main"}`}>
                        {option.label}
                      </div>
                      {option.discount && (
                        <div className="text-xs text-green-600 font-semibold mt-1">
                          {option.discount}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Display */}
            <div className="mb-8 p-6 bg-gradient-to-br from-green-50 to-orange-50/30 rounded-2xl border border-orange-main/20">
              <div className="flex items-end justify-between gap-4">
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-1">Monthly Price</div>
                  <div className="text-3xl md:text-4xl font-bold text-green-main">
                    {currencySymbol}{currentPrice}
                    <span className="text-base font-normal text-gray-500">/mo</span>
                  </div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-sm text-gray-600 mb-1">
                    {duration > 1 ? `Total (${duration} months)` : "Total"}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-orange-main">
                    {currencySymbol}{totalPrice}
                  </div>
                  {duration > 1 && (
                    <div className="text-xs text-green-600 font-semibold mt-1">
                      You save {currencySymbol}{Math.round(currentPrice * duration - totalPrice)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Access to 160+ coaches",
                "Recordings of all your sessions",
                "Access to workshops and FREE events",
                "Vibrant community of thousands of students and yoga teachers"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-green-main/90">
                  <span className="text-orange-main mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 md:p-10 bg-green-50/50 border-t border-green-100">
            <Link to="/tryfree" className="block w-full bg-orange-main hover:bg-orange-600 text-white text-center font-bold py-4 rounded-full transition transform hover:scale-105 shadow-md">
              Start your free trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
