import z from "zod";

export const appSchema = z.object({
  personal: z.object({
    name: z.string(),
    age: z.number(),
  }),
  address: z.object({
    street: z.string(),
    city: z.string(),
  }),
});
