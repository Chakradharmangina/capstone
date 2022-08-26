const express = require("express");
const app = express();
const bp = require("body-parser");
app.use(bp.json());
const router = express.Router();
const mongoose = require("mongoose");
const Controllers = require("../../controllers/userControllers");
const cors = require("cors");
app.use(cors());

app.post("/signUp", Controllers.usersignup);

//chakradhar routes//
app.post("/signIn", Controllers.usersignin);

app.get("/logout", Controllers.userlogout);

app.get("/getProducts", Controllers.userGetProducts);

app.post("/getbycategory", Controllers.getproductbycatogry);

app.post("/addtocart", Controllers.addtocart);

app.post("/checkout", Controllers.confirmcheckout);

// app.post("/changequantity", Controllers.quantitychange);

app.post("/addtowishlist", Controllers.addtowishlist);

app.post("/productdetails", Controllers.getproductdata);

app.post("/getWishlistItems", Controllers.getwishlistitems);

app.post("/getCartItems", Controllers.getcartitems);

app.post("/toggleWishlisted/:name", Controllers.toggle);

app.post("/removecartitem", Controllers.removecartitem);

app.post("/removewishlistitem", Controllers.removewishlistitem);

app.post("/changequantity", Controllers.quantitychange);

// app.get("/getWishlisted",Controllers.getAllWishlisted)

mongoose
  .connect("mongodb://localhost:27017/Practice")
  .then((res) => console.log("Connected to DB!"))
  .catch((err) => console.log(err));

module.exports = app;
