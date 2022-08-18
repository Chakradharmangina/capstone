const express = require("express");

let Controllers = {};

Controllers.login = async function (req, res) {
  res.send("login api");
};

Controllers.signup = async function (req, res) {
  res.send("signup api");
};

Controllers.logout = async function (req, res) {
  res.send("logout api");
};

Controllers.createuser = async function (req, res) {
  try {
    console.log(req.body);
    res.send("createuser api");
  } catch {
    (err) => {
      console.log(err);
    };
  }
};

Controllers.readuser = async function (req, res) {
  res.send("readuserapi api");
};

Controllers.updateuser = function (req, res) {
  console.log(req.body);
  res.send("updateuser api");
};

Controllers.delectuser = async function (req, res) {
  res.send("deleteuser api");
};

Controllers.createproduct = async function (req, res) {
  res.send("createproduct api");
};

Controllers.readproduct = async function (req, res) {
  res.send("read product api");
};

Controllers.updateproduct = async function (req, res) {
  res.send("update product api");
};

Controllers.delectproduct = async function (req, res) {
  res.send("delect product api");
};

Controllers.insertbulkdata = async function (req, res) {
  try {
    let data = req.body.csvdata;
    await tcsvmodle.collection.insertMany(data);
    res.send({ msg: "cvs data is inserted" });
  } catch {
    (err) => {
      console.log(err);
    };
  }
};

module.exports = Controllers;
