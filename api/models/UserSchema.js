const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  roomNo: {
    type: Number,
    require: true,
  },
  rollNo: {
    type: Number,
    require: true,
  },
  hostelName: {
    type: String,
    require: true,
  },
  phoneNo: {
    type: Number,
    require: true,
  },
  semester: {
    type: Number,
    require: true,
  },
  branch: {
    type: String,
    require: true,
  },
});

module.exports.User = mongoose.model("tempUser", userSchema);
