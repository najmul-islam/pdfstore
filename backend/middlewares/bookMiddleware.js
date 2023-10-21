const asyncHanlder = require("express-async-handler");
const cloudinary = require("../configs/cloudinary");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

const bookUploader = asyncHanlder(async (req, res, next) => {
  const { title } = req.body;
  const { book } = req.files;

  if (!book) {
    res.status(400);
    throw new Error("Please add a book");
  }

  // format bytes to KB, MB, GB
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // get file size
  const bookSize = formatBytes(book.size);

  // make it databuffer
  const dataBuffer = fs.readFileSync(book.tempFilePath);

  // count pages
  const pdfData = await pdfParse(dataBuffer);
  const pdfPages = pdfData.numpages;

  // get .ext
  const extension = path.extname(book.name);

  // check file format pdf, epub, mobi, doc, docx
  const allowedExt = /pdf|epub|mobi|doc|docx/;

  if (!allowedExt.test(extension)) {
    res.status(400);
    throw new Error(
      `File format ${extension} not supported. Allowed formats are: pdf, epub, mobi, doc, docx.`
    );
  }

  const bookName =
    title
      .toLowerCase()
      .replace(/[.:;?!~,_`"&|()<>{}\[\]\r\n/\\]+/g, "")
      .split(/[ .:;?!~,_`"&|()<>{}\[\]\r\n/\\]+/)
      .join("-") +
    "-" +
    Date.now() +
    extension;
  // change name
  const coverName =
    title
      .toLowerCase()
      .replace(/[.:;?!~,_`"&|()<>{}\[\]\r\n/\\]+/g, "")
      .split(/[ .:;?!~,_`"&|()<>{}\[\]\r\n/\\]+/)
      .join("-") +
    "-" +
    Date.now();

  try {
    const bookResult = await cloudinary.uploader.upload(book.tempFilePath, {
      folder: "books",
      public_id: bookName,
      resource_type: "raw",
    });

    // delete the temporary cover image file
    if (bookResult) {
      fs.unlink(book.tempFilePath, (error) => {
        if (error) console.log(error);
      });
    }

    // give all property in req obj
    req.book_link = bookResult.secure_url;
    req.book_size = bookSize;
    req.book_pages = pdfPages;

    next();
  } catch (error) {
    console.log(error);
    next();
  }
});

module.exports = { bookUploader };
