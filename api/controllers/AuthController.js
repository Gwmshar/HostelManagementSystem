const { User } = require("../models/UserSchema");
const { People } = require("../models/PeopleSchema.js");
const { createSecretToken } = require("../utils/SecretToken.js");

module.exports.SignUp = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      roomNo,
      rollNo,
      hostelName,
      phoneNo,
      semester,
      branch,
    } = req.body;
    const existingUser = await People.findOne({ email });
    if (existingUser) {
      return res.json({ message: "Email is already in used", Success: false });
    }
    const user = await User.create({
      name,
      email,
      password,
      roomNo,
      rollNo,
      hostelName,
      phoneNo,
      semester,
      branch,
    });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "Registration Succesfull", Success: true, user });
  } catch (err) {
    console.log("Error!");
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required!" });
    }
    const user = await People.findOne({ email });
    if (!user) {
      return res.json({ message: "User is not exists!", Success: false });
    }
    if (user.password !== password) {
      return res.json({
        message: "Email or password is not correct",
        Success: false,
      });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: false,
    });
    res.status(201).json({ message: "Login Succesfull", Success: true, user });
  } catch (err) {
    console.log("Error");
  }
};
