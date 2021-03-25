import dbConnect from '../../../src/utils/dbConnect';
import Meal from '../../../src/models/Meal';
// eslint-disable-next-line no-unused-vars
import Ingredient from '../../../src/models/Ingredient';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const meals = await Meal.find({}).populate({ path: 'ingredients.ingredients' }); /* find all the data in our database */
        res.status(200).json({ success: true, data: meals });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'POST':
      try {
        const meal = await Meal.create(
          req.body,
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: meal });
      } catch (error) {
        res.status(400).json({ success: false, error, errors: error.errors });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
