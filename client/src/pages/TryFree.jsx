import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaWhatsapp, FaEnvelope, FaCheckCircle } from "react-icons/fa"; // Added FaCheckCircle
import axios from "axios";
import PhoneInput from "../components/PhoneInput";

const TryFree = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const [step, setStep] = useState(1); // 1: Form, 2: Verification
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    place: "",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Questionnaire State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [questionnaire, setQuestionnaire] = useState({
    goal: "",
    experience: "",
    gender: "",
    age: "",
    healthConditions: "",
    preferredTime: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      // Pre-fill user details if available
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        // You might want to pre-fill name/email/phone for the questionnaire data payload implicitly
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, {
        ...formData,
        location: formData.place // Map place to location for signup
      });
      setUserId(res.data.userId);
      setLoading(false);
      setStep(2);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/verify-otp`, {
        userId,
        otp: verificationCode
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Assuming verifyOtp returns user now or we decode token
      setLoading(false);
      alert("Verification Successful! Redirecting...");
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Invalid code. Please try again.");
    }
  };

  // Questionnaire Handlers
  const handleQChange = (e) => {
    setQuestionnaire({ ...questionnaire, [e.target.name]: e.target.value });
  };

  const handleQSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const payload = {
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        ...questionnaire
      };

      await axios.post(`${API_URL}/api/booking/trial-request`, payload, config);
      setLoading(false);
      setIsSubmitted(true);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Submission failed.");
    }
  };

  return (
    <div className="min-h-screen bg-cream-main flex items-center justify-center px-4 py-12 relative overflow-hidden transition-all duration-500 ease-in-out">
      {/* Background Decor - Animated and Glowing */}
      <div className="absolute top-[-20%] right-[-10%] w-[40rem] h-[40rem] bg-orange-main/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[40rem] h-[40rem] bg-green-main/15 rounded-full blur-[100px] animate-pulse delay-1000"></div>

      <div className="md:w-full max-w-4xl z-10 flex flex-col md:flex-row shadow-2xl rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl border border-white/60">

        {/* Left Side: Visual/Context (Hidden on Mobile for compactness or kept for vibe) */}
        <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-green-main to-green-800 text-white p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4 leading-tight">Start Your Yoga Journey</h2>
            <p className="text-white/80 text-lg">Join our community and experience the transformation of mind and body.</p>
          </div>
          <div className="relative z-10 mt-12 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><FaCheckCircle className="text-white text-xl" /></div>
              <span>Personalized Plans</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><FaCheckCircle className="text-white text-xl" /></div>
              <span>Expert Instructors</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><FaCheckCircle className="text-white text-xl" /></div>
              <span>Flexible Schedule</span>
            </div>
          </div>
          {/* Decorative Circles */}
          <div className="absolute md:-bottom-24 md:-right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-7/12 p-8 md:p-12 bg-white/50 relative">

          {isAuthenticated ? (
            // Logged In View: Questionnaire
            !isSubmitted ? (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Help Us Know You Better</h1>
                  <p className="text-gray-500">Tell us your goals to personalize your session.</p>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm flex items-center gap-2 border border-red-100"><FaCheckCircle className="text-red-500" /> {error}</div>}

                <form onSubmit={handleQSubmit} className="space-y-5">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm ml-1">Primary Goal</label>
                    <select name="goal" required className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-main/50 text-gray-700 transition-all hover:border-orange-main/30" onChange={handleQChange}>
                      <option value="">Select a Goal</option>
                      <option value="flexibility">Flexibility</option>
                      <option value="strength">Strength</option>
                      <option value="stress_relief">Stress Relief</option>
                      <option value="weight_loss">Weight Loss</option>
                      <option value="general_fitness">General Fitness</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-sm ml-1">Yoga Experience</label>
                      <select name="experience" required className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-main/50 text-gray-700 transition-all hover:border-orange-main/30" onChange={handleQChange}>
                        <option value="">Select Experience</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-sm ml-1">Preferred Time</label>
                      <select name="preferredTime" required className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-main/50 text-gray-700 transition-all hover:border-orange-main/30" onChange={handleQChange}>
                        <option value="">Select Time</option>
                        <option value="morning">Morning (6-10AM)</option>
                        <option value="afternoon">Afternoon (12-4PM)</option>
                        <option value="evening">Evening (5-9PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-sm ml-1">Gender</label>
                      <select name="gender" required className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-main/50 text-gray-700 transition-all hover:border-orange-main/30" onChange={handleQChange}>
                        <option value="">Select</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-sm ml-1">Age</label>
                      <select name="age" required className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-main/50 text-gray-700 transition-all hover:border-orange-main/30" onChange={handleQChange}>
                        <option value="">Age</option>
                        <option value="<18">&lt; 18</option>
                        <option value="18-30">18 - 30</option>
                        <option value="30-50">30 - 50</option>
                        <option value="50+">50+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm ml-1">Injuries / Conditions (Optional)</label>
                    <textarea name="healthConditions" rows="2" className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-main/50 transition-all hover:border-orange-main/30" placeholder="e.g., Back pain" onChange={handleQChange}></textarea>
                  </div>

                  <button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-orange-main to-orange-500 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.01] shadow-lg shadow-orange-main/30 disabled:opacity-70 disabled:cursor-not-allowed mt-2">
                    {loading ? "Submitting..." : "Submit Request"}
                  </button>
                </form>
              </>
            ) : (
              // Success State
              <div className="h-full flex flex-col items-center justify-center text-center p-4 animate-fade-in">
                <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
                  <FaCheckCircle className="text-6xl text-green-main drop-shadow-md" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Request Received!</h2>
                <p className="text-gray-500 mb-10 max-w-sm mx-auto leading-relaxed">
                  We've received your details. Our expert team will review your goals and reach out to you shortly.
                </p>
                <Link to="/" className="inline-block px-10 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-black transition-all transform hover:-translate-y-1 shadow-xl">
                  Return Home
                </Link>
              </div>
            )
          ) : (
            // Not Logged In View (Existing Code)
            step === 1 ? (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl md:text-3xl font-bold text-gray-800 mb-2">Start Your Free Trial</h1>
                  <p className="text-gray-500">Create account to book your session.</p>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm flex items-center gap-2 border border-red-100"><FaCheckCircle className="text-red-500" /> {error}</div>}

                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-sm ml-1">Full Name</label>
                      <input type="text" name="name" required className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-main/50 transition-all hover:border-orange-main/30" placeholder="John Doe" onChange={handleChange} />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2 text-sm ml-1">Phone Number</label>
                      <div className="phone-input-wrapper">
                        <PhoneInput
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm ml-1">Location (City)</label>
                    <input type="text" name="place" required className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-main/50 transition-all hover:border-orange-main/30" placeholder="New York" onChange={handleChange} />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm ml-1">Email Address</label>
                    <input type="email" name="email" required className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-main/50 transition-all hover:border-orange-main/30" placeholder="john@example.com" onChange={handleChange} />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm ml-1">Create Password</label>
                    <input type="password" name="password" required className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-main/50 transition-all hover:border-orange-main/30" placeholder="••••••••" onChange={handleChange} />
                  </div>

                  <div className="pt-2">
                    <button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-orange-main to-orange-500 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.01] shadow-lg shadow-orange-main/30 disabled:opacity-70 disabled:cursor-not-allowed">
                      {loading ? "Processing..." : "Continue"}
                    </button>
                  </div>
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">
                      Already have an account? <Link to="/auth" className="text-orange-main font-bold hover:underline">Log In</Link>
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <div className="h-full flex flex-col justify-center text-center animate-fade-in">
                <div className="mx-auto w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <FaEnvelope className="text-4xl text-orange-main" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify via Email</h2>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                  We've sent a 6-digit code to <br /><span className="font-semibold text-gray-800">{formData.email}</span>.
                </p>

                {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm flex items-center justify-center gap-2"><FaCheckCircle className="text-red-500" /> {error}</div>}

                <form onSubmit={handleVerify} className="space-y-8">
                  <input
                    type="text"
                    placeholder="000000"
                    className="w-full text-center text-4xl tracking-[0.5em] font-bold border-b-2 border-gray-200 focus:border-orange-main focus:outline-none py-4 bg-transparent transition-all placeholder-gray-200"
                    maxLength="6"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />

                  <button disabled={loading} type="submit" className="w-full bg-green-main hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-70 transform hover:-translate-y-0.5">
                    {loading ? "Verifying..." : "Verify & Book"}
                  </button>
                </form>

                <button onClick={() => setStep(1)} className="mt-8 text-gray-400 text-sm hover:text-gray-600 transition-colors underline decoration-dotted">
                  Wrong email? Go back
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TryFree;
