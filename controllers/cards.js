const Card = require('../models/card');

//создаёт карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
  .then((card) => {
    res.send(card)
  })
  .catch((error) => {
    res.status(400).send(error);
  })
}

//возвращает все карточки
const getCards = (req, res) => {

  Card.find({})
  .then((cards) => {
    res.send(cards)
  })
  .catch((error) => {
    res.status(400).send(error);
  })
}

//удаляет карточку по идентификатору
const deleteCard = (req, res) => {

  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
  .then((card) => {
    res.send(card)
  })
  .catch((error) => {
    res.status(400).send(error);
  })
}

// поставить лайк карточке
const likeCard = (req, res) => {

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Запрашиваемая карточка не найдена" });
      } else {
        res.send(card);
      }
    })
    .catch((error) => {
      res.status(400).send(error);
    })
}

// убрать лайк с карточки
const dislikeCard = (req, res) => {

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true })
    .then((card) => {
      res.send(card)
    })
    .catch((error) => {
      res.status(400).send(error);
    })
}

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard
}

/*module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
};*/