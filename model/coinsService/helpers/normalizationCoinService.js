const config = require("config");
const normalizationCoinMongo = require("../../mongodb/coins/helpers/normalizationCoin");
const dbOption = config.get("dbOption");

const normalizeCoinService = (coin) => {
  if (dbOption === "mongo") {
    return normalizationCoinMongo(coin);
  }
};

module.exports = normalizeCoinService;
