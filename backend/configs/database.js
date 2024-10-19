const mongoose = require("mongoose");

const connectDB = async (url) => {
  const conn = await mongoose.connect(url);
  console.log(`mongodb connected`);
  return conn;
};

module.exports = connectDB;
