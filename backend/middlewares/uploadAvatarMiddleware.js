const multer = require("multer");
const path = require("path");

// file upload folder
const UPLOADS_FOLDER = "./public/uploads/avatar";

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
  limits: {
    fileSize: 1000 * 1000,
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "avatar") {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("only .png, .jpg and .jpeg format allowed"));
      }
    } else {
      cb(new Error("There was an unknown error!"));
    }
  },
});

module.exports = upload;
