const { People } = require("../models/PeopleSchema");
const { User } = require("../models/UserSchema");
const { Hallocation } = require("../models/HostelAllocation");

module.exports.Find = async (req, res) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (err) {
    console.log("Error");
  }
};

module.exports.UserAssign = async (req, res) => {
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
    const user = await People.create({
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
    return res.json(user);
  } catch (err) {
    console.log("Error");
  }
};

module.exports.AssignDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findByIdAndDelete(id);
    res.json(result);
  } catch (err) {
    console.log("Error");
  }
};

module.exports.GetStudents = async (req, res) => {
  try {
    let arr = [];
    const result = await People.find({});
    result.forEach((a) => {
      if (!a.role || a.role != "admin") {
        arr = [...arr, a];
      }
    });
    res.json(arr);
  } catch (err) {
    console.log("Error");
  }
};

module.exports.StudentSearch = async (req, res) => {
  try {
    let { search } = req.body;
    let arr = [];
    let name = [];
    let room = [];
    if (search == "") {
      name = await People.find({});
    } else {
      name = await People.find({ name: search });
      if (name.length == 0) {
        search = parseInt(search);
        if (!isNaN(search)) {
          room = await People.find({ roomNo: search });
        }
      }
    }
    if (name.length != 0 || room.length != 0) {
      if (name.length != 0) {
        name.forEach((a) => {
          if (!a.role || a.role != "admin") {
            arr = [...arr, a];
          }
        });
      }
      if (room.length != 0) {
        room.forEach((a) => {
          if (!a.role || a.role != "admin") {
            arr = [...arr, a];
          }
        });
      }
    }
    res.json(arr);
  } catch (err) {
    console.log("Error happen");
  }
};

module.exports.PeopleDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await People.findByIdAndDelete(id);
    const hresult = await Hallocation.find({ studentId: id });
    const hdelete = await Hallocation.findByIdAndDelete(hresult[0]._id);
    res.json(hdelete);
  } catch (err) {
    console.log("Error");
  }
};

module.exports.UserDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findByIdAndDelete(id);
    res.json(result);
  } catch (err) {
    console.log("Error");
  }
};
