import dbConnect from '../../../src/api/utils/dbConnect';
import User from '../../../src/api/models/User';

async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  // Only POST mothod is accepted
  if (method === 'POST') {
    // Getting email and password from body
    const {
      name, email, password, observation,
    } = req.body;
    // Validate email and password
    if (!email || !email.includes('@') || !password) {
      res.status(422).json({ success: false, message: 'Email and password are required' });
      return;
    }
    // Check existing
    const foundUser = await User.findOne({ email });

    // Send error response if duplicate user is found
    if (foundUser) {
      res.status(422).json({ success: false, message: 'This email already exists' });
      return;
    }

    try {
      /* create a new model in the database */
      const user = await User.create(
        {
          name,
          email,
          password,
          observation,
        },
      );
      delete user._doc.password;
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, error, errors: error.errors });
    }
  } else {
    // Response for other than POST method
    res.status(500).json({ success: false, message: 'Route not valid' });
  }
}

export default handler;
