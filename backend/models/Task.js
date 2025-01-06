const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is a required field
  },
  description: {
    type: String,
    required: true, // Description is a required field
  },
  dueDate: {
    type: Date,
    required: true, // Due date is required
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"], // Enum to specify valid priority values
    default: "Medium", // Default priority is Medium
  },
  completed: {
    type: Boolean,
    default: false, // Default status is false (not completed)
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
