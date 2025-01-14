import { data } from 'autoprefixer';
import { UserVersesResponse } from '../types';
import apiClient from '../api/apiClient';

export async function getProfile() {
    var response = await apiClient.post('/user/profile', {});
    return response.data;
}

export async function profileUpdate(profile) {
    return await apiClient.put('/user/profile', profile);
}

export async function getUserVerses(): Promise<UserVersesResponse> {
    var response = await apiClient.post<UserVersesResponse>('/user/verses', {});
    return response.data;
}