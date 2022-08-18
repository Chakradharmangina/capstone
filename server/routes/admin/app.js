const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var jp = bodyParser.json();
var urlencoded = bodyParser.urlencoded({ extended: false });
// app.use(bp.urlencoded({ extended: false }));

const Controllers = require("../../controllers/adminControllers");

app.post("/createuser", urlencoded, Controllers.createuser);

app.post("/readuser", Controllers.readuser);

app.post("/updateuser", Controllers.updateuser);

app.post("/delectuser", Controllers.delectuser);

app.post("/createproduct", Controllers.createproduct);

app.post("/readproduct", Controllers.readproduct);

app.post("/delectproduct", Controllers.delectproduct);

app.post("/updateproduct", Controllers.updateproduct);

app.post("/uploadcsvdata", Controllers.insertbulkdata);

// app.use(bp.json());

module.exports = app;
