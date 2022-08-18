const express = require("express");
const app = express();
const router = express.Router();
const Controllers = require("../../controllers/userControllers");

app.get("/", (req, res) => {
  res.send("student service");
});

module.exports = app;
