"use strict";
const JWT = require("jsonwebtoken");
const createTokenPair = async (payload, publicKey, privateKey) => {
  // publicKey for verify token

  try {
    // accessToken
    //     privateKey không lưu vào database, chỉ diễn ra một lần khi chúng ta login thành công, nó sẽ đẩy qua browser
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: "2 days",
    });
    // refreshToken
    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log(`err verify::`, err);
      } else {
        console.log(`decoded verify`, decode);
      }
    });
    return { accessToken, refreshToken };
  } catch (error) {
    return error;
  }
};

module.exports = {
  createTokenPair,
};
