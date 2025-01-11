import { Link, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useProfile } from '../../hooks';

export function Navbar() {
    const { profile } = useProfile();
    console.log('Navbar.profile', profile);

    const location = useLocation();
    const getMenuItems = () => {
        if (location.pathname === '/') {
            if (profile) {
                return [
                    { label: 'Home', anchor: 'home' },
                    { label: 'About', anchor: 'about' },
                    { label: 'Features', anchor: 'features' },
                    { label: 'Verses', path: '/verses' },
                    { label: 'My Verses', path: '/my-verses' },
                ];
            } else
                return [
                    { label: 'Home', anchor: 'home' },
                    { label: 'About', anchor: 'about' },
                    { label: 'Features', anchor: 'features' },
                    { label: 'Verses', path: '/verses' },
                    { label: 'Login', path: '/login' },
                ];
        } else {
            return [
                { label: 'Home', path: '/' },
            ];
        }
    };

    const menuItems = getMenuItems();

    return (
        <nav>
            <ul>
                {menuItems.map((item, index) =>
                    item.anchor ? (
                        // Якірне посилання
                        <li key={index}>
                            <ScrollLink
                                to={item.anchor}
                                smooth={true}
                                duration={500}
                                offset={-70}
                            >
                                {item.label}
                            </ScrollLink>
                        </li>
                    ) : (
                        <li key={index}>
                            <Link to={item.path}>{item.label}</Link>
                        </li>
                    ),
                )}
            </ul>
        </nav>
    );
}
