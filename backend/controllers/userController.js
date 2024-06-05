const asyncHanlder = require("express-async-handler");
const User = require("../models/userModel");

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

  // create user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: user.generateToken(),
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

  if (user && (await user.isValidPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: user.generateToken(),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// profile
const profile = asyncHanlder(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(req.user);
});

// edit profile
const updateProfile = asyncHanlder(async (req, res) => {
  const { name, password } = req.body;
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  // Update the user's properties
  user.name = name;
  user.password = password;

  // save updated properties
  const updatedUser = await user.save();
  // Select all fields except for the password
  const userWithoutPassword = await User.findById(updatedUser._id).select(
    "-password"
  );

  res.status(200).json(userWithoutPassword);
});

module.exports = {
  registerUser,
  loginUser,
  profile,
  updateProfile,
};
