import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "utils";
import { User } from "models";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const { user } = session;

      await db.connect();
      const userDb = await User.findOne({ email: user?.email });
      if (!userDb) {
        await User.create({
          name: user?.name,
          email: user?.email,
          image: user?.image,
        });
      }
      await db.disconnect();

      return session;
    },
  },
});
