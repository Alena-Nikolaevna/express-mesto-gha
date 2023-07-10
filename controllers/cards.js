const Card = require('../models/card');
const {
  showError, ERROR_NOT_FOUND, MESSAGE_ERROR_NOT_FOUND, ERROR_DEFAULT, MESSAGE_ERROR_DEFAULT,
} = require('../utils/error');

// создаёт карточку
const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      showError(res, error);
    });
};

// возвращает все карточки
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(ERROR_DEFAULT).send(MESSAGE_ERROR_DEFAULT);
    });
};

// удаляет карточку по идентификатору
const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send(MESSAGE_ERROR_NOT_FOUND);
      } else {
        res.send(card);
      }
    })
    .catch((error) => {
      showError(res, error);
    });
};

// поставить лайк карточке
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send(MESSAGE_ERROR_NOT_FOUND);
      } else {
        res.send(card);
      }
    })
    .catch((error) => {
      showError(res, error);
    });
};

// убрать лайк с карточки
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send(MESSAGE_ERROR_NOT_FOUND);
      } else {
        res.send(card);
      }
    })
    .catch((error) => {
      showError(res, error);
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
