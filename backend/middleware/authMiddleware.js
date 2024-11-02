const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = (role) => async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (role && req.user.role !== role)
      return res.status(403).json({ msg: "Forbidden" });
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
module.exports = auth;
