import { hash } from 'bcryptjs';
import mongoose from 'mongoose';

/* UserTokenSchema will correspond to a collection in your MongoDB database. */
const UserTokenSchema = new mongoose.Schema({
  email: {
    /* The email of this user */
    type: String,
    required: [true, 'Email address is required'],
  },
  token: {
    /* The token */
    type: String,
    required: [true, 'Token is required'],
  },
  type: {
    /* The observation of your user */
    type: String,
    required: [true, 'Type is required'],
  },
},
{
  timestamps: true,
});

UserTokenSchema.pre('save', async function save(next) {
  const userToken = this;
  if (this.isModified('token')) userToken.token = await hash(userToken.token, 12);
  next();
});

export default mongoose.models.UserToken || mongoose.model('UserToken', UserTokenSchema);
