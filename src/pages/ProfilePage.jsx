import { useEffect, useState } from 'react';
import { getProfile } from '../services';
import { ProfileForm } from '../components';
import { updateProfile } from '../services';

export const ProfilePage = () => {
    const [profile, setProfile] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getProfile();
                console.log('fetchProfile2', data);
                setProfile(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getData();

        return () => {
            console.log('Cleanup function ran');
        };
    }, []);

    async function handleSubmit(data) {
        setError('');
        try {
            console.log('data:', data);

            const updatedData = await updateProfile(data);

            console.log('updatedData:', updatedData);

            setProfile(updatedData);
            setEditMode(false);

            if (updatedData.error) throw new Error(updatedData.error);
        } catch (err) {
            console.log(err);
            setError('Connection error. Please try again.');
        }
    }

    if (loading)
        return (
            <div
                id="category-container"
                className="flex gap-4 mt-2 flex-wrap justify-center"
            >
                Loading...
            </div>
        );
    if (error)
        return (
            <div
                id="category-container"
                className="flex gap-4 mt-2 flex-wrap justify-center"
            >
                Error: {error}
            </div>
        );
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                {!editMode ? (
                    <div>
                        <div className="avatar">
                            <div className="w-24 rounded">
                                <img src="../src/assets/images/avatar.jpg" />
                            </div>
                        </div>
                        <h1 className="text-5xl font-bold">
                            {profile.displayName}
                        </h1>
                        <p className="py-6">Id: {profile.userId}</p>
                        <p className="py-6">E-Mail: {profile.email}</p>
                        <p className="py-6">createdAt: {profile.createdAt}</p>
                        <p className="py-6">updatedAt: {profile.updatedAt}</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => setEditMode(true)}
                        >
                            Edit profile
                        </button>
                    </div>
                ) : (
                    <ProfileForm data={profile} onSubmit={handleSubmit} />
                )}
            </div>
        </div>
    );
};

// {
//     "id": 1,
//     "name": null,
//     "email": "user@example.com",
//     "isActive": true,
//     "createdAt": "2024-10-29T15:00:31.847Z",
//     "updatedAt": "2024-10-29T15:00:31.847Z"
// }
