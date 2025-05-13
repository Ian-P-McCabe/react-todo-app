import React, { useState } from 'react';
import type { KeyboardEvent } from 'react';

interface AddTodoProps {
    onAddTodo: (title: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAddTodo }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleAddTodo = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue) {
            onAddTodo(trimmedValue);
            setInputValue(''); // Clear the input field after adding
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    };

    return (
        <div className="flex w-full max-w-md mb-4 shadow-sm rounded-md overflow-hidden border border-gray-200">
            <input
                type="text"
                className="flex-grow py-2 px-4 outline-none text-gray-700 placeholder-gray-400"
                placeholder="What do you need to do?"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 transition-colors font-medium"
                onClick={handleAddTodo}
            >
                ADD
            </button>
        </div>
    );
};

export default AddTodo;