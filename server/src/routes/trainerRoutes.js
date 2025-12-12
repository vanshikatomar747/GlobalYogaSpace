import { Router } from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getAllTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer,
} from "../controllers/trainerController.js";

const router = Router();

// Public
router.get("/", getAllTrainers);
router.get("/:id", getTrainerById);

// Admin only
router.post("/", protect, admin, createTrainer);
router.put("/:id", protect, admin, updateTrainer);
router.delete("/:id", protect, admin, deleteTrainer);

export default router;
