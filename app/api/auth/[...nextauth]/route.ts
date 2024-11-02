import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

console.log(process.env.GOOGLE_CLIENTID);

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENTID ?? "",
      clientSecret: process.env.GOOGLE_CLIENTSECRET ?? "",
    }),
  ],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
