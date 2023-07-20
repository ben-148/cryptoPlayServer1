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

module.exports = {
  registerUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  updateUser,
  updateUserBizStatus,
};
