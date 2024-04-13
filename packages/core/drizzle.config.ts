import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});

export default defineConfig({
  schema: "./src/db/schema/todo.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DRIZZLE_DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
