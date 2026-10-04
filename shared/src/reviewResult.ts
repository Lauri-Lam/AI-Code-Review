import { z } from "zod";

export const ISSUE_SEVERITIES = ["low", "medium", "high", "critical"] as const;

export type IssueSeverity = (typeof ISSUE_SEVERITIES)[number];

export const reviewIssueSchema = z.object({
  severity: z.enum(ISSUE_SEVERITIES),
  title: z.string().min(1),
  explanation: z.string().min(1),
  suggestedFix: z.string().min(1),
  lineNumber: z.number().int().positive().nullable(),
});

export type ReviewIssue = z.infer<typeof reviewIssueSchema>;

export const reviewResultSchema = z.object({
  score: z.number().min(0).max(100),
  summary: z.string().min(1),
  issues: z.array(reviewIssueSchema),
});

export type ReviewResult = z.infer<typeof reviewResultSchema>;
