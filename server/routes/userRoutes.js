const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getCurrentUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", register);
router.post("/login", login);
// protected route to get a user data
router.get("/currentUser", protect, getCurrentUser);

module.exports = router;
