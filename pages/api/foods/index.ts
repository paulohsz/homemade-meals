import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/api/utils/dbConnect';
import Food from '../../../src/api/models/Food.model';
import { ResponseFuncs } from 'src/api/utils/types';

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method as keyof ResponseFuncs;
  const session = await getSession({ req });

  if (session) {
    await dbConnect();
    
    const handleCase: ResponseFuncs = {
      GET: async () => {
        try {
          /* find all the data in our database */
          const foods = await Food.find({}).populate({ path: 'ingredients.ingredient', select: '-observation -createdAt -updatedAt'}); 
          res.status(200).json({ success: true, data: foods });
        } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
          res.status(400).json({ success: false, errors: error.errors || error });
        }
      },
      POST: async () => {
        try {
          const food = await Food.create(
            req.body,
          ); /* create a new model in the database */
          res.status(201).json({ success: true, data: food });
        } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
          res.status(400).json({ success: false, errors: error.errors || error });
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
    res.status(500).json({ success: false, message: 'You don\'t have permission, please try sign in again' });
  }
}

export default handler;
