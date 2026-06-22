const router = require("express").Router();

// POST /api/admin/login — returns a simple token (the password itself as bearer)
router.post("/login", (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    return res.json({ ok: true, token: process.env.ADMIN_PASSWORD });
  }
  res.status(401).json({ error: "Wrong password" });
});

module.exports = router;
