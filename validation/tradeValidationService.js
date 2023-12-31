const config = require("config");
const joiTradeValidation = require("./joi/tradeValidation");

const validatorOption = config.get("validatorOption");

const tradeValidation = (data) => {
  if (validatorOption === "Joi") {
    return joiTradeValidation.validateTradeInput(data);
  }
  throw new Error("validator undefined");
};
const amountValidation = (data) => {
  if (validatorOption === "Joi") {
    return joiTradeValidation.validateAmountToAdd(data);
  }
  throw new Error("validator undefined");
};

module.exports = {
  tradeValidation,
  amountValidation,
};
