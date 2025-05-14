import React, { useRef, useEffect, useState } from 'react';

interface TodoFooterProps {
    activeCount: number;
    completedCount: number;
    filter: 'all' | 'active' | 'completed';
    onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
    onClearCompleted: () => void;
}

const TodoFooter: React.FC<TodoFooterProps> = ({
    activeCount,
    completedCount,
    filter,
    onFilterChange,
    onClearCompleted
}) => {
    // Refs for filter buttons to measure their positions
    const allButtonRef = useRef<HTMLButtonElement>(null);
    const activeButtonRef = useRef<HTMLButtonElement>(null);
    const completedButtonRef = useRef<HTMLButtonElement>(null);

    // Ref for the filter container to calculate relative positions
    const filterContainerRef = useRef<HTMLDivElement>(null);

    // State to store the highlight position and dimensions
    const [highlightStyle, setHighlightStyle] = useState({
        left: 0,
        width: 0,
        opacity: 0, // Start invisible
    });

    // Update highlight position when filter changes
    useEffect(() => {
        let targetButton: HTMLButtonElement | null = null;

        // Get the appropriate button based on current filter
        if (filter === 'all') {
            targetButton = allButtonRef.current;
        } else if (filter === 'active') {
            targetButton = activeButtonRef.current;
        } else if (filter === 'completed') {
            targetButton = completedButtonRef.current;
        }

        // If we have a target button and the container, update the highlight
        if (targetButton && filterContainerRef.current) {
            const buttonRect = targetButton.getBoundingClientRect();
            const containerRect = filterContainerRef.current.getBoundingClientRect();
            // Calculate position relative to the container
            const left = buttonRect.left - containerRect.left;

            setHighlightStyle({
                left,
                width: buttonRect.width,
                opacity: 1, // Make visible when positioned
            });
        }
    }, [filter]);

    return (
        <div className="w-full flex items-center justify-between mt-4 py-2 px-4 text-sm border-t border-gray-200">
            {/* Items left counter */}
            <div className="text-gray-600 w-24 flex-shrink-0 text-left">
                {activeCount} {activeCount === 1 ? 'Item' : 'Items'} Left
            </div>

            <div className="flex space-x-1 relative flex-shrink-0" ref={filterContainerRef}>
                <div
                    className="absolute top-0 h-full bg-blue-500 rounded transition-all duration-300 ease-in-out"
                    style={{
                        left: `${highlightStyle.left}px`,
                        width: `${highlightStyle.width}px`,
                        opacity: highlightStyle.opacity,
                        zIndex: 0,
                    }}
                    aria-hidden="true"
                />
                <button
                    ref={allButtonRef}
                    className={`px-2 py-1 rounded relative z-10 ${filter === 'all' ? 'text-white' : 'text-gray-600 hover:text-gray-800'}`}
                    onClick={() => onFilterChange('all')}
                    aria-current={filter === 'all'}
                >
                    All
                </button>
                <button
                    ref={activeButtonRef}
                    className={`px-2 py-1 rounded relative z-10 ${filter === 'active' ? 'text-white' : 'text-gray-600 hover:text-gray-800'}`}
                    onClick={() => onFilterChange('active')}
                    aria-current={filter === 'active'}
                >
                    Active
                </button>
                <button
                    ref={completedButtonRef}
                    className={`px-2 py-1 rounded relative z-10 ${filter === 'completed' ? 'text-white' : 'text-gray-600 hover:text-gray-800'}`}
                    onClick={() => onFilterChange('completed')}
                    aria-current={filter === 'completed'}
                >
                    Completed
                </button>
            </div>

            {/* Clear completed button */}
            <div className="w-30 flex-shrink-0 text-right">
                <button
                    className={`text-gray-600 hover:text-red-800 ${completedCount === 0 ? 'invisible' : ''}`}
                    onClick={onClearCompleted}
                    disabled={completedCount === 0}
                    aria-disabled={completedCount === 0}
                    aria-label="Clear completed tasks"
                >
                    Clear Completed
                </button>
            </div>
        </div>
    );
};

export default TodoFooter;