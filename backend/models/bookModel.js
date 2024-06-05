const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    cover: {
      type: String,
    },
    pages: {
      type: String,
    },
    year: {
      type: String,
    },
    size: {
      type: String,
    },
    language: {
      type: String,
    },
    subject: {
      type: Array,
    },
    book: {
      type: String,
    },
    author: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
