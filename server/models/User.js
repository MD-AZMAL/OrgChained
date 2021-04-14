const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ["Admin", "User"] },
  email: { type: String, required: true },
  idNo: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  pubK: { type: String, required: true },
  privK: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
