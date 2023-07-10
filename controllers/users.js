const User = require('../models/user');

// создаёт пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then((user) => {
    res.send(user)
  })
  .catch((error) => {
    res.status(400).send(error);
  })
}

// возвращает всех пользователей
const getUsers = (req, res) => {

  User.find({})
  .then((users) => {
    res.send(users)
  })
  .catch(() => {
    res.status(500).send({ message: "Ошибка по умолчанию." });
  })
}

// возвращает пользователя по _id
const getUser = (req, res) => {

  const { userId } = req.params;

  User.findById(userId)
  .then((user) => {
    if (!user) {
      res.status(404).send({ message: "Запрашиваемый пользователь не найден" });
    } else {
      res.send(user);
    }
  })
  .catch((error) => {
    res.status(400).send(error);
  })
}

// обновляет профиль
const updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  // обновим имя, о себе найденного по _id пользователя
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
  .then((user) => {
    if (!user) {
      res.status(404).send({ message: "Данные по указанному _id не найдены." });
    } else {
      res.send(user);
    }
  })
  .catch((error) => {
    res.status(400).send(error);
  })
}

// обновляет аватар
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  // обновим аватар найденного по _id пользователя
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
  .then((user) => {
    if (!user) {
      res.status(404).send({ message: "Данные по указанному _id не найдены." });
    } else {
      res.send(user);
    }
  })
  .catch((error) => {
    res.status(400).send(error);
  })
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUserProfile,
  updateUserAvatar
}