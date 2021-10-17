import { getSession } from 'next-auth/client';
import dbConnect from '../../../src/api/utils/dbConnect';
import Ingredient from '../../../src/api/models/Ingredient';

export default async function handler(req, res) {
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
        } catch (error) {
          res.status(400).json({ success: false, error, errors: error.errors });
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
