import React, { useState } from 'react';
import type { KeyboardEvent } from 'react';

interface AddTodoProps {
    onAddTodo: (title: string, description?: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAddTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    const handleAddTodo = () => {
        const trimmedValue = title.trim();
        if (trimmedValue) {
            onAddTodo(trimmedValue, description);
            setTitle(''); // Clear the input field after adding
            setDescription('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    };

    return (
        <div className="flex w-full mb-4 shadow-sm rounded-md overflow-hidden border border-gray-200">
            <div className="flex flex-col w-full">
                <input
                    aria-label='Todo title'
                    type="text"
                    className="flex-grow py-2 px-4 pb-0 outline-none text-gray-700 placeholder-gray-400"
                    placeholder="What do you need to do?"
                    value={title}
                    onChange={handleTitleChange}
                    onKeyDown={handleKeyDown}
                />
                <input
                    aria-label='Todo description'
                    type="text"
                    className="py-1 px-4 outline-none text-gray-700 placeholder-gray-400 text-xs"
                    placeholder="Description (Optional)"
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </div>
            <button
                aria-label='Add todo'
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 transition-colors font-medium"
                onClick={handleAddTodo}
            >
                ADD
            </button>
        </div>
    );
};

export default AddTodo;