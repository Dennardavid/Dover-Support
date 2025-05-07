/* import NextAuth from "next-auth";
import { authConfig } from "../../auth.config";
import Credentials from "next-auth/providers/credentials";
import { loginValidation } from "@/lib/zodrules";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        loginValidation;
      },
    }),
  ],
});
 */