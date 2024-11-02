const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    enum: ["Active", "Pending", "Closed"],
    default: "Pending",
  },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lastUpdated: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Ticket", ticketSchema);
