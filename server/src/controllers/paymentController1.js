import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/Payment.js";

// Create Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order for 1-on-1 session or subscription
export const createOrder = async (req, res) => {
  const { amount, currency, receipt } = req.body;

  try {
    const options = {
      amount: amount * 100, // Amount in smallest currency unit (paise)
      currency: currency || "INR",
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Order creation failed" });
  }
};

// Verify payment signature
export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, plan } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return res.status(400).json({ message: "Payment verification failed" });
  }

  try {
    // Store payment info in DB
    const payment = await Payment.create({
      user: userId,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      plan,
      status: "success",
    });

    res.status(200).json({
      message: "Payment verified successfully",
      payment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to store payment" });
  }
};
