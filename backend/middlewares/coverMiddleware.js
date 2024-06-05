const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const pdf2image = require("pdf2image");

const coverUploader = asyncHandler(async (req, res, next) => {
  const { title } = req.body;
  const { book } = req.files;
  console.log(book);
  const outputPath = path.join(__dirname, "../public/cover");

  const conversionOptions = {
    outputFormat: "jpeg",
    quality: 100,
    density: 600,
    width: 800,
    height: 600,
    pages: "1",
  };

  try {
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    const image = await pdf2image.convertPDF(
      book.tempFilePath,
      conversionOptions
    );
    console.log("image ", image);
    const outputPathForImage = `${outputPath}/page_1.${conversionOptions.outputFormat}`;
    fs.writeFileSync(outputPathForImage, image[0]);

    const coverResult = await cloudinary.uploader.upload(outputPathForImage, {
      folder: "covers",
    });
    console.log("Image uploaded to Cloudinary:", coverResult.secure_url);

    console.log("Conversion and upload completed successfully!");
    next();
  } catch (error) {
    console.error("Error converting and uploading to Cloudinary:", error);
    next();
  }
});

module.exports = { coverUploader };
