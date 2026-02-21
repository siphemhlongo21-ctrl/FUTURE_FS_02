// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const leadsRoute = require("./routes/leads");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/leads", leadsRoute);

// Test route
app.get("/", (req, res) => {
  res.send("✅ Mini CRM Backend is running");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));