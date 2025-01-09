const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("../models/Task");

// Middleware to parse incoming JSON data
router.use(express.json());

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET with :ID individual
router.get("/:id", async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task); // Only send the response here
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST
router.post("/", async (req, res) => {
  const { title, description, dueDate, priority, completed } = req.body;

  const newTask = new Task({
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    completed: completed,
  });

  try {
    await newTask.save(); // save new task to database
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH with :ID
router.patch("/:id", async (req, res) => {
  const taskId = req.params.id;
  const updates = req.body;

  // validate the task ID
  if (!mongoose.isValidObjectId(taskId)) {
    return res.status(404).json({ error: "Invalid task ID" });
  }

  try {
    const task = await Task.findByIdAndUpdate(taskId, updates, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      // If the task is not found, send a 404 response
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task); // Only send the response here
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE with :id
router.delete("/:id", async (req, res) => {
  const taskId = req.params.id;

  // Validate the task ID
  if (!mongoose.isValidObjectId(taskId))
    return res.status(404).json({ error: "Invalid task ID" });

  try {
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      // If the task is not found, send a 404 response
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
