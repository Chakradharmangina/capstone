const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const Controllers = require("../../controllers/userControllers");

app.post("/", Controllers.login);

mongoose
  .connect("mongodb://localhost:27017/Practice")
  .then((res) => console.log("Connected to DB!"))
  .catch((err) => console.log(err));

module.exports = app;
