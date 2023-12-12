const config = require("config");
const usersServiceMongo = require("../mongodb/users/usersServiceMongo");
const dbOption = config.get("dbOption");

const registerUser = (userData) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.registerUser(userData);
  }
};

const getUserByEmail = (email) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.getUserByEmail(email);
  }
};

const getAllUsers = () => {
  if (dbOption === "mongo") {
    return usersServiceMongo.getAllUsers();
  }
};

const getUserById = (id) => {
  if (dbOption === "mongo") {
    return usersServiceMongo.getUserById(id);
  }
};

const updateUser = (id, userToUpdate) => {
  switch (dbOption) {
    case "mongo":
    default:
      return usersServiceMongo.updateUser(id, userToUpdate);
  }
};

const updateUserBizStatus = (id) => {
  switch (dbOption) {
    case "mongo":
    default:
      return usersServiceMongo.updateUserBizStatus(id);
  }
};
const updateUserAmount = (id, amountToAdd) => {
  switch (dbOption) {
    case "mongo":
    default:
      return usersServiceMongo.updateUserAmount(id, amountToAdd);
  }
};

const deleteUser = (id) => {
  switch (dbOption) {
    case "mongo":
    default:
      return usersServiceMongo.deleteUser(id);
  }
};
const buyCoin = (userId, coinId, amount) => {
  switch (dbOption) {
    case "mongo":
    default:
      return usersServiceMongo.buyCoin(userId, coinId, amount);
  }
};
const sellCoin = (userId, coinId, coinAmount, coinPrice) => {
  switch (dbOption) {
    case "mongo":
    default:
      return usersServiceMongo.sellCoin(userId, coinId, coinAmount, coinPrice);
  }
};

module.exports = {
  registerUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  updateUser,
  updateUserBizStatus,
  deleteUser,
  buyCoin,
  sellCoin,
  updateUserAmount,
};
