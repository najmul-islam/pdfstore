const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  profile,
  updateProfile,
} = require("../controllers/userController");

const { isUser } = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.route("/profile").get(isUser, profile).put(isUser, updateProfile);

module.exports = router;
