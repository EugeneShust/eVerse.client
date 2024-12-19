// Contains all application routes.
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './layouts';
import { LandingPage } from './pages';

const router = createBrowserRouter([
    {
        path: '',
        element: (
                <MainLayout />
        ),
        children: [
            {
                index: true,
                element: (
                        <LandingPage />
                ),
            },
        ],
    },
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
