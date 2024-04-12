import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { todo } from "node:test";

const app = new Hono();

const fakeTodo = [
  { id: 1, text: "Buy milk", done: false },
  { id: 2, text: "Walk the dog", done: true },
  { id: 3, text: "Write code", done: false },
];

app.get("/todo", (c) => {
  return c.json({ todo: fakeTodo });
});

app.post("/todo", async (c) => {
  const body = await c.req.json();
  const todo = body.todo;
  fakeTodo.push({
    id: (fakeTodo.length + 1).toString(),
    ...todo,
  });
  return c.json({ todo: fakeTodo });
});

export const handler = handle(app);
