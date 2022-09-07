import { hash } from 'bcryptjs';
import mongoose, { Schema, Document, SchemaDefinition, model, UpdateQuery } from 'mongoose';
import { createSchema } from '../utils/dbConnect';

const validateEmail = (email: string) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // eslint-disable-line no-useless-escape
  return re.test(email);
};
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  observation?: string;
  status?: string;
}

export interface IDocUser extends Document, IUser {
  _id: string;
}

const UserSchemaDefinition: SchemaDefinition = {
  name: {
    /* The name of this user */
    type: String,
    required: [true, 'Please provide a name for this user'],
    maxlength: [120, 'Name cannot be more than 120 characters'],
  },
  email: {
    /* The email of this user */
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'Email address is required'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
    validate: [validateEmail, 'Please fill a valid email address'],
  },
  password: {
    /* The password of this user */
    type: String,
    select: false,
    required: [true, 'Please provide a password for this user'],
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
  __v: {
    /* Hide it */
    type: Number,
    select: false,
  },
};

const UserSchema: Schema<IDocUser> = createSchema(UserSchemaDefinition);

UserSchema.pre<IDocUser>('save', async function save(next) {
  if (this.isModified('password'))
    this.password = await hash(this.password, 12);
  next();
});

UserSchema.pre<IDocUser & UpdateQuery<IDocUser>>('findOneAndUpdate',
async function findOneAndUpdate(next) {
  const update = this.getUpdate();
  if (update.password) update.password = await hash(update.password, 12);
  next();
});

export default mongoose.models.User || model<IUser>('User', UserSchema);

// const validateEmail = (email: string) => {
//   const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(email);
// };

// interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   observation?: string;
//   status?: string;
// }

// interface IDocUser extends Document, IUser { }

// function createSchema(definition: SchemaDefinition) {
//   return new Schema(definition);
// }

// const UserSchemaDefinition: SchemaDefinition = {
//   name: {
//     /* The name of this user */
//     type: String,
//     required: [true, 'Please provide a name for this user'],
//     maxlength: [120, 'Name cannot be more than 120 characters'],
//   },
//   email: {
//     /* The email of this user */
//     type: String,
//     lowercase: true,
//     unique: true,
//     required: 'Email address is required',
//     maxlength: [60, 'Name cannot be more than 60 characters'],
//     // validate: [validateEmail, 'Please fill a valid email address'],
//     // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
//   },
//   password: {
//     /* The password of this user */
//     type: String,
//     // required: [true, 'Please provide a password for this user'],
//   },
//   observation: {
//     /* The observation of your user */
//     type: String,
//   },
//   status: {
//     /* The observation of your user */
//     type: String,
//     enum: {
//       values: ['active', 'deactive'],
//       message: '{VALUE} is not supported',
//     },
//     default: 'active',
//   },
// };

// const UserSchema: Schema<IDocUser> = createSchema(UserSchemaDefinition);
/* UserSchema will correspond to a collection in your MongoDB database. */
// const UserSchema = new Schema<UserDoc, Model<UserDoc>, ProfileDoc>(UserSchemaDef,
// {
//   timestamps: true,
// });

// UserSchema.pre<IDocUser>('save', async function save(next) {
//   const user = this;
//   if (this.isModified('password')) user.password = await hash(user.password, 12);
//   next();
// });

// UserSchema.pre<IDocUser & UpdateQuery<IDocUser>>('findOneAndUpdate', async function findOneAndUpdate(next) {
//   const query = this;
//   const update = query.getUpdate();
//   if (update.password) update.password = await hash(update.password, 12);
//   next();
// });

// export default mongoose.models.User || model<IUser>('User', UserSchema);
