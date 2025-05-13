import React, { useState, useRef, useEffect } from 'react';

interface TodoCardProps {
    id: string;
    title: string;
    completed: boolean;
    onToggleComplete: (id: string) => void;
    onUpdateTitle: (id: string, newTitle: string) => void;
    onDelete: (id: string) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({
    id,
    title,
    completed,
    onToggleComplete,
    onUpdateTitle,
    onDelete,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [isHovering, setIsHovering] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleCardClick = (e: React.MouseEvent) => {
        // Prevent entering edit mode when clicking the checkbox
        if ((e.target as HTMLElement).closest('.checkbox-container')) {
            return;
        }
        setIsEditing(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTitle(e.target.value);
    };

    const handleInputBlur = () => {
        if (editedTitle.trim() !== '') {
            onUpdateTitle(id, editedTitle);
        } else {
            setEditedTitle(title); // Reset to original if empty
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (editedTitle.trim() !== '') {
                onUpdateTitle(id, editedTitle);
            } else {
                setEditedTitle(title); // Reset to original if empty
            }
            setIsEditing(false);
        } else if (e.key === 'Escape') {
            setEditedTitle(title); // Reset to original
            setIsEditing(false);
        }
    };

    const handleToggleComplete = () => {
        onToggleComplete(id);
    };

    const handleDeleteClick = () => {
        onDelete(id);
    }

    return (
        <div
            className={`flex items-center p-3 rounded-md shadow-sm border border-gray-200 mb-2 cursor-pointer hover:bg-gray-50 transition-colors w-full ${completed ? 'bg-gray-50' : 'bg-white'
                }`}
            onClick={handleCardClick}
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
        >
            <div className="checkbox-container mr-3 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                <div
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${completed
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300 hover:border-blue-400'
                        }`}
                    onClick={handleToggleComplete}
                >
                    {completed && (
                        <span className="text-white text-xs font-bold">✓</span>
                    )}
                </div>
            </div>

            <div className="flex-grow text-left">
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        className="w-full px-1 py-0.5 outline-none border-b border-blue-400 bg-transparent"
                        value={editedTitle}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={handleKeyDown}
                        onClick={(e) => e.stopPropagation()}
                    />
                ) : (
                    <span className={`${completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {title}
                    </span>
                )}
            </div>

            {isHovering &&
                <button type="button"
                    className="
                        focus:outline-none 
                        text-white
                        bg-red-700
                        hover:bg-red-800
                        focus:ring-4
                        focus:ring-red-300
                        font-medium
                        rounded-lg
                        text-sm
                        px-1
                        py-0.5
                        dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={handleDeleteClick}
                >
                    X
                </button>
            }

        </div>
    );
};

export default TodoCard;