import mongoose, { Schema } from 'mongoose';

/* mealSchema will correspond to a collection in your MongoDB database. */
const MealSchema = new Schema({
  name: {
    /* The name of this meal */
    type: String,
    unique: true,
    required: [true, 'Please provide a name for this meal.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  ingredients: [{
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
},
{
  timestamps: true,
});

export default mongoose.models.Meal || mongoose.model('Meal', MealSchema);
