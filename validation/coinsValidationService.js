const config = require("config");
const joiCoinsValidation = require("./joi/coinsValidation");

const validatorOption = config.get("validatorOption");

const createCoinValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiCoinsValidation.validateCoinSchema(userInput);
  }
  throw new Error("validator undefined");
};

const coinIdValidation = (idToCheck) => {
  if (validatorOption === "Joi") {
    return joiCoinsValidation.validateIdSchema(idToCheck);
  }
  throw new Error("validator undefind");
};

module.exports = {
  createCoinValidation,
  coinIdValidation,
};
