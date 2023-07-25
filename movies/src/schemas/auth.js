
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(6, {
    message: "The password must be at least 6 characters",
  }),
});

export const registerSchema = z
  .object({
    username: z
      .string({
        required_error: "Username is required",
      })
      .min(3, {
        message: "Username must have at least 3 characters",
      }),
    email: z.string().email({
      message: "Please enter a valid email",
    }),
    password: z.string().min(6, {
      message: "The password must be at least 6 characters",
    })
  
  });