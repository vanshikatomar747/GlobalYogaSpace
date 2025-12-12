import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import axios from "axios";
import PhoneInput from "../../components/PhoneInput";

const Signup = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "" // Changed from 'place' to 'location'
  });
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${API_URL}/api/auth/signup`, formData);
      setUserId(res.data.userId);
      setShowOtpModal(true);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/verify-otp`, {
        userId,
        otp
      });
      // Save token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      // Redirect to dashboard or home
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `${API_URL}/api/auth/${provider}`;
  };

  return (
    <div className="min-h-screen bg-cream-main flex items-center justify-center px-4 py-12 relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-main/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-main/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-lg border border-orange-main/10 relative z-10">
        <h2 className="text-3xl font-bold mb-2 text-center text-green-main">Create Account</h2>
        <p className="text-center text-gray-500 mb-8">Join our global community of yogis</p>

        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}

        {!showOtpModal ? (
          <>
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-green-main font-semibold mb-1 text-sm">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-main/50"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-green-main font-semibold mb-1 text-sm">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className={`w-full border ${formData.email && (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email) ? 'border-green-500 focus:ring-green-200' : 'border-red-500 focus:ring-red-200')} p-3 rounded-xl focus:outline-none focus:ring-2`}
                  onChange={handleChange}
                  required
                />
                {formData.email && (
                  <p className={`text-xs mt-1 font-medium ${/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email) ? 'text-green-600' : 'text-red-500'}`}>
                    {/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email) ? '✓ Valid Email ID' : '✕ Invalid Email ID'}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-green-main font-semibold mb-1 text-sm">Phone Number</label>
                <PhoneInput
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-green-main font-semibold mb-1 text-sm">Location (City)</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g., New York"
                  className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-main/50"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-green-main font-semibold mb-1 text-sm">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create Password"
                  className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-main/50"
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="w-full bg-orange-main hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow-md">
                Sign Up
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-gray-400 text-sm">OR</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handleSocialLogin("google")}
                className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition">
                <FcGoogle className="text-2xl" />
                <span className="text-gray-600 font-medium">Continue with Google</span>
              </button>
              <button
                onClick={() => handleSocialLogin("facebook")}
                className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition">
                <FaFacebook className="text-2xl text-blue-600" />
                <span className="text-gray-600 font-medium">Continue with Facebook</span>
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account? <Link to="/auth" className="text-orange-main font-bold hover:underline">Log In</Link>
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-gray-600 mb-4">We sent a verification code to your email.</p>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-main/50 text-center text-lg tracking-widest"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-orange-main hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow-md">
              Verify OTP
            </button>
            <button
              onClick={() => setShowOtpModal(false)}
              className="w-full text-gray-500 hover:text-gray-700 font-medium py-2">
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
