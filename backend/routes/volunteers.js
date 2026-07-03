const router = require("express").Router();
const Volunteer = require("../models/Volunteer");

// POST /api/volunteers — public signup
router.post("/", async (req, res) => {
  const { first, last, email, phone, role, note } = req.body;
  if (!first || !email) return res.status(400).json({ error: "first and email are required" });

  try {
    const doc = await Volunteer.create({ first, last, email, phone, role, note });
    res.status(201).json({ ok: true, id: doc._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/volunteers — admin only (protected by middleware in server.js)
router.get("/", async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
