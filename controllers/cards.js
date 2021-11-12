const path = require('path');
const getFileData = require('../utils/readFile');
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .orFail() // throws a DocumentNotFoundError
    .then((cardData) => {
      res.send(cardData); // skipped, because an error was thrown
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};

const createCard = (req, res) => {
  // console.log(req.user._id);

  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Invalid card data' });
      }
    });
};

const deleteCard = (req, res) => {

  Card.findByIdAndRemove({ _id: req.params.cardId })
    .orFail()
    .then((cardData) => res.send({ data: cardData }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError')
        return res
          .status(404)
          .send({ message: 'No card with that ID found' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )

    .then((cardData) => res.send({ data: cardData }))
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Card not found' });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail()
    .then((cardData) => res.send({ data: cardData }))
    .catch((err) => {
      //console.log(err.name)
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Card not found' });
      }
    });
};

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
