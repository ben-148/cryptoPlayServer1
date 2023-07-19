const config = require("config");
const joiRegisterValidation = require("./joi/registerValidation");
const joiLoginValidation = require("./joi/loginValidation");
const joiuserIdValidation = require("./joi/userIdValidation");

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
  if (validatorOption === "joi") {
    return joiuserIdValidation.validateIdSchema(userInput);
  }
  throw new Error("validator undefind");
};

module.exports = {
  registerUserValidation,
  loginUserValidation,
  userIdValidation,
};
