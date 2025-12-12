import Payment from "../models/Payment.js";

// Temporary mock for testing without Razorpay credentials
export const createOrder = async (req, res) => {
  const { amount = 10000, currency = "INR", receipt = `receipt_${Date.now()}` } = req.body;

  // Return a dummy order object
  res.status(200).json({
    id: "order_mock_123",
    amount,
    currency,
    receipt,
  });
};

// Mock verifyPayment for testing
export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, plan } = req.body;

  try {
    const payment = await Payment.create({
      user: userId || "test_user_id",
      orderId: razorpay_order_id || "order_mock_123",
      paymentId: razorpay_payment_id || "payment_mock_123",
      plan: plan || "1-on-1",
      status: "success",
    });

    res.status(200).json({
      message: "Payment verified successfully (mock)",
      payment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to store payment" });
  }
};
