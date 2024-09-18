import { z } from "zod";

export const authRegistrationSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,16}$/),
});

export const authLoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,16}$/),
});
