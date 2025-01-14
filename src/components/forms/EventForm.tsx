import React, { useState } from 'react';
import { EventFormProps } from '../../types';

export const EventForm: React.FC<EventFormProps> = ({
    initialValues = {},
    onSubmit,
    categories,
    locations,
    presenters,
}) => {
    const [id, setId] = useState(initialValues.id || '');
    const [name, setName] = useState(initialValues.name || '');
    const [description, setDescription] = useState(
        initialValues.description || '',
    );
    const [locationId, setLocationId] = useState(
        initialValues.locationId || '',
    );
    const [categoryId, setCategoryId] = useState(
        initialValues.categoryId || '',
    );
    const [selectedPresenterIds, setSelectedPresenterIds] = useState(
        initialValues.presenterIds || [],
    );
    const [start, setStart] = useState(initialValues.start || '');
    const [end, setEnd] = useState(initialValues.end || '');

    const togglePresenter = (presenterId: string) => {
        setSelectedPresenterIds((prevIds) =>
            prevIds.includes(presenterId)
                ? prevIds.filter((id) => id !== presenterId)
                : [...prevIds, presenterId],
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            id,
            name,
            description,
            locationId,
            categoryId,
            presenterIds: selectedPresenterIds,
            start,
            end,
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
                    Location
                </label>
                <select
                    value={locationId}
                    onChange={(e) => setLocationId(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                >
                    <option value="">Select a Location</option>
                    {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Category
                </label>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                >
                    <option value="">Select a Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Presenters
                </label>
                <div className="flex flex-wrap gap-2">
                    {presenters.map((presenter) => (
                        <label
                            key={presenter.id}
                            className="flex items-center space-x-2"
                        >
                            <input
                                type="checkbox"
                                checked={selectedPresenterIds.includes(
                                    presenter.id,
                                )}
                                onChange={() => togglePresenter(presenter.id)}
                            />
                            <span>{presenter.name}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Start Date
                </label>
                <input
                    type="datetime-local"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    End Date
                </label>
                <input
                    type="datetime-local"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    required
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
