import { getSession } from 'next-auth/client';
import dbConnect from '../../../src/api/utils/dbConnect';
import User from '../../../src/api/models/User';

// eslint-disable-next-line consistent-return
export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const session = await getSession({ req });
  if (session) {
    await dbConnect();

    switch (method) {
      case 'GET': /* Get a model by its ID */
        try {
          const user = await User.findById(id, { password: 0 });
          if (!user) {
            return res.status(400).json({ success: false, error: `Not found! ID_USER: ${id}` });
          }
          res.status(200).json({ success: true, data: user });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;

      case 'PUT': /* Edit a model by its ID */
        try {
          const user = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          });

          if (!user) {
            return res.status(400).json({ success: false, data: user });
          }
          if (user.password) delete user._doc.password;
          res.status(200).json({ success: true, data: user });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;

      case 'DELETE': /* Delete a model by its ID */
        try {
          const delUser = await User.deleteOne({ _id: id });
          if (!delUser) {
            return res.status(400).json({ success: false });
          }
          if (delUser.deletedCount === 0) {
            return res.status(200).json({ success: true, data: {}, error: `Not found! ID_USER: ${id}` });
          }
          res.status(200).json({ success: true, data: {} });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;

      default:
        res.status(400).json({ success: false });
        break;
    }
  } else {
    res.status(500).json({ success: false, message: 'You don\'t have permission, please try sign in again' });
  }
}
