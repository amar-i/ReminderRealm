import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "react-query";

export const Route = createFileRoute("/")({
  component: HomePage,
});

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

async function getTodo() {
  const res = await fetch(import.meta.env.VITE_APP_API_URL + "/todo");

  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  return (await res.json()) as { todo: Todo[] };
}

function HomePage() {
  const { isPending, error, data } = useQuery("getTodo", getTodo);

  const [todo, setTodo] = useState<Todo[]>([]);
  const [done, setDone] = useState(false);
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(import.meta.env.VITE_APP_API_URL + "/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: { text, done } }),
    });
    const data = await res.json();
    setTodo(data.todo);
    setText("");
    setDone(false);
  };

  return (
    <div className="App">
      <h1>Reminders</h1>
      {error ? (
        <div>An error occurred: {error.message}</div>
      ) : isPending ? (
        <div>Loading...</div>
      ) : (
        <div className="card">
          {data?.todo.map((t) => (
            <div key={t.id}>
              <input type="checkbox" checked={t.done} />
              <span
                style={{ textDecoration: t.done ? "line-through" : "none" }}
              >
                {t.text}
              </span>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default HomePage;
