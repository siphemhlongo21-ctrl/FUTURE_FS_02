// backend/routes/leads.js
const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// GET all leads
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new lead
router.post("/", async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const saved = await newLead.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update status
router.put("/:id/status", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true }
    );
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update notes
router.put("/:id/notes", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id, 
      { notes: req.body.notes }, 
      { new: true }
    );
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a lead
router.delete("/:id", async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;