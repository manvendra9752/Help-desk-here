const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Note", noteSchema);
