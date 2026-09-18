import { z } from "zod";

export const reviewResultSchema = z.object({
  score: z.number().min(0).max(100),
  summary: z.string().min(1),
  issues: z.array(
    z.object({
      severity: z.enum(["low", "medium", "high", "critical"]),
      title: z.string().min(1),
      explanation: z.string().min(1),
      suggestedFix: z.string().min(1),
      lineNumber: z.number().int().positive().nullable(),
    }),
  ),
});

export type ReviewResult = z.infer<typeof reviewResultSchema>;
