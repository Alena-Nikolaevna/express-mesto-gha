const ServerError = require('../errors/ServerError'); // 500 ошибка
const ConflictError = require('../errors/ConflictError'); // 409

const errorMiddlewares = (err, req, res, next) => {
  const { statusCode = ServerError } = err;
  const message = statusCode === ServerError ? 'На сервере произошла ошибка.' : err.message;

  if (err.code === 11000) {
    res.status(ConflictError).send({ message: 'Пользователь с указанным email уже существует' });
    return;
  }
  if (statusCode === ServerError) {
    res.status(statusCode).send({ message: 'На сервере произошла ошибка' });
    return;
  }

  res.status(statusCode).send({ message });
  next();
};

module.exports = errorMiddlewares;
