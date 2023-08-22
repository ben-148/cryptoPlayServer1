const usersService = require("../model/usersService/usersService");
const coinsService = require("../model/coinsService/coinsService");
const hashService = require("../utils/hash/hashService");
const normalizeUser = require("../model/usersService/helpers/normalizationUserService");
const normalizeCoin = require("../model/coinsService/helpers/normalizationCoinService");

const usersData = require("./users.json");
const coinsData = require("./coins.json");

const initialData = async () => {
  try {
    let coins = await coinsService.getAllCoins();

    if (coins.length) {
      return;
    }
    let users = await usersService.getAllUsers();
    if (users.length) {
      return;
    }
    let user_id = "";
    for (let user of usersData) {
      user.password = await hashService.generateHash(user.password);
      user = normalizeUser(user);
      user_id = await usersService.registerUser(user);
    }
    user_id = user_id._id + "";
    for (let coin of coinsData) {
      coin = await normalizeCoin(coin, user_id);
      await coinsService.createCoin(coin);
    }
  } catch (err) {
    console.log("err from initial", err);
  }
};

module.exports = initialData;
