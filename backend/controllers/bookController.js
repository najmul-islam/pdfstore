const asyncHanlder = require("express-async-handler");
const path = require("path");
const Book = require("../models/bookModel");
// const pdfjsLib = require("pdfjs-dist");
// const { PDFDocument } = require("pdf-lib");

// get all book
const getAllBook = asyncHanlder(async (req, res) => {
  const books = await Book.find({});

  res.status(200).json(books);
});

// get single book
const getSignleBook = asyncHanlder(async (req, res) => {
  const book = await Book.findById({ id: req.id });

  res.status(200).json(book);
});

// // get user book
// const getUserBooks = asyncHanlder(async(req,res) => {
//   const userBooks = await Book.find({})
// })

// create book
const createBook = asyncHanlder(async (req, res) => {
  const { name, year, writer } = req.body;
  console.log(req.file);

  // const { filename } = req.file;
  // const pdf = await PDFDocument.load(req.file.filename);
  // console.log(pdf);
  // const fileUrl = path.join(
  //   __dirname,
  //   "../public/uploads/pdf/class-5-1655216876057.pdf"
  // );
  // console.log("fileurl :", fileUrl);
  // pdfjsLib.getDocument(fileUrl).promise.then((pdfDoc_) => {
  //   const pdfDoc = pdfDoc_;
  //   console.log(pdfDoc);
  // });
  // console.log(doc);

  if (!name && !year && !writer && !filename) {
    res.status(400);
    throw new Error("Please add all filed");
  }

  const newBook = await Book.create({
    user: req.user.id,
    name,
    year,
    // book: filename,
    writer,
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
  getSignleBook,
  createBook,
  updateBook,
  deleteBook,
};
