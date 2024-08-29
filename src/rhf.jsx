import { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";

function App() {
  const [todos, setTodos] = useState([]);
  // const [text, setText] = useState("");

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    reset,
  } = useForm();

  function removeTodo(indexToRemove) {
    // setTodos(todos.splice(indexToRemove, 1));
    setTodos(todos.filter((todo, i) => i !== indexToRemove));
  }

  // data: es un objeto que contiene en cada propiedad el valor de cada input del formlario\
  // data.todo -> valor del input con name="todo"
  function onSubmit(data) {
    setTodos([...todos, data.todo]);
    reset();
  }

  return (
    <main className="w-full min-h-screen flex flex-col ">
      <section className="max-w-screen-sm w-full mx-auto">
        <p className=" bg-gradient-to-br from-blue-500 to-fuchsia-700 text-transparent bg-clip-text font-bold text-5xl sm:text-5xl text-center lg:px-0 ">
          To-Do react hook form
        </p>
        <form
          className="flex gap-2 justify-center p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            className={clsx("p-2 rounded text-black w-full max-w-screen-sm", {
              "border-red-500 border bg-red-300": errors.todo,
            })}
            placeholder="Ingresa una tarea"
            required
            {...register("todo", {
              required: { value: true, message: "Campo requerido" },
              minLength: {
                value: 3,
                message: "Debe tener al menos 3 caracteres",
              },
              maxLength: {
                value: 180,
                message: "No debe exceder los 180 caracteres",
              },
            })}
          />
          <button
            className="text-black px-3  rounded bg-white hover:bg-gray-200 disabled:bg-gray-300"
            /* className={clsx(" text-black px-3  rounded", {
              "bg-gray-300 cursor-not-allowed": isSubmitted ? !isValid : false,
              "bg-white hover:bg-gray-200": isSubmitted ? isValid : true,
            })} */
            // disabled={Object.keys(errors).length > 0}
            disabled={isSubmitted ? !isValid : false}
          >
            Agregar
          </button>
        </form>
        {/* Mostrar errores */}
        {errors.todo && (
          <p className="text-center text-red-400 text-sm font-semibold">
            {errors.todo?.message}
          </p>
        )}
      </section>
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
