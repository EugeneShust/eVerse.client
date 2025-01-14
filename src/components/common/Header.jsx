import React from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { Navbar } from './Navbar';

export function Header() {
    const location = useLocation();

    const excludeNavbarPaths = ['/verses/:id', '/app/:id']; 

    const isExcluded = excludeNavbarPaths.some((pattern) =>
        matchPath({ path: pattern, exact: true }, location.pathname)
    );

    if (isExcluded) {
        return null;
    }

    return (
        <div className="border-b-2 border-r-2 border-l-2 border-[#CACED5] shadow shadow-white mb-4">
            <Navbar />
        </div>
    );
}
