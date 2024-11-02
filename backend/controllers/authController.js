const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// User registration
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields are required." });
    }

    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      success: true,
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "Email and password required." });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

// Admin-only customer management routes
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find();
    res.status(200).json({ success: true, customers });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Error fetching customers" });
  }
};

exports.createCustomer = async (req, res) => {
  const { name, email } = req.body;
  try {
    const customer = new User({ name, email });
    await customer.save();
    res.status(201).json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Error creating customer" });
  }
};

exports.updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const customer = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true }
    );
    if (!customer)
      return res
        .status(404)
        .json({ success: false, msg: "Customer not found" });
    res.status(200).json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Error updating customer" });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const customer = await User.findByIdAndDelete(id);
    console.log(customer);
    if (!customer)
      return res
        .status(404)
        .json({ success: false, msg: "Customer not found" });

    res
      .status(200)
      .json({ success: true, msg: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
