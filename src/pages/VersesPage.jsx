import React, { useState, useEffect } from 'react';
import { Verse } from '../components';
import { useProfile } from '../hooks';
import { getUserVerses } from '../services';
import { useNavigate } from 'react-router-dom';

export function VersesPage() {
    const [verses, setVerses] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const { profile } = useProfile();

    const navigate = useNavigate();

    useEffect(() => {
        const getVerses = async () => {
            const { verses, favorites } = await getUserVerses();
            
            console.log(verses);
            console.log(favorites);
            
            setVerses(verses);
            setFavorites(favorites);
        };

        getVerses();
    }, []);

    const handleCreateVerse = () => {
        navigate('/verses/create');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl text-center font-bold mb-8">Verses Page</h1>

            <div className="flex justify-center mb-8">
                <button
                    onClick={handleCreateVerse}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Create New Verse
                </button>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">My Verses</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {verses.length > 0 ? (
                        verses.map((verse) => (
                            <Verse key={verse.id} verse={verse} />
                        ))
                    ) : (
                        <p className="text-gray-500">You have no Verses yet.</p>
                    )}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">Favorites</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favorites.length > 0 ? (
                        favorites.map((verse) => (
                            <Verse key={verse.id} verse={verse} isFavorite={true}/>
                        ))
                    ) : (
                        <p className="text-gray-500">
                            You have no favorite Verses yet.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
