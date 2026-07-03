const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    first:   { type: String, required: true, trim: true },
    last:    { type: String, trim: true },
    email:   { type: String, required: true, trim: true, lowercase: true },
    phone:   { type: String, trim: true },
    topic:   { type: String, trim: true },
    message:   { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
