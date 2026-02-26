"use strict";
const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // check email exist
      const holderEmail = await shopModel.findOne({ email }).lean(); // lean giảm tải size
      console.log(`holderEmail::`, holderEmail);
      if (holderEmail) {
        return {
          code: 500,
          message: "Shop already registered!",
        };
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const roles = [RoleShop.SHOP];
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles,
      });
      if (newShop) {
        // created  privateKey, publicKey
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
        });

        console.log(privateKey.export({ type: "pkcs1", format: "pem" }));
        console.log(publicKey.export({ type: "pkcs1", format: "pem" }));

        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey: publicKey.export({ type: "pkcs1", format: "pem" }),
        });
        if (!publicKeyString) {
          return {
            code: "xxxx",
            message: "publicKeyString error",
          };
        }
        // create token pair
        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publicKey,
          privateKey,
        );
        console.log(`Created Token Success::`, tokens);
        return {
          code: 201,
          metadata: {
            shop: newShop,
            tokens,
          },
        };
      }
      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: 500,
        message: error.message,
        status: "error",
      };
    }
  };
}
module.exports = AccessService;
