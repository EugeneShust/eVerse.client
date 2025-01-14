import apiClient from '../api/apiClient';
import { AppPreviewDto } from '../types';
import { AppExploreResponse } from '../types/AppExploreResponse';

export async function getApps(): Promise<AppPreviewDto[]> {
    var response = await apiClient.get<AppExploreResponse>(`/app`, {});
    return response.data.apps;
}
