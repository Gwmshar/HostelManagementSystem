const mongoose = require("mongoose");

const hostelAllocationSchema = mongoose.Schema({
  studentId: {
    type: String,
    require: true,
  },
  hostelName: {
    type: String,
    require: true,
  },
  hostelRoom: {
    type: Number,
    require: true,
  },
});

module.exports.Hallocation = mongoose.model(
  "hostelallocation",
  hostelAllocationSchema
);
