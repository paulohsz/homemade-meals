import dbConnect from '../../../src/api/utils/dbConnect';
import Food from '../../../src/api/models/Food';
// eslint-disable-next-line no-unused-vars
import Ingredient from '../../../src/api/models/Ingredient';

// eslint-disable-next-line consistent-return
export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET': /* Get a model by its ID */
      try {
        const food = await Food.findById(id).populate({ path: 'ingredients.ingredient' });
        if (!food) {
          return res.status(400).json({ success: false, error: `Not found! ID_FOOD: ${id}` });
        }
        res.status(200).json({ success: true, data: food });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT': /* Edit a model by its ID */
      try {
        const food = await Food.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!food) {
          return res.status(400).json({ success: false, data: food });
        }
        res.status(200).json({ success: true, data: food });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE': /* Delete a model by its ID */
      try {
        const delFood = await Food.deleteOne({ _id: id });
        if (!delFood) {
          return res.status(400).json({ success: false });
        }
        if (!delFood) {
          return res.status(400).json({ success: false });
        }
        if (delFood.deletedCount === 0) {
          return res.status(200).json({ success: true, data: {}, error: `Not found! ID_FOOD: ${id}` });
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
}
