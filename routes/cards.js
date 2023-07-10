const cardRouter = require('express').Router();

const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

cardRouter.post('/', createCard); //POST /cards — создаёт карточку
cardRouter.get('/', getCards); //GET /cards — возвращает все карточки
cardRouter.delete('/:cardId', deleteCard); //DELETE /cards/:cardId — удаляет карточку по идентификатору
cardRouter.put('/:cardId/likes', likeCard); //PUT /cards/:cardId/likes — поставить лайк карточке
cardRouter.delete('/:cardId/likes', dislikeCard); //DELETE /cards/:cardId/likes — убрать лайк с карточки

module.exports = cardRouter;

