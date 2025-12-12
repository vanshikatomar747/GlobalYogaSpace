import Booking from "../models/Booking.js";
import Session from "../models/Session.js";
import Payment from "../models/Payment.js";
import TrialRequest from "../models/TrialRequest.js";

// Book a session
export const bookSession = async (req, res) => {
  const { userId, sessionId, date, paymentId } = req.body;

  try {
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    const booking = await Booking.create({
      user: userId,
      session: sessionId,
      date,
      paymentId,
      status: "confirmed",
    });

    res.status(201).json({ message: "Session booked successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Booking failed" });
  }
};

// Get user bookings
export const getUserBookings = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await Booking.find({ user: userId })
      .populate("session")
      .populate("paymentId");

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
};

// Create Trial Request
export const createTrialRequest = async (req, res) => {
  const { name, email, phone, goal, experience, gender, age, healthConditions, preferredTime } = req.body;
  const userId = req.user._id;

  try {
    const trialRequest = await TrialRequest.create({
      user: userId,
      name,
      email,
      phone,
      goal,
      experience,
      gender,
      age,
      healthConditions,
      preferredTime,
    });

    res.status(201).json({ message: "Trial request submitted successfully", trialRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to submit trial request" });
  }
};
