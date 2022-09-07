import mongoose, { Schema, Document, SchemaDefinition, model, Model } from 'mongoose';
import { createSchema } from '../utils/dbConnect';
import { IIngredient } from './Ingredient.model';
import { IFood } from './Food.model';
require('./Ingredient.model');
require('./Food.model');

export interface IMeal {
  name: string;
  ingredients?: [{
    ingredient: IIngredient;
    quantity: number;
  }];
  foods?: Array<IFood>
  observation?: string;
}
interface IDocMeal extends Document, IMeal {}

/* mealSchema will correspond to a collection in your MongoDB database. */
const MealSchemaDefinition: SchemaDefinition = {
  name: {
    /* The name of this meal */
    type: String,
    unique: true,
    required: [true, 'Please provide a name for this meal.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  ingredients: [{
    _id: {
      type: Schema.Types.ObjectId,
      select: false,
    },
    ingredient: {
      type: Schema.Types.ObjectId,
      ref: 'Ingredient',
    },
    quantity: {
      type: Number,
    },
  }],
  foods: [{
    type: Schema.Types.ObjectId,
    ref: 'Food',
  }],
  observation: {
    /* The observation of this meal */
    type: String,
  },
  __v: {
    /* Hide it */
    type: Number,
    select: false,
  },
};
const MealSchema: Schema<IDocMeal> = createSchema(MealSchemaDefinition);

export default mongoose.models.Meal as Model<IDocMeal> || model<IDocMeal>('Meal', MealSchema);
