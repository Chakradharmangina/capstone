const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  email: {
    type: String,
    required: [true, "enter email ! email is mandatory"],
    unique: true,
    validate: {
      validator: function (exp) {
        return /[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]{2,3}$/.test(exp);
      },
      message: (property) => `${property.value} is not valid`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: String,
    required: true,
  },
});

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "enter email ! email is mandatory"],
    unique: true,
    validate: {
      validator: function (exp) {
        return /[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]{2,3}$/.test(exp);
      },
      message: (property) => `${property.value} is not valid`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
  },
  phonenumber: {
    type: Number,
  },
  gender: {
    type: String,
  },
  itemsincart: [{ type: Object }],
  itemsinwishlist: [{ type: Object }],
  orderlist: [{ type: Object }],
  discount_coupon: {
    type: Number,
  },
});
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    imagename: {
      type: String,
    },
    shipping: {
      required: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

const SalesSchema = new Schema({
  // productname,quantitysold,price,revenu(total price),date of purches,
  productname: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  dateofpurches: {
    type: String,
    required: true,
  },
  revenugenerated: {
    type: Number,
    required: true,
  },
});

const SalesModel = mongoose.model("SalesModel", SalesSchema);

const UserModel = mongoose.model("UserModel", UserSchema);

const AdminModel = mongoose.model("AdminModel", AdminSchema);

const ProductModel = mongoose.model("ProductModel", productSchema);

module.exports = { UserModel, AdminModel, ProductModel, SalesModel };
