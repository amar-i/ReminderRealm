import { Hono } from "hono";
import { LambdaEvent, handle } from "hono/aws-lambda";
import { todo as todoTable } from "@ReminderRealm/core/db/schema/todo";
import { db } from "@ReminderRealm/core/db";
import { authMiddleware } from "@ReminderRealm/core/auth";
import { eq, desc } from "drizzle-orm";
const app = new Hono();

app.get("/todo", authMiddleware, async (c) => {
  const userId = c.var.userId;
  const todo = await db
    .select()
    .from(todoTable)
    .where(eq(todoTable.userId, userId))
    .orderBy(todoTable.due);
  return c.json({ todo });
});

app.post("/todo", authMiddleware, async (c) => {
  const userId = c.var.userId;
  const body = await c.req.json();
  const todo = {
    ...body.todo,
    userId: userId, // Ensure you replace this with the actual user ID from your auth context
  };
  const newTodo = await db.insert(todoTable).values(todo).returning();
  return c.json({ todo: newTodo });
});

export const handler = handle(app);
