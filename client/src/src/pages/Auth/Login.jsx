import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import axios from "axios";
import HomeButton from "../../components/HomeButton";

const Login = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Forgot Password States
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `${API_URL}/api/auth/${provider}`;
  };

  // Forgot Password Handlers
  const handleSendForgotOtp = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/forgot-password`, { email: forgotEmail });
      setForgotStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleResetPassword = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/reset-password`, {
        email: forgotEmail,
        otp,
        newPassword
      });
      alert("Password reset successfully. Please login.");
      setShowForgotModal(false);
      setForgotStep(1);
      setForgotEmail("");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen bg-cream-main flex items-center justify-center px-4 py-12 relative">
      <HomeButton />
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-main/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-main/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl w-full max-w-md border border-orange-main/10 relative z-10">
        <h2 className="text-3xl font-bold mb-2 text-center text-green-main">Welcome Back!</h2>
        <p className="text-center text-gray-500 mb-8">Login to continue your wellness journey</p>

        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}

        {!showForgotModal ? (
          <>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-green-main font-semibold mb-1 text-sm">Email</label>
                <input
                  type="email"
                  className={`w-full border ${email && (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ? 'border-green-500 focus:ring-green-200' : 'border-red-500 focus:ring-red-200')} p-3 rounded-xl focus:outline-none focus:ring-2`}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {email && (
                  <p className={`text-xs mt-1 font-medium ${/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ? 'text-green-600' : 'text-red-500'}`}>
                    {/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) ? '✓ Valid Email ID' : '✕ Invalid Email ID'}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-green-main font-semibold mb-1 text-sm">Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-main/50"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="flex justify-end mt-1">
                  <button type="button" onClick={() => setShowForgotModal(true)} className="text-xs text-orange-main hover:underline">Forgot Password?</button>
                </div>
              </div>

              <button className="w-full bg-orange-main hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow-md">
                Log In
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
                Don't have an account? <Link to="/signup" className="text-orange-main font-bold hover:underline">Sign Up</Link>
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-center text-green-main">Reset Password</h3>
            {forgotStep === 1 ? (
              <>
                <input
                  type="email"
                  className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-main/50"
                  placeholder="Enter your email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                />
                <button
                  onClick={handleSendForgotOtp}
                  className="w-full bg-orange-main hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow-md">
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <p className="text-center text-sm text-gray-500">OTP sent to {forgotEmail}</p>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-main/50 text-center text-lg tracking-widest"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-main/50"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  onClick={handleResetPassword}
                  className="w-full bg-orange-main hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow-md">
                  Reset Password
                </button>
              </>
            )}
            <button
              onClick={() => setShowForgotModal(false)}
              className="w-full text-gray-500 hover:text-gray-700 font-medium py-2">
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
