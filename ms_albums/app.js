var express = require("express");
require("dotenv").config();

var indexRouter = require("./routes/index");

var app = express();

app.use("/", indexRouter);

module.exports = app;
