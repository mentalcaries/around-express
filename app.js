const express = require('express');
const helmet = require('helmet');

const app = express();
app.use(helmet());
const { PORT = 3000 } = process.env;
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

app.listen(PORT, () => {
  console.log('Server is serving');
});

app.use('/cards', cardRouter);

app.use('/users', userRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});
