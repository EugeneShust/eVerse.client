import React, { useState, useEffect } from 'react';
import { useVerse } from '../../hooks';
import { CategoryDto, LocationDto, PresenterDto } from '../../types/Dtos';
import { EventDetailsProps } from '../../types';

export const EventDetails: React.FC<EventDetailsProps> = ({
    event,
    favorites,
    onBack,
    onToggleFavorite,
}) => {
    const { verse } = useVerse();
    const [category, setCategory] = useState<CategoryDto | null>(null);
    const [location, setLocation] = useState<LocationDto | null>(null);
    const [presenters, setPresenters] = useState<PresenterDto[]>([]);

    console.log('isFavorite:', favorites);

    useEffect(() => {
        if (verse) {
            const foundCategory =
                verse.categories.find(
                    (cat: CategoryDto) => cat.id === event.categoryId,
                ) || null;
            setCategory(foundCategory);

            const foundLocation =
                verse.locations.find(
                    (loc: LocationDto) => loc.id === event.locationId,
                ) || null;
            setLocation(foundLocation);

            const foundPresenters = verse.presenters.filter(
                (presenter: PresenterDto) =>
                    event.presenterIds.includes(presenter.id),
            );
            setPresenters(foundPresenters);
        }
    }, [verse, event]);

    const handleFavoriteClick = async (id) => {
        //favorites
        try {
            await onToggleFavorite(event.id);
        } catch (error) {
            console.error('EventDetails.Failed to toggle favorite:', error);
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <button
                className="text-blue-500 hover:underline mb-6"
                onClick={onBack}
            >
                &larr; Back
            </button>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {event.name}
                    </h1>
                    <button
                        className={`text-yellow-500 ${favorites ? 'font-bold' : ''}`}
                        onClick={async (e) => {
                            e.stopPropagation();
                            await handleFavoriteClick(event.id);
                        }}
                    >
                        {favorites ? '★' : '☆'}
                    </button>
                </div>

                <p className="text-gray-700">
                    <strong className="font-semibold">Time:</strong>{' '}
                    {new Date(event.start).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}{' '}
                    -{' '}
                    {new Date(event.end).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </p>

                <p className="text-gray-700">
                    <strong className="font-semibold">Location:</strong>{' '}
                    {location?.name || 'Unknown'}
                </p>

                <p className="text-gray-700">
                    <strong className="font-semibold">Category:</strong>{' '}
                    {category?.name || 'Uncategorized'}
                </p>

                <p className="text-gray-700">
                    <strong className="font-semibold">Presenters:</strong>{' '}
                    {presenters.length > 0
                        ? presenters.map((p) => p.name).join(', ')
                        : 'No presenters assigned.'}
                </p>

                <p className="text-gray-700">
                    <strong className="font-semibold">Description:</strong>{' '}
                    {event.description || 'No description provided.'}
                </p>
            </div>
        </div>
    );
};
