import { useState } from 'react';

interface AddTodoProps {
    onAddComplete: (title: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({
    onAddComplete,
}) => {

    const [newTodoTitle, setNewTodoTitle] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoTitle(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (newTodoTitle.trim() !== '') {
                onAddComplete(newTodoTitle);
            } else {
                setNewTodoTitle(''); // Reset to original if empty
            }
        } else if (e.key === 'Escape') {
            setNewTodoTitle(''); // Reset to original
        }
    };

    return (
        <div className='flex-grow w-96 h-32 bg-blue-500'>
            <form>
                <input
                    type='text'
                    value={newTodoTitle}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                >
                </input>
            </form>
        </div>
    )
}

export default AddTodo; 