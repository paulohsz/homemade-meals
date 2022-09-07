import { getSession } from 'next-auth/react';
import { NextApiResponse } from 'next';
import dbConnect from '../../../src/api/utils/dbConnect';
import Meal, { IMeal } from '../../../src/api/models/Meal.model';
import { ReqIdExtendedNextApi, ResponseFuncs } from 'src/api/utils/types';

const handler = async (
  req: ReqIdExtendedNextApi<IMeal>,
  res: NextApiResponse,
) => {
  const method = req.method as keyof ResponseFuncs;
  const { id } = req.query;

  const session = await getSession({ req });
  
  if (session) {
    await dbConnect();

    const handleCase: ResponseFuncs = {
      GET: async () => {
        try {
          const meal = await Meal.findById(id)
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
            });
          if (!meal) {
            return res
              .status(400)
              .json({ success: false, error: `Not found! _id: ${id}` });
          }
          res.status(200).json({ success: true, data: meal });
        } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
          res
            .status(400)
            .json({ success: false, errors: error.errors || error });
        }
      },
      PUT: async () => {
        try {
          const meal = await Meal.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          })
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
          });

          if (!meal) {
            return res.status(400).json({ success: false, data: meal });
          }
          res.status(200).json({ success: true, data: meal });
        } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
          res
            .status(400)
            .json({ success: false, errors: error.errors || error });
        }
      },
      DELETE: async () => {
        try {
          const delmeal = await Meal.deleteOne({ _id: id });
          if (!delmeal) {
            return res.status(400).json({ success: false });
          }
          if (delmeal.deletedCount === 0) {
            return res.status(200).json({
              success: true,
              data: {},
              error: `Not found! _id: ${id}`,
            });
          }
          res.status(200).json({ success: true, data: {} });
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
    res.status(500).json({
      success: false,
      message: 'You don\'t have permission, please try sign in again',
    });
  }
};

export default handler;
