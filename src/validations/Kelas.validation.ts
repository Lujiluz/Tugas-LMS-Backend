import { z, ZodType } from "zod";

export class KelasValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string(),
    description: z.string(),
    grade: z.number(),
    kelas: z.string()
  });
}
