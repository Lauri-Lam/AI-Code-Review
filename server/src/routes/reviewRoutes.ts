import { Router } from "express";
import {
  reviewRequestSchema,
  type ReviewResult,
} from "@ai-code-review/contracts";
import getResults from "../services/reviewService.js";

const router = Router();

router.post("/reviews", async (req, res) => {
  const result = reviewRequestSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Invalid review request",
      details: result.error.flatten(),
    });
  }

  try {
    const response: ReviewResult = await getResults(result.data);
    res.json(response);
  } catch (error) {
    console.error("Code review service failed.", error);
    res.status(502).json({
      error: "Code review service failed.",
    });
  }
});

export default router;
