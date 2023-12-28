const express = require("express");
const router = express.Router();
const hashService = require("../../utils/hash/hashService");
const {
  registerUserValidation,
  loginUserValidation,
  userIdValidation,
  userUpdatedValidation,
} = require("../../validation/authValidationService");
const normalizeUser = require("../../model/usersService/helpers/normalizationUserService");
const usersServiceModel = require("../../model/usersService/usersService");
const { generateToken } = require("../../utils/token/tokenService");
const CustomError = require("../../utils/CustomError");
const authmw = require("../../middleware/authMiddleware");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");
const coinsValidationService = require("../../validation/coinsValidationService");
const chalk = require("chalk");
const mUser = require("../../model/mongodb/users/Users");

//http://localhost:8181/api/users
router.post("/", async (req, res, next) => {
  try {
    await registerUserValidation(req.body);
    req.body.password = await hashService.generateHash(req.body.password);
    user = normalizeUser(req.body);
    await usersServiceModel.registerUser(user);
    res.json(user);
  } catch (err) {
    res.status(404).json(err.message);
    next(err);
  }
});

//http://localhost:8181/api/users/login
router.post("/login", async (req, res) => {
  try {
    await loginUserValidation(req.body);
    const userData = await usersServiceModel.getUserByEmail(req.body.email);
    if (!userData) throw new CustomError("invalid email and/or password");
    const isPasswordMatch = await hashService.cmpHash(
      req.body.password,
      userData.password
    );

    if (!isPasswordMatch)
      throw new CustomError("invalid email and/or password");
    const token = await generateToken({
      _id: userData._id,
      isAdmin: userData.isAdmin,
      firstName: userData.name.firstName,
    });
    res.json({ token });
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get(
  "/",
  authmw,
  permissionsMiddleware(true, false),
  async (req, res) => {
    try {
      const users = await usersServiceModel.getAllUsers();
      res.json(users);
    } catch (err) {
      console.log(chalk.red("Failed to retrieve users:"));
      console.error(err);
      res.status(400).json({ error: "Failed to retrieve users" });
    }
  }
);

router.get(
  "/:id",
  authmw,
  permissionsMiddleware(true, true),
  async (req, res) => {
    try {
      await userIdValidation(req.params.id);
      const userFromDB = await usersServiceModel.getUserById(req.params.id);
      res.json(userFromDB);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// New route to get user information based on the token
router.get("/user/info", authmw, async (req, res) => {
  try {
    const userId = req.userData._id;

    const userFromDB = await usersServiceModel.getUserById(userId);
    res.json(userFromDB);
  } catch (err) {
    console.log("Error fetching user info:", err);
    res.status(400).json(err);
  }
});

router.put(
  "/:id",
  authmw,
  permissionsMiddleware(false, true),
  async (req, res) => {
    try {
      await userIdValidation(req.params.id);
      await userUpdatedValidation(req.body);
      const normalUser = normalizeUser(req.body);
      const updatedUser = await usersServiceModel.updateUser(
        req.params.id,
        normalUser
      );
      console.log("🚀 ~ file: users.js:132 ~ updatedUser:", updatedUser);

      const token = await generateToken({
        _id: updatedUser._id,
        isAdmin: updatedUser.isAdmin,
        firstName: updatedUser.name.firstName,
      });

      if (updatedUser) {
        res.json({
          msg: "the user is updated!",
          updatedUser,
          token,
        });
      } else {
        throw new CustomError("didnt find the user");
      }
    } catch (err) {
      res.status(400).json(err.message);
      console.log("🚀 ~ file: users.js:137 ~ err.message:", err.message);
    }
  }
);

router.put("/trade/:id/", authmw, async (req, res) => {
  try {
    const { id } = req.params;
    const { coinId, tradeAmount, userId, coinAmount, action, coinPrice } =
      req.body;

    const user = await mUser.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (action === "buy") {
      const coinInPortfolio = user.portfolio.find((coin) => coin.coinId === id);

      // If the coin is not in the portfolio, execute buyCoin
      if (!coinInPortfolio) {
        user.amount -= tradeAmount;
        const updatedUserAmount = await user.save();

        await usersServiceModel.buyCoin(userId, coinId, coinAmount);
        // Fetch the updated user data after the buyCoin operation

        const updatedUser = await mUser.findById(userId);
        res.json({ updatedUser });
        return;
      } else {
        user.amount -= tradeAmount;

        const updatedPortfolio = user.portfolio.map((coin) => {
          if (coin.coinId === id) {
            return {
              ...coin,
              amount: coin.amount + Number(coinAmount),
            };
          }
          return coin;
        });
        user.portfolio = updatedPortfolio;
      }
    } else if (action === "sell") {
      const coinInPortfolio = user.portfolio.find(
        (coin) => coin.coinId === coinId
      );

      if (!coinInPortfolio || coinInPortfolio.amount < coinAmount) {
        throw new Error("Insufficient funds or coin not in the portfolio");
      }

      // Calculate the equivalent USDT value for the coin amount
      const usdtValue = coinAmount * coinPrice;

      // Update user's USDT amount
      user.amount += usdtValue;

      // Update coin amount in the portfolio
      const updatedPortfolio = user.portfolio.map((coin) => {
        if (coin.coinId === coinId) {
          return {
            ...coin,
            amount: coin.amount - coinAmount,
          };
        }
        return coin;
      });

      user.portfolio = updatedPortfolio.filter((coin) => coin.amount !== 0);
    }

    const updatedUser = await user.save();
    console.log("Updated user after trade action:", updatedUser);

    res.json({ updatedUser });
  } catch (error) {
    console.error("Error during trade:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch(
  "/updateAmount/:id",
  authmw,
  permissionsMiddleware(true, false),
  async (req, res) => {
    try {
      const userId = req.params.id;
      const amountToAdd = req.body.amountToAdd;
      const updatedUser = await usersServiceModel.updateUserAmount(
        userId,
        amountToAdd
      );
      const updatedUsersList = await usersServiceModel.getAllUsers();
      // Respond with the updated user
      res.json(updatedUsersList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.delete(
  "/:id",
  authmw,
  permissionsMiddleware(true, true),
  async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await usersServiceModel.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const deletedUser = await usersServiceModel.deleteUser(userId);
      res.json({
        msg: `user - ${deletedUser.name.firstName} ${deletedUser.name.lastName} deleted`,
      });
    } catch (err) {
      console.log(chalk.red("delete failed"));
      console.error(err);
      res.status(400).json({ error: "Failed to delete user" });
    }
  }
);

module.exports = router;
