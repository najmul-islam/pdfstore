const asyncHanlder = require("express-async-handler");
const bcrypt = require("bcrypt");
const generateToken = require("../configs/generateToken");
const User = require("../models/userModel");
const Book = require("../models/bookModel");

// register user
const registerUser = asyncHanlder(async (req, res) => {
  const { name, email, password } = req.body;

  if ((!name, !email, !password)) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// login user
const loginUser = asyncHanlder(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// profile
const profile = asyncHanlder(async (req, res) => {
  res.status(200).json(req.user);
});

// avatar upoald
const createAvatar = asyncHanlder(async (req, res) => {
  const { _id } = req.user;
  const { filename } = req.file;
  const user = await User.findById({ _id }).select("-password");

  if (!user) {
    res.status(400);
    throw new Error("There no user");
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id },
    { avatar: filename },
    {
      runValidators: true,
      new: true,
    }
  );

  res.status(200).json(updatedUser);
});

// user books
const userBooks = asyncHanlder(async (req, res) => {
  const userBooks = await Book.find({ user: req.params.id });

  res.status(200).json(userBooks);
});

module.exports = {
  registerUser,
  loginUser,
  userBooks,
  createAvatar,
  profile,
};
