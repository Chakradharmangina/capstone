const express = require("express");
const app = express();
const bp = require("body-parser");
app.use(bp.json());

app.post("/Login", (req, res) => {
  console.log(req.body);
  res.send("Login Api");
});

app.post("/SignUp", (req, res) => {
  res.send("Signup Api");
});

app.post("/Logout", (req, res) => {
  res.send("logout api");
});

module.exports = app;
