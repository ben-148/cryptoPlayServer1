const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const usersServiceModel = require("../../model/usersService/usersService");
const tokenService = require("../token/tokenService");
const normalizeUserFromGoogle = require("./normalizeUserFromGoogle");
const hashService = require("../hash/hashService");
const CustomError = require("../../utils/CustomError");

const router = express.Router();
const client_id =
  "98301646426-vtr27r525743f73eke9rbhm7dqahnf48.apps.googleusercontent.com";
const client_secret = "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";
const client = new OAuth2Client(client_id, client_secret);

router.get("/google-login", (req, res) => {
  const redirect_uri = "http://localhost:8181/google/google-callback";
  const authorizeUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: ["email", "profile"],
    redirect_uri: redirect_uri,
  });
  res.redirect(authorizeUrl);
});

router.get("/google-callback", async (req, res) => {
  const { code } = req.query;

  try {
    const redirect_uri = "http://localhost:8181/google/google-callback";
    const { tokens } = await client.getToken({
      code: code,
      redirect_uri: redirect_uri,
    });

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience:
        "98301646426-vtr27r525743f73eke9rbhm7dqahnf48.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    let userFromDB = await usersServiceModel.getUserByEmail(payload.email);

    if (userFromDB) {
      let token = await tokenService.generateToken({
        isAdmin: userFromDB.isAdmin,
        isBiz: userFromDB.isBiz,
        _id: userFromDB._id,
        firstName: userFromDB.name.firstName,
      });
      res.json({ msg: "done!", token });
    } else {
      const normalUser = normalizeUserFromGoogle(payload);
      normalUser.password = await hashService.generateHash(normalUser.password);
      const userFromDB = await usersServiceModel.registerUser(normalUser);
      res.json(userFromDB);
    }
  } catch (error) {
    if (error.response && error.response.data) {
      const errorsValues = Object.values(error.response.data);
      res
        .status(500)
        .json(`Google authentication error: ${errorsValues.join(" , ")}`);
      throw new CustomError(
        `Google authentication error: ${errorsValues.join(" , ")}`
      );
    } else {
      res.status(400).json(error);
      throw new CustomError(`Google authentication error: ${error}`);
    }
  }
});

module.exports = router;
