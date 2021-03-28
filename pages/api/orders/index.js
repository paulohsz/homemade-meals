import dbConnect from '../../../src/api/utils/dbConnect';
// eslint-disable-next-line no-unused-vars
import Meal from '../../../src/api/models/Meal';
// eslint-disable-next-line no-unused-vars
import Ingredient from '../../../src/api/models/Ingredient';
// eslint-disable-next-line no-unused-vars
import Food from '../../../src/api/models/Food';
import Order from '../../../src/api/models/Order';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const orders = await Order.find({})
          .populate({ path: 'meals.meal' }); /* find all the data in our database */
        res.status(200).json({ success: true, data: orders });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'POST':
      try {
        const orders = await Order.create(
          req.body,
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: orders });
      } catch (error) {
        res.status(400).json({ success: false, error, errors: error.errors });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
