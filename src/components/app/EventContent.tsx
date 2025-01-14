import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EventContentProps } from '../../types';
import { useProfile } from '../../hooks';
import { FavoriteButton } from '../../components';

export const EventContent: React.FC<EventContentProps> = ({
    id,
    name,
    start,
    location,
    isFavorite,
    onClick,
    onToggleFavorite,
}) => {
    const handleFavoriteClick = async (id) => {
        try {
            await onToggleFavorite(id);
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
        }
    };

    return (
        <div
            className="border rounded p-4 cursor-pointer hover:bg-gray-100"
            onClick={onClick}
        >
            <h3 className="font-bold">{name}</h3>
            <p className="text-sm text-gray-600">
                {new Date(start).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                })}{' '}
            </p>
            <p className="text-sm text-gray-500">
                Location: {location || 'Unknown'}
            </p>
            <FavoriteButton
                id={id}
                isFavorite={isFavorite}
                favoriteHandler={handleFavoriteClick}
            />
        </div>
    );
};
