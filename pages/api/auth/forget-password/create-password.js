import { compare } from 'bcryptjs';
import { differenceInMinutes } from 'date-fns';
import User from '../../../../src/api/models/User';
import UserToken from '../../../../src/api/models/UserToken';
import dbConnect from '../../../../src/api/utils/dbConnect';

export default async function handler(req, res) {
  const {
    body: {
      email, token, password, passwordConfirmation,
    },
    method,
  } = req;

  const tokenExpirationMinutes = 60;
  const type = 'forget.password';

  const okPassword = password && passwordConfirmation ? password === passwordConfirmation : null;

  if (okPassword === false) {
    res.status(422).json({ success: false, message: 'Password confirmation doesn\'t match Password' });
    return;
  }

  if ((method === 'POST') && (email && token)) {
    await dbConnect();
    const tokenFound = await UserToken.findOne({ email, type });

    // found token
    if (tokenFound) {
      // token expired ??
      if (differenceInMinutes(new Date(), tokenFound.createdAt) > tokenExpirationMinutes) {
        await UserToken.deleteMany({ email, type });
        res.status(422).json({ success: false, message: 'Your token expired. Please, request again' });
        return;
      }

      // Check hased password with DB password
      const checkPassword = await compare(
        token,
        tokenFound.token,
      );

      if (checkPassword) {
        // just check before changing password (without password/confirmPassword)
        if (okPassword === null) {
          res.status(200).json({ success: true, message: 'Success' });
          return;
        }

        // change password just active user
        if (okPassword === true) {
          const foundUser = await User.findOneAndUpdate({ email, status: 'active' }, { password });
          if (foundUser) {
            await UserToken.deleteMany({ email, type });
            res.status(200).json({ success: true, message: 'Your password has been reset successfully. Redirecting...' });
            return;
          }
        }
      }
    }
  }
  res
    .status(400)
    .json({
      success: false,
      message: 'Something is wrong, please try again',
    });
}
