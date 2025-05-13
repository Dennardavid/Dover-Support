import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginValidation } from "@/lib/zodrules";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      issuer: `https://login.microsoftonline.com/${process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID}/v2.0`,
    }),
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
});
