"use strict";

const mongoose = require("mongoose");

const os = require("os");
const process = require("process");
const _SECONDS = 5000;
const countConnect = () => {
  const numConnections = mongoose.connections.length;
  console.log(`Number of active connections: ${numConnections}`);
};

// checkout overload connect
const checkOverloadConnect = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss / (1024 * 1024); // Convert to MB
    const maxConnections = numCores * 5; // Assuming each core can handle 5 connections
    // console.log(`Active connections: ${numConnections}`);
    // console.log(`memoryUsage:: ${memoryUsage / 1024 / 1024} MB`);
    if (numConnections > maxConnections) {
      console.log(
        "Overload connections detected! Consider scaling up your database or optimizing queries.",
      );
    }
  }, _SECONDS); //Monitor every 5 seconds
};

module.exports = {
  countConnect,
  checkOverloadConnect,
};
