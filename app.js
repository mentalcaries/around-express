const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const app = express();
app.use(helmet());
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const { PORT = 3000 } = process.env;
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

app.listen(PORT, () => {
});

app.use('/cards', cardRouter);

app.use('/users', userRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});
