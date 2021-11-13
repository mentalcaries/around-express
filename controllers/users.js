const getFileData = require('../utils/readFile');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send(err));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    // .then((users) => users.find((user) => user._id === req.params.id))
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(404).send({ Message: 'User ID not found' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: `Invalid user data: ${err}` }));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: `Invalid user data: ${err}` }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: `Invalid user data: ${err}` }));
};

module.exports = {
  getUsers, getUserById, createUser, updateProfile, updateAvatar,
};
