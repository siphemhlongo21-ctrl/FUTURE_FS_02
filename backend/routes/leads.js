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

// GET single lead
router.get("/:id", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new lead
router.post("/", async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const saved = await newLead.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update lead (complete update)
router.put("/:id", async (req, res) => {
  try {
    const { name, email, source, status, notes } = req.body;
    
    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { 
        name, 
        email, 
        source, 
        status, 
        notes 
      },
      { 
        new: true,
        runValidators: true
      }
    );
    
    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }
    
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update status (keep for backward compatibility)
router.put("/:id/status", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true, runValidators: true }
    );
    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update notes (keep for backward compatibility)
router.put("/:id/notes", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id, 
      { notes: req.body.notes }, 
      { new: true, runValidators: true }
    );
    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a lead
router.delete("/:id", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }
    res.json({ message: "Lead deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;