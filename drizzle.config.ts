import { config } from './src/provider/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './drizzle',
  schema: './src/provider/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: config.DATABASE_URL,
  },
});