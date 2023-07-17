
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Por favor, ingresa una cuenta de email válida",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
});

export const registerSchema = z
  .object({
    username: z
      .string({
        required_error: "El nombre de usuario es necesario",
      })
      .min(3, {
        message: "El nombre de usuario debe tener al menos 3 caracteres",
      }),
    email: z.string().email({
      message: "Por favor, ingresa una cuenta de email válida",
    }),
    password: z.string().min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    })
  
  });