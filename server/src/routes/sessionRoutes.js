import { Router } from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
} from "../controllers/sessionController.js";

const router = Router();

// Public
router.get("/", getAllSessions);
router.get("/:id", getSessionById);

// Admin only
router.post("/", protect, admin, createSession);
router.put("/:id", protect, admin, updateSession);
router.delete("/:id", protect, admin, deleteSession);

export default router;
