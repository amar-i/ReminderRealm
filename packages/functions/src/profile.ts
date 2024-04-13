import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono();

app.get("/profile", (c) => {
  return c.json({ message: "Hello!" });
});

export const handler = handle(app);
