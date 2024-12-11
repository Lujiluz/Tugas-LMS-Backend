import { z, ZodType } from "zod";

export class MateriValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string(),
    description: z.string(),
    kelas: z.string(),
  });
}
