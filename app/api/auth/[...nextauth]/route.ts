import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

console.log(process.env.GOOGLE_CLIENTID);

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
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
          console.log(user);
          return null;
        }

        return null;
      },
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENTID ?? "",
      clientSecret: process.env.GOOGLE_CLIENTSECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
