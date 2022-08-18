const express = require("express");
const app = express();
const { createProxyMiddleware } = require("http-proxy-middleware");
const configr = require("./configr");

const mongoose = require("mongoose");

app.use(
  "/admin",
  createProxyMiddleware({
    target: configr.adminServiceURL,
    pathRewrite: { "^/admin": "/" },
    changeOrigin: true,
  })
);

app.use(
  "/user",
  createProxyMiddleware({
    target: configr.adminServiceURL,
    pathRewrite: { "^/user": "/" },
    changeOrigin: true,
  })
);

mongoose
  .connect("mongodb://localhost:27017/Practice")
  .then((res) => console.log("Connected to DB!"))
  .catch((err) => console.log(err));

module.exports = app;
