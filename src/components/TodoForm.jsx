import { useState } from "react";
import { useTodo } from "../context";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const [added, setAdded] = useState(false);
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;

    addTodo({
      id: Date.now(),
      todo,
      completed: false
    });

    setTodo("");
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/90 py-1.5 text-black"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="relative rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0 cursor-pointer overflow-hidden transition-all duration-500 ease-in-out"
      >
        {/* Default "Add" text */}
        <span
          className={`${
            added ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
        >
          Add
        </span>

        {/* Red checkmark SVG */}
        <span
          className={`${
            added ? "opacity-100" : "opacity-0"
          } absolute inset-0 flex items-center justify-center transition-opacity duration-300`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      </button>
    </form>
  );
}

export default TodoForm;
