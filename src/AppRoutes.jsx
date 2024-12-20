// Contains all application routes.
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './layouts';
import { LandingPage, SignUpPage } from './pages';

const router = createBrowserRouter([
    {
        path: '',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <LandingPage />,
            },
            {
                path: '/signup',
                element: <SignUpPage />,
            },
        ],
    },
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
