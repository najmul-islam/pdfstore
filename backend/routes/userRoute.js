const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  userBooks,
  profile,
  createAvatar,
} = require("../controllers/userController");

const protect = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadAvatarMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/avatar", protect, upload.single("avatar"), createAvatar);
router.get("/books/:id", userBooks);
router.get("/profile", protect, profile);

module.exports = router;
