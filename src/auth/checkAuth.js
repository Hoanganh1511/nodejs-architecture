"use strict";

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};
const { findById } = require("../services/apiKey.service");
const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    console.log(`key::`, key);
    if (!key) {
      return res.json({
        message: "Forbidden Error",
        code: 403,
      });
    }
    const objKey = await findById(key);
    if (!objKey) {
      return res.status(403).json({
        message: "Forbidden Error",
        code: 403,
      });
    }
    req.objectKey = objKey;
    return next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error check apiKey",
      code: 500,
    });
  }
};

const permission = (permission) => {
  return (req, res, next) => {
    if (!req.objectKey.permissions) {
      return res.status(403).json({
        message: "Permission denied",
      });
    }
    console.log(`req.objectKey.permissions::`, req.objectKey.permissions);
    const validPermission = req.objectKey.permissions.includes(permission);
    if (!validPermission) {
      return res.status(403).json({
        message: "Permission denied",
      });
    }
    return next();
  };
};

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
module.exports = {
  apiKey,
  permission,
  asyncHandler,
};
