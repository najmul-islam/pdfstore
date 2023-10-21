const asyncHanlder = require("express-async-handler");
const Book = require("../models/bookModel");

// get all book
const getAllBook = asyncHanlder(async (req, res) => {
  const books = await Book.find({}).populate("user", "_id name");

  res.status(200).json(books);
});

// get single book
const getSingleBook = asyncHanlder(async (req, res) => {
  const bookId = req.params;
  const book = await Book.findById({ _id: bookId });

  res.status(200).json(book);
});

// create book
const createBook = asyncHanlder(async (req, res) => {
  const { title, year, language, subject, author } = req.body;
  const userId = req.user._id;

  if (!title && !year && !writer && !filename) {
    res.status(400);
    throw new Error("Please add all filed");
  }

  const newBook = await Book.create({
    title,
    year,
    language,
    subject,
    author,
    user: userId,
    book: req.book_link,
    cover: req.cover_link,
    size: req.book_size,
    pages: req.book_pages,
  });

  res.status(200).json(newBook);
});

const updateBook = asyncHanlder(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(400);
    throw new Error("Book not found");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // make sure the logged in user matches the goal user
  if (book.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedBook);
});

// delete book
const deleteBook = asyncHanlder(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(400);
    throw new Error("Book not found");
  }

  // check for user
  if (!req.user) {
    req.status(401);
    throw new Error("User not found");
  }

  // make sure the logged in user matches the goal user
  if (book.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await book.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getAllBook,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
};
