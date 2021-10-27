const path = require('path');
const getFileData = require('../utils/readFile');

const cardDataPath = path.join(__dirname, '../', 'data', 'cards.json');

const getCards = (req, res) => getFileData(cardDataPath, res)
  .then((cards) => res.send(cards))
  .catch((err) => res.status(404).send(err));

module.exports = getCards;
