import { z, ZodType } from "zod";

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    username: z
      .string()
      .min(3, { message: "Username minimal harus terdiri dari 3 karakter" })
      .max(50, { message: "Username maksimal harus terdiri dari 50 karakter" })
      .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),

    email: z.string().email({ message: "Email address tidak valid" }),

    password: z
      .string()
      .min(8, { message: "Password minimal harus terdiri dari 8 karakter" })
      .max(12, { message: "Password maksimal harus terdiri dari 12 karakter" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: "Password setidaknya harus terdiri dari satu huruf kapital, satu huruf non-kapital, dan satu angka.",
      }),

    kelas: z.string().optional(),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z.string().email({ message: "Email address tidak valid" }),

    password: z
      .string()
      .min(8, { message: "Password minimal harus terdiri dari 8 karakter" })
      .max(12, { message: "Password maksimal harus terdiri dari 12 karakter" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: "Password tidak valid",
      }),
  });
}
