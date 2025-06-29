import { useEffect, useState } from 'react'
import { TodoProvider } from './context'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import { ThemeProvider } from './context/themeContext.js'
import ThemeBtn from './components/ThemeBtn.jsx'

function App() {
  const [themeMode, setThemeMode] = useState("dark")

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
    setTodos((prev) => [{...todo},...prev])
  }
  const updateTodo = (id, todo) =>{
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo)))
  } 

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length > 0){
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <>
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
      <div className=" bg-white min-h-screen py-8 flex justify-center items-center flex-col dark:bg-[#172842]">
        <div className='mb-1'>
          <ThemeBtn/>
        </div>
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white bg-[#172842] dark:bg-white/70 dark:text-black">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
          </div>
      </div>
      </ThemeProvider>
    </TodoProvider>
    </>
  )
}

export default App
