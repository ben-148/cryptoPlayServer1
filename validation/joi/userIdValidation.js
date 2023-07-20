const Joi = require("joi");

const idSchema = Joi.string().length(24).hex().required();

const joiValidateIdSchema = (idToCheck) => {
  return idSchema.validateAsync(idToCheck);
};

module.exports = {
  joiValidateIdSchema,
};
