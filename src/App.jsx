import { useEffect, useState } from 'react'
import { TodoProvider } from './context'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import { ThemeProvider, LandingProvider } from './context'
import ThemeBtn from './components/ThemeBtn.jsx'
import Footer from './components/Footer.jsx'
import Landing from './Landing.jsx'

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const start = () => {
    console.log("start() called");
    setIsStarted(true);
  };

  const [themeMode, setThemeMode] = useState(() => localStorage.getItem("themeMode") || "dark")

  const lightTheme = () => {
    setThemeMode("light")
  }
  const darkTheme = () => {
    setThemeMode("dark")
  }

  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark')
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])

  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ ...todo }, ...prev])
  }
  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? todo : prevTodo
      )
    )
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    )
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    const isStarted = localStorage.getItem("isStarted")
    if(isStarted) setIsStarted(isStarted)
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
    localStorage.setItem("themeMode", themeMode)
    localStorage.setItem("isStarted", isStarted)
  }, [todos, isStarted, themeMode])

  return (
    <>
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
    <LandingProvider value={{ isStarted, start }}>
    {!isStarted ? (<Landing />) : null}
      {isStarted ? (<TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
        
          <div className="bg-white min-h-screen py-6 px-4 flex flex-col items-center dark:bg-[#172842]">
            {/* Theme Button */}
            <div className="mb-4 self-end sm:self-center">
              <ThemeBtn />
            </div>

            {/* Todo Card */}
            <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-4 text-white bg-[#172842] dark:bg-white/80 dark:text-black transition-colors">
              <h1 className="text-xl sm:text-2xl font-bold text-center mb-6">
                Manage Your Todos
              </h1>

              <div className="mb-4">
                <TodoForm />
              </div>

              <div className="flex flex-col gap-3">
                {todos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </div>
            </div>

            {/* Footer */}
            <footer className="w-full mt-12 border-t border-gray-300 dark:border-gray-700 pt-6 pb-4">
              <Footer/>
            </footer>
          </div>
        
        </TodoProvider>) : null}
      </LandingProvider>
      </ThemeProvider>
    </>
  )
}

export default App