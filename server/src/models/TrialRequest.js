import mongoose from "mongoose";

const trialRequestSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        goal: { type: String, required: true },
        experience: { type: String, required: true },
        gender: { type: String, required: true },
        age: { type: String, required: true },
        healthConditions: { type: String },
        preferredTime: { type: String, required: true },
        status: { type: String, enum: ["pending", "contacted"], default: "pending" },
    },
    { timestamps: true }
);

const TrialRequest = mongoose.model("TrialRequest", trialRequestSchema);
export default TrialRequest;
