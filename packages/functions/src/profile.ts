import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono();

app.get("/profile", (c) => {
  let loggedIn = true;
  if (!loggedIn) {
    return c.json({ error: "You must be logged in to view this page." }, 401);
  }

  let profile = {
    name: "John Doe",
    email: "John@test.com",
  };

  return c.json({ profile: profile });
});

export const handler = handle(app);
