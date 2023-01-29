import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginMember } from "../api.member";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
    }),
    FacebookProvider({
      clientId: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_SECRET_KEY,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "TodoList Account",
      credentials: {
        username: { label: "username", type: "text" },        
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const response = await loginMember(   //  call api/api.member.ts
          credentials.username,
          credentials.password
        );
 
        if (response?.statusCode === 200) {   // get result from server
          return Promise.resolve(response.params);  // ket qua tra ve tu server se di xuong function jwt ben duoi note lai cai token

        } else {
          // Return an object that will pass error information through to the client-side.
          throw new Error(
            JSON.stringify({ message: response?.message, status: false })
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.SECRET || "secret_key_here",
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider !== "credentials") {
        // const response = await loginSocial(
        //   account.provider,
        //   account.providerAccountId,
        //   profile?.picture,
        //   profile.email,
        //   profile.name
        // );
        // if (response?.params?.token) {
        //   user.token = response?.params?.token;
        //   return true;
        // } else {
        //   return false;
        // }
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // Persist the OAuth access_token to the token right after signIn function
      if (account) {
        token.accessToken = user;   // save token from server  
      }
      return Promise.resolve(token);
    },
    async session({ session, token }) {   
      session.accessToken = token.accessToken; 
      return Promise.resolve(session);
    },
  },
});