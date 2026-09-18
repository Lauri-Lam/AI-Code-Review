import { Router } from "express";
import { reviewRequestSchema } from "../schemas/reviewRequestSchema.js";
import getResults from "../services/reviewService.js";
import type { ReviewResult } from "../schemas/reviewResultSchema.js";

const router = Router();

router.get("/reviews", (_req, res) => {
  res.json({
    message: "GET route for testing",
  });
});

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
    if (error instanceof Error) {
      res.status(502).json({
        message: `Error occured: ${error.message}`,
      });
    } else {
      res.status(502).json({
        message: `Error occured: ${String(error)}`,
      });
    }
  }
});

export default router;
