import Trainer from "../models/Trainer.js";

// Get all trainers
export const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch trainers" });
  }
};

// Get a single trainer
export const getTrainerById = async (req, res) => {
  const { id } = req.params;
  try {
    const trainer = await Trainer.findById(id);
    if (!trainer) return res.status(404).json({ message: "Trainer not found" });
    res.status(200).json(trainer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch trainer" });
  }
};

// Admin: Create trainer
export const createTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.create(req.body);
    res.status(201).json({ message: "Trainer created", trainer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create trainer" });
  }
};

// Admin: Update trainer
export const updateTrainer = async (req, res) => {
  const { id } = req.params;

  try {
    const trainer = await Trainer.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Trainer updated", trainer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update trainer" });
  }
};

// Admin: Delete trainer
export const deleteTrainer = async (req, res) => {
  const { id } = req.params;

  try {
    await Trainer.findByIdAndDelete(id);
    res.status(200).json({ message: "Trainer deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete trainer" });
  }
};
