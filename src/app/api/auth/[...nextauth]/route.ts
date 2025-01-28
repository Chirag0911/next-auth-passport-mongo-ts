import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  callbacks: {
    async signIn({ user, account, profile }: any) {
      await dbConnect();
      const email = profile.email;
      const firstName = profile.given_name || profile.first_name;
      const lastName = profile.family_name || profile.last_name;
      const username = profile.name || `${firstName} ${lastName}`;

      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        const newUser = new User({
          username,
          firstName,
          lastName,
          email,
          loginType: "social",
        });

        await newUser.save();
      }

      return true;
    },
    async jwt({ token, account, user }: any) {
      if (account?.access_token) {
        const existingUser = await User.findOne({ email: user.email });

        const accessToken = jwt.sign(
          {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
          },
          process.env.NEXT_PUBLIC_JWT_SECRET as string,
          { expiresIn: "1h" }
        );
        token.accessToken = accessToken;
        return token;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
