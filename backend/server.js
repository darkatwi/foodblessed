require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// ── Auth middleware for protected admin routes ──────────────────────────────
function adminOnly(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.replace("Bearer ", "").trim();
  if (token && token === process.env.ADMIN_PASSWORD) return next();
  res.status(401).json({ error: "Unauthorized" });
}

// ── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/admin",      require("./routes/admin"));
app.use("/api/volunteers", require("./routes/volunteers"));
app.use("/api/contact",    require("./routes/contact"));

// Protected admin routes
const Volunteer = require("./models/Volunteer");
const Contact   = require("./models/Contact");

app.get("/api/admin/volunteers", adminOnly, async (req, res) => {
  const data = await Volunteer.find().sort({ createdAt: -1 });
  res.json(data);
});

app.get("/api/admin/contacts", adminOnly, async (req, res) => {
  const data = await Contact.find().sort({ createdAt: -1 });
  res.json(data);
});

// ── Connect & listen ────────────────────────────────────────────────────────
const mongoUri = process.env.MONGO_URI.replace(/\/\?/, `/${process.env.DB_NAME}?`);
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected");
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Backend running on http://localhost:${port}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
