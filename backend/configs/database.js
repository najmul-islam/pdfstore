const mongoose = require("mongoose");

const connectDB = async (url) => {
  const conn = await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected`);
  return conn;
};

module.exports = connectDB;
