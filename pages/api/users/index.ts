import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { HydratedDocument } from 'mongoose';
import dbConnect from '../../../src/api/utils/dbConnect';
import User, { IUser } from '../../../src/api/models/User.model';
import { ResponseFuncs } from '../../../src/api/utils/types';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IUser;
  method: keyof ResponseFuncs;
}
const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const method = req.method as keyof ResponseFuncs;
  const session = await getSession({ req });

  if (session) {
    await dbConnect();
    const handleCase: ResponseFuncs = {
      GET: async () => {
        try {
          /* find all the data in our database */
          const users = await User.find<IUser>({});
          res.status(200).json({ success: true, data: users });
        } catch (error) {
          res.status(400).json({ success: false });
        }
      },
      POST: async () => {
        try {
          const newUser: HydratedDocument<IUser> = await User.create(req.body);
          res
            .status(201)
            .json({ success: true, data: await User.findById(newUser._id) });
        } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
          res
            .status(400)
            .json({ success: false, errors: error.errors || error });
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
    res
      .status(500)
      .json({
        success: false,
        message: 'You don\'t have permission, please try sign in again',
      });
  }
};

export default handler;
