"use strict";

const mongoose = require("mongoose");
const connectString = `mongodb://localhost:27017/nodejs-architecture`;
mongoose
  .connect(connectString)
  .then(() => {
    console.log("connected to mongodb success");
  })
  .catch((err) => {
    console.log("Error Connect Database !", err);
  });
if (1 === 1) {
  mongoose.set("debug", true);
  mongoose.set("debug", { color: true });
}
