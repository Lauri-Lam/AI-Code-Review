import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(8080),
  LLM_API_KEY: z.string().trim().min(1),
  LLM_BASE_URL: z.url(),
  LLM_MODEL: z.string().trim().min(1),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  throw new Error(
    `Invalid server configuration. ${z.prettifyError(result.error)}`,
  );
}

export const config = {
  port: result.data.PORT,
  llmApiKey: result.data.LLM_API_KEY,
  llmBaseUrl: result.data.LLM_BASE_URL,
  llmModel: result.data.LLM_MODEL,
};
