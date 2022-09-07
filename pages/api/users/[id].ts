import { NextApiResponse, NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';
import dbConnect from '../../../src/api/utils/dbConnect';
import User, { IUser } from '../../../src/api/models/User.model';
import { ResponseFuncs } from '../../../src/api/utils/types';

interface ExtendedNextApiRequest extends NextApiRequest {
  query: {
    id: string;
  };
  body: IUser;
  method: keyof ResponseFuncs;
}

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const method = req.method as keyof ResponseFuncs;
  const { id } = req.query;

  const session = await getSession({ req });
  if (session) {
    await dbConnect();

    const handleCase: ResponseFuncs = {
      GET: async () => {
        try {
          const user = await User.findById(id, { password: 0 });
          if (!user) {
            return res
              .status(400)
              .json({ success: false, error: `Not found! _id: ${id}` });
          }
          res.status(200).json({ success: true, data: user });
        } catch (error) {
          res.status(400).json({ success: false });
        }
      },
      PUT: async () => {
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
          res
            .status(400)
            .json({ success: false, errors: 'When try update user' });
        }
      },
      DELETE: async () => {
        try {
          const delUser = await User.deleteOne({ _id: id });
          if (!delUser) {
            return res.status(400).json({ success: false });
          }
          if (delUser.deletedCount === 0) {
            return res.status(200).json({
              success: true,
              data: {},
              error: `Not found! ID_USER: ${id}`,
            });
          }
          res.status(200).json({ success: true, data: {} });
        } catch (error) {
          res.status(400).json({ success: false });
        }
      },
    };

    const response = handleCase[method];
    if (response) {
      response();
    } else {
      res
        .status(400)
        .json({ success: false, errors: 'No Response for This Request' });
    }
  } else {
    res.status(500).json({
      success: false,
      message: 'You don\'t have permission, please try sign in again',
    });
  }
};

export default handler;
