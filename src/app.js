const express = require("express");
const { compile } = require;
("morgan");
const morgan = require("morgan");
const app = express();

//init middlewares
// app.use(morgan("dev"));
app.use(morgan("combined"));
// morgan("common");
// morgan("short");
// morgan("tiny");
// init db

//init routes
app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "welcome to nodejs architecture",
  });
});
// handling error

module.exports = app;
