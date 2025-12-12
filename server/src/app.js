import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import session from "express-session"; // Added
import passport from "./config/passport.js"; // Added

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();

// Connect DB
connectDB();

// Middlewares
// CORS Configuration for production
const allowedOrigins = [
  'http://localhost:5173',                      // Local development
  'https://global-yoga-client.vercel.app',      // Production frontend
  'https://global-yoga-client.vercel.app/',     // With trailing slash
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Session & Passport Middleware (Added)
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/trainers", trainerRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/contact", contactRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("GlobalYogaSpace Backend is running");
});

// 404
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Error Handler
app.use((err, req, res) =>
  res.status(500).json({ message: "Something went wrong" })
);

export default app;
