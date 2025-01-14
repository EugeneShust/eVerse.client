import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EventContentProps } from '../../types';
import { useProfile } from '../../hooks';

export const EventContent: React.FC<EventContentProps> = ({
    id,
    name,
    start,
    location,
    isFavorite,
    onClick,
    onToggleFavorite,
}) => {
    console.log(isFavorite);

    const handleFavoriteClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        console.log(id);
        onToggleFavorite(id);
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

            <button
                onClick={handleFavoriteClick}
                className={`text-xl ${true ? 'text-yellow-400' : 'text-gray-400'}`}
            >
                {isFavorite ? '★' : '☆'}
            </button>
        </div>
    );
};
