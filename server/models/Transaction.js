const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, required: true },
  area: { type: mongoose.Schema.Types.ObjectId, ref: "Area" },
  areaAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Transaction", transactionSchema);
