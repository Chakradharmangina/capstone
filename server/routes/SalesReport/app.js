const express = require("express");
const app = express();
const bp=require("body-parser")
app.use(bp.json());
const router = express.Router();
const mongoose = require("mongoose");
const Controllers = require("../../controllers/adminControllers");
const cors = require("cors");
app.use(cors());

app.get("/getAllProducts", Controllers.adminGetProducts);
app.post("/changeDiscountCoupon/:userid",Controllers.changeCoupon);

mongoose
  .connect("mongodb://localhost:27017/Practice")
  .then((res) => console.log("Connected to DB!"))
  .catch((err) => console.log(err));

module.exports = app;
