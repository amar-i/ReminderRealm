import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Route = createFileRoute("/")({
  component: HomePage,
});

type Todo = {
  id: string;
  todo: string;
  done: boolean;
  due: string;
};

function HomePage() {
  const [todoText, setTodoText] = useState("");
  const [due, setDue] = useState<Date | null>(null);

  async function getTodo() {
    const res = await fetch(import.meta.env.VITE_APP_API_URL + "/todo");

    if (!res.ok) {
      throw new Error("Failed to fetch todos");
    }

    return (await res.json()) as { todo: Todo[] };
  }

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["getTodo"],
    queryFn: getTodo,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(import.meta.env.VITE_APP_API_URL + "/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: { todo: todoText, completed: false, due } }), // Use todoText instead of todo
    });
    if (!res.ok) {
      throw new Error("Failed to add todo");
    }
    // Manually trigger a re-fetch of the todo list data after adding a new item
    refetch();
    setTodoText(""); // Reset todoText after submission
    setDue(null); // Reset due after submission
  };

  function formatDate(dateString: string) {
    if (!dateString) return ""; // Return empty string if dateString is null or undefined
    const date = new Date(dateString);

    // Adjust the date by the time zone offset
    const adjustedDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60000
    );

    return adjustedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return (
    <div className="App">
      <h1>Reminders</h1>
      {error && <div>An error occurred: {error.message}</div>}
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <div className="card">
          {data?.todo.map((data) => (
            <div key={data.id}>
              <input type="checkbox" checked={data.done} />
              <span
                style={{ textDecoration: data.done ? "line-through" : "none" }}
              >
                {data.todo} - Due on:{formatDate(data.due)}
              </span>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h2>Add Todo</h2>
        <input
          type="text"
          placeholder="Add todo..."
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <DatePicker // Use DatePicker for due
          selected={due}
          onChange={(date) => setDue(date)}
          placeholderText="Due"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default HomePage;
