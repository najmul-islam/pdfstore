const express = require("express");
const router = express.Router();
const {
  getAllBook,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const { bookUploader } = require("../middlewares/bookMiddleware");
const { isUser } = require("../middlewares/authMiddleware");

router.route("/").get(getAllBook).post(isUser, bookUploader, createBook);
router
  .route("/:id")
  .get(getSingleBook)
  .put(isUser, updateBook)
  .delete(isUser, deleteBook);

module.exports = router;
