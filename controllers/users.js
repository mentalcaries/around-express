const path = require('path');
const getFileData = require('../utils/readFile');
const User = require('../models/user');

const dataPath = path.join(path.join(__dirname, '../', 'data', 'users.json'));

const getUsers = (req, res) => {
  getFileData(dataPath, res)
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send(err));
};

const getUserById = (req, res) => {
  getFileData(dataPath, res)
    .then((users) => users.find((user) => user._id === req.params.id))
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      return res.status(404).send({ Message: 'User ID not found' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: `Invalid user data: ${err}` }));
};

module.exports = { getUsers, getUserById, createUser };
