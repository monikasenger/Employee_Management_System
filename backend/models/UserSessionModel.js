import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ip: String,
  userAgent: String,
  device: String,
  lastActive: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("UserSession", sessionSchema);
