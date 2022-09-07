import { getSession } from 'next-auth/react';
import { NextApiResponse } from 'next';
import Meal, { IMeal } from 'src/api/models/Meal.model';
import { ReqIdExtendedNextApi, ResponseFuncs } from 'src/api/utils/types';
import dbConnect from 'src/api/utils/dbConnect';

const handler = async(
  req: ReqIdExtendedNextApi<IMeal>,
  res: NextApiResponse,
) => {
  const method = req.method as keyof ResponseFuncs;
  const session = await getSession({ req });

  if (session) {
    await dbConnect();
    const handleCase: ResponseFuncs = {
      GET: async () => {
        try {
          const meals = await Meal.find({})
            .populate({
              path: 'ingredients.ingredient',
              select: '-observation -createdAt -updatedAt',
            })
            .populate({
              path: 'foods',
              select: '-createdAt -updatedAt',
              populate: {
                path: 'ingredients.ingredient',
                select: '-observation -createdAt -updatedAt',
              },
            }); /* find all the data in our database */
          res.status(200).json({ success: true, data: meals });
        } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
          res
            .status(400)
            .json({ success: false, errors: error.errors || error });
        }
      },
      POST: async () => {
        try {
          const meal = await Meal.create(
            req.body,
          ); /* create a new model in the database */
          res.status(201).json({ success: true, data: meal });
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
}

export default handler;
