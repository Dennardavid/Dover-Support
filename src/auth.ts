import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginValidation } from "@/lib/zodrules";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          /* Zod Validation */
          const { email, password } = await loginValidation.parseAsync(
            credentials
          );

          /* Get Users from DB with Prisma */
          const user = await prisma.user.findUnique({
            where: { email },
          });

          /* Validate user existence */
          if (!user || !user.password) {
            throw new Error(JSON.stringify({ message: "User doesn't exist" }));
          }

          /* Compare password from DB with bcrypt */
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            throw new Error(JSON.stringify({ message: "Incorrect Password" }));
          }

          /* return user details */
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            discipline: user.discipline,
            role: user.role,
          };
        } catch (error) {
          console.error("Authorize error:", error);

          throw new Error(JSON.stringify({ message: "Authorization Failed" }));
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.discipline = user.discipline;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.discipline = token.discipline as string;
      }
      return session;
    },
  },
});
