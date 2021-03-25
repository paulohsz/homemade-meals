import mongoose from 'mongoose';

/* IngredientSchema will correspond to a collection in your MongoDB database. */
const IngredientSchema = new mongoose.Schema({
  name: {
    /* The name of this ingredient */
    type: String,
    required: [true, 'Please provide a name for this ingredient.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  base_unit: {
    /* The base unit of your ingredient */
    type: String,
    required: [true, 'Please specify the base unit of your ingredient.'],
    maxlength: [20, 'The base unit specified cannot be more than 20 characters'],
  },
  type: {
    /* The type of your ingredient */
    type: String,
    maxlength: [30, 'Species specified cannot be more than 30 characters'],
  },
  quantity: {
    /* The type of your ingredient */
    type: Number,
    required: [true, 'Please provide a quantity for this ingredient.'],
  },
  value: {
    /* The type of your ingredient */
    type: Number,
    required: [true, 'Please provide a value for this ingredient.'],
  },
},
{
  timestamps: true,
});

export default mongoose.models.Ingredient || mongoose.model('Ingredient', IngredientSchema);
