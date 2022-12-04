require('dotenv').config();

const signupRouter = require('express').Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const Users = require('../modals/userModals');
const UserOTPVerification = require('../modals/UserOTPVerification');
const { info } = require('../utils/logger');

async function CheckOTP(req) {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      throw Error('Empty otp details are not allowed');
    } else {
      const UserOTPVerificationRecords = await UserOTPVerification.find({
        email,
      });
      if (UserOTPVerificationRecords.length <= 0) {
        throw new Error("Account record doesn't exist or has been verified already. Please sign up or log in.");
      } else {
        const { expiresAt } = UserOTPVerificationRecords[0];
        const otpReceived = UserOTPVerificationRecords[0].otp;
        if (expiresAt < Date.now()) {
          await UserOTPVerification.deleteMany({ email });
          throw new Error('Code has expired. Please request again.');
        } else if (otpReceived !== otp) {
          info('recivedOTP', otpReceived);
          info('ourOTP', otp);
          throw new Error('Invalid code passed. Check your inbox.');
        } else {
          await UserOTPVerification.deleteMany({ email });
          return {
            status: true,
            message: 'User email verified successfully',
          };
        }
      }
    }
  } catch (error) {
    return {
      status: 'FAILED',
      message: error.message,
    };
  }
}

signupRouter.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const saltRounds = 10;
    const userResults = await Users.find({ $or: [{ username }, { email }] });
    if (userResults.length) {
      res.json({
        status: false,
        message: 'User with the provided email already exists',
      });
      return;
    }
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const checkOTPres = await CheckOTP(req);
    info('OTP checking result', checkOTPres.status);
    if (checkOTPres.status) {
      const newUser = new Users({
        username: req.body.username,
        email: req.body.email,
        password: passwordHash,
      });
      await newUser.save();
      res.send({
        status: true,
        message: 'User created Successfully',
      });
      return;
    }
  } catch (e) {
    res.send({
      status: false,
      message: `Unable to create User due to: ${e.message}`,
    });
  }
});

signupRouter.post('/sendOTP', async (req, res) => {
  const { email } = req.body;
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: process.env.AUTH_USER,
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address.</p><p>This code <b>expires in 1 hour</b></p>`,
    };
    const newOTPVerification = await new UserOTPVerification({
      email,
      otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });
    await newOTPVerification.save();
    const mailRes = await transporter.sendMail(mailOptions);
    info(mailRes);
    res.json({
      status: 'PENDING',
      message: 'Verification otp email sent',
      data: {
        email,
      },
    });
  } catch (error) {
    res.json({
      status: 'FAILED',
      message: error.message,
    });
  }
});

module.exports = signupRouter;
