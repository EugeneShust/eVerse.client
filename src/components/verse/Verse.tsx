import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Verse = ({ verse, isFavorite }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        if (isFavorite) {
            navigate(`/app/explore/${verse.id}`);
        } else {
            navigate(`/verses/${verse.id}`);
        }
    };

    return (
        <div
            className="card bg-base-100 w-11/12 max-w-3xl shadow-xl mb-6 cursor-pointer"
            onClick={handleCardClick}
        >
            <div className="card-body">
                <h2 className="card-title">{verse.name}</h2>
                <div className="avatar mb-4">
                    <div className="w-24 rounded">
                        <img src={verse.logo} alt="Cover" />
                    </div>
                </div>
            </div>
        </div>
    );
};
