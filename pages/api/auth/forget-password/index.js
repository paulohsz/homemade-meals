import nodemailer from 'nodemailer';
import crypto from 'crypto';
import path from 'path';
import User from '../../../../src/api/models/User';
import UserToken from '../../../../src/api/models/UserToken';
import { emailForget, textForget } from './components/emailForget';
import dbConnect from '../../../../src/api/utils/dbConnect';

export default async (req, res) => {
  const {
    body: { email },
    method,
  } = req;
  if (method === 'POST') {
    await dbConnect();
    const foundUser = await User.findOne({ email });

    if (foundUser && foundUser.status === 'active') {
      // create token and save on DB
      const type = 'forget.password';
      const token = crypto.randomBytes(32).toString('hex');
      const URL = process.env.NEXTAUTH_URL ?? `https://${process.env.VERCEL_URL}/`;
      await UserToken.deleteMany({ email, type });
      await UserToken.create(
        {
          email,
          token,
          type,
        },
      );
      const credentials = process.env.MAILTRAP_EMAIL
        ? {
          host: 'smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: process.env.MAILTRAP_EMAIL,
            pass: process.env.MAILTRAP_PASSWORD,
          },
        }
        : {
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
          },
        };

      const transporter = nodemailer.createTransport(credentials);
      await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify((error, success) => {
          if (error) {
            console.log(error); // eslint-disable-line no-console
            reject(error);
          } else {
            console.log('Server is ready to take our messages'); // eslint-disable-line no-console
            resolve(success);
          }
        });
      });

      const mailData = {
        from: process.env.GMAIL_EMAIL ?? 'from@example.com',
        to: email,
        subject: 'Reset your Homemande Meals Password',
        text: textForget(foundUser?.name, URL, `${URL}auth/reset-password/${email}/${token}`),
        html: emailForget(foundUser?.name, URL, `${URL}auth/reset-password/${email}/${token}`),
        attachments: [{
          filename: 'logo-header.png',
          path: path.join(process.cwd(), '/pages/api/auth/forget-password/components/logo-header.png'),
          cid: 'unique@logo', // same cid value as in the html img src
        }],
      };

      await new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
        transporter.sendMail(mailData, (err, info) => {
          if (err) {
            console.log('Error 1-->', err); // eslint-disable-line no-console
            reject(err);
          } else {
            console.log('Info 2-->', info); // eslint-disable-line no-console
            console.log('Info 3-->', info.response); // eslint-disable-line no-console
            resolve(info);
          }
        });
      });
    }
    res.status(200).json({ success: true, message: 'If your email belongs to an active account, a password reset email has been sent to it' });
  } else {
    res
      .status(500)
      .json({
        success: false,
        message: 'Something is wrong, please try again',
      });
  }
};
