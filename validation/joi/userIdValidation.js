const Joi = require('joi');

const idSchema = Joi.string().length(24).hex().required();

const validateIdSchema = (idToCheck) => {
    return idSchema.validateAsync(idToCheck);
};

module.exports = {
    validateIdSchema
};