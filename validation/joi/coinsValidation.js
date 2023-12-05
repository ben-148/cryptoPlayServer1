const Joi = require("joi");

const createCoinSchema = Joi.object({
  name: Joi.string().required(),
  codeName: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.object().keys({
    url: Joi.string().regex(
      new RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      )
    ),
    alt: Joi.string().min(2).max(256).required(),
  }),
  price: Joi.string().required(),
});

const validateCoinSchema = (userInput) => {
  return createCoinSchema.validateAsync(userInput);
};

const validateIdSchema = (idToCheck) => {
  return Joi.string().length(24).hex().required().validateAsync(idToCheck);
};

module.exports = {
  validateCoinSchema,
  validateIdSchema,
};
