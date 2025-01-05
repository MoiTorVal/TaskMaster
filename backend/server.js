// Import third-party libraries first
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Set up constants and configurations
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

// Middleware configuration
app.use(cors()); // enables cross-origin resource sharing
app.use(express.json()); // Parses incoming JSON request

// routes
app.get("/", (req, res) => {
  res.send("Hello");
});

// server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
