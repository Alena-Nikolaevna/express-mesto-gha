const User = require('../models/user');
const { showError, ERROR_CODE, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../utils/error');

// создаёт пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user)
    })
    .catch((error) => {
      showError(res, error);
    })
}

// возвращает всех пользователей
const getUsers = (req, res) => {

  User.find({})
    .then((users) => {
      res.send(users)
    })
    .catch(() => {
      res.status(ERROR_DEFAULT).send({ message: "Ошибка по умолчанию." });
    })
}

// возвращает пользователя по _id
const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: "Запрашиваемый пользователь не найден" });
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      showError(res, error);
    })
}

// обновляет профиль
const updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  // обновим имя, о себе найденного по _id пользователя
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: "Данные по указанному _id не найдены." });
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      showError(res, error);
    })
}

// обновляет аватар
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  // обновим аватар найденного по _id пользователя
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: "Данные по указанному _id не найдены." });
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      showError(res, error);
    })
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUserProfile,
  updateUserAvatar
}