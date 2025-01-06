const express = require("express");
const router = express.Router();
const app = express();

const Task = require("../models/Task");

// Middleware to parse incoming JSON data
router.use(express.json());

// define route handlers

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

module.exports = router;
