const express = require("express");
const {
  UserModel,
  AdminModel,
  ProductModel,
  SalesModel,
} = require("../models/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey2 = "martini";
let Controllers = {};
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dumd90678@gmail.com",
    pass: "mkraucdkblknqzxi",
  },
});

Controllers.usersignup = async function (req, res) {
  const data = req.body;
  console.log(data.email);
  try {
    const user = await UserModel.findOne({ email: data.email });
    if (user) {
      res.status(404).send({ msg: "user already exists", status: false });
    } else {
      const hashedPassword = await bcrypt.hash(data.password, 5);
      const result = await UserModel.create({
        email: data.email,
        password: hashedPassword,
        username: data.username,
        itemsincart: data.itemsincart,
      });
      res.status(201).send({ msg: "signup successfull", status: true });
    }
  } catch (err) {
    console.log(err);
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
        const generatedtoken = jwt.sign({ email: data.email }, privateKey2, {
          expiresIn: "72h",
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
                coupons: userdata.discount_coupon || 0,
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

Controllers.removecartitem = async function (req, res) {
  try {
    const { email, productname } = req.body;
    let removeitem = await UserModel.findOne({ email: email });
    let newdata = removeitem.itemsincart.filter((ii) => {
      if (ii.name.toLowerCase() != productname.toLowerCase()) {
        return ii;
      }
    });
    await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { itemsincart: newdata } }
    );
    res.send({ msg: "item removed from cart", status: true });
  } catch {
    (err) => console.log(err);
  }
};

Controllers.removewishlistitem = async function (req, res) {
  try {
    const { email, productname } = req.body;
    let removeitem = await UserModel.findOne({ email: email });
    let newdata = removeitem.itemsinwishlist.filter((ii) => {
      if (ii.name != productname) {
        return ii;
      }
    });
    let newitems = await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { itemsinwishlist: newdata } },
      { new: true }
    );

    if (newdata.length < removeitem.itemsinwishlist.length) {
      res.send({ msg: "item removed from wishlist", status: true });
    } else {
      res.send({
        msg: "The item doesn't exist in Whishlist U can Add",
        status: false,
      });
    }
  } catch {
    (err) => console.log(err);
  }
};

Controllers.quantitychange = async function (req, res) {
  try {
    const { quantity, email, productname } = req.body;
    let productdata = await ProductModel.findOne({ name: productname });
    if (productdata.quantity >= quantity) {
      let data = await UserModel.findOneAndUpdate(
        { email: email, "itemsincart.name": productname },
        { $set: { "itemsincart.$.quantity": quantity } },
        { new: true }
      );
      res.send({ msg: "quantity changed", status: true });
    } else {
      res.send({
        status: false,
        msg: `You are not able to add ${quantity} products to cart since there exist only ${productdata.quantity}`,
      });
    }
  } catch {
    (err) => {
      console.log(err);
    };
  }
};

Controllers.confirmcheckout = async function (req, res) {
  try {
    // const { productname, quantity, email } = req.body;
    const { email, total } = req.body;
    let totalorder = [];
    let userdata = await UserModel.findOne({ email: email });
    if (userdata.itemsincart.length > 0) {
      userdata.itemsincart.map(async (i) => {
        let quantity = i.quantity;
        let productname = i.name;
        let productdata = await ProductModel.findOne({ name: productname });
        if (productdata.quantity - quantity > 10) {
          let data = await ProductModel.findOneAndUpdate(
            { _id: productdata._id },
            {
              $set: {
                sold: productdata.sold + quantity,
                quantity: productdata.quantity - quantity,
              },
            }
          );
          let orders = await UserModel.findOneAndUpdate(
            { email: email },
            {
              $push: {
                orderlist: {
                  name: productdata.name,
                  description: productdata.description,
                  price: productdata.price * quantity,
                  quantity: quantity,
                },
              },
            }
          );
          let reportexist = await SalesModel.findOne({
            productname: productname,
          });
          if (!reportexist) {
            let salesreport = await SalesModel.create({
              productname: productname,
              quantity: quantity,
              price: productdata.price,
              dateofpurches: Date(Date.now()),
              revenugenerated: productdata.price * quantity,
            });
          } else {
            await SalesModel.findOneAndUpdate(
              { productname: productname },
              {
                $set: {
                  quantity: reportexist.quantity + quantity,
                  dateofpurches: Date(Date.now()),
                  revenugenerated:
                    productdata.price * (reportexist.quantity + quantity),
                },
              }
            );
          }
          let deleteitem = await UserModel.findOneAndUpdate(
            { email: email },
            { $pull: { itemsincart: { name: productname } } }
          );
          // res.send({ msg: `Order Has Been Placed,item:${productname}` });
          totalorder.push(productname);
        } else if (productdata.quantity - quantity >= 0) {
          let admins = await AdminModel.find({});
          admins.map((i) => {
            var mailOptions = {
              from: "dumd90678@gmail.com",
              to: `${i.email}`,
              subject: `stock for the product ${productname} is less than 10`,
              html: `<h3>There Exist Only ${
                productdata.quantity - quantity
              } items for ${productname}</h3><h4>Please add the stock</h4>`,
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
          });
          let data = await ProductModel.findOneAndUpdate(
            { _id: productdata._id },
            {
              $set: {
                sold: productdata.sold + quantity,
                quantity: productdata.quantity - quantity,
              },
            }
          );
          let orders = await UserModel.findOneAndUpdate(
            { email: email },
            {
              $push: {
                orderlist: {
                  name: productdata.name,
                  description: productdata.description,
                  price: productdata.price * quantity,
                  quantity: quantity,
                },
              },
            }
          );
          let reportexist = await SalesModel.findOne({
            productname: productname,
          });
          if (!reportexist) {
            let salesreport = await SalesModel.create({
              productname: productname,
              quantity: quantity,
              price: productdata.price,
              dateofpurches: Date(Date.now()),
              revenugenerated: productdata.price * quantity,
            });
          } else {
            await SalesModel.findOneAndUpdate(
              { productname: productname },
              {
                $set: {
                  quantity: reportexist.quantity + quantity,
                  dateofpurches: Date(Date.now()),
                  revenugenerated:
                    productdata.price * (reportexist.quantity + quantity),
                },
              }
            );
          }
          let deleteitem = await UserModel.findOneAndUpdate(
            { email: email },
            { $pull: { itemsincart: { name: productname } } }
          );
          // res.send({
          //   msg: "Order is placed but stock is less than 10 send mail",
          //   ProductName: productdata.name,
          // });
          totalorder.push(productname);
        } else {
          res.send({
            msg: `You are not able to purches ${quantity} products since there exist only ${productdata.quantity}`,
          });
        }
      });
      res.send({ msg: `order placed ${totalorder}`, status: true });
    } else {
      res.send("no items in cart");
    }
  } catch {
    (err) => {
      console.log(err);
    };
  }
};

// Controllers.quantitychange = async function (req, res) {
//   try {
//     const { quantity, email, productname } = req.body;
//     let userdata = await UserModel.findOne({ email: email });
//     const data = userdata.itemsincart.find((i) => i.name === productname);
//     if (data) {
//       await UserModel.findOneAndUpdate(
//         { id: userdata._id },
//         { $set: { "itemsincart.$.quantity": quantity } }
//       );
//       res.send({ msg: "quantity changed" });
//     } else {
//       res.send({ msg: "item doesn't exist in cart" });
//     }
//   } catch {
//     (err) => {
//       console.log(err);
//     };
//   }
// };

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
              imagename: productdata.imagename,
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
      }); //res.sending an array of object of all products in wishlist of that user
      //structure of wishlist is name,price,description,category,quantity
    } else {
      res.send({ msg: "item already present in wishlist", status: false });
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

Controllers.toggle = async function (req, res) {
  const Name = req.params.name;
  try {
    const result = await ProductModel.findOne({ name: Name });
    result.wishlisted = !result.wishlisted;
    result
      .save()
      .then((res) => console.log("Toggled!"))
      .catch((err) => console.log(err));
    res.send(result);
  } catch (err) {
    res.send({ msg: "Error Occured", error: err });
  }
};

// Controllers.getAllWishlisted=async function(req,res){
//   try{
//       const result=await ProductModel.find({wishlisted:true})
//       res.send(result)

//   }
//   catch(err){
//       res.send({msg:"Error Occured",error:err})
//   }
// }

Controllers.userGetProducts = async function (req, res) {
  try {
    var categorylist = [];
    const result = await ProductModel.find();
    result.map((i) => {
      if (categorylist.indexOf(i.category) == -1) {
        categorylist.push(i.category);
      }
    });
    res.send({ result: result, categorylist: categorylist });
  } catch (err) {
    res.send({ msg: "Error Occured", error: err });
  }
};

////////////////////////////////////
Controllers.getcartitems = async function (req, res) {
  try {
    const { email } = req.body;
    let cartitems = await UserModel.findOne({ email: email });
    if (cartitems.itemsincart.length > 0) {
      res.send({ cartitems: cartitems.itemsincart });
    } else {
      res.send({ msg: "No Items In Cart" });
    }
  } catch {
    (err) => {
      console.log(err);
    };
  }
};
Controllers.getwishlistitems = async function (req, res) {
  try {
    const { email } = req.body;
    let wishlist = await UserModel.findOne({ email: email });
    if (wishlist.itemsinwishlist.length > 0) {
      res.send({ wishlist: wishlist.itemsinwishlist });
    } else {
      res.send({ msg: "No Items In wishlist" });
    }
  } catch {
    (err) => {
      console.log(err);
    };
  }
};

module.exports = Controllers;
