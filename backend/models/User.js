const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  email: { type: String, unique: true, required: true},
  password: String,
  role: {
    type: String,
    enum: ["customer", "agent", "admin"],
    default: "customer",
  },
});
module.exports = mongoose.model("User", userSchema);
