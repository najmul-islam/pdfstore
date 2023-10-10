const multer = require("multer");
const path = require("path");

// file upload folder
const UPLOADS_FOLDER = "./public/uploads/pdf";

// define the storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(/[ .:;?!~,_`"&|()<>{}\[\]\r\n/\\]+/)
        .join("-") +
      "-" +
      Date.now();

    cb(null, fileName + fileExt);
  },
});

// prepare the final multer upoad object
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "book") {
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("only .pdf format allowed"));
      }
    } else {
      cb(new Error("There was an unknown error!"));
    }
  },
});

module.exports = upload;
