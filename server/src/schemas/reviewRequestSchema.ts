import { z } from "zod";

export const reviewRequestSchema = z.object({
  code: z.string().min(1),
  language: z.string().min(1),
  reviewType: z.string().min(1),
});

export type ReviewRequest = z.infer<typeof reviewRequestSchema>;
