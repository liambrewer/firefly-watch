import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],

  secret: process.env.AUTH_SECRET!,

  pages: {
    error: '/auth/error',
    signIn: '/auth/login',
  },

  callbacks: {
    session: async ({ session, user }) => {
      session.user!.id = user.id;
      return Promise.resolve(session);
    },
  },
};

export default NextAuth(authOptions);
