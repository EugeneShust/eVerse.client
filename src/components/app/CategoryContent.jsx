import { EventContent } from './EventContent';

export const CategoryContent = ({
    category,
    events,
    favorites,
    onEventClick,
    onToggleFavorite,
    onBack,
}) => {
    const groupedEvents = events
        .filter((event) => event.categoryId === category.id)
        .reduce((acc, event) => {
            const day = new Date(event.start).toLocaleDateString('en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
            });
            if (!acc[day]) acc[day] = [];
            acc[day].push(event);
            return acc;
        }, {});

    return (
        <div className="p-6 bg-gray-50">
            <button
                className="text-blue-500 hover:underline mb-4"
                onClick={onBack}
            >
                &larr; Back
            </button>
            <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
            <p className="text-gray-700 mb-4">
                {category.description || 'No description provided.'}
            </p>
            <div className="space-y-6">
                {Object.entries(groupedEvents).map(([day, dayEvents]) => (
                    <div key={day} className="space-y-2">
                        <h3 className="text-lg font-bold mb-2">{day}</h3>
                        {dayEvents.map((event) => (
                            <EventContent
                                key={event.id}
                                {...event}
                                isFavorite={favorites.includes(event.id)}
                                onClick={() => onEventClick(event)}
                                onToggleFavorite={onToggleFavorite}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
