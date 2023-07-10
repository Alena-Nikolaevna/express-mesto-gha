const ERROR_CODE = 400;
const MESSAGE_ERROR_CODE = { message: "Переданы некорректные данные." };

const ERROR_NOT_FOUND = 404;
const MESSAGE_ERROR_NOT_FOUND = { message: 'Страница не найдена' };

const ERROR_DEFAULT = 500;
const MESSAGE_ERROR_DEFAULT = { message: "Ошибка по умолчанию." };

const showError = (res, err) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res.status(ERROR_CODE).send(MESSAGE_ERROR_CODE);
    return;
  }
  res.status(ERROR_DEFAULT).send(MESSAGE_ERROR_DEFAULT);
};

module.exports = {
  showError,
  ERROR_CODE,
  MESSAGE_ERROR_CODE,
  ERROR_NOT_FOUND,
  MESSAGE_ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  MESSAGE_ERROR_DEFAULT
};