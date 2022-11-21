require('dotenv').config();

const signupRouter = require('express').Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const Users = require('../modals/userModals');
const UserOTPVerification = require('../modals/UserOTPVerification');

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
          console.log('recivedOTP', otpReceived);
          console.log('ourOTP', otp);
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
  console.log('got the hit');
  const { username, email, password } = req.body;
  const saltRounds = 10;
  const userResults = await Users.find({ $or: [{ username }, { email }] });
  if (userResults.length) {
    res.json({
      status: 'Failed',
      message: 'User with the provided email already exists',
    });
    return;
  }
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const checkOTPres = await CheckOTP(req);
  console.log('OTP checking result', checkOTPres.status);
  if (checkOTPres.status) {
    const newUser = new Users({
      username: req.body.username,
      email: req.body.email,
      password: passwordHash,
    });
    await newUser.save();
    res.send(true);
    return;
  }
  res.send(false);
});

signupRouter.post('/sendOTP', async (req, res) => {
  // const _id = req.body.id
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
    console.log(mailRes);
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
