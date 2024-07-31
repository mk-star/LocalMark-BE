const MypageService = require('../services/mypage.service');
const { response, errResponse } = require('../../config/response');

exports.findUsername = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await MypageService.findUsernameByEmail(email);
    if (result) {
      return res.status(201).json(response({ isSuccess: true, code: 201, message: 'Username has been sent to your email' }, result));
    } else {
      return res.status(400).json(errResponse({ isSuccess: false, code: 400, message:'Email not found'}));
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
