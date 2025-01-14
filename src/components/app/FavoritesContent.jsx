export const FavoritesContent = ({ favorites, events, onEventClick }) => {
    const groupedFavorites = events
        .filter((event) => favorites.includes(event.id))
        .reduce((acc, event) => {
            const day = new Date(event.start).toLocaleDateString('en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });
            if (!acc[day]) acc[day] = [];
            acc[day].push(event);
            return acc;
        }, {});

    return (
        <div className="p-6 bg-gray-50">
            <h2 className="text-2xl font-bold mb-4">Favorites Roadmap</h2>
            <div className="space-y-6">
                {Object.entries(groupedFavorites).map(([day, dayEvents]) => (
                    <div key={day}>
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                            <div>
                                <h3 className="text-lg font-bold">
                                    {day.split(',')[0]}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {day.split(',').slice(1).join(',')}
                                </p>
                            </div>
                        </div>
                        <div className="border-l-2 border-gray-300 pl-6 space-y-4">
                            {dayEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="relative pl-4 cursor-pointer"
                                    onClick={() => onEventClick(event)}
                                >
                                    <div className="absolute -left-2.5 w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-500">
                                            {new Date(
                                                event.start,
                                            ).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                        <span className="font-bold">
                                            {event.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
