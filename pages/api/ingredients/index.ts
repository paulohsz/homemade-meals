import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../src/api/utils/dbConnect';
import Ingredient from '../../../src/api/models/Ingredient.model';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  const session = await getSession({ req });
  if (session) {
    await dbConnect();

    switch (method) {
      case 'GET':
        try {
          const ingredients = await Ingredient.find({}); /* find all the data in our database */
          res.status(200).json({ success: true, data: ingredients });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case 'POST':
        try {
          const ingredient = await Ingredient.create(
            req.body,
          ); /* create a new model in the database */
          res.status(201).json({ success: true, data: ingredient });
        } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
          res
            .status(400)
            .json({ success: false, errors: error.errors || error });
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
