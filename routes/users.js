const express = require("express");
const router = express.Router();
const path = require("path");
const { getUsers, getUserById } = require("../controllers/users");

router.get("/", getUsers);

router.get("/:id", getUserById);

module.exports = router;
