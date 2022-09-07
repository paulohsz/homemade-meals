import { getSession } from 'next-auth/react';
import { NextApiResponse } from 'next';
import dbConnect from '../../../src/api/utils/dbConnect';
import Ingredient, { IIngredient } from '../../../src/api/models/Ingredient.model';
import { ReqIdExtendedNextApi, ResponseFuncs } from '../../../src/api/utils/types';


const handler = async(req: ReqIdExtendedNextApi<IIngredient>, res: NextApiResponse) => {
  const method = req.method as keyof ResponseFuncs;
  const { id } = req.query;

  const session = await getSession({ req });
  if (session) {
    await dbConnect();

    const handleCase: ResponseFuncs = {
      GET: async () => {
        try {
          const ingredient = await Ingredient.findById(id);
          if (!ingredient) {
            return res.status(400).json({ success: false, error: `Not found! _id: ${id}` });
          }
          res.status(200).json({ success: true, data: ingredient });
        } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
          res
            .status(400)
            .json({ success: false, errors: error.errors || error });
        }
      },
      PUT: async () => {
        try {
          const ingredient = await Ingredient.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
          });

          if (!ingredient) {
            return res.status(400).json({ success: false, data: ingredient });
          }
          res.status(200).json({ success: true, data: ingredient });
        } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
          res
            .status(400)
            .json({ success: false, errors: error.errors || error });
        }
      },
      DELETE: async () => {
        try {
          const delIngredient = await Ingredient.deleteOne({ _id: id });
          if (!delIngredient) {
            return res.status(400).json({ success: false });
          }
          if (delIngredient.deletedCount === 0) {
            return res.status(200).json({ success: true, data: {}, error: `Not found! ID_INGREDIENT: ${id}` });
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
