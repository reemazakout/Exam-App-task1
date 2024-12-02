import { z } from "zod";

const emailSchema = z.string().email({
  message: "Please enter a valid email address.",
});

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .regex(/[A-Z]/, {
    message: "Password must include at least one uppercase letter.",
  })
  .regex(/\d/, { message: "Password must include at least one number." })
  .regex(/[!@#$%^&*(),.?":{}|<>]/, {
    message: "Password must include at least one special character.",
  });

const usernameSchema = z
  .string()
  .trim()
  .min(4, { message: "Username must be at least 4 characters long." })
  .max(25, { message: "Username must not exceed 25 characters." })
  .regex(/^[a-z0-9_-]+$/, {
    message:
      "Username can only contain lowercase letters, numbers, underscores, and hyphens.",
  });

const nameSchema = z
  .string()
  .trim()
  .min(2, { message: "Name must be at least 2 characters long." })
  .max(25, { message: "Name must not exceed 25 characters." })
  .regex(/^[a-zA-Z]+$/, {
    message: "Name can only contain alphabetic characters.",
  });

const phoneSchema = z
  .string()
  .regex(/^\+?1?\s*\(?-*\d{3}\)?[-\s]*\d{3}[-\s]*\d{4}$/, {
    message: "Please enter a valid phone number.",
  });

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = signInSchema
  .extend({
    username: usernameSchema,
    firstName: nameSchema.refine((val) => val.length >= 2, {
      message: "First name must be at least 2 characters long.",
    }),
    lastName: nameSchema.refine((val) => val.length >= 2, {
      message: "Last name must be at least 2 characters long.",
    }),
    rePassword: passwordSchema,
    phone: phoneSchema.optional(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match.",
    path: ["rePassword"],
  });

export const forgetPasswordSchema = z.object({
  email: emailSchema,
});

export const resetCodeSchema = z.object({
  resetCode: z
    .string()
    .length(6, { message: "Reset code must be 6 digits" })
    .regex(/^\d+$/, { message: "Reset code must contain only numbers" }),
});

export const reSetPasswordSchema = z.object({
  email: emailSchema,
  newPassword: passwordSchema,
});
