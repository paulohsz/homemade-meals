import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

async function dbConnect() {
  if (!uri) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local',
    );
  }

  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  // eslint-disable-next-line consistent-return
  return mongoose.connect(process.env.MONGODB_URI);
}

export default dbConnect;
