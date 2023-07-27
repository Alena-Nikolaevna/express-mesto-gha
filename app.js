const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const helmet = require('helmet');
const limiter = require('./middlewares/rateLimit');

const app = express();

// const { login, createUser } = require('./controllers/users');
// const authMiddleware = require('./middlewares/auth');
// const userRouter = require('./routes/users');
// const cardRouter = require('./routes/cards');

const errorMiddlewares = require('./middlewares/error');

const router = require('./routes/index');

// const NotFoundError = require('./errors/NotFoundError'); // 404 ошибка
// const { signinValidation, signupValidation } = require('./middlewares/validations');

// для защиты приложения от некоторых широко известных веб-уязвимостей
app.use(helmet());

// для ограничения кол-ва запросов, для защиты от DoS-атак
app.use(limiter);

// mongoose.connect('mongodb://localhost:27017/mestodb');
// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(router);
// app.post('/signin', signinValidation, login);
// app.post('/signup', signupValidation, createUser);
// app.use(authMiddleware); // все роуты (кроме /signin и /signup) защищены авторизацией
// app.use('/users', userRouter);
// app.use('/cards', cardRouter);

/* app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
}); */

app.use(errors());
app.use(errorMiddlewares); // централизованная обработка ошибок

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен');
});
