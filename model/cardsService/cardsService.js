const config = require("config");
const cardsServiceMongo = require("../mongodb/cards/cardsService");
const dbOption = config.get("dbOption");
const createCard = (cardToSave) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.createCard(cardToSave);
  }
};

const getAllCards = () => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getAllCards();
  }
};

const getUserCards = (id) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getUserCards(id);
  }
};

const getCardById = (id) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getCardById(id);
  }
};

const getCardByBizNumber = (bizNumber) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.getCardByBizNumber(bizNumber);
  }
};

const updateCard = (id, cardToUpdate) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.updateCard(id, cardToUpdate);
  }
};

const likeCard = (userId, cardId) => {
  switch (dbOption) {
    case "mongo":
    default:
      return cardsServiceMongo.likeCard(userId, cardId);
  }
};

const unLikeCard = (userId, cardId) => {
  switch (dbOption) {
    case "mongo":
    default:
      return cardsServiceMongo.unLikeCard(userId, cardId);
  }
};

const deleteCard = (id) => {
  if (dbOption === "mongo") {
    return cardsServiceMongo.deleteCard(id);
  }
};

module.exports = {
  createCard,
  getAllCards,
  getCardById,
  getCardByBizNumber,
  updateCard,
  deleteCard,
  getUserCards,
  likeCard,
  unLikeCard,
};
