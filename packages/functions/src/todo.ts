import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { todo as todoTable } from "@ReminderRealm/core/db/schema/todo";
import { db } from "@ReminderRealm/core/db";

const app = new Hono();

app.get("/todo", async (c) => {
  const todo = await db.select().from(todoTable);
  return c.json({ todo });
});

app.post("/todo", async (c) => {
  const body = await c.req.json();
  const todo = {
    ...body.todo,
    userId: "dummy-user-id", // Ensure you replace this with the actual user ID from your auth context
  };
  const newTodo = await db.insert(todoTable).values(todo).returning();
  return c.json({ todo: newTodo });
});

export const handler = handle(app);
