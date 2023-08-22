const express = require("express");
const router = express.Router();
const coinsServiceModel = require("../../model/coinsService/coinsService");
const normalizeCoin = require("../../model/coinsService/helpers/normalizationCoinService");
const coinsValidationService = require("../../validation/coinsValidationService");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");
const authmw = require("../../middleware/authMiddleware");
const Coin = require("../../model/mongodb/coins/Coin");
const CustomError = require("../../utils/CustomError");
const generateBizNumber = require("../../model/mongodb/coins/helpers/generateBizNumber");
const chalk = require("chalk");

// all
router.get("/", async (req, res) => {
  try {
    const allCoins = await coinsServiceModel.getAllCoins();
    res.json(allCoins);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/my-coins", authmw, async (req, res) => {
  try {
    const userCoins = await coinsServiceModel.getUserCoins(req.userData._id);
    if (!userCoins.length) {
      res.json({ msg: "No coins for this user" });
    } else {
      res.json(userCoins);
    }
  } catch (err) {
    console.log(chalk.red("Failed to get user coins:"));
    console.error(err);
    res.status(400).json(err);
  }
});

// all
router.get("/:id", async (req, res) => {
  try {
    await coinsValidationService.coinIdValidation(req.params.id);
    const coinFromDB = await coinsServiceModel.getCoinById(req.params.id);
    res.json(coinFromDB);
  } catch (err) {
    res.status(400).json(err);
  }
});

// biz only
router.post(
  "/",
  authmw,
  permissionsMiddleware(true, false, false),
  async (req, res) => {
    try {
      await coinsValidationService.createCoinValidation(req.body);
      let normalCoin = await normalizeCoin(req.body, req.userData._id);
      const dataFromMongoose = await coinsServiceModel.createCoin(normalCoin);
      res.json(dataFromMongoose);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.put(
  "/:id",
  authmw,
  permissionsMiddleware(false, false, true),
  async (req, res) => {
    try {
      await coinsValidationService.coinIdValidation(req.params.id);
      await coinsValidationService.createCoinValidation(req.body);
      let normalCoin = await normalizeCoin(req.body, req.userData._id);
      const coinFromDB = await coinsServiceModel.updateCoin(
        req.params.id,
        normalCoin
      );
      res.json(coinFromDB);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.patch("/:id", authmw, async (req, res) => {
  try {
    const coinId = req.params.id;
    const userId = req.userData._id;
    await coinsValidationService.coinIdValidation(coinId);
    const coinFromDB = await coinsServiceModel.getCoinById(req.params.id);
    if (coinFromDB) {
      if (coinFromDB.likes.includes(userId)) {
        await coinsServiceModel.unLikeCoin(userId, coinId);
        const UpdateLikeStatus = await coinsServiceModel.getCoinById(coinId);
        res.json(UpdateLikeStatus);
      } else {
        await coinsServiceModel.likeCoin(userId, coinId);
        const UpdateLikeStatus = await coinsServiceModel.getCoinById(coinId);
        res.json(UpdateLikeStatus);
      }
    } else {
      throw new CustomError("did not find coin");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//Bonus! :)

router.patch(
  "/bizNum/:id",
  authmw,
  permissionsMiddleware(false, true, false, false),
  async (req, res) => {
    try {
      const coinId = req.params.id;
      await coinsValidationService.coinIdValidation(coinId);
      const coinFromDb = await coinsServiceModel.updateCoin(coinId, {
        bizNumber: await generateBizNumber(),
      });
      res.json({ msg: `the new biz number is ${coinFromDb.bizNumber}` });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
);

// admin or biz owner
router.delete(
  "/:id",
  authmw,
  permissionsMiddleware(false, true, true),
  async (req, res) => {
    try {
      await coinsValidationService.coinIdValidation(req.params.id);
      const coinFromDB = await coinsServiceModel.deleteCoin(req.params.id);
      if (coinFromDB) {
        res.json({ msg: "coin deleted" });
      } else {
        res.json({ msg: "could not find the coin" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

module.exports = router;
