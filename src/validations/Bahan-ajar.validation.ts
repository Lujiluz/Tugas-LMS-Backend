import { z, ZodType } from "zod";

const ContentSchema = z.object({
  url: z.string().url(),
});

export class BahanAjarValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(1),
    bab: z.number().int().positive(),
    content: z.array(ContentSchema),
    materi: z.string().regex(/^[a-f\d]{24}$/i),
  });
}
