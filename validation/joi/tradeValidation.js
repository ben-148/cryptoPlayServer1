// tradeValidation.js
const Joi = require("joi");

const tradeSchema = Joi.object({
  tradeAmount: Joi.number().required(),
  coinAmount: Joi.number().required(),
  action: Joi.string().valid("buy", "sell").required(),
  coinPrice: Joi.number().positive().required(),
});

const amountSchema = Joi.object({
  amountToAdd: Joi.number().required(),
});

const validateTradeInput = (data) => {
  return tradeSchema.validateAsync(data);
};

const validateAmountToAdd = (data) => {
  return amountSchema.validateAsync(data);
};

module.exports = {
  validateTradeInput,
  validateAmountToAdd,
};
