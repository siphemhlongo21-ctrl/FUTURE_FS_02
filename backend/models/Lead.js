// backend/models/Lead.js
const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  source: { type: String, default: "Website" },
  status: { 
    type: String, 
    enum: ["new", "contacted", "converted"], 
    default: "new" 
  },
  notes: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Lead", LeadSchema);