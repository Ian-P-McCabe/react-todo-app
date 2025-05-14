import React, { useState, useRef, useEffect } from 'react';
import type { TodoUpdate } from '../types/TodoUpdate';
import type { Todo } from '../types/Todo';

interface TodoCardProps extends Todo {
    onToggleComplete: (id: string) => void;
    onUpdateTodo: (id: string, updates: TodoUpdate) => void;
    onDelete: (id: string) => void;
    isNew?: boolean;
}

const TodoCard: React.FC<TodoCardProps> = ({
    id,
    title,
    completed,
    description,
    onToggleComplete,
    onUpdateTodo,
    onDelete,
    isNew = false,
}) => {

    //State
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description)
    const [isHovering, setIsHovering] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(!isNew)
    //Refs
    const titleInputRef = useRef<HTMLInputElement>(null);
    const descriptionInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isNew) {
            // Set animation as complete after duration
            const timer = setTimeout(() => {
                setAnimationComplete(true);
            }, 500); // Match this with the CSS animation duration
            return () => clearTimeout(timer);
        }
    }, [isNew]);

    useEffect(() => {
        if (isEditing && titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, [isEditing]);


    const handleCardClick = (e: React.MouseEvent) => {
        // Prevent entering edit mode when clicking the checkbox
        if ((e.target as HTMLElement).closest('.checkbox-container')) {
            return;
        }
        setIsEditing(true);
    };

    const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTitle(e.target.value);
    };

    const handleDescriptionInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedDescription(e.target.value);
    };

    const handleInputBlur = (field: keyof TodoUpdate, value?: string) => {
        setTimeout(() => {
            const trimmedValue = value?.trim();
            if (trimmedValue !== '') {
                // Only send updates for the changed field
                const updates: TodoUpdate = {};

                if (field === 'title') {
                    updates.title = trimmedValue;
                } else {
                    updates.description = trimmedValue;
                }

                onUpdateTodo(id, updates);
            } else {
                // Reset to original if empty
                if (field === 'title') {
                    setEditedTitle(title);
                } else {
                    setEditedDescription(description);
                }
            }
            if (document.activeElement !== descriptionInputRef.current) {
                setIsEditing(false);
            }
        }, 10);
    };

    const handleKeyDown = (e: React.KeyboardEvent, field: keyof TodoUpdate, value?: string) => {
        if (e.key === 'Enter') {
            const trimmedValue = value?.trim();
            if (trimmedValue !== '') {
                // Only send updates for the changed field
                const updates: TodoUpdate = {};
                if (field === 'title') {
                    updates.title = trimmedValue;
                } else {
                    updates.description = trimmedValue;
                }
                onUpdateTodo(id, updates);
            }
            setIsEditing(false)
        } else if (e.key === 'Escape') {
            if (field === 'title') {
                setEditedTitle(title)
            } else {
                setEditedDescription(description)
            }
            setIsEditing(false)
        }
    }

    const handleToggleComplete = () => {
        onToggleComplete(id);
    };

    const handleDeleteClick = () => {
        onDelete(id);
    }

    return (
        <li
            className={`flex items-center p-3 rounded-md shadow-sm border border-gray-200 mb-2 cursor-pointer hover:bg-gray-50 transition-colors w-full ${completed ? 'bg-gray-50' : 'bg-white'} ${!animationComplete ? 'animate-slide-in opacity-0' : ''}`}
            onClick={handleCardClick}
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
        >
            <div className="checkbox-container mr-3 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                <div
                    aria-label={`Mark ${title} as complete`}
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
                    <div>
                        <input
                            aria-label='edit todo title'
                            ref={titleInputRef}
                            type="text"
                            className="w-full px-1 py-0.5 outline-none border-b border-blue-400 bg-transparent"
                            value={editedTitle}
                            onChange={handleTitleInputChange}
                            onBlur={() => handleInputBlur('title', editedTitle)}
                            onKeyDown={(e) => handleKeyDown(e, 'title', editedTitle)}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <input
                            aria-label='edit todo description'
                            ref={descriptionInputRef}
                            type="text"
                            className="w-full border-b border-blue-400 bg-transparent text-xs"
                            value={editedDescription}
                            onChange={handleDescriptionInputChange}
                            onBlur={() => handleInputBlur('description', editedDescription)}
                            onKeyDown={(e) => handleKeyDown(e, 'description', editedDescription)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <span className={`${completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                            {title}
                        </span>

                        <span
                            className={`text-xs text-gray-400 transition-all duration-300 ease-in-out ${isHovering
                                ? 'opacity-100 max-h-20 translate-y-0'
                                : 'opacity-0 max-h-0 translate-y-1 overflow-hidden'
                                }`}
                        >
                            {description}
                        </span>

                    </div>
                )}
            </div>

            {isHovering &&
                <button
                    aria-label={`Delete ${title}`}
                    type="button"
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
                        ml-3
                        dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={handleDeleteClick}

                >
                    X
                </button>
            }

        </li>
    );
};

export default TodoCard;