const { People } = require("../models/PeopleSchema");
require("dotenv").config();
const jwt = require("jsonwebtoken");
module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Success: false });
  }
  jwt.verify(token, process.env.secret_key, async (err, data) => {
    if (err) {
      return res.json({ Success: false });
    } else {
      const user = await People.findById(data.id);
      if (user) {
        return res.json({ Success: true, user });
      } else {
        return res.json({ Success: false });
      }
    }
  });
};
