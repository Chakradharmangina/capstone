const express = require("express");

let Controllers = {};

Controllers.login = async function (req, res) {
  res.send("userlogin");
};

module.exports = Controllers;
