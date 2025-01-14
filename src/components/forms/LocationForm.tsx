import React, { useState } from 'react';
import { LocationFormProps } from '../../types';

export const LocationForm: React.FC<LocationFormProps> = ({
    initialValues = {},
    onSubmit,
}) => {
    const [id, setId] = useState(initialValues.id || '');
    const [name, setName] = useState(initialValues.name || '');
    const [description, setDescription] = useState(
        initialValues.description || '',
    );

    const [latitude, setLatitude] = useState(
        initialValues.coords?.latitude || 0,
    );
    const [longitude, setLongitude] = useState(
        initialValues.coords?.longitude || 0,
    );
    const [x, setX] = useState(initialValues.coords?.x || 0);
    const [y, setY] = useState(initialValues.coords?.y || 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmit({
            id,
            name,
            description,
            coords: {
                latitude,
                longitude,
                x,
                y,
            },
        });
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
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Latitude
                </label>
                <input
                    type="number"
                    value={latitude}
                    onChange={(e) => setLatitude(parseFloat(e.target.value))}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Longitude
                </label>
                <input
                    type="number"
                    value={longitude}
                    onChange={(e) => setLongitude(parseFloat(e.target.value))}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    X Coordinate
                </label>
                <input
                    type="number"
                    value={x}
                    onChange={(e) => setX(parseInt(e.target.value, 10))}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Y Coordinate
                </label>
                <input
                    type="number"
                    value={y}
                    onChange={(e) => setY(parseInt(e.target.value, 10))}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
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
