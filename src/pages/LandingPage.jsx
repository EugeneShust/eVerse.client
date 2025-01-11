import React from 'react';
import { Link } from 'react-router-dom';

export function LandingPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl text-center font-bold mb-8">
                Landing Page
            </h1>
            <div className="flex flex-col items-center"></div>
            <div className="text-center mt-4">
                <Link to="/verses" className="link link-hover">
                    Explore Verses
                </Link>
            </div>
        </div>
    );
}
