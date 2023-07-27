const CustomError = require("../utils/CustomError");
const { getCardById } = require("../model/cardsService/cardsService");
const { cardIdValidation } = require("../validation/cardsValidationService");

const checkIfBizOwner = async (iduser, idcard, res, next) => {
  try {
    cardIdValidation(idcard);
    const cardData = await getCardById(idcard);
    if (!cardData) {
      return res.status(400).json({ msg: "card not found" });
    }
    if (cardData.user_id == iduser) {
      next();
    } else {
      res.status(401).json({ msg: "you not the biz owner" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const permissionsMiddleware = (isBiz, isAdmin, isBizOwner, isUser) => {
  return (req, res, next) => {
    if (!req.userData) {
      throw new CustomError("must provide userData");
    }

    if (isBiz === req.userData.isBusiness && isBiz === true) {
      return next();
    }
    if (isAdmin === req.userData.isAdmin && isAdmin === true) {
      return next();
    }
    if (isBizOwner === req.userData.isBusiness && isBizOwner === true) {
      return checkIfBizOwner(req.userData._id, req.params.id, res, next);
    }
    if (isUser && req.userData._id === req.params.id) {
      return next();
    }
    if (isUser && req.userData._id !== req.params.id) {
      return res.status(401).json({ msg: "paramsId is not correct" });
    }
    res.status(401).json({ msg: "you have no permission for this request" });
  };
};

module.exports = permissionsMiddleware;
