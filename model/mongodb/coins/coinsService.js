const Coin = require("./Coin");

const createCoin = (coinToSave) => {
  let coin = new Coin(coinToSave);
  return coin.save();
};

const getAllCoins = () => {
  return Coin.find();
};

const getUserCoins = (id) => {
  return Coin.find({ user_id: id });
};

const getCoinById = (id) => {
  return Coin.findById(id);
};

const getCoinByBizNumber = (bizNumber) => {
  return Coin.findOne({ bizNumber }, { bizNumber: 1, _id: 0 });
};

const updateCoin = (id, coinToUpdate) => {
  return Coin.findByIdAndUpdate(id, coinToUpdate, {
    new: true,
  });
};

const likeCoin = (userId, coinId) => {
  return Coin.findByIdAndUpdate(
    coinId,
    { $push: { likes: userId } },
    { new: true }
  );
};

const unLikeCoin = (userId, coinId) => {
  return Coin.findByIdAndUpdate(
    coinId,
    { $pull: { likes: userId } },
    { new: true }
  );
};

const deleteCoin = (id) => {
  return Coin.findByIdAndDelete(id);
};

module.exports = {
  createCoin,
  getAllCoins,
  getCoinById,
  getCoinByBizNumber,
  updateCoin,
  deleteCoin,
  getUserCoins,
  likeCoin,
  unLikeCoin,
};
