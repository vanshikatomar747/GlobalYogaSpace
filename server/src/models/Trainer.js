import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "Coach" },
    bio: { type: String },
    image: { type: String }, // path to uploaded image
    expertise: [{ type: String }],
  },
  { timestamps: true }
);

const Trainer = mongoose.model("Trainer", trainerSchema);
export default Trainer;
