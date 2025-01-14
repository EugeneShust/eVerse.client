import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppPreviewProps } from '../../types';
import { FavoriteButton } from '../../components';

export const AppPreview: React.FC<AppPreviewProps> = ({
    id,
    name,
    logo,
    start,
    end,
    isFavorite,
    onToggleFavorite,
}) => {
    console.log('AppPreview:', end);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/app/explore/${id}`);
    };

    const handleFavoriteClick = async (id) => {
        try {
            await onToggleFavorite(id);
        } catch (error) {
            console.error('AppPreviewProps.Failed to toggle favorite:', error);
        }
    };

    return (
        <div
            onClick={handleClick}
            className="flex items-center justify-between bg-gray-100 p-4 rounded shadow mb-4 cursor-pointer"
        >
            <div className="flex items-center">
                <img
                    src={logo}
                    alt={`${name} logo`}
                    className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                    <h3 className="font-bold text-lg">{name}</h3>
                    <p className="text-gray-600">
                        {new Date(start).toLocaleDateString()} -{' '}
                        {new Date(end).toLocaleDateString()}
                    </p>
                </div>
            </div>
            <FavoriteButton
                id={id}
                isFavorite={isFavorite}
                favoriteHandler={handleFavoriteClick}
            />
        </div>
    );
};
