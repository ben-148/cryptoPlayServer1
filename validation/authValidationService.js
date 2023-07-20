const config = require("config");
const joiRegisterValidation = require("./joi/registerValidation");
const joiLoginValidation = require("./joi/loginValidation");
const joiValidateIdSchema = require("./joi/userIdValidation");
const joiValidateUpdateSchema = require("./joi/updateUserValidation");

const validatorOption = config.get("validatorOption");

const registerUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiRegisterValidation.validateRegisterSchema(userInput);
  }
  throw new Error("validator undefined");
};
const loginUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiLoginValidation.validateLoginSchema(userInput);
  }
  throw new Error("validator undefined");
};

const userIdValidation = (userInput) => {
  switch (validatorOption) {
    case "joi":
    default:
      return joiValidateIdSchema.joiValidateIdSchema(userInput);
  }
  throw new Error("validator undefind");
};

const userUpdatedValidation = (userInput) => {
  switch (validatorOption) {
    case "joi":
    default:
      return joiValidateUpdateSchema.validateUpdateUserSchema(userInput);
  }
  throw new Error("validator undefind");
};

module.exports = {
  registerUserValidation,
  loginUserValidation,
  userIdValidation,
  userUpdatedValidation,
};
