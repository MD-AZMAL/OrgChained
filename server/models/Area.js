const mongoose = require("mongoose");

const areaSchema = mongoose.Schema({
  name: { type: String, required: true },
  areaCode: { type: String, required: true },
  areaAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Area", areaSchema);
