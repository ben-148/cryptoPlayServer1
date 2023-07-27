const Card = require("./Card");

const createCard = (cardToSave) => {
  let card = new Card(cardToSave);
  return card.save();
};

const getAllCards = () => {
  return Card.find();
};

const getUserCards = (id) => {
  return Card.find({ user_id: id });
};

const getCardById = (id) => {
  return Card.findById(id);
};

const getCardByBizNumber = (bizNumber) => {
  return Card.findOne({ bizNumber }, { bizNumber: 1, _id: 0 });
};

const updateCard = (id, cardToUpdate) => {
  return Card.findByIdAndUpdate(id, cardToUpdate, {
    new: true,
  });
};

const likeCard = (userId, cardId) => {
  return Card.findByIdAndUpdate(
    cardId,
    { $push: { likes: userId } },
    { new: true }
  );
};

const unLikeCard = (userId, cardId) => {
  return Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true }
  );
};

const deleteCard = (id) => {
  return Card.findByIdAndDelete(id);
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
