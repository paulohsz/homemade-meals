import mongoose, { Schema } from 'mongoose';

/* mealSchema will correspond to a collection in your MongoDB database. */
const MealSchema = new Schema({
  name: {
    /* The name of this meal */
    type: String,
    required: [true, 'Please provide a name for this meal.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  ingredients: [{
    ingredients: {
      type: Schema.Types.ObjectId,
      ref: 'Ingredient',
    },
    value: {
      type: Number,
    },
  }],
},
{
  timestamps: true,
});

export default mongoose.models.Meal || mongoose.model('Meal', MealSchema);
