const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/User");
const Ticket = require("./models/Ticket");
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use("/api/users/count", async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count: count });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.use("/api/count/tickets", async (req, res) => {
  try {
    const result = await Ticket.aggregate([{ $count: "count" }]);
    const count = result.length > 0 ? result[0].count : 0;
    res.json({ count });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
