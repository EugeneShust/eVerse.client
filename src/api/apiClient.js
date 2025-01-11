import axios from 'axios';
import { API_URL } from '../config';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    }

    const firebaseToken = localStorage.getItem('firebaseToken');
    if (firebaseToken) {
        config.headers.Authorization = `Bearer ${firebaseToken}`;
    }

    return config;
});

export default apiClient;