import React, { useEffect, useState } from 'react';
import { useProfile, useVerse } from '../hooks';
import { getVerse } from '../services';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import {
    DrawerMenu,
    EventsContent,
    EventDetails,
    CategoryContent,
    CategoriesContent,
    FavoritesContent,
} from '../components/app';
import { ToggleVerseEventFavorite } from '../services';

export function PWAPage() {
    const { verse, updateVerse, cleanUp } = useVerse();
    const { profile, updateProfile } = useProfile();

    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('categories');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getVerse(id);
                updateVerse(data);

                console.log('PWAPage.Verse:', data);

                setLoading(false);
            } catch (err) {
                console.error(err);
                cleanUp();
                setLoading(false);
            }
        };

        getData();

        return () => {
            console.log('Cleanup function ran');
        };
    }, []);

    const handleEventClick = (event) => {
        console.log('setSelectedEvent(event)', event);

        setSelectedEvent(event);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleBackClick = () => {
        setSelectedEvent(null);
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
    };

    const handleToggleFavorite = async (id) => {
        try {
            await ToggleVerseEventFavorite(verse.id, id);

            let events = profile.favorites
                .filter((favorite) => favorite.id === verse.id)
                .flatMap((favorite) => favorite.events);

            if (events.includes(id)) {
                events = events.filter((eventId) => eventId !== id);
            } else {
                events = [...events, id];
            }

            const updatedFavorites = profile.favorites.map((favorite) => {
                if (favorite.id === verse.id) {
                    return { ...favorite, events };
                }
                return favorite;
            });

            updateProfile({ ...profile, favorites: updatedFavorites });
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
        }
    };

    if (loading) return;
    <p>Loading .... </p>;

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-base-300 w-full">
                    <div className="flex-none">
                        <label
                            htmlFor="my-drawer-3"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">Navbar Title</div>
                </div>
                {/* Page content here */}
                <div className="p-6">
                    {selectedEvent ? (
                        <EventDetails
                            event={selectedEvent}
                            favorites={profile.favorites
                                .filter((favorite) => favorite.id === verse.id)
                                .flatMap((favorite) => favorite.events)
                                .includes(selectedEvent.id)}
                            onBack={() => {
                                if (selectedCategory) {
                                    setSelectedEvent(null);
                                } else {
                                    setSelectedEvent(null);
                                    setActiveTab('events');
                                }
                            }}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    ) : activeTab === 'categories' && !selectedCategory ? (
                        <CategoriesContent
                            categories={verse.categories}
                            onCategoryClick={handleCategoryClick}
                        />
                    ) : activeTab === 'categories' && selectedCategory ? (
                        <CategoryContent
                            category={selectedCategory}
                            events={verse.events}
                            favorites={profile.favorites
                                .filter((favorite) => favorite.id === verse.id)
                                .flatMap((favorite) => favorite.events)}
                            onEventClick={handleEventClick}
                            onToggleFavorite={handleToggleFavorite}
                            onBack={handleBackToCategories}
                        />
                    ) : activeTab === 'events' ? (
                        <EventsContent
                            events={verse.events}
                            favorites={profile.favorites
                                .filter((favorite) => favorite.id === verse.id)
                                .flatMap((favorite) => favorite.events)}
                            onEventClick={handleEventClick}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    ) : activeTab === 'favorites' ? (
                        <FavoritesContent
                            favorites={profile.favorites
                                .filter((favorite) => favorite.id === verse.id)
                                .flatMap((favorite) => favorite.events)}
                            events={verse.events}
                            onEventClick={handleEventClick}
                        />
                    ) : null}
                    {activeTab === 'locations' && <div>Locations Content</div>}
                    {activeTab === 'other' && <div>Other Events Content</div>}
                </div>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-3"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <DrawerMenu activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
        </div>
    );
}
