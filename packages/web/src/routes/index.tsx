import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

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
  const { getToken } = useKindeAuth();
  const [todoText, setTodoText] = useState("");
  const [due, setDue] = useState<Date | null>(null);
  const { isAuthenticated, login, register } = useKindeAuth();

  async function getTodo() {
    const token = await getToken();

    if (!token) {
      throw new Error("No token available");
    }

    const res = await fetch(import.meta.env.VITE_APP_API_URL + "/todo", {
      headers: {
        Authorization: token,
      },
    });

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
    const token = await getToken();
    if (!token) {
      throw new Error("No token available");
    }
    e.preventDefault();
    const res = await fetch(import.meta.env.VITE_APP_API_URL + "/todo", {
      method: "POST",
      headers: {
        Authorization: token,
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
  return isAuthenticated ? (
    <div className="App">
      <h1>Reminders</h1>
      {error && <div>An error occurred: {error.message}</div>}
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <div className="card">
          {data?.todo.map((item) => (
            <div key={item.id}>
              <input type="checkbox" checked={item.done} />
              <span
                style={{ textDecoration: item.done ? "line-through" : "none" }}
              >
                {item.todo} - Due on: {formatDate(item.due)}
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
        <DatePicker
          selected={due}
          onChange={(date: Date) => setDue(date)}
          placeholderText="Due date"
        />
        <button className="glow-on-hover" type="submit">
          Add
        </button>
      </form>
    </div>
  ) : (
    // Render this if the user is not authenticated
    <div className="App">
      <h1>Welcome to Reminder Realm</h1>
      <p>Please log in to manage your reminders.</p>
      <button className="glow-on-hover" onClick={() => login()}>
        Log In
      </button>
      <button className="glow-on-hover" onClick={() => register()}>
        Register
      </button>
    </div>
  );
}

export default HomePage;
