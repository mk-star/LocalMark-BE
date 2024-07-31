const MypageDAO = require('../models/mypage.dao');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVICE,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

exports.findUsernameByEmail = async (email) => {
  try {
    const user = await MypageDAO.getUsernameByEmail(email);
    if (user) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Account Username',
        text: `Your username is: ${user.id}`
      };
      await transporter.sendMail(mailOptions);
      return user;
    }
    return false;
  } catch (error) {
    throw error;
  }
};
