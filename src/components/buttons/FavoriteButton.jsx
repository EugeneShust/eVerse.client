import React from 'react';

export const FavoriteButton = ({ id, isFavorite, favoriteHandler }) => {
    return (
        <button
            onClick={async (e) => {
                e.stopPropagation();
                await favoriteHandler(id);
            }}
            className={`text-xl ${isFavorite ? 'text-yellow-400' : 'text-gray-400'}`}
        >
            {isFavorite ? '★' : '☆'}
        </button>
    );
};
