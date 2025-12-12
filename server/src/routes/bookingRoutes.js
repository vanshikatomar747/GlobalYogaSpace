import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  bookSession,
  getUserBookings,
  cancelBooking,
  createTrialRequest,
} from "../controllers/bookingController.js";

const router = Router();

// Book a session
router.post("/", protect, bookSession);

// Get user bookings
router.get("/:userId", protect, getUserBookings);

// Cancel booking
router.put("/cancel/:bookingId", protect, cancelBooking);

// Create Trial Request
router.post("/trial-request", protect, createTrialRequest);

export default router;
