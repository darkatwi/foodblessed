const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
  {
    first:  { type: String, required: true, trim: true },
    last:   { type: String, trim: true },
    email:  { type: String, required: true, trim: true, lowercase: true },
    phone:  { type: String, trim: true },
    role:   { type: String, trim: true },
    note:   { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Volunteer", volunteerSchema);
