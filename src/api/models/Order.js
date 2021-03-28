import mongoose, { Schema } from 'mongoose';

/* mealSchema will correspond to a collection in your MongoDB database. */
const OrderSchema = new Schema({
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
    /* The observation of this meal */
    type: String,
  },
},
{
  timestamps: true,
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
