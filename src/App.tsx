import { useState, useEffect } from 'react';
import TodoCard from './components/TodoCard'
import testData from './assets/testtodo.json'
import type { Todo } from './types/Todo';
import AddTodo from './components/AddTodo';
import TodoFooter from './components/TodoFooter';
import type { TodoUpdate } from './types/TodoUpdate';

function App() {

  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  useEffect(() => {
    setTodos(testData);
  }, [])

  function handleToggleComplete(id: string) {
    setTodos(todos => todos?.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  function handleUpdateTodo(id: string, updates: TodoUpdate) {
    setTodos(todos =>
      todos?.map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo))
  }

  function handleDeleteClick(id: string) {
    setTodos(todos => todos?.filter(todos => todos.id !== id))
  }

  function handleAddNewTodo(title: string, description?: string) {
    const newId = crypto.randomUUID().toString()
    const newTodo: Todo = {
      id: newId,
      title: title,
      description: description,
      completed: false
    }
    setTodos(todos => [...todos, newTodo])
  }

  function handleFilterChange(newFilter: 'all' | 'active' | 'completed') {
    setFilter(newFilter)
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all' filter
  })

  function handleClearCompleted() {
    setTodos(todos => todos?.filter(todos => todos.completed !== true))
  }

  return (
    <div className="min-h-screen min-w-[320px] flex items-center justify-center font-sans antialiased bg-[#fff]">
      <div className="max-w-screen-xl mx-auto p-8 text-center">
        <div className="flex flex-col items-center w-[500px]">

          <AddTodo onAddTodo={handleAddNewTodo}></AddTodo>

          <div className='w-full h-[300px] overflow-y-auto border-2 border-gray-100 rounded-md'>
            {filteredTodos.map(todo => (
              <TodoCard
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                completed={todo.completed}
                onToggleComplete={handleToggleComplete}
                onUpdateTodo={handleUpdateTodo}
                onDelete={handleDeleteClick}
              >
              </TodoCard>
            ))}
          </div>

          <TodoFooter
            activeCount={todos.filter(todos => todos.completed === false).length}
            completedCount={3}
            filter={filter}
            onFilterChange={handleFilterChange}
            onClearCompleted={handleClearCompleted}
          ></TodoFooter>
        </div>
      </div>
    </div>
  )
}

export default App
