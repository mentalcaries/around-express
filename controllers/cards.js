const path = require('path');
const getFileData = require('../utils/readFile');
const Card = require('../models/card');

const getCards = (req, res)=> {
  Card.find({})
  .orFail() // throws a DocumentNotFoundError
  .then((cardData) => {
    res.send(cardData); // skipped, because an error was thrown
  })
  .catch((err) => {
    res.status(404).send(err)
  }); 
}

const createCard = (req, res) => {
  // console.log(req.user._id);
  const ERROR_CODE = 400;
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
  const ERROR_CODE = 404
  Card.findByIdAndRemove({_id: req.params.cardId})
  .orFail()
  .then(cardData=>res.send({data: cardData}))
  .catch(err=>{
    if (err.name ==='DocumentNotFoundError')
    return res.status(ERROR_CODE).send({message: 'No card with that ID found'})})

};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .orFail()
  .then(cardData=>res.send({data: cardData}))
  .catch(err=>res.status(404).send({message: 'garbage'}))
}

module.exports = { getCards, createCard, deleteCard, likeCard };
