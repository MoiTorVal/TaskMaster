// Import third-party libraries first
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Set up constants and configurations
const app = express();
const port = process.env.PORT || 3000;

// routes
const tasksRoutes = require("./routes/tasks");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

// Middleware configuration
app.use(cors()); // enables cross-origin resource sharing
app.use(express.json()); // Parses incoming JSON request

// routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/tasks", tasksRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

module.exports = app;
