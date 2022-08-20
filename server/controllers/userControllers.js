const express = require("express");
const { UserModel, AdminModel, ProductModel } = require("../models/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let Controllers = {};

Controllers.usersignup = async function (req, res) {
  const data = req.body;
  try {
    const user = await UserModel.findOne({ email: data.email });
    if (user) {
      res.status(404).send({ msg: "user already exists", status: false });
    } else {
      const hashedpwd = await bcrypt.hash(data.password, 5);
      const generatedtoken = jwt.sign({ email: data.email }, "jamesbond", {
        expiresIn: "1h",
        algorithm: "HS512",
        issuer: "charan",
      });
      const result = await UserModel.create({
        email: data.email,
        password: hashedpwd,
        username: data.username,
      });
      res.status(201).send({
        msg: "signup successfully",
        status: true,
        token: generatedtoken,
      });
    }
  } catch (err) {
    res
      .status(404)
      .send({ msg: "unknown error occured", status: false, err: err });
  }
};

Controllers.usersignin = async function (req, res) {
  const data = req.body;
  try {
    const user = await UserModel.findOne({ email: data.email });
    if (user) {
      const comparison = await bcrypt.compare(data.password, user.password);
      if (comparison) {
        const generatedtoken = jwt.sign({ email: data.email }, "chakradhar", {
          expiresIn: "1h",
          algorithm: "HS512",
          issuer: "charan",
        });
        res.status(200).send({
          username: user.username,
          msg: "login successfull",
          status: true,
          useremail: user.email,
          token: generatedtoken,
        });
      } else {
        res.send({
          msg: "login is not successfull , please check your password",
          status: false,
        });
      }
    } else {
      res.send({
        msg: "email does not exist, please register",
        status: false,
      });
    }
  } catch (err) {
    res.send(err);
  }
};

Controllers.userlogout = async function (req, res) {
  let data = req.body;
  try {
    res.send({ message: "Logout Sucessfull" });
  } catch {
    (err) => {
      res.send({ msg: "error in logout", status: false });
    };
  }
};

Controllers.getproductbycatogry = async function (req, res) {
  let category = req.body.category;
  try {
    if (category) {
      let products = await ProductModel.find({ category: category });
      res.send({ products: products });
    } else {
      res.ssend({ msg: "please provide product category" });
    }
  } catch {
    (err) => {
      console.log(err);
    };
  }
};

Controllers.addtocart = async function (req, res) {
  const { email, quantity, productname } = req.body;
  try {
    let product = await ProductModel.findOne({ name: productname });
    let userdata = await UserModel.findOne({ email: email });
    if (userdata) {
      let itemexist = userdata.itemsincart.find((i) => i.name == productname);
      if (!itemexist) {
        const result = await UserModel.findOneAndUpdate(
          { email: email },
          {
            $push: {
              itemsincart: {
                name: productname,
                price: product.price,
                description: product.description,
                category: product.category,
                quantity: quantity ? quantity : 1,
              },
            },
          },
          { new: true }
        );
        let products = result.itemsincart;
        res.send({
          username: result.username,
          msg: "Product Added to Cart",
          itemsincart: { products },
        });
      } else {
        res.send({ msg: "item already present in cart", status: false });
      }
    } else {
      res.send({ msg: "user doesnot exist" });
    }
  } catch {
    (err) => {
      console.log(err);
    };
  }
};

Controllers.confirmcheckout = async function (req, res) {
  try {
    const { productname, quantity, email } = req.body;
    let productdata = await ProductModel.findOne({ name: productname });
    if (productdata.quantity - quantity >= 0) {
      let data = await ProductModel.findOneAndUpdate(
        { _id: productdata._id },
        {
          $set: {
            sold: productdata.sold + quantity,
            quantity: productdata.quantity - quantity,
          },
        }
      );
      let orders = await UserModel.findOneAndUpdate({
        $push: {
          orderlist: {
            name: productdata.name,
            description: productdata.description,
            price: productdata.price,
          },
        },
      });
      res.send({ msg: "Order Has Been Placed" });
    } else {
      res.send({
        msg: `You are not able to purches ${quantity} products since there exist only ${productdata.quantity}`,
      });
    }
  } catch {
    (err) => {
      console.log(err);
    };
  }
};

Controllers.quantitychange = async function (req, res) {
  try {
    const { quantity, email, productname } = req.body;
    let userdata = await UserModel.findOne({ email: email });
    const data = userdata.itemsincart.find((i) => i.name === productname);
    if (data) {
      await UserModel.findOneAndUpdate(
        { id: userdata._id },
        { $set: { "itemsincart.$.quantity": quantity } }
      );
      res.send({ msg: "quantity changed" });
    } else {
      res.send({ msg: "item doesn't exist in cart" });
    }
  } catch {
    (err) => {
      console.log(err);
    };
  }
};

Controllers.addtowishlist = async function (req, res) {
  const { productname, email, quantity } = req.body;
  try {
    let productdata = await ProductModel.findOne({ name: productname });
    let userdata = await UserModel.findOne({ email: email });
    let itemexist = userdata.itemsinwishlist.find((i) => i.name == productname);
    if (!itemexist) {
      const result = await UserModel.findOneAndUpdate(
        { email: email },
        {
          $push: {
            itemsinwishlist: {
              name: productname,
              price: productdata.price,
              description: productdata.description,
              category: productdata.category,
              quantity: quantity ? quantity : 1,
            },
          },
        },
        { new: true }
      );
      let products = result.itemsinwishlist;
      res.send({
        username: result.username,
        msg: "Product Added to Cart",
        itemsinwishlist: { products },
      });
    } else {
      res.send({ msg: "item already present in cart", status: false });
    }
  } catch {
    (err) => {
      console.log(err);
    };
  }
};

Controllers.getproductdata = async function (req, res) {
  const { productname, category } = req.body;
  try {
    let productdata = await ProductModel.findOne({ name: productname });
    let similarproducts = await ProductModel.find({ category: category });
    res.send({
      productdata: productdata,
      similarproducts: similarproducts,
      status: true,
    });
  } catch {
    (err) => {
      console.log(err);
    };
  }
};

module.exports = Controllers;
