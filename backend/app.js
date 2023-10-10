require("dotenv").config();
const cors = require("cors");
const express = require("express");

const connectDB = require("./configs/db");
const errorHandler = require("./middlewares/errorMiddleware");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/books", require("./routes/bookRoute"));
app.use("/api/user", require("./routes/userRoute"));

app.get("/", (req, res) => {
  res.send("Hello world");
});

// error handler
app.use(errorHandler);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
