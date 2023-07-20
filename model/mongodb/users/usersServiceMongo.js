const User = require("./Users");

const registerUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

const getUserByEmail = (email) => {
  return User.findOne({ email });
};

const getAllUsers = () => {
  return User.find();
};

const getUserById = (id) => {
  return User.findById(id);
};

const updateUser = (id, userToUpdate) => {
  return User.findByIdAndUpdate(id, userToUpdate, {
    new: true,
  });
};

const updateUserBizStatus = (id) => {
  return User.findByIdAndUpdate(
    id,
    [{ $set: { isBusiness: { $not: "$isBusiness" } } }],
    {
      new: true,
    }
  ).select(["-password"]);
};

module.exports = {
  registerUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  updateUser,
  updateUserBizStatus,
};
