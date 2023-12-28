const Coin = require("./Coin");

const createCoin = (coinToSave) => {
  let coin = new Coin(coinToSave);
  return coin.save();
};

const getAllCoins = () => {
  return Coin.find();
};

const getCoinById = (id) => {
  return Coin.findById(id);
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
  updateCoin,
  deleteCoin,
  likeCoin,
  unLikeCoin,
};
