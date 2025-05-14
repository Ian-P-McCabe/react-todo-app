import React from 'react';

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
    return (
        <div className="w-full flex items-center justify-between mt-4 py-2 px-4 text-sm border-t border-gray-200">
            {/* Items left counter */}
            <div className="text-gray-600">
                {activeCount} {activeCount === 1 ? 'Item' : 'Items'} Left
            </div>

            {/* Filter buttons */}
            <div className="flex space-x-1">
                <button
                    className={`px-2 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-gray-800'}`}
                    onClick={() => onFilterChange('all')}
                    aria-current={`${filter === 'all' ? true : false}`}
                >
                    All
                </button>
                <button
                    className={`px-2 py-1 rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-gray-800'}`}
                    onClick={() => onFilterChange('active')}
                    aria-current={`${filter === 'active' ? true : false}`}
                >
                    Active
                </button>
                <button
                    className={`px-2 py-1 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-gray-800'}`}
                    onClick={() => onFilterChange('completed')}
                    aria-current={`${filter === 'completed' ? true : false}`}
                >
                    Completed
                </button>
            </div>

            {/* Clear completed button */}
            <button
                className={`text-gray-600 hover:text-red-800 ${completedCount === 0 ? 'invisible' : ''}`}
                onClick={onClearCompleted}
                disabled={completedCount === 0}
                aria-disabled={completedCount === 0}
            >
                Clear Completed
            </button>
        </div>
    );
};

export default TodoFooter;