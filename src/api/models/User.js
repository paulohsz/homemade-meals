/* eslint-disable no-useless-escape */
import { hash } from 'bcryptjs';
import mongoose from 'mongoose';

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({
  name: {
    /* The name of this user */
    type: String,
    required: [true, 'Please provide a name for this user'],
    maxlength: [120, 'Name cannot be more than 120 characters'],
  },
  email: {
    /* The email of this user */
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    maxlength: [60, 'Name cannot be more than 60 characters'],
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    /* The password of this user */
    type: String,
    // required: [true, 'Please provide a password for this user'],
  },
  observation: {
    /* The observation of your user */
    type: String,
  },
  status: {
    /* The observation of your user */
    type: String,
    enum: {
      values: ['active', 'deactive'],
      message: '{VALUE} is not supported',
    },
    default: 'active',
  },
},
{
  timestamps: true,
});

UserSchema.pre('save', async function save(next) {
  const user = this;
  if (this.isModified('password')) user.password = await hash(user.password, 12);
  next();
});

UserSchema.pre('findOneAndUpdate', async function findOneAndUpdate(next) {
  const query = this;
  const update = query.getUpdate();
  if (update.password) update.password = await hash(update.password, 12);
  next();
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
