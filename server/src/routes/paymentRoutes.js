import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createOrder,
  verifyPayment,
} from "../controllers/paymentController.js";

const router = Router();

// Create Razorpay order
router.post("/create-order", protect, createOrder);

// Verify payment
router.post("/verify", protect, verifyPayment);

export default router;
