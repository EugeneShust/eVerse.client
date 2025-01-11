import {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from './firebase';

import {
    BaseCredentials,
    RegistrationRequest,
    RegistrationResponse,
} from '../types';

import apiClient from '../api/apiClient';

export const register = async (
    firebaseCredentials: BaseCredentials,
    registrationRequest: RegistrationRequest,
) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            firebaseCredentials.email,
            firebaseCredentials.password,
        );

        const user = userCredential.user;
        console.log('Firebase user created:', user);

        const response = await apiClient.post<RegistrationResponse>(
            '/account/register',
            registrationRequest,
        );

        if (response.status !== 201) {
            throw new Error('Failed to register user on server');
        }

        const location = await authentication(response.data.userId);
        
        return await handleAuthLocation(location);
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

export const signIn = async (firebaseCredentials: BaseCredentials) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            firebaseCredentials.email,
            firebaseCredentials.password,
        );
        const user = userCredential.user;

        const token = await user.getIdToken();

        console.log('signIn.token:', token);

        const location = await authentication();
        
        return await handleAuthLocation(location);
    } catch (error) {
        console.error('Error logging in:', error);
        throw new Error('signIn failed');
    }
};

export const refreshAccessToken = async () => {
    try {
        localStorage.removeItem('accessToken');

        await authentication();
    } catch (error) {
        console.error('Error logging in:', error);
        throw new Error('signIn failed');
    }
};

const authentication = async (userId = "") => {
    try {
        const response = await apiClient.post('/account/authentication', {userId : userId});

        const { token, location } = response.data;

        localStorage.setItem('accessToken', token);
        return location;
    } catch (error) {
        console.error('Error authentication:', error);
        throw new Error('signIn failed');
    }
};

const handleAuthLocation = async (location) => {
    try {
        const response = await apiClient.post(location, {});

        console.log('User profile:', response.data);

        // if (response.data.avatar) {
        //     const avatarResponse = await fetch(response.data.avatar);
        //     if (avatarResponse.ok) {
        //         const blob = await avatarResponse.blob();
        //         const avatarUrl = URL.createObjectURL(blob);

        return response.data;
    } catch (error) {
        console.error(
            'Failed to load user profile:',
            error.response?.data || error.message,
        );
        throw error;
    }
};
