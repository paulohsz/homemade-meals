import dbConnect from '../../../src/api/utils/dbConnect';
import Meal from '../../../src/api/models/Meal';
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
        const meal = await Meal.findById(id)
          .populate({ path: 'ingredients.ingredient' })
          .populate({ path: 'foods', populate: 'ingredients.ingredient' });
        if (!meal) {
          return res.status(400).json({ success: false, error: `Not found! ID_MEAL: ${id}` });
        }
        res.status(200).json({ success: true, data: meal });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT': /* Edit a model by its ID */
      try {
        const meal = await Meal.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!meal) {
          return res.status(400).json({ success: false, data: meal });
        }
        res.status(200).json({ success: true, data: meal });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE': /* Delete a model by its ID */
      try {
        const delmeal = await Meal.deleteOne({ _id: id });
        if (!delmeal) {
          return res.status(400).json({ success: false });
        }
        if (delmeal.deletedCount === 0) {
          return res.status(200).json({ success: true, data: {}, error: `Not found! ID_MEAL: ${id}` });
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
