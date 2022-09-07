import mongoose, { Schema, Document, SchemaDefinition, model, Model } from 'mongoose';
import { createSchema } from '../utils/dbConnect';
import { IMeal } from './Meal.model';
require('./Meal.model');

export interface IOrder {
  name: string;
  meals?: [{
    meal: IMeal;
    quantity: number;
  }];
  observation?: string;
}
interface IDocOrder extends Document, IOrder {}

/* mealSchema will correspond to a collection in your MongoDB database. */
const OrderSchemaDefinition: SchemaDefinition ={
  name: {
    /* The name of this name */
    type: String,
    required: [true, 'Please provide a name for this order.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  meals: [{
    meal: {
      type: Schema.Types.ObjectId,
      ref: 'Meal',
    },
    quantity: {
      type: Number,
    },
  }],
  observation: {
    /* The observation of this order */
    type: String,
  },
  __v: {
    /* Hide it */
    type: Number,
    select: false,
  },
};


const OrderSchema: Schema<IDocOrder> = createSchema(OrderSchemaDefinition);

export default mongoose.models.Order as Model<IDocOrder> || model<IDocOrder>('Order', OrderSchema);
