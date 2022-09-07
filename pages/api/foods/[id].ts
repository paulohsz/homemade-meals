import { getSession } from 'next-auth/react';
import { NextApiResponse } from 'next';
import dbConnect from '../../../src/api/utils/dbConnect';
import Food, { IFood } from 'src/api/models/Food.model';
import { ReqIdExtendedNextApi, ResponseFuncs } from 'src/api/utils/types';

const handler = async(req: ReqIdExtendedNextApi<IFood>, res: NextApiResponse) => {
  const method = req.method as keyof ResponseFuncs;
  const { id } = req.query;

  const session = await getSession({ req });
  if (session) {
    await dbConnect();

    const handleCase: ResponseFuncs = {
      GET: async () => {
        try {
          const food = await Food.findById(id).populate({ path: 'ingredients.ingredient', select: '-observation -createdAt -updatedAt'});
          if (!food) {
            return res.status(400).json({ success: false, error: `Not found! _id: ${id}` });
          }
          res.status(200).json({ success: true, data: food });
        } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
          res
            .status(400)
            .json({ success: false, errors: error.errors || error });
        }
      },
      PUT: async () => {
        try {
          const food = await Food.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          });

          if (!food) {
            return res.status(400).json({ success: false, data: food });
          }
          res.status(200).json({ success: true, data: food });
        } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
          res
            .status(400)
            .json({ success: false, errors: error.errors || error });
        }
      },
      DELETE: async () => {
        try {
          const delFood = await Food.deleteOne({ _id: id });
          if (!delFood) {
            return res.status(400).json({ success: false });
          }
          if (delFood.deletedCount === 0) {
            return res.status(200).json({ success: true, data: {}, error: `Not found! ID_FOOD: ${id}` });
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
}

export default handler;
