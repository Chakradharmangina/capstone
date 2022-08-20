const express = require("express");
const app = express();
const bp = require("body-parser");
app.use(bp.json());
const mongoose = require("mongoose");
const Controllers = require("../../controllers/userControllers");

app.post("/signUp", Controllers.usersignup);

app.post("/signIn", Controllers.usersignin);

app.get("/logout", Controllers.userlogout);

app.post("/getbycategory", Controllers.getproductbycatogry);

app.post("/addtocart", Controllers.addtocart);

app.post("/checkout", Controllers.confirmcheckout);

app.post("/changequantity", Controllers.quantitychange);

app.post("/addtowishlist", Controllers.addtowishlist);

app.post("/productdetails", Controllers.getproductdata);

mongoose
  .connect("mongodb://localhost:27017/Practice")
  .then((res) => console.log("Connected to DB!"))
  .catch((err) => console.log(err));

module.exports = app;
