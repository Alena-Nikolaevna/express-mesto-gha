const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

//mongoose.connect('mongodb://localhost:27017/mestodb');
// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64a800a320a17f637adf73f2' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
    console.log("Сервер запущен");
})