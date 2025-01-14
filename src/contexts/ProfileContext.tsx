// Context API pattern: Provides global state and functions for authentication.
import React, { createContext, useState } from 'react';
import { ProfileDto } from '../types';

export interface ProfileContextValue {
    profile: ProfileDto | null;
    updateProfile: (profile: ProfileDto) => void;
    login: (profile: ProfileDto) => void;
    logout: () => void;
}

export const ProfileContext = createContext<ProfileContextValue | undefined>(
    undefined,
);

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState<ProfileDto | null>(null);

    const updateProfile = (profile: ProfileDto) => {
        setProfile(profile);
        console.log('Profile updated:', profile);
    };

    const login = (newProfile: ProfileDto) => {
        setProfile(newProfile);
        console.log('Login successful. Profile:', newProfile);
    };

    const logout = () => {
        setProfile(null);
        console.log('LOGOUT successful.');
    };

    return (
        <ProfileContext.Provider
            value={{ profile, updateProfile, login, logout }}
        >
            {children}
        </ProfileContext.Provider>
    );
};
