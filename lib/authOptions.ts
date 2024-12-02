import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import  FacebookProvider  from 'next-auth/providers/Facebook';
import { CustomUser } from "./types";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as unknown as CustomUser;

        token._id = customUser._id;
        token.email = customUser.email;
        token.username = customUser.username;
        token.firstName = customUser.firstName;
        token.lastName = customUser.lastName;
        token.role = customUser.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        _id: token._id as string,
        email: token.email as string,
        username: token.username as string,
        firstName: token.firstName as string,
        lastName: token.lastName as string,
        role: token.role as string,
      };
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        let user;
        try {
          const res = await fetch(
            "https://exam.elevateegy.com/api/v1/auth/signin",
            {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          if (!res.ok) {
            console.error("Authentication failed");
            return null;
          }

          user = await res.json();
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null;
        }

        if (user?.user?.email === credentials?.email) {
          return user;
        }

        return null;
      },
      credentials: {
        email: {
          label: "Email",
          placeholder: "Please enter your email",
          type: "email",
        },
        password: {
          label: "Password",
          placeholder: "Please enter your password",
          type: "password",
        },
      },
    }),
  ],
};
