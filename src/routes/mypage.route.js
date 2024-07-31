const express = require('express');
const MypageController = require('../controllers/mypage.controller');

const router = express.Router();

router.post('/find-username', MypageController.findUsername);

module.exports = router;
