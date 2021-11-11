const express = require('express');

const router = express.Router();
const { getUsers, getUserById, createUser } = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

module.exports = router;
