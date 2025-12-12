import Session from "../models/Session.js";

// Get all sessions
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find().populate("coach");
    res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
};

// Get a single session
export const getSessionById = async (req, res) => {
  const { id } = req.params;

  try {
    const session = await Session.findById(id).populate("coach");
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.status(200).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch session" });
  }
};

// Admin: Create session
export const createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);
    res.status(201).json({ message: "Session created", session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create session" });
  }
};

// Admin: Update session
export const updateSession = async (req, res) => {
  const { id } = req.params;

  try {
    const session = await Session.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Session updated", session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update session" });
  }
};

// Admin: Delete session
export const deleteSession = async (req, res) => {
  const { id } = req.params;

  try {
    await Session.findByIdAndDelete(id);
    res.status(200).json({ message: "Session deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete session" });
  }
};
