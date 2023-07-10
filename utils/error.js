const ERROR_CODE = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_DEFAULT = 500;

const showError = (res, err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(ERROR_CODE).send({ message: "Переданы некорректные данные." });
    return;
  }
  res.status(ERROR_DEFAULT).send({ message: "Ошибка по умолчанию." });
};

module.exports = { showError, ERROR_CODE, ERROR_NOT_FOUND, ERROR_DEFAULT };