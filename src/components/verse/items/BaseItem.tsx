import React from 'react';
import { BaseProps } from '../../../types';

const BaseItem: React.FC<BaseProps> = ({
    name,
    description,
    onEdit,
    onDelete,
    children,
}) => {
    return (
        <div className="flex items-center justify-between bg-gray-100 p-4 rounded shadow mb-4">
            <div>
                <h3 className="font-bold text-lg">{name}</h3>
                <p className="text-gray-600">{description}</p>
                {children && <div className="mt-2">{children}</div>}
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={onEdit}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Edit
                </button>
                <button
                    onClick={onDelete}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default BaseItem; 