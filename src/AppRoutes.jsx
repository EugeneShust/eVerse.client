// Contains all application routes.
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './layouts';
import {
    LandingPage,
    SignUpPage,
    LoginPage,
    ProfilePage,
    VersesPage,
    VerseCreatePage,
    VerseEditPage,
} from './pages';
import { ProfileProvider, VerseProvider } from './contexts';

const router = createBrowserRouter([
    {
        path: '',
        element: (
            <ProfileProvider>
                <VerseProvider>
                    <MainLayout />
                </VerseProvider>
            </ProfileProvider>
        ),
        children: [
            {
                index: true,
                element: <LandingPage />,
            },
            {
                path: '/signup',
                element: <SignUpPage />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/profile',
                element: <ProfilePage />,
            },
            {
                path: '/verses',
                element: <VersesPage />,
            },
            {
                path: '/verses/create',
                element: <VerseCreatePage />,
            },
            {
                path: '/verses/:id',
                element: <VerseEditPage />,
            },
        ],
    },
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
