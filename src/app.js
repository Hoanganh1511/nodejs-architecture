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

//init routes
app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "welcome to nodejs architecture",
  });
});
app.get("/data", (req, res) => {
  const bigData = {
    users: Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      address: `123 Street ${i}, City, Country`,
    })),
  };
  res.status(200).json({ bigData });
});
// handling error

module.exports = app;
