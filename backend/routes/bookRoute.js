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
const { coverUploader } = require("../middlewares/coverMiddleware");
const { isUser } = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(getAllBook)
  .post(isUser, coverUploader, bookUploader, createBook);
router
  .route("/:id")
  .get(getSingleBook)
  .put(isUser, updateBook)
  .delete(isUser, deleteBook);

module.exports = router;
