const mongoose = require("mongoose");

const blockchainSchema = mongoose.Schema({
  prevHash: { type: String, required: true },
  transaction: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
  currentHash: { type: String, required: true },
});

module.exports = mongoose.model("Blockchain", blockchainSchema);
