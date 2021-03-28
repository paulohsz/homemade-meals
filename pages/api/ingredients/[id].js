import dbConnect from '../../../src/api/utils/dbConnect';
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
        const ingredient = await Ingredient.findById(id);
        if (!ingredient) {
          return res.status(400).json({ success: false, error: `Not found! ID_INGREDIENT: ${id}` });
        }
        res.status(200).json({ success: true, data: ingredient });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT': /* Edit a model by its ID */
      try {
        const ingredient = await Ingredient.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!ingredient) {
          return res.status(400).json({ success: false, data: ingredient });
        }
        res.status(200).json({ success: true, data: ingredient });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE': /* Delete a model by its ID */
      try {
        const delIngredient = await Ingredient.deleteOne({ _id: id });
        if (!delIngredient) {
          return res.status(400).json({ success: false });
        }
        if (delIngredient.deletedCount === 0) {
          return res.status(200).json({ success: true, data: {}, error: `Not found! ID_INGREDIENT: ${id}` });
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
