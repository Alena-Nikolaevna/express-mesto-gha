const { ERROR_DEFAULT, MESSAGE_ERROR_DEFAULT } = require('../utils/error');

const errorMiddlewares = (err, req, res, next) => {
  const { statusCode = ERROR_DEFAULT } = err;
  const message = statusCode === ERROR_DEFAULT ? MESSAGE_ERROR_DEFAULT : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorMiddlewares;
