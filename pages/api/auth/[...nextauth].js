import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { compare } from 'bcryptjs';
import dbConnect from '../../../src/api/utils/dbConnect';
import User from '../../../src/api/models/User';

export default NextAuth({
  // Configure JWT
  jwt: {
    // encryption: true,
    // secret: process.env.JWT_SECRET,
    signingKey: process.env.JWT_SIGNING_KEY,
    // encryptionKey: process.env.JWT_ENCRYPTION_KEY,
  },
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) { // eslint-disable-line no-unused-vars
      // SignIn (credentials)
      if (user && token && account.id === 'credentials') return { ...token, user };
      // Persist the OAuth access_token to the token right after signin
      return token;
    },
    async session(session, user, sessionToken) { // eslint-disable-line no-unused-vars
      if (user.user) return { user: user.user, expires: session.expires };
      return session;
    },
  },
  // Specify Provider
  providers: [
    Providers.Credentials({
      id: 'credentials',
      name: 'credentials - MongoDB + Mongooso',
      async authorize(credentials) {
        if (
          !credentials.email
          || !credentials.email.includes('@')
          || !credentials.password
        ) {
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
        const checkPassword = await compare(
          credentials.password,
          foundUser.password,
        );
        // Incorrect password - send response
        if (!checkPassword) {
          throw new Error('Your email or password was incorrect');
        }
        // Else send success response
        return {
          id: foundUser._id,
          email: foundUser.email,
          name: foundUser.name,
          observation: foundUser.observation,
        };
      },
    }),
  ],
});
