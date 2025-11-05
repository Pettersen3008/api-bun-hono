import { z } from "zod";
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  HOST: z.string().default("localhost"),
  PORT: z.coerce.number().min(1000).max(65535).default(3000).transform((port) => String(port)),
  NODE_ENV: z.string(),

  LOG_LEVEL: z.string().default("info"),

  DATABASE_URL: z.string(),
});


export type Environment = z.infer<typeof envSchema>

export const config: Environment = envSchema.parse(process.env);

declare global {
namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
    }
}

export default config;
