const express = require("express");
const router = express.Router();
const {
  getAllBook,
  getSignleBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const upload = require("../middlewares/uploadPdfMiddleware");
const protect = require("../middlewares/authMiddleware");

router.get("/", getAllBook);
router.get("/:id", getSignleBook);
router.post(
  "/",
  protect,
  upload.single([{ name: "book", maxCount: 1 }]),
  createBook
);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

module.exports = router;
