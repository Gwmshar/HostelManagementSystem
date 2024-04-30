const mongoose = require("mongoose");

const hRoomSchema = mongoose.Schema({
  hostelName: String,
  hostelRoom: Number,
  capacity: Number,
});

module.exports.Hroom = mongoose.model("hostelroom", hRoomSchema);
