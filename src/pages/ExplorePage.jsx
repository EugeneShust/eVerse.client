import React, { useState, useEffect } from 'react';
import { AppPreview } from '../components';
import { getApps, ToggleVerseFavorite } from '../services';
import { useProfile } from '../hooks';

export const ExplorePage = () => {
    const { profile } = useProfile();
    const [apps, setApps] = useState([
        {
            id: '',
            name: '',
            logo: '',
            start: '',
            end: '',
            isFavorite: false,
            onToggleFavorite: undefined,
        },
    ]);

    useEffect(() => {
        const fetchApps = async () => {
            const data = await getApps();
            const appsWithFavorites = upgradeFavorites(data);
            setApps(appsWithFavorites);
        };
        fetchApps();
    }, []);

    const upgradeFavorites = (apps) => {
        if (!profile) {
            console.log('No profile found');
            return apps;
        }

        if (
            !Array.isArray(profile.favorites) ||
            profile.favorites.length === 0
        ) {
            console.log('No favorites found', profile);
            return apps;
        }

        const favorites = profile?.favorites?.map((x) => x.id) || [];
        console.log('favorites:', favorites);
        return apps.map((app) => ({
            ...app,
            isFavorite: favorites.includes(app.id),
        }));
    };

    const handleToggleFavorite = async (id) => {
        try {
            await ToggleVerseFavorite(id);
            setApps((prev) =>
                prev?.map((app) =>
                    app.id === id
                        ? { ...app, isFavorite: !app.isFavorite }
                        : app,
                ),
            );
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Explore Verses</h1>

            <div>
                {apps?.map((app) => (
                    <AppPreview
                        key={app.id}
                        {...app}
                        onToggleFavorite={handleToggleFavorite}
                    />
                ))}
            </div>
        </div>
    );
};
{
    /* <button
onClick={handleInstallClick}
className="bg-blue-500 text-white px-4 py-2 rounded"
disabled={!deferredPrompt}
>
Install App
</button> */
}

// FIrebase
// const [deferredPrompt, setDeferredPrompt] = useState(null);

// useEffect(() => {
//     const handleBeforeInstallPrompt = (event) => {
//         event.preventDefault();
//         setDeferredPrompt(event);
//     };

//     window.addEventListener(
//         'beforeinstallprompt',
//         handleBeforeInstallPrompt,
//     );

//     return () => {
//         window.removeEventListener(
//             'beforeinstallprompt',
//             handleBeforeInstallPrompt,
//         );
//     };
// }, []);

// const handleInstallClick = () => {
//     if (deferredPrompt) {
//         deferredPrompt.prompt();
//         deferredPrompt.userChoice.then((choiceResult) => {
//             if (choiceResult.outcome === 'accepted') {
//                 console.log('User accepted the A2HS prompt');
//             } else {
//                 console.log('User dismissed the A2HS prompt');
//             }
//             setDeferredPrompt(null);
//         });
//     }
// };
