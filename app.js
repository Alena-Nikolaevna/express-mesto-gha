const express = require('express');
const mongoose = require('mongoose');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();
const { login, createUser } = require('./controllers/users');
const authMiddleware = require('./middlewares/auth');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { ERROR_NOT_FOUND, MESSAGE_ERROR_NOT_FOUND } = require('./utils/error');

// чтобы использовать его на сервере только для API,
// где ограничитель скорости должен применяться ко всем запросам
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // // Ограничение каждого IP до 100 запросов на «окно» (здесь за 15 минут)
  standardHeaders: true, // // Ограничение скорости возврата информация в заголовках `RateLimit-*`
  legacyHeaders: false, // Отключить заголовки `X-RateLimit-*` (headers)
});

// для защиты приложения от некоторых широко известных веб-уязвимостей
app.use(helmet());

// для ограничения кол-ва запросов, для защиты от DoS-атак
app.use(limiter);

// mongoose.connect('mongodb://localhost:27017/mestodb');
// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use(authMiddleware);

app.use((req, res) => {
  res.status(ERROR_NOT_FOUND).send(MESSAGE_ERROR_NOT_FOUND);
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен');
});
