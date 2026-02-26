const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const { compile } = require;
("morgan");
const morgan = require("morgan");
const app = express();

//init middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

// init db
require("./dbs/init.mongodb");
const { checkOverloadConnect } = require("./helpers/check.connect");
checkOverloadConnect();
//init routes
app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "welcome to nodejs architecture",
  });
});

// handling error

module.exports = app;
