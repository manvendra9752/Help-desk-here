const express = require("express");
const {
  register,
  login,
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

// User registration and login routes
router.post("/register", register);
router.post("/login", login);

// Admin routes for managing customers
router.get("/customers", auth("admin"), getAllCustomers);
router.post("/customers", auth("admin"), createCustomer);
router.put("/customers/:id", auth("admin"), updateCustomer);
router.delete("/customers/:id", auth("admin"), deleteCustomer);

module.exports = router;
