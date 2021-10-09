import mongoose, { Schema } from 'mongoose';

/* FoodSchema will correspond to a collection in your MongoDB database. */
const FoodSchema = new Schema({
  name: {
    /* The name of this food */
    type: String,
    unique: true,
    required: [true, 'Please provide a name for this food.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  ingredients: [{
    ingredient: {
      type: Schema.Types.ObjectId,
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
},
{
  timestamps: true,
});

export default mongoose.models.Food || mongoose.model('Food', FoodSchema);
