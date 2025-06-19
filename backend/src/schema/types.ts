import { z } from "zod";

export const userCreateSchema = z.object({
  fullName: z.string().optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 30 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const userLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const userSchemaWithId = userCreateSchema.extend({
  id: z.string(),
});

export type userSchema = z.infer<typeof userSchemaWithId>;

export const orderSchema = z.object({
  location: z.string().min(1, "Location is required"),
  totalAmount: z.number().positive("Total amount must be a positive number"),
  items: z
    .array(
      z.object({
        productId: z.string().min(1, "Product ID is required"),
        quantity: z
          .number()
          .int()
          .positive("Quantity must be a positive integer"),
      })
    )
    .nonempty("At least one item is required"),
});