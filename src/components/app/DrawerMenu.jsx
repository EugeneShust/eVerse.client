import { useNavigate } from 'react-router-dom';

export const DrawerMenu = ({ activeTab, setActiveTab }) => {
    const navigate = useNavigate();

    return (
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
            <li>
                <button
                    className={activeTab === 'events' ? 'font-bold' : ''}
                    onClick={() => setActiveTab('events')}
                >
                    Events
                </button>
            </li>
            <li>
                <button
                    className={activeTab === 'locations' ? 'font-bold' : ''}
                    onClick={() => setActiveTab('locations')}
                >
                    Locations
                </button>
            </li>
            <li>
                <button
                    className={activeTab === 'categories' ? 'font-bold' : ''}
                    onClick={() => setActiveTab('categories')}
                >
                    Categories
                </button>
            </li>
            <p>________________</p>
            <li>
                <button
                    className={activeTab === 'favorites' ? 'font-bold' : ''}
                    onClick={() => setActiveTab('favorites')}
                >
                    Favorites
                </button>
            </li>
            <li>
                <button onClick={() => navigate('/app/explore')}>
                    Other Verses
                </button>
            </li>
        </ul>
    );
};
