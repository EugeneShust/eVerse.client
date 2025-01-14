import React, { useState } from 'react';
import { ItemFormProps } from '../../types';

export const ItemForm: React.FC<ItemFormProps> = ({
    initialValues = { id: '', name: '', description: '' },
    onSubmit,
}) => {
    const [id, setId] = useState(initialValues.id || '');
    const [name, setName] = useState(initialValues.name || '');
    const [description, setDescription] = useState(
        initialValues.description || '',
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ id, name, description });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    rows={3}
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Save
                </button>
            </div>
        </form>
    );
};
