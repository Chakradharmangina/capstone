const express = require("express");
const {
  UserModel,
  AdminModel,
  ProductModel,
  SalesModel,
} = require("../models/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = "jamesbond";
let Controllers = {};

//Admin signup,signin and logout
Controllers.adminSignup = async function (req, res) {
  const data = req.body;
  try {
    const user = await AdminModel.findOne({ email: data.email });
    if (user) {
      res.status(404).send({ msg: "user already exists", status: false });
    } else {
      const hashedpwd = await bcrypt.hash(data.password, 5);
      const result = await AdminModel.create({
        email: data.email,
        password: hashedpwd,
        admin: data.admin,
      });
      res.status(201).send({ msg: "signup successfull", status: true });
    }
  } catch (err) {
    res
      .status(404)
      .send({ msg: "unknown error occured", status: false, err: err });
  }
};

Controllers.adminSignin = async function (req, res) {
  const data = req.body;
  try {
    const user = await AdminModel.findOne({ email: data.email });
    if (user) {
      const comparison = await bcrypt.compare(data.password, user.password);
      console.log(comparison);
      if (comparison) {
        const generatedtoken = jwt.sign({ email: data.email }, privateKey, {
          expiresIn: "72h",
          algorithm: "HS512",
        }); //generation of token
        console.log(generatedtoken);
        res.status(200).send({
          msg: "login successfull",
          status: true,
          token: generatedtoken,
        }); //this token can then be set in local storage of browser
      } else {
        res.status(404).send({
          msg: "login is not successfull,check your password",
          status: false,
        });
      }
    } else {
      res.status(404).send({
        msg: "login is notsuccessfull,email does not exists",
        status: false,
      });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

Controllers.adminLogOut = async function (req, res) {
  res.send({
    msg: "Admin has been logged out! Please click on the button below to navigate to home page.",
  });
  //A button for navigating to home page can be created in UI after calling this route.
};

//CRUD on user by admin
Controllers.adminCreateUser = async function (req, res) {
  const data = req.body;
  try {
    const user = await UserModel.findOne({ email: data.email });
    if (user) {
      res.status(404).send({ msg: "user already exists", status: false });
    } else {
      const hashedpwd = await bcrypt.hash(data.password, 5);
      const result = await UserModel.create({
        email: data.email,
        password: hashedpwd,
        username: data.username,
      });
      res.status(201).send({ msg: "User created successfully", status: true });
    }
  } catch (err) {
    res
      .status(404)
      .send({ msg: "unknown error occured", status: false, err: err });
  }
};

Controllers.getsalesreport = async function (req, res) {
  try {
    let report = await SalesModel.find({});
    res.json({ report });
  } catch {
    (err) => {
      console.log(err);
    };
  }
};

Controllers.adminUpdateUserEmail = async function (req, res) {
  const data = req.body;
  const EMAIL = req.params.email;

  try {
    const result = await UserModel.findOne({ email: EMAIL });
    console.log(result);
    result.email = data.email;
    result
      .save()
      .then((response) => res.send({ msg: "updated!" }))
      .catch((err) => console.log(err));
  } catch (err) {
    res.send(err);
  }
};

Controllers.adminUserDetails = async function (req, res) {
  const EMAIL = req.params.email;
  try {
    const result = await UserModel.findOne({ email: EMAIL });
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

Controllers.adminDeleteUser = async function (req, res) {
  const EMAIL = req.params.email;
  try {
    console.log(EMAIL);
    const result = await UserModel.deleteOne({ email: EMAIL });
    console.log(result);
    res.send(result);
  } catch (err) {
    res.send({ msg: "Error occured", error: err });
  }
};

//CRUD on products by admin
Controllers.adminCreateProduct = async function (req, res) {
  const data = req.body;
  try {
    const result = await ProductModel.create({
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      quantity: data.quantity,
      sold: data.sold,
      imagename: data.imagename,
      shipping: data.shipping,
    });
    res
      .status(201)
      .send({ msg: "Product Created Successfully!", status: true });
  } catch (err) {
    res
      .status(404)
      .send({ msg: "unknown error occured", status: false, err: err });
  }
};

Controllers.adminGetProducts = async function (req, res) {
  try {
    const result = await ProductModel.find({});
    res.send(result);
  } catch (err) {
    res.send({ msg: "Error occured", error: err });
  }
};

Controllers.adminDeleteProduct = async function (req, res) {
  const Name = req.params.name;
  try {
    console.log(Name);
    const result = await ProductModel.deleteOne({ name: Name });
    console.log(result);
    res.send(result);
  } catch (err) {
    res.send({ msg: "Error occured", error: err });
  }
};

Controllers.adminUpdateProduct = async function (req, res) {
  const data = req.body;
  const Name = req.params.name;

  try {
    const result = await ProductModel.findOne({ name: Name });
    result.price = data.price;
    result.quantity = data.quantity;
    result.sold = data.sold;
    result.shipping = data.shipping;
    result
      .save()
      .then((res) => console.log("Updated!"))
      .catch((err) => console.log(err));
    res.send(result);
  } catch (err) {
    res.send({ msg: "Error occured", error: err });
  }
};

Controllers.adminUsers = async function (req, res) {
  try {
    const result = await UserModel.find({});
    res.send(result);
  } catch (err) {
    res.send(err);
  }
};

Controllers.getUserByid = async function (req, res) {
  const ID = req.params.id;
  try {
    const result = await UserModel.find({ _id: ID });
    res.send(result);
  } catch (err) {
    res.send({ msg: "Error Occured", error: err });
  }
};

Controllers.changeCoupon = async function (req, res) {
  const id = req.params.userid;
  const data = req.body;
  try {
    const result = await UserModel.findOne({ _id: id });

    result.discount_coupon = data.discount_coupon;

    result
      .save()
      .then((res) => console.log("Coupon number updated!"))
      .catch((err) => console.log(err));
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send({ msg: "Error Occured", error: err.message });
  }
};

Controllers.insertbulkdata = async function (req, res) {
  try {
    let data = req.body.csvdata;
    await ProductModel.collection.insertMany(data);
    res.send({ msg: "cvs data is inserted" });
  } catch {
    (err) => {
      console.log(err);
    };
  }
};

module.exports = Controllers;
