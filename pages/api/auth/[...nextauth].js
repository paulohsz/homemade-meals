import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { compare } from 'bcryptjs';
import dbConnect from '../../../src/api/utils/dbConnect';
import User from '../../../src/api/models/User';

export default NextAuth({
  // Configure JWT
  session: {
    jwt: true,
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  // Specify Provider
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        if (!credentials.email || !credentials.email.includes('@') || !credentials.password) {
          throw new Error('Email and password are required');
        }

        // Connect to DB
        await dbConnect();

        // Find user with the email
        const foundUser = await User.findOne({ email: credentials.email });
        // Not found - send error res
        if (!foundUser) {
          throw new Error('Your email or password was incorrect');
        }

        // Check hased password with DB password
        const checkPassword = await compare(credentials.password, foundUser.password);
        // Incorrect password - send response
        if (!checkPassword) {
          throw new Error('Your email or password was incorrect');
        }
        // Else send success response
        return {
          id: foundUser._id,
          email: foundUser.email,
          name: foundUser.name,
          image: { observation: foundUser.observation },
        };
      },
    }),
  ],
});
