const express = require('express');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.post('/signup', UserController.registerUser);

module.exports = router;
