const express = require("express");
const app = express();
const bp = require("body-parser");
app.use(bp.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());

const Controllers = require("../../controllers/adminControllers");

app.post("/signUp", Controllers.adminSignup);

app.post("/signIn", Controllers.adminSignin);

app.get("/logout", Controllers.adminLogOut);

app.post("/createUserAccount", authorize, Controllers.adminCreateUser); //Route for creating new user account by Admin!

app.put("/updateUserEmail/:email", authorize, Controllers.adminUpdateUserEmail); //Route for updating email in case email id of user changes!

app.get("/readUserDetails/:email", Controllers.adminUserDetails); //Route for reading User Account Details.

app.delete("/deleteUser/:email", Controllers.adminDeleteUser); //Route for deleting user account by Admin!

app.post("/createProduct", Controllers.adminCreateProduct);

app.get("/getProducts", Controllers.adminGetProducts);

app.delete("/deleteProduct/:name", authorize, Controllers.adminDeleteProduct);

app.put("/updateProduct/:name", authorize, Controllers.adminUpdateProduct);

app.get("/getUsers", authorize, Controllers.adminUsers);

app.get("/getUserById/:id", Controllers.getUserByid);

app.post("/changeDiscountCoupon/:userid", Controllers.changeCoupon);

app.post("/uploadcsvdata", Controllers.insertbulkdata);

app.post("/getsalesreport", Controllers.getsalesreport);

mongoose
  .connect("mongodb://localhost:27017/Practice")
  .then((res) => console.log("Connected to DB!"))
  .catch((err) => console.log(err));

function authorize(req, res, next) {
  try {
    let reqtoken = req.headers["authorization"];
    const token = reqtoken.replace("Bearer ", "");
    const verifiedToken = jwt.verify(token, "jamesbond");
    req.token = verifiedToken;
    next();
    return;
  } catch (err) {
    res.send({ msg: "you are not authorized", status: false });
  }
}

module.exports = app;
