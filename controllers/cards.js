const path = require('path');
const getFileData = require('../utils/readFile');
const Card = require('../models/card');

const cardDataPath = path.join(__dirname, '../', 'data', 'cards.json');
const ERROR_CODE = 400;

// const getCards = (req, res) => getFileData(cardDataPath, res)
//   .then((cards) => res.send(cards))
//   .catch((err) => res.status(404).send(err));
  
const getCards = (req, res)=> {
  Card.find({})
  .orFail() // throws a DocumentNotFoundError
  .then((cardData) => {
    res.send(cardData); // skipped, because an error was thrown
  })
  .catch((error) => {
    // now this does run, so we can handle the error and return an appropriate message
  }); 
}

const createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Invalid card data' });
      }
    });
};

const deleteCard = (req, res) => {
  console.log(req);
};

module.exports = { getCards, createCard, deleteCard };
