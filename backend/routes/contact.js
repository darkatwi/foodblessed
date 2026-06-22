const router = require("express").Router();
const Contact = require("../models/Contact");

// POST /api/contact — public form submission
router.post("/", async (req, res) => {
  const { first, last, email, phone, topic, message } = req.body;
  if (!first || !email) return res.status(400).json({ error: "first and email are required" });

  try {
    await Contact.create({ first, last, email, phone, topic, message });
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/contact — admin only
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
