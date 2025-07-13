import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true, 
  },
  employeeName: {
    type: String,
    required: true, 
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Task", taskSchema);
