import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../components';

export const MainLayout = () => {
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
