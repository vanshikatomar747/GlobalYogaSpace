import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Set token in localStorage or header
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  }
};

// Signup API call
export const signup = async (data) => {
  return await api.post("/auth/signup", data);
};

// Login API call
export const login = async (data) => {
  return await api.post("/auth/login", data);
};

// Verify OTP API call
export const verifyOtp = async (data) => {
  return await api.post("/auth/verify-otp", data);
};

export default api;
