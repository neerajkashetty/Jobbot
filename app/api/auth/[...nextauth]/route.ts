import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

console.log(process.env.GOOGLE_CLIENTID);

const prisma = new PrismaClient();

const authOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Email",
      credentials: {
        username: { label: "username", type: "text", placeholder: "username" },
        password: { label: "password", type: "text", placeholder: "password" },
      },

      async authorize(credentials: any) {
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (user) {
          console.log(user, "jhkj");
          return {
            id: user.username,
            name: user.username,
          };
        }
        console.log(user, "afdasfa");
        return null;
      },
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENTID ?? "",
      clientSecret: process.env.GOOGLE_CLIENTSECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }: any) {
      console.log("in session callback", user);
      session.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
