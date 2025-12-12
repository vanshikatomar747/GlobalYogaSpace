import express from "express";
import { contactForm } from "../controllers/contactController.js";

const router = express.Router();

// Submit contact form
router.post("/", contactForm);

// Export router as default
export default router;
