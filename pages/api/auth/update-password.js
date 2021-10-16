import { getSession } from 'next-auth/client';
import { hash, compare } from 'bcryptjs';
import * as Yup from 'yup';
import dbConnect from '../../../src/api/utils/dbConnect';
import User from '../../../src/api/models/User';

async function handler(req, res) {
  const { method } = req;

  // Only POST mothod is accepted
  if (method === 'PUT') {
    const session = await getSession({ req });
    if (session) {
      await dbConnect();
      const yupUser = Yup.object().shape({
        name: Yup.string(),
        passwordCurrent: Yup.string()
          .min(6, 'Minimum an six-character password')
          .required('Current password is required'),
        password: Yup.string().min(6, 'Minimum an six-character password'),
        confirmPassword: Yup.string().when('password', {
          is: (val) => !!(val && val.length > 0),
          then: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
        }),
        observation: Yup.string(),
      });

      await yupUser
        .validate(req.body, { abortEarly: false })
        .then(async (value) => {
          const user = await User.findOne({ email: session.user.email });
          if (user) {
            const checkPassword = await compare(
              value.passwordCurrent,
              user.password,
            );
            // Incorrect password - send response
            if (!checkPassword) {
              res
                .status(422)
                .json({ success: false, errors: { passwordCurrent: ['Current password is wrong'] } });
            } else {
              if (value.password) user.password = await hash(value.password, 12);
              if (value.name) user.name = value.name;
              if (value.observation) user.observation = value.observation;
              if (value.password || value.name || value.observation) {
                await user.save();
              }

              ['_id', 'password', 'updatedAt', '__v'].forEach(
                (field) => delete user._doc[field],
              );
              res.status(200).json({ success: true, data: user });
            }
          } else {
            res.status(400).json({ success: false, data: user });
          }
        })
        .catch((err) => {
          const arrayError = err.inner.reduce((acc, e) => {
            acc[e.path] = acc[e.path] ? [...acc[e.path], e.message] : [e.message];
            return acc;
          }, {});
          res.status(422).json({ success: false, errors: arrayError });
        });
    } else {
      res.status(500).json({ success: false, message: 'You don\'t have permission, please try sign in again' });
    }
  } else {
    // Response for other than POST method
    res.status(500).json({ success: false, message: 'Route not valid' });
  }
}

export default handler;
