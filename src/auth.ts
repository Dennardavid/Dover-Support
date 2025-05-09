import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginValidation } from "@/lib/zodrules";
// import { redirect } from "next/dist/server/api-utils";

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
            console.log("No user");
            return null;
          }

          /* Compare password from DB with bcrypt */
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            console.log("Invalid password");
            return null;
          }
        
          /* return user details */
          return {
            id: user.id,
            email: user.email,
            discipline: user.discipline,
            name: user.name,
          };
        } catch (error) {
          console.log("Validation or auth error", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
