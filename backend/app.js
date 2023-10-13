const path = require("path");
const dotenv = require("dotenv").config();
const cors = require("cors");
const express = require("express");
const fileUpload = require("express-fileupload");
const database = require("./configs/database");
const errorHandler = require("./middlewares/errorMiddleware");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "./temp"),
  })
);

// routes
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/books", require("./routes/bookRoute"));

// error handler
app.use(errorHandler);

// port
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await database(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
