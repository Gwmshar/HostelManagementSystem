const mongoose = require("mongoose");

const peopleSchema = mongoose.Schema({
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
  role: String,
  semester: {
    type: Number,
    require: true,
  },
  branch: {
    type: String,
    require: true,
  },
});

module.exports.People = mongoose.model("People", peopleSchema);
