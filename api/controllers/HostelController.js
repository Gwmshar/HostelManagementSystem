const { Hroom } = require("../models/HostelRoom");
const { Hallocation } = require("../models/HostelAllocation");
const { People } = require("../models/PeopleSchema");

module.exports.Check = async (req, res) => {
  try {
    const { email, hostelName, hostelRoom } = req.body;
    const isValided = await Hroom.find({ hostelName, hostelRoom });
    if (isValided.length > 0) {
      const isEmail = await People.find({ email });
      const isMax = await People.find({ hostelName, roomNo: hostelRoom });
      if (isMax.length == isValided[0].capacity) {
        return res.json({ find: false, message: "Room is already fill up" });
      }
      if (isEmail.length > 0 && isEmail[0].email == email) {
        return res.json({ find: false, message: "Email is already taken" });
      }
      return res.json({ find: true, message: "There is no conflict" });
    } else {
      const isHostelName = await Hroom.find({ hostelName });
      const isHostelNumber = await Hroom.find({ hostelRoom });
      if (isHostelName.length == 0) {
        return res.json({
          find: false,
          message: "This hostel name is not exist",
        });
      }
      if (isHostelNumber.length == 0) {
        return res.json({
          find: false,
          message: "This room number is not exist",
        });
      }
      return res.json({ find: false, message: "There is conflict" });
    }
  } catch (err) {
    return res.json("Error");
  }
};

module.exports.HostelAssign = async (req, res) => {
  try {
    const { studentId, hostelName, hostelRoom } = req.body;
    const hallocation = await Hallocation.create({
      studentId,
      hostelName,
      hostelRoom,
    });
    return res.json(hallocation);
  } catch (err) {
    return res.json("Error");
  }
};

module.exports.RoomCheck = async (req, res) => {
  try {
    const { roomNo, hostelName } = req.body;
    const result = await People.find({ roomNo, hostelName });
    res.json(result);
  } catch (err) {
    res.json("Error");
  }
};
