import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    session: { type: mongoose.Schema.Types.ObjectId, ref: "Session", required: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    bookedAt: { type: Date, default: Date.now },
    date: { type: Date, required: true },
    paymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
