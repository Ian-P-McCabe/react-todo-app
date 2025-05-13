import { useState, useEffect } from 'react';
import TodoCard from './components/TodoCard'
import testData from './assets/testtodo.json'
import type { Todo } from './types/Todo';
import AddTodo from './components/AddTodo';


function App() {

  const [todos, setTodos] = useState<Todo[]>()

  useEffect(() => {
    setTodos(testData);
  }, [])

  function handleToggleComplete(id: string) {
    setTodos(todos => todos?.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  function handleUpdateTitle(id: string, newTitle: string) {
    setTodos(todos => todos?.map(todo => todo.id === id ? { ...todo, title: newTitle } : todo))
  }



  return (
    <div className="min-h-screen min-w-[320px] flex items-center justify-center font-sans antialiased bg-[#fff]">
      <div className="max-w-screen-xl mx-auto p-8 text-center">
        <div className="flex justify-center">
          <AddTodo></AddTodo>
          {todos?.map(todo => (
            <TodoCard
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              onToggleComplete={handleToggleComplete}
              onUpdateTitle={handleUpdateTitle}
            >
            </TodoCard>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
