const jwt = require('jsonwebtoken');

// middleware авторизации для проверки JWT
module.exports = (req, res, next) => {
  // Достаём авторизационный заголовок
  const { authorization } = req.headers;

  // Убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  // Если токен на месте, извлечём его.
  // Для этого вызовем метод replace, чтобы выкинуть из заголовка приставку 'Bearer '
  // Таким образом, в переменную token запишется только JWT
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // Верифицируем токен -
    // проверяем, что пользователь прислал именно тот токен, который был выдан ему ранее
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // Отправим ошибку, если не получилось верифицировать
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // добавляет в объект запроса payload токена
  next(); // пропускает запрос дальше
};
