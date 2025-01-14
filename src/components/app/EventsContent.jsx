import React from 'react';
import { EventContent } from '../app';

export const EventsContent = ({
    events,
    favorites,
    onEventClick,
    onToggleFavorite,
}) => {
    console.log(favorites);

    const groupedByDay = events.reduce((acc, event) => {
        const eventDay = Math.floor(
            (new Date(event.start).setHours(0, 0, 0, 0) -
                new Date(events[0].start).setHours(0, 0, 0, 0)) /
                (1000 * 60 * 60 * 24),
        );
        const dayLabel = `Day ${eventDay + 1}`;
        if (!acc[dayLabel]) acc[dayLabel] = [];
        acc[dayLabel].push(event);
        return acc;
    }, {});

    const handleFavoriteClick = async (id) => {
        try {
            await onToggleFavorite(id);
        } catch (error) {
            console.error('EventsContent.Failed to toggle favorite:', error);
        }
    };

    const days = Object.entries(groupedByDay);

    return (
        <div className="tabs tabs-bordered">
            {days.map(([day, dayEvents], index) => (
                <React.Fragment key={index}>
                    <input
                        type="radio"
                        name="event_tabs"
                        id={`tab-${index}`}
                        className="hidden"
                        defaultChecked={index === 0}
                    />
                    <label
                        htmlFor={`tab-${index}`}
                        className="tab tab-bordered cursor-pointer"
                    >
                        {day}
                    </label>

                    <div
                        role="tabpanel"
                        id={`content-tab-${index}`}
                        className="tab-content p-4 hidden"
                    >
                        <h2 className="text-lg font-bold mb-2">
                            {new Date(dayEvents[0].start).toLocaleDateString(
                                'en-US',
                                {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'short',
                                },
                            )}
                        </h2>
                        <div className="space-y-2">
                            {dayEvents.map((event) => (
                                <EventContent
                                    key={event.id}
                                    {...event}
                                    isFavorite={favorites.includes(event.id)}
                                    onClick={() => onEventClick(event)}
                                    onToggleFavorite={() =>
                                        handleFavoriteClick(event.id)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </React.Fragment>
            ))}

            <style>
                {`
                    input:checked + label + .tab-content {
                        display: block;
                    }
                    .tab-content {
                        display: none;
                    }
                `}
            </style>
        </div>
    );
};
