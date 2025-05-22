import { useState, useEffect, useReducer } from 'react';
import TodoCard from './components/TodoCard';
import type { Todo } from './types/Todo';
import AddTodo from './components/AddTodo';
import TodoFooter from './components/TodoFooter';
import type { TodoUpdate } from './types/TodoUpdate';
import todoReducer from './reducers/TodoReducer';

function App() {
    const initialState: Todo[] = [];
    const [newTodos, dispatch] = useReducer(todoReducer, initialState);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [newTodoId, setNewTodoId] = useState<string | null>(null); // Track the ID of the newly added todo
    const [isInitialRender, setIsInitialRender] = useState(true);

    useEffect(() => {
        dispatch({
            type: 'INIT',
        });
    }, []);

    useEffect(() => {
        if (isInitialRender) {
            setIsInitialRender(false);
            return;
        }
        console.log('Updating local storage with ' + JSON.stringify(newTodos));
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }, [newTodos, isInitialRender]);

    useEffect(() => {
        if (newTodoId) {
            const timer = setTimeout(() => {
                setNewTodoId(null);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [newTodoId]);

    function handleUpdateTodo(id: string, updates: TodoUpdate) {
        dispatch({
            type: 'UPDATE',
            todoUpdate: {
                id: id,
                ...updates,
            },
        });
    }

    function handleDeleteClick(id: string) {
        setTimeout(() => {
            dispatch({
                type: 'DELETE',
                todoUpdate: { id: id },
            });
        }, 0);

    }

    function handleAddNewTodo(title: string, description?: string) {
        const newId = crypto.randomUUID().toString();
        dispatch({
            type: 'ADD',
            todoUpdate: {
                id: newId,
                title: title,
                description: description,
            },
        });
        setNewTodoId(newId);
    }

    function handleFilterChange(newFilter: 'all' | 'active' | 'completed') {
        setFilter(newFilter);
    }

    function handleClearCompleted() {
        dispatch({
            type: 'CLEAR',
        });
    }

    const filteredTodos = newTodos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true; // 'all' filter
    });

    return (
        <div className='min-h-screen min-w-[320px] flex items-center justify-center font-sans antialiased bg-[#fff]'>
            <div className='max-w-screen-xl mx-auto p-8 text-center'>
                <div className='flex flex-col items-center w-[500px]'>
                    <AddTodo onAddTodo={handleAddNewTodo}></AddTodo>

                    <ul className='w-full h-[300px] overflow-y-auto border-2 border-gray-100 rounded-md'>
                        {filteredTodos.length > 0 ? (
                            filteredTodos.map(todo => (
                                <TodoCard
                                    key={todo.id}
                                    id={todo.id}
                                    title={todo.title}
                                    description={todo.description}
                                    completed={todo.completed}
                                    onUpdateTodo={handleUpdateTodo}
                                    onDelete={handleDeleteClick}
                                    isNew={todo.id === newTodoId}></TodoCard>
                            ))
                        ) : (
                            <div className='flex items-center justify-center h-full text-gray-400'>
                                No {filter !== 'all' ? filter : ''} todos to display
                            </div>
                        )}
                    </ul>

                    <TodoFooter
                        activeCount={
                            newTodos.filter(todos => todos.completed === false)
                                .length
                        }
                        completedCount={3}
                        filter={filter}
                        onFilterChange={handleFilterChange}
                        onClearCompleted={handleClearCompleted}></TodoFooter>
                </div>
            </div>
        </div>
    );
}

export default App;
