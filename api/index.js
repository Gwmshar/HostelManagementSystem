const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const Route = require("./routes/Routes.js");
const cookieParser = require("cookie-parser");

const app = express();
const corsOrigin = {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOrigin));
app.use(express.json());
app.use(cookieParser());

app.use("/", Route);
app.listen(process.env.port);

mongoose
  .connect(process.env.mongo_db_url)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Error in database");
  });
