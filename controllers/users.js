const path = require("path");
const getFileData = require("../utils/readFile");

const dataPath = path.join(path.join(__dirname, "../", "data", "users.json"));

const getUsers = (req, res) => {
  return getFileData(dataPath)
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send(err));
};

const getUserById = (req, res) => {
  return getFileData(dataPath)
    .then((users) => users.find((user) => user._id === req.params.id))
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      return res.status(404).send({ Message: "User ID not found" });
    });
};

module.exports = { getUsers, getUserById };
