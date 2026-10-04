import { z } from "zod";

export const CODING_LANGUAGES = [
  "Python",
  "JavaScript",
  "TypeScript",
  "C#",
  "Java",
] as const;

export type Language = (typeof CODING_LANGUAGES)[number];

export const REVIEW_TYPES = [
  "All",
  "Correctness",
  "Security",
  "Performance",
  "Readability",
] as const;

export type ReviewType = (typeof REVIEW_TYPES)[number];

export const reviewRequestSchema = z.object({
  code: z.string().refine((value) => value.trim().length > 0),
  language: z.enum(CODING_LANGUAGES),
  reviewType: z.enum(REVIEW_TYPES),
});

export type ReviewRequest = z.infer<typeof reviewRequestSchema>;
