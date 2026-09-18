import type { ReviewRequest } from "../schemas/reviewRequestSchema.js";
import type { ReviewResult } from "../schemas/reviewResultSchema.js";
import { reviewResultSchema } from "../schemas/reviewResultSchema.js";

export default async function getResults(
  request: ReviewRequest,
): Promise<ReviewResult> {
  /* await CALL API USING PASSING DATA */

  const result = reviewResultSchema.safeParse({
    score: 88,
    summary: "Good enough",
    issues: [
      {
        severity: "low",
        title: "Issues title text",
        explanation: "explanation",
        suggestedFix: "suggested fix text",
        lineNumber: null,
      },
    ],
  });

  if (!result.success) {
    throw new Error("Result from AI failed");
  }

  return result.data;
}
