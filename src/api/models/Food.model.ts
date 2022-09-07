import mongoose, { Schema, Document, SchemaDefinition, model, Model } from 'mongoose';
import { createSchema } from '../utils/dbConnect';
import { IIngredient } from './Ingredient.model';
require('./Ingredient.model');



export interface IFood {
  name: string;
  ingredients: [{
    ingredient: IIngredient;
    quantity: number;
  }];
  coccao?: number;
  energy?: number;
  recipe?: string;
}

interface IDocFood extends Document, IFood {}

/* FoodSchema will correspond to a collection in your MongoDB database. */
const FoodSchemaDefinition: SchemaDefinition = {
  name: {
    /* The name of this food */
    type: String,
    unique: true,
    required: [true, 'Please provide a name for this food.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  ingredients: [{
    _id: {
      type: Schema.Types.ObjectId,
      select: false,
    },
    ingredient: {
      type: 'ObjectId',
      ref: 'Ingredient',
      required: [true, 'Please provide a name for this food.'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide a quantity for this food.'],
    },
  }],
  coccao: {
    type: Number,
  },
  energy: {
    type: Number,
  },
  recipe: {
    type: String,
  },
  __v: {
    /* Hide it */
    type: Number,
    select: false,
  },
};

const FoodSchema: Schema<IDocFood> = createSchema(FoodSchemaDefinition);

export default mongoose.models.Food as Model<IDocFood> || model<IDocFood>('Food', FoodSchema);
