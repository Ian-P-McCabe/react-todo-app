//import { useReducer } from 'react';
import type { Todo } from '../types/Todo';
import type { TodoUpdate } from '../types/TodoUpdate';

type todoAction = {
    type: 'ADD' | 'DELETE' | 'UPDATE' | 'CLEAR' | 'INIT';
    todos?: Todo[];
    todo?: Todo;
    todoUpdate?: TodoUpdate;
};

export default function todoReducer(todos: Todo[], todoAction: todoAction) {
    switch (todoAction.type) {
        case 'INIT': {
            const savedTodos = localStorage.getItem('todos');
            if (savedTodos) {
                try {
                    return JSON.parse(savedTodos);
                } catch (error) {
                    console.error(
                        'Error parsing todos from localStorage: ',
                        error
                    );
                    return [];
                }
            } else {
                return [];
            }
        }
        case 'ADD': {
            const newTodo: Todo = {
                id: todoAction.todoUpdate?.id ?? crypto.randomUUID.toString(),
                title: todoAction.todoUpdate?.title ?? 'Default',
                description: todoAction.todoUpdate?.description ?? 'Default',
                completed: false,
            };

            return [...todos, newTodo];
        }
        case 'UPDATE': {
            return todos.map(todo =>
                todo.id === todoAction.todoUpdate?.id
                    ? { ...todo, ...todoAction.todoUpdate }
                    : todo
            );
        }
        case 'DELETE': {
            return todos.filter(todo => todo.id !== todoAction.todoUpdate?.id);
        }
        case 'CLEAR': {
            return todos.filter(todo => todo.completed !== true);
        }
        default:
            return todos;
    }
}
