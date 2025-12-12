import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["1-on-1", "group"], required: true },
    duration: { type: Number, required: true }, // in minutes
    description: { type: String },
    price: { type: Number, required: true },
    schedule: [{ type: Date }], // available slots
    coach: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer" },
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);
export default Session;
