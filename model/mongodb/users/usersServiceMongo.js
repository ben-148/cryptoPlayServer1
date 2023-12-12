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

// const buyCoin = (coinId, amount) => {
//   return User.findByIdAndUpdate;
// };

const buyCoin = (userId, coinId, amount) => {
  return User.findByIdAndUpdate(
    userId,
    { $push: { portfolio: { coinId, amount } } },
    { new: true }
  );
};

// usersServiceModel.js
const sellCoin = async (userId, coinId, coinAmount, coinPrice) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

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

    user.portfolio = updatedPortfolio;

    // Save the updated user
    const updatedUser = await user.save();

    console.log("Updated user after sell action:", updatedUser);

    return updatedUser;
  } catch (error) {
    console.error("Error in sellCoin function:", error);
    throw error; // Rethrow the error to be caught in the calling function
  }
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
const updateUserAmount = (id, amountToAdd) => {
  return User.findByIdAndUpdate(
    id,
    { $inc: { amount: amountToAdd } }, // Use $inc to increment the existing value
    {
      new: true,
    }
  ).select(["-password"]);
};

const deleteUser = (id) => {
  return User.findByIdAndDelete(id).select(["-password", "-createdAt", "-__v"]);
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
