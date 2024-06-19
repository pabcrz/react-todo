import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  function addTodo() {
    setTodos([...todos, text]);
  }

  function removeTodo(indexToRemove) {
    // setTodos(todos.splice(indexToRemove, 1));
    setTodos(todos.filter((todo, i) => i !== indexToRemove));
  }

  function onSubmit(e) {
    e.preventDefault();
    addTodo();
    setText("");
  }

  return (
    <main className="w-full min-h-screen flex flex-col">
      <form className="flex gap-2 justify-center p-5" onSubmit={onSubmit}>
        <input
          type="text"
          className="p-2 rounded text-black w-full max-w-screen-sm"
          placeholder="Ingresa una tarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button className="bg-white text-black px-3  rounded">Agregar</button>
      </form>
      <section className="max-w-screen-sm w-full mx-auto p-5 flex flex-col gap-3">
        {todos.length === 0 && (
          <p className="text-white/50 text-center">
            No hay tareas pendientes. ¡Agrega una!
          </p>
        )}
        {todos.length > 0 &&
          todos.map((todo, i) => {
            return (
              <div
                key={`Todo-${i}`}
                className="bg-slate-600 rounded-md p-1 flex justify-between px-3"
              >
                <span className="select-none">{todo}</span>
                <span
                  className="cursor-pointer hover:bg-slate-900 rounded-full p-1 text-xs text-center"
                  onClick={() => removeTodo(i)}
                >
                  ❌
                </span>
              </div>
            );
          })}
      </section>
    </main>
  );
}

export default App;
