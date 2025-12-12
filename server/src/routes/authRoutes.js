import express from "express";
import passport from "passport";
import { signup, login, verifyOtp, forgotPassword, resetPassword, socialAuthCallback, getProfile, updateProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

// Verify OTP
router.post("/verify-otp", verifyOtp);

// Forgot & Reset Password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Profile Routes
router.get("/me", protect, getProfile);
router.put("/profile", protect, updateProfile);

// Google Auth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login", session: false }),
    socialAuthCallback
);

// Facebook Auth
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get(
    "/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login", session: false }),
    socialAuthCallback
);

// Export as default for ES modules
export default router;
