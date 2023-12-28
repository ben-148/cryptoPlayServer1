const config = require("config");
const coinsServiceMongo = require("../mongodb/coins/coinsService");
const dbOption = config.get("dbOption");
const createCoin = (coinToSave) => {
  if (dbOption === "mongo") {
    return coinsServiceMongo.createCoin(coinToSave);
  }
};

const getAllCoins = () => {
  if (dbOption === "mongo") {
    return coinsServiceMongo.getAllCoins();
  }
};

const getCoinById = (id) => {
  if (dbOption === "mongo") {
    return coinsServiceMongo.getCoinById(id);
  }
};

const getCoinByBizNumber = (bizNumber) => {
  if (dbOption === "mongo") {
    return coinsServiceMongo.getCoinByBizNumber(bizNumber);
  }
};

const updateCoin = (id, coinToUpdate) => {
  if (dbOption === "mongo") {
    return coinsServiceMongo.updateCoin(id, coinToUpdate);
  }
};

const likeCoin = (userId, coinId) => {
  switch (dbOption) {
    case "mongo":
    default:
      return coinsServiceMongo.likeCoin(userId, coinId);
  }
};

const unLikeCoin = (userId, coinId) => {
  switch (dbOption) {
    case "mongo":
    default:
      return coinsServiceMongo.unLikeCoin(userId, coinId);
  }
};

const deleteCoin = (id) => {
  if (dbOption === "mongo") {
    return coinsServiceMongo.deleteCoin(id);
  }
};

module.exports = {
  createCoin,
  getAllCoins,
  getCoinById,
  getCoinByBizNumber,
  updateCoin,
  deleteCoin,
  likeCoin,
  unLikeCoin,
};
