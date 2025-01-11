import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../components';
import { getProfile } from '../services'
import { useProfile } from '../hooks';
import { useEffect } from  'react' 

export const MainLayout = () => {
    const { updateProfile, logout } = useProfile();

    useEffect(() => {
        const getData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                
                if (!token || token.length === 0) return;
                
                const data = await getProfile();
                updateProfile(data);
            } catch (err) {
                logout();
                console.error(err);
            }
        };

        getData();

        return () => {
            console.log('Cleanup function ran');
        };
    }, []);

    return (
        <>
            <div className="min-h-screen flex flex-col max-w-screen-xl mx-auto">
                <Header />
                <main className="flex-grow container mx-auto">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    );
};
