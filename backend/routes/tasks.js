const express = require("express");
const router = express.Router();
const app = express();

// Middleware to parse incoming JSON data
router.use(express.json());

// define route handlers

router.post("/", (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).send("Name and age are required.");
  }
  res.status(201).send(`User ${name} added successfully.`);
});

module.exports = router;
