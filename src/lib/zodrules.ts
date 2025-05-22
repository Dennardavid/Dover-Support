import { z } from "zod";

export const SignUpValidation = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required" }),
    email: z
      .string()
      .email()
      .trim()
      .refine((email) => email.endsWith("@doverengineering.com"), {
        message: "Email must be a doverengineering.com address",
      }),
    discipline: z.string().min(1, { message: "Discipline is required" }),
    password: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/[a-z]/, { message: "Must contain at least one small letter" })
      .regex(/[A-Z]/, { message: "Must contain at least one capital letter" })
      .regex(/[0-9]/, { message: "Must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Must contain at least one special character",
      }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Confirm Password is required" }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
      });
    }
  });

export const loginValidation = z.object({
  email: z
    .string()
    .email()
    .trim()
    .refine((email) => email.endsWith("@doverengineering.com"), {
      message: "Invalid Email",
    }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

export const ticketValidation = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  category: z.enum(["Hardware", "Software", "Network", "Others"], {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),
  priority: z.enum(["Low", "Medium", "High"], {
    errorMap: () => ({ message: "Please select a valid priority" }),
  }),
});
