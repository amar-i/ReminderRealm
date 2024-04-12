import { useEffect, useState } from "react";
import "./App.css";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

function App() {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [done, setDone] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    async function getTodo() {
      const res = await fetch(import.meta.env.VITE_APP_API_URL + "/todo");
      const data = await res.json();
      setTodo(data.todo);
    }
    getTodo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(import.meta.env.VITE_APP_API_URL + "/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: { text, done: false } }),
    });
    const data = await res.json();
    setTodo(data.todo);
    setText("");
    setDone(false);
  };

  return (
    <div className="App">
      <div className="card">
        {todo.map((t) => (
          <div key={t.id}>
            <input type="checkbox" checked={t.done} />
            <span style={{ textDecoration: t.done ? "line-through" : "none" }}>
              {t.text}
            </span>
          </div>
        ))}
      </div>

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

export default App;
