const userRouter = require('express').Router();

const {
  createUser, getUsers, getUser, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');

userRouter.post('/', createUser); // POST /users — создаёт пользователя
userRouter.get('/', getUsers); // GET /users — возвращает всех пользователей
userRouter.get('/:userId', getUser); // GET /users/:userId - возвращает пользователя по _id
userRouter.patch('/me', updateUserProfile); // PATCH /users/me — обновляет профиль
userRouter.patch('/me/avatar', updateUserAvatar); // PATCH /users/me/avatar — обновляет аватар

module.exports = userRouter;
