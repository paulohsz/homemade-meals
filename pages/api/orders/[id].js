import dbConnect from '../../../src/api/utils/dbConnect';
import Order from '../../../src/api/models/Order';
// eslint-disable-next-line no-unused-vars
import Meal from '../../../src/api/models/Meal';

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
        const order = await Order.findById(id).populate({ path: 'meals.meal' });
        if (!order) {
          return res.status(400).json({ success: false, error: `Not found! ID_ORDER: ${id}` });
        }
        res.status(200).json({ success: true, data: order });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT': /* Edit a model by its ID */
      try {
        const order = await Order.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!order) {
          return res.status(400).json({ success: false, data: order });
        }
        res.status(200).json({ success: true, data: order });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE': /* Delete a model by its ID */
      try {
        const delorder = await Order.deleteOne({ _id: id });
        if (!delorder) {
          return res.status(400).json({ success: false });
        }
        if (delorder.deletedCount === 0) {
          return res.status(200).json({ success: true, data: {}, error: `Not found! ID_ORDER: ${id}` });
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
