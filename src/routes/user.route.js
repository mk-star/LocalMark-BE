const express = require('express');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.post('/signup', UserController.registerUser);
router.post('/find-username',UserController.findUsername);

module.exports = router;
